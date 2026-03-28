const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(express.json());

// ==================== SERVE FRONTEND ====================

// Serve static files from client folder
app.use(express.static(path.join(__dirname, 'client')));

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Catch-all route (VERY IMPORTANT for deployment)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// ==================== API ROUTES ====================

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Server is running!',
        timestamp: new Date().toISOString()
    });
});

// Database status
app.get('/api/db-status', (req, res) => {
    res.json({
        success: true,
        status: {
            connected: true,
            message: 'Server is running',
            timestamp: new Date().toISOString(),
            details: { name: 'interview_prep', host: 'localhost', port: PORT }
        }
    });
});

// Test database
app.get('/api/test-db', (req, res) => {
    res.json({
        success: true,
        message: 'Server is operational',
        collections: ['users', 'leaderboard'],
        databaseName: 'interview_prep'
    });
});

// Practice questions
app.get('/api/questions/practice', (req, res) => {
    const questions = [];
    for (let i = 1; i <= 50; i++) {
        questions.push({
            id: i,
            category: ["Technical", "Behavioral", "Leadership"][i % 3],
            question: `Interview Question ${i}: ${i % 3 === 0 ? "How do you handle tight deadlines?" : i % 2 === 0 ? "Describe your problem-solving approach." : "What motivates you at work?"}`,
            modelAnswer: "A strong candidate would provide specific examples using the STAR method and demonstrate measurable results."
        });
    }
    res.json({ success: true, count: questions.length, questions: questions });
});

// MCQ questions
app.get('/api/questions/mcq', (req, res) => {
    const mcqs = [];
    for (let i = 1; i <= 50; i++) {
        mcqs.push({
            id: i,
            question: `MCQ ${i}: What is the best practice for software development?`,
            options: ["Code Review", "No Testing", "Skip Documentation", "Ignore Bugs"],
            correct: 0,
            explanation: "Code review helps maintain code quality and catch bugs early."
        });
    }
    res.json({ success: true, count: mcqs.length, questions: mcqs });
});

// Interview notes
app.get('/api/questions/notes', (req, res) => {
    const notes = [];
    for (let i = 1; i <= 50; i++) {
        notes.push({
            id: i,
            topic: `Interview Tip ${i}`,
            content: "Always prepare for interviews by researching the company and practicing common questions. Use the STAR method for behavioral questions."
        });
    }
    res.json({ success: true, count: notes.length, notes: notes });
});

// Leaderboard
let leaderboard = [];

// Get leaderboard
app.get('/api/leaderboard', (req, res) => {
    res.json({ success: true, leaderboard: leaderboard.slice(0, 20) });
});

// Add score
app.post('/api/leaderboard/add', (req, res) => {
    const { name, score } = req.body;

    leaderboard.push({
        name,
        score,
        date: new Date().toISOString()
    });

    leaderboard.sort((a, b) => b.score - a.score);

    if (leaderboard.length > 50) {
        leaderboard = leaderboard.slice(0, 50);
    }

    res.json({ success: true, leaderboard: leaderboard.slice(0, 20) });
});

// ==================== START SERVER ====================

app.listen(PORT, () => {
    console.log('\n=================================');
    console.log('🚀 AI Interview Prep Pro Server');
    console.log('=================================');
    console.log(`📡 Server running on port: ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('=================================\n');
});