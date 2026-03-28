require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/interview_prep';

// Database Status Tracking
let dbStatus = {
    connected: false,
    message: 'Connecting to MongoDB...',
    timestamp: null,
    details: null
};

// Monitor MongoDB connection events
mongoose.connection.on('connected', () => {
    dbStatus = {
        connected: true,
        message: '✅ MongoDB connected successfully',
        timestamp: new Date().toISOString(),
        details: {
            host: mongoose.connection.host,
            port: mongoose.connection.port,
            name: mongoose.connection.name
        }
    };
    console.log('\n=================================');
    console.log('✅ MongoDB connected successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🔗 Host: ${mongoose.connection.host}:${mongoose.connection.port}`);
    console.log('=================================\n');
});

mongoose.connection.on('error', (err) => {
    dbStatus = {
        connected: false,
        message: '❌ MongoDB connection error',
        timestamp: new Date().toISOString(),
        details: err.message
    };
    console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    dbStatus = {
        connected: false,
        message: '⚠️ MongoDB disconnected',
        timestamp: new Date().toISOString(),
        details: null
    };
    console.log('⚠️ MongoDB disconnected');
});

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Helper function for connection state
function getConnectionState(state) {
    const states = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting'
    };
    return states[state] || 'unknown';
}

// Import questions database
const { practiceQuestions, mcqQuestions, interviewNotes } = require('./questions');

// In-memory user storage
let users = [];
let leaderboard = [];

// ==================== MIDDLEWARE ====================
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid or expired token.' });
    }
};

// ==================== DATABASE STATUS ENDPOINTS ====================
app.get('/api/db-status', (req, res) => {
    res.json({
        success: true,
        status: dbStatus,
        mongooseState: mongoose.connection.readyState,
        stateText: getConnectionState(mongoose.connection.readyState)
    });
});

app.get('/api/test-db', async (req, res) => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        res.json({
            success: true,
            message: 'Database is operational',
            collections: collections.map(c => c.name),
            databaseName: mongoose.connection.name
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Database operation failed',
            error: error.message
        });
    }
});

// ==================== AUTHENTICATION ROUTES ====================
app.post('/api/auth/signup', [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('name').notEmpty().trim(),
    body('age').optional().isInt({ min: 16, max: 100 }),
    body('field').optional().trim()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password, name, age, field } = req.body;
    
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = {
        id: users.length + 1,
        email,
        password: hashedPassword,
        name,
        age: age || null,
        field: field || null,
        createdAt: new Date().toISOString()
    };
    
    users.push(user);
    
    const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
    
    res.status(201).json({
        message: 'User created successfully',
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            age: user.age,
            field: user.field
        }
    });
});

app.post('/api/auth/login', [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
    
    res.json({
        message: 'Login successful',
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            age: user.age,
            field: user.field
        }
    });
});

// ==================== QUESTIONS API ROUTES ====================
app.get('/api/questions/practice', authenticateToken, (req, res) => {
    res.json({
        success: true,
        count: practiceQuestions.length,
        questions: practiceQuestions
    });
});

app.get('/api/questions/mcq', authenticateToken, (req, res) => {
    res.json({
        success: true,
        count: mcqQuestions.length,
        questions: mcqQuestions
    });
});

app.post('/api/questions/mcq/submit', authenticateToken, (req, res) => {
    try {
        const { answers } = req.body;
        
        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({ error: 'Invalid answers format' });
        }
        
        let correctCount = 0;
        let wrongCount = 0;
        const results = [];
        
        answers.forEach(answer => {
            const question = mcqQuestions.find(q => q.id === answer.questionId);
            if (question) {
                const isCorrect = question.correct === answer.selected;
                if (isCorrect) correctCount++;
                else wrongCount++;
                
                results.push({
                    questionId: answer.questionId,
                    isCorrect,
                    correctAnswer: question.options[question.correct],
                    explanation: question.explanation
                });
            }
        });
        
        const score = (correctCount / mcqQuestions.length) * 100;
        
        leaderboard.push({
            userId: req.user.id,
            name: req.user.name,
            score: correctCount,
            total: mcqQuestions.length,
            percentage: score,
            date: new Date().toISOString()
        });
        
        leaderboard.sort((a, b) => b.score - a.score);
        if (leaderboard.length > 50) leaderboard = leaderboard.slice(0, 50);
        
        res.json({
            success: true,
            correctCount,
            wrongCount,
            total: mcqQuestions.length,
            percentage: score,
            results
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit answers' });
    }
});

app.get('/api/questions/notes', authenticateToken, (req, res) => {
    res.json({
        success: true,
        count: interviewNotes.length,
        notes: interviewNotes
    });
});

// ==================== LEADERBOARD ROUTES ====================
app.get('/api/leaderboard', authenticateToken, (req, res) => {
    const topScores = leaderboard.slice(0, 20);
    res.json({
        success: true,
        leaderboard: topScores
    });
});

app.get('/api/leaderboard/me', authenticateToken, (req, res) => {
    const userScores = leaderboard.filter(entry => entry.userId === req.user.id);
    const rank = leaderboard.findIndex(entry => entry.userId === req.user.id) + 1;
    
    res.json({
        success: true,
        scores: userScores,
        rank: rank > 0 ? rank : null
    });
});

// ==================== PROFILE ROUTE ====================
app.get('/api/profile', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
        success: true,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            age: user.age,
            field: user.field,
            createdAt: user.createdAt
        }
    });
});

// ==================== SERVER STARTUP ====================
app.listen(PORT, () => {
    console.log('\n=================================');
    console.log('🚀 AI Interview Prep Pro Server');
    console.log('=================================');
    console.log(`📡 Server running on: http://localhost:${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📊 MongoDB Status: ${mongoose.connection.readyState === 1 ? '✅ Connected' : '⚠️ Connecting...'}`);
    console.log('=================================\n');
});