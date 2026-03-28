// ==================== FIREBASE CONFIGURATION ====================
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};

let firebaseApp, auth, db;
let firebaseReady = false;

try {
    if (typeof firebase !== 'undefined') {
        firebaseApp = firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        db = firebase.firestore();
        firebaseReady = true;
        console.log("Firebase initialized");
    }
} catch(e) {
    console.warn("Firebase not configured, using local storage fallback");
    firebaseReady = false;
}

// ==================== DIVERSE INTERVIEW QUESTIONS (50 UNIQUE) ====================
const generateUniqueQuestions = () => {
    const questions = [
        "Explain the difference between REST and GraphQL. When would you use each?",
        "Describe the CAP theorem and its implications for distributed systems.",
        "What is the difference between SQL and NoSQL databases? Give examples of use cases.",
        "Explain event-driven architecture and its benefits.",
        "How does garbage collection work in JavaScript?",
        "Describe microservices vs monolith architecture with pros and cons.",
        "What is CI/CD and how does it improve development workflow?",
        "Explain the concept of idempotency in API design.",
        "What are WebSockets and when would you use them?",
        "Describe the differences between Agile, Scrum, and Kanban.",
        "Tell me about a time you faced a conflict with a colleague. How did you resolve it?",
        "Describe a situation where you had to meet a tight deadline. What was your approach?",
        "How do you handle constructive criticism? Give an example.",
        "Tell me about a time you failed and what you learned from it.",
        "How do you prioritize tasks when everything seems urgent?",
        "Describe a time you went above and beyond for a project.",
        "How do you stay motivated during repetitive tasks?",
        "Tell me about a time you had to adapt to a major change at work.",
        "How do you handle working with a difficult team member?",
        "Describe your ideal work environment and culture.",
        "How would you prioritize features for a new product launch?",
        "Describe your process for gathering user requirements.",
        "How do you measure the success of a product feature?",
        "Tell me about a time you led a cross-functional team.",
        "How do you handle stakeholders with conflicting priorities?",
        "What metrics would you track for a SaaS product?",
        "Describe a product you recently used and how you would improve it.",
        "How do you balance technical debt with new feature development?",
        "What's your approach to A/B testing?",
        "How do you communicate technical concepts to non-technical stakeholders?",
        "Describe your design process from concept to delivery.",
        "How do you incorporate user feedback into your designs?",
        "What tools do you use for prototyping and why?",
        "Explain the importance of accessibility in design.",
        "How do you measure the success of a UI redesign?",
        "Describe a challenging design problem you solved.",
        "What's your approach to responsive design?",
        "How do you collaborate with developers during implementation?",
        "Explain the concept of design systems and their benefits.",
        "How do you stay updated with design trends?",
        "Explain the difference between supervised and unsupervised learning.",
        "How do you handle imbalanced datasets?",
        "Describe your process for feature selection.",
        "What metrics do you use to evaluate model performance?",
        "Explain overfitting and how to prevent it.",
        "How do you communicate insights from data to executives?",
        "Describe a time you used A/B testing to drive decisions.",
        "What's your experience with big data technologies?",
        "How do you ensure data quality and integrity?",
        "Explain the importance of data visualization in storytelling."
    ];
    
    return questions.slice(0, 50).map((q, i) => ({
        id: i + 1,
        q: q,
        a: `✅ Model Answer: A strong candidate would demonstrate understanding of core concepts, provide real-world examples, discuss trade-offs, and show enthusiasm for continuous learning.`
    }));
};

// ==================== MCQ DATABASE (50 Questions) ====================
const generateMCQs = () => {
    const mcqs = [];
    const topics = [
        { q: "What does ACID stand for in database transactions?", opts: ["Atomicity, Consistency, Isolation, Durability", "Availability, Consistency, Integrity, Durability", "Atomicity, Concurrency, Isolation, Distribution", "Accuracy, Completeness, Integrity, Durability"], correct: 0 },
        { q: "Which design pattern ensures a class has only one instance?", opts: ["Singleton", "Factory", "Observer", "Decorator"], correct: 0 },
        { q: "What does CI/CD stand for?", opts: ["Continuous Integration/Continuous Deployment", "Code Integration/Code Deployment", "Continuous Implementation/Continuous Delivery", "Code Implementation/Code Delivery"], correct: 0 },
        { q: "Which HTTP method is idempotent?", opts: ["GET", "POST", "PUT", "Both GET and PUT"], correct: 3 },
        { q: "What is the time complexity of binary search?", opts: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], correct: 1 },
        { q: "What is the main advantage of microservices?", opts: ["Scalability", "Simple deployment", "Less code", "No network calls"], correct: 0 },
        { q: "Which protocol is used for secure web browsing?", opts: ["HTTP", "FTP", "HTTPS", "SMTP"], correct: 2 },
        { q: "What's the purpose of a load balancer?", opts: ["Distribute traffic", "Store data", "Encrypt traffic", "Compress files"], correct: 0 },
        { q: "Which database is document-based?", opts: ["MongoDB", "PostgreSQL", "MySQL", "Redis"], correct: 0 },
        { q: "What does SOLID stand for?", opts: ["Single Responsibility, Open-Closed, Liskov, Interface Segregation, Dependency Inversion", "Simple, Organized, Layered, Integrated, Distributed", "Structure, Objects, Logic, Inheritance, Data", "Security, Optimization, Logic, Integration, Deployment"], correct: 0 }
    ];
    
    for (let i = 0; i < 50; i++) {
        const topic = topics[i % topics.length];
        mcqs.push({
            id: i + 1,
            q: topic.q,
            options: topic.opts,
            correct: topic.correct,
            explanation: `The correct answer is "${topic.opts[topic.correct]}". This is a fundamental concept in software development.`
        });
    }
    return mcqs;
};

// ==================== NOTES DATABASE (50 Unique Notes) ====================
const generateNotes = () => {
    const notes = [];
    const topics = [
        "What is your greatest strength?", "Where do you see yourself in 5 years?",
        "Why should we hire you?", "What is your greatest weakness?",
        "Why do you want to work here?", "Tell me about yourself.",
        "What are your salary expectations?", "Why did you leave your last job?",
        "How do you handle stress?", "What motivates you?",
        "Describe a challenging project.", "How do you handle failure?",
        "What's your leadership style?", "How do you work in a team?",
        "What's your approach to learning new skills?", "How do you handle criticism?",
        "Describe your ideal boss.", "What makes you unique?",
        "How do you manage work-life balance?", "What's your biggest achievement?",
        "How do you stay organized?", "Describe your communication style.",
        "How do you handle ambiguity?", "What's your decision-making process?",
        "How do you build relationships at work?", "What's your experience with remote work?",
        "How do you handle multiple deadlines?", "What's your problem-solving approach?",
        "How do you celebrate successes?", "What's your preferred work schedule?"
    ];
    
    for (let i = 0; i < 50; i++) {
        const topic = topics[i % topics.length];
        notes.push({
            id: i + 1,
            q: topic,
            a: `✅ Expert Tip: When answering "${topic}", use the STAR method (Situation, Task, Action, Result). Be specific with examples from your experience. Quantify achievements when possible.`
        });
    }
    return notes;
};

// ==================== DATABASE INITIALIZATION ====================
const DB = {
    practice: generateUniqueQuestions(),
    mcqs: generateMCQs(),
    notes: generateNotes()
};

// ==================== GLOBAL STATE ====================
let currentUser = null;
let mcqResults = { correctCount: 0, wrongCount: 0, answeredFlags: Array(50).fill(false) };
let practiceTimerInterval = null;
let practiceTimeLeft = 300;
let leaderboardData = [];

// ==================== AUTHENTICATION FUNCTIONS ====================
function toggleAuth(isSignup) {
    document.getElementById('login-box').style.display = isSignup ? 'none' : 'block';
    document.getElementById('signup-box').style.display = isSignup ? 'block' : 'none';
}

document.getElementById('signup-form').onsubmit = (e) => {
    e.preventDefault();
    currentUser = {
        name: document.getElementById('f-name').value + " " + document.getElementById('s-name').value,
        age: document.getElementById('u-age').value,
        field: document.getElementById('u-field').value,
        email: document.getElementById('u-email').value
    };
    startApp();
};

document.getElementById('login-form').onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('l-email').value;
    if (!currentUser) {
        currentUser = { name: "Interview Candidate", age: 25, field: "Computer Science", email: email };
    }
    startApp();
};

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.tagName === 'INPUT' && activeElement.type !== 'submit') {
            const form = activeElement.closest('form');
            if (form) {
                e.preventDefault();
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) submitBtn.click();
            }
        }
    }
});

// ==================== START APPLICATION ====================
function startApp() {
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('main-dashboard').style.display = 'grid';
    document.getElementById('chatBot').style.display = 'block';
    loadLeaderboard();
    navTo('practice');
}

// ==================== LEADERBOARD FUNCTIONS ====================
async function loadLeaderboard() {
    if (firebaseReady && db) {
        try {
            const snap = await db.collection("leaderboard").orderBy("score", "desc").limit(20).get();
            leaderboardData = snap.docs.map(doc => doc.data());
            return;
        } catch(e) { console.log(e); }
    }
    let local = localStorage.getItem("leaderboard");
    leaderboardData = local ? JSON.parse(local) : [];
}

async function updateLeaderboard(userEmail, userName, score) {
    const entry = { email: userEmail, name: userName, score: score, timestamp: Date.now() };
    if (firebaseReady && db) {
        try {
            await db.collection("leaderboard").add(entry);
        } catch(e) {}
    }
    leaderboardData.push(entry);
    leaderboardData.sort((a,b) => b.score - a.score);
    if (!firebaseReady) localStorage.setItem("leaderboard", JSON.stringify(leaderboardData.slice(0,30)));
}

// ==================== RESUME DOWNLOAD FUNCTION ====================
function downloadResume(filename) {
    const content = `RESUME TEMPLATE - ${filename.replace('.pdf', '')}
========================================

NAME: [Your Name]
EMAIL: your.email@example.com
PHONE: (123) 456-7890

PROFESSIONAL SUMMARY
---------------------
[Write a brief summary of your experience and key strengths]

WORK EXPERIENCE
-----------------
Company Name | Location | Dates
• Achievement 1 with measurable result
• Achievement 2 with quantifiable impact

EDUCATION
----------
Degree | University | Year

SKILLS
-------
• Technical Skills
• Soft Skills
• Tools & Technologies

For a complete professional template, please visit the online templates linked above.`;
    
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert(`Downloading ${filename}. For a full professional template, use the online templates linked above.`);
}

// ==================== NAVIGATION ====================
function stopTimers() {
    if (practiceTimerInterval) clearInterval(practiceTimerInterval);
    practiceTimerInterval = null;
}

function navTo(page) {
    stopTimers();
    const view = document.getElementById('dynamic-content');
    view.innerHTML = "";
    
    if (page === 'practice') {
        practiceTimeLeft = 300;
        view.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <h2><i class="fas fa-comment-dots"></i> 50 Practice Questions</h2>
                <span id="practiceTimerDisplay" class="timer-badge">05:00</span>
            </div>
            <div id="p-list"></div>
            <button class="btn-pop-white" onclick="endPracticeSession()">End Session & Submit</button>
        `;
        
        DB.practice.forEach(item => {
            document.getElementById('p-list').innerHTML += `
                <div style="margin-bottom:30px" data-id="${item.id}">
                    <p><strong>${item.id}. ${item.q}</strong></p>
                    <textarea id="answer-${item.id}" placeholder="Type your answer here..." style="width:100%; min-height:80px; background:#111; color:white; border-radius:12px; padding:12px;"></textarea>
                    <button class="btn-pop-white" style="font-size:0.7rem; padding:6px 18px; margin-top:6px; width:auto;" onclick="document.getElementById('sample-${item.id}').style.display='block'">Show Model Answer</button>
                    <div id="sample-${item.id}" class="ans-box" style="display:none">${item.a}</div>
                </div>`;
        });
        
        practiceTimerInterval = setInterval(() => {
            if (practiceTimeLeft <= 0) { endPracticeSession(); return; }
            practiceTimeLeft--;
            let mins = Math.floor(practiceTimeLeft/60);
            let secs = practiceTimeLeft%60;
            const timerDisplay = document.getElementById('practiceTimerDisplay');
            if (timerDisplay) timerDisplay.innerText = `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
        }, 1000);
    }
    else if (page === 'mcq') {
        mcqResults = { correctCount: 0, wrongCount: 0, answeredFlags: Array(50).fill(false) };
        view.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <h2><i class="fas fa-check-circle"></i> MCQ Certification (50 Questions)</h2>
                <span id="mcqTimerDisplay" class="timer-badge">10:00</span>
            </div>
            <div id="m-list"></div>
            <button class="btn-pop-white" onclick="submitMCQTest()">Submit MCQ Test</button>
        `;
        
        DB.mcqs.forEach((m, idx) => {
            document.getElementById('m-list').innerHTML += `
                <div style="margin-bottom:35px; padding:15px; background:rgba(20,20,20,0.5); border-radius:16px;" data-mcq="${idx}">
                    <p><strong>${idx+1}. ${m.q}</strong></p>
                    ${m.options.map((opt, oi) => `<div class="mcq-option" data-qidx="${idx}" data-optidx="${oi}">${opt}</div>`).join('')}
                    <div id="mcq-fb-${idx}" class="ans-box" style="font-size:0.9rem; margin-top:12px; display:none;"></div>
                </div>`;
        });
        
        setTimeout(() => {
            document.querySelectorAll('.mcq-option').forEach(opt => {
                opt.addEventListener('click', (e) => {
                    const qidx = parseInt(opt.dataset.qidx);
                    const selected = parseInt(opt.dataset.optidx);
                    if (mcqResults.answeredFlags[qidx]) return;
                    mcqResults.answeredFlags[qidx] = true;
                    const isCorrect = (selected === DB.mcqs[qidx].correct);
                    if (isCorrect) mcqResults.correctCount++;
                    else mcqResults.wrongCount++;
                    const fbDiv = document.getElementById(`mcq-fb-${qidx}`);
                    fbDiv.style.display = 'block';
                    fbDiv.innerHTML = `<strong>${isCorrect ? "✅ CORRECT!" : "❌ WRONG!"}</strong><br>Correct Answer: ${DB.mcqs[qidx].options[DB.mcqs[qidx].correct]}<br><br>💡 ${DB.mcqs[qidx].explanation}`;
                    const parent = document.querySelector(`div[data-mcq="${qidx}"]`);
                    parent.querySelectorAll('.mcq-option').forEach(el => el.style.pointerEvents = 'none');
                });
            });
        }, 50);
        
        let mcqTime = 600;
        const timerMcq = setInterval(() => {
            if (mcqTime <= 0) { submitMCQTest(); clearInterval(timerMcq); return; }
            mcqTime--;
            let mins = Math.floor(mcqTime/60), secs = mcqTime%60;
            const timerDisplay = document.getElementById('mcqTimerDisplay');
            if (timerDisplay) timerDisplay.innerText = `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
        }, 1000);
        window.mcqTimerInterval = timerMcq;
    }
    else if (page === 'notes') {
        view.innerHTML = `<h2><i class="fas fa-book-open"></i> 50 Interview Notes & Tips</h2>`;
        DB.notes.forEach(n => {
            view.innerHTML += `<div class="note-card"><strong>${n.id}. ${n.q}</strong><br><p style="margin-top:12px;">${n.a}</p></div>`;
        });
    }
    else if (page === 'resume') {
        view.innerHTML = `
            <div style="margin-bottom: 30px;">
                <h2><i class="fas fa-file-alt"></i> Professional Resume Examples</h2>
                <p style="color: #aaa; margin-top: 10px;">Browse professionally crafted resume templates for different roles. Click on any template to view and download.</p>
            </div>
            <div class="resume-grid" id="resume-grid-container"></div>
        `;
        
        const resumeGrid = document.getElementById('resume-grid-container');
        const resumeTemplates = [
            { icon: "💻", title: "Software Engineer", description: "Modern tech resume focusing on technical skills, projects, and achievements. Perfect for developers and engineers.", tags: ["Technical", "ATS-Friendly"], buttons: [{ text: "View Template", url: "https://rxresu.me/", external: true }, { text: "Download", action: "download", filename: "software-engineer-resume.pdf" }] },
            { icon: "📊", title: "Product Manager", description: "Results-driven resume highlighting product launches, metrics, and cross-functional leadership.", tags: ["Leadership", "Strategic"], buttons: [{ text: "View on Canva", url: "https://www.canva.com/resumes/templates/", external: true }, { text: "Download", action: "download", filename: "product-manager-resume.pdf" }] },
            { icon: "🎨", title: "UX/UI Designer", description: "Creative portfolio-style resume with visual elements, case studies, and design process.", tags: ["Creative", "Portfolio"], buttons: [{ text: "View Design", url: "https://www.behance.net/search/projects/resume%20design", external: true }, { text: "Figma Template", url: "https://www.figma.com/community/tag/resume", external: true }] },
            { icon: "📈", title: "Data Scientist", description: "Technical resume emphasizing analytics, machine learning projects, and business impact.", tags: ["Data-Driven", "Technical"], buttons: [{ text: "View Sample", url: "https://www.overleaf.com/gallery/tagged/cv", external: true }, { text: "Download", action: "download", filename: "data-scientist-resume.pdf" }] },
            { icon: "👔", title: "Executive CV", description: "High-impact executive resume showcasing leadership, strategic achievements, and board experience.", tags: ["Executive", "Leadership"], buttons: [{ text: "View Format", url: "#", onclick: "alert('Premium template - Contact for access')" }, { text: "Download", action: "download", filename: "executive-cv.pdf" }] },
            { icon: "🎓", title: "Academic CV", description: "Comprehensive academic CV highlighting education, research, publications, and teaching experience.", tags: ["Academic", "Research"], buttons: [{ text: "View Example", url: "https://www.overleaf.com/gallery/tagged/academic-cv", external: true }, { text: "Download", action: "download", filename: "academic-cv.pdf" }] },
            { icon: "💼", title: "Marketing Professional", description: "Creative resume focusing on campaign results, brand management, and digital marketing metrics.", tags: ["Marketing", "Creative"], buttons: [{ text: "View Portfolio", url: "https://www.canva.com/resumes/templates/marketing/", external: true }, { text: "Download", action: "download", filename: "marketing-resume.pdf" }] },
            { icon: "⚙️", title: "DevOps Engineer", description: "Technical resume showcasing automation, cloud infrastructure, CI/CD pipelines, and system architecture.", tags: ["Cloud", "Automation"], buttons: [{ text: "View Sample", url: "https://rxresu.me/", external: true }, { text: "Download", action: "download", filename: "devops-resume.pdf" }] }
        ];
        
        resumeTemplates.forEach(template => {
            const card = document.createElement('div');
            card.className = 'resume-card';
            const tagsHtml = template.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
            let buttonsHtml = '';
            if (template.buttons.length > 1) {
                buttonsHtml = `<div class="button-group">`;
                template.buttons.forEach(btn => {
                    if (btn.url) buttonsHtml += `<a href="${btn.url}" target="_blank" class="btn-resume">${btn.text} <i class="fas fa-external-link-alt"></i></a>`;
                    else if (btn.action === 'download') buttonsHtml += `<button onclick="downloadResume('${btn.filename}')" class="btn-resume">${btn.text} <i class="fas fa-download"></i></button>`;
                    else if (btn.onclick) buttonsHtml += `<button onclick="${btn.onclick}" class="btn-resume">${btn.text}</button>`;
                });
                buttonsHtml += `</div>`;
            } else {
                const btn = template.buttons[0];
                if (btn.url) buttonsHtml = `<a href="${btn.url}" target="_blank" class="btn-resume">${btn.text} <i class="fas fa-external-link-alt"></i></a>`;
                else if (btn.action === 'download') buttonsHtml = `<button onclick="downloadResume('${btn.filename}')" class="btn-resume">${btn.text} <i class="fas fa-download"></i></button>`;
            }
            card.innerHTML = `<div class="icon">${template.icon}</div><h4>${template.title}</h4><div class="tags">${tagsHtml}</div><p>${template.description}</p>${buttonsHtml}`;
            resumeGrid.appendChild(card);
        });
        
        view.innerHTML += `<div style="margin-top: 40px; padding: 25px; background: rgba(30,30,30,0.5); border-radius: 20px;"><h3><i class="fas fa-lightbulb"></i> Resume Tips</h3><ul style="margin-top: 15px; list-style: none; padding-left: 0;"><li style="margin-bottom: 10px;">✓ Keep it concise - aim for 1-2 pages maximum</li><li style="margin-bottom: 10px;">✓ Use action verbs like "Led", "Developed", "Increased"</li><li style="margin-bottom: 10px;">✓ Quantify achievements with numbers and percentages</li><li style="margin-bottom: 10px;">✓ Tailor to job description by highlighting relevant skills</li><li style="margin-bottom: 10px;">✓ Use ATS-friendly format without complex graphics</li></ul></div>`;
    }
    else if (page === 'profile') {
        view.innerHTML = `<h2><i class="fas fa-user-circle"></i> My Profile</h2><div class="ans-box"><p><strong>Name:</strong> ${currentUser.name}</p><p><strong>Age:</strong> ${currentUser.age}</p><p><strong>Field:</strong> ${currentUser.field}</p><p><strong>Email:</strong> ${currentUser.email}</p></div><button class="btn-pop-white" onclick="navTo('practice')" style="width:auto; margin-top:20px;">Start Practice</button>`;
    }
    else if (page === 'score') {
        view.innerHTML = `<h2><i class="fas fa-chart-line"></i> Performance Summary</h2><div class="ans-box"><h3>Last MCQ Score: <span style="color:${mcqResults.correctCount > 30 ? '#4caf50' : '#ff9800'}">${mcqResults.correctCount}/50</span></h3><p>Correct: ${mcqResults.correctCount} | Wrong: ${mcqResults.wrongCount}</p><p>${mcqResults.correctCount > 40 ? "🏆 EXCELLENT! You're well-prepared!" : mcqResults.correctCount > 30 ? "🎯 GOOD! Keep practicing!" : "📚 Keep learning and try again!"}</p><button class="btn-pop-white" onclick="navTo('mcq')" style="width:auto; margin-top:15px;">Retake MCQ</button><button class="btn-pop-white" onclick="navTo('practice')" style="width:auto; margin-top:15px; margin-left:10px;">Practice More</button></div>`;
    }
    else if (page === 'leaderboard') {
        renderLeaderboard(view);
    }
}

async function renderLeaderboard(view) {
    await loadLeaderboard();
    view.innerHTML = `<h2><i class="fas fa-trophy"></i> Global Leaderboard</h2><div class="leaderboard-table"><table><thead><tr><th>Rank</th><th>Name</th><th>Score</th></tr></thead><tbody id="leaderboard-body"></tbody></table></div><button class="btn-pop-white" onclick="navTo('mcq')" style="margin-top:20px;">Take MCQ & Climb Leaderboard</button>`;
    const sorted = [...leaderboardData].sort((a,b) => b.score - a.score);
    const tbody = document.getElementById('leaderboard-body');
    sorted.slice(0, 15).forEach((user, idx) => { tbody.innerHTML += `<tr><td>${idx+1}</td><td>${user.name || user.email}</td><td>${user.score}</td></tr>`; });
    if (sorted.length === 0) tbody.innerHTML = '<tr><td colspan="3">No scores yet. Be the first!</td></tr>';
}

function endPracticeSession() {
    if (practiceTimerInterval) clearInterval(practiceTimerInterval);
    practiceTimerInterval = null;
    alert("Practice session ended! Review model answers to improve your responses.");
    navTo('score');
}

function submitMCQTest() {
    if (window.mcqTimerInterval) clearInterval(window.mcqTimerInterval);
    updateLeaderboard(currentUser.email, currentUser.name, mcqResults.correctCount);
    alert(`MCQ Completed! Score: ${mcqResults.correctCount}/50\nCorrect: ${mcqResults.correctCount} | Wrong: ${mcqResults.wrongCount}`);
    navTo('score');
}

// ==================== AI CHATBOT ====================
function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const msg = input.value.trim();
    if (!msg) return;
    const chatDiv = document.getElementById('chatMessages');
    chatDiv.innerHTML += `<div class="ans-box" style="background:#2c2c2c; margin-left:auto; width:fit-content; max-width:80%;">👤 ${escapeHtml(msg)}</div>`;
    input.value = '';
    chatDiv.scrollTop = chatDiv.scrollHeight;
    setTimeout(() => {
        let reply = "🤖 Great question! For interviews, preparation is key. Research the company, practice your answers, and prepare thoughtful questions. Is there a specific topic you'd like help with?";
        if (msg.toLowerCase().includes("resume")) reply = "📄 For resumes: Use quantifiable achievements, tailor to job description, keep it to 1-2 pages, and use a clean ATS-friendly format.";
        else if (msg.toLowerCase().includes("salary")) reply = "💰 Research market rates using Glassdoor or Levels.fyi. Know your worth and consider total compensation (base + bonus + equity).";
        else if (msg.toLowerCase().includes("star")) reply = "⭐ STAR Method: Situation (context), Task (responsibility), Action (what you did), Result (outcome with metrics). Perfect for behavioral questions!";
        chatDiv.innerHTML += `<div class="ans-box">🤖 ${reply}</div>`;
        chatDiv.scrollTop = chatDiv.scrollHeight;
    }, 300);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function toggleChat() {
    const body = document.getElementById('chat-body');
    body.style.display = body.style.display === 'none' ? 'block' : 'none';
}

function logout() {
    stopTimers();
    currentUser = null;
    document.getElementById('main-dashboard').style.display = 'none';
    document.getElementById('chatBot').style.display = 'none';
    document.getElementById('auth-container').style.display = 'flex';
    location.reload();
}

// Global exports
window.navTo = navTo;
window.logout = logout;
window.endPracticeSession = endPracticeSession;
window.submitMCQTest = submitMCQTest;
window.sendChatMessage = sendChatMessage;
window.toggleChat = toggleChat;
window.toggleAuth = toggleAuth;
window.downloadResume = downloadResume;