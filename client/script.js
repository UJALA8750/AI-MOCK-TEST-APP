// API URL - Works both locally and on Render
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api' 
    : '/api';

// Generate 50 Practice Questions
const practiceQuestions = [];
for (let i = 1; i <= 50; i++) {
    practiceQuestions.push({
        id: i,
        q: `Interview Question ${i}: ${i % 3 === 0 ? "How do you handle tight deadlines?" : i % 2 === 0 ? "Describe your problem-solving approach." : "What motivates you at work?"}`,
        a: "✅ Model Answer: A strong candidate would provide specific examples using the STAR method and demonstrate measurable results."
    });
}

// Generate 50 MCQ Questions
const mcqQuestions = [];
for (let i = 1; i <= 50; i++) {
    mcqQuestions.push({
        id: i,
        q: `MCQ ${i}: What is the best practice for software development?`,
        options: ["Code Review", "No Testing", "Skip Documentation", "Ignore Bugs"],
        correct: 0,
        explanation: "Code review helps maintain code quality and catch bugs early."
    });
}

// Generate 50 Interview Notes
const interviewNotes = [];
for (let i = 1; i <= 50; i++) {
    interviewNotes.push({
        id: i,
        q: `Interview Tip ${i}`,
        a: "Always prepare for interviews by researching the company and practicing common questions. Use the STAR method for behavioral questions."
    });
}

let currentUser = null;
let mcqResults = { correctCount: 0, wrongCount: 0, answeredFlags: Array(50).fill(false) };
let practiceTimerInterval = null;
let practiceTimeLeft = 300;
let leaderboardData = [];

// Auth Functions
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

function startApp() {
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('main-dashboard').style.display = 'grid';
    document.getElementById('chatBot').style.display = 'block';
    loadLeaderboard();
    navTo('practice');
}

async function loadLeaderboard() {
    try {
        const response = await fetch(`${API_BASE_URL}/leaderboard`);
        const data = await response.json();
        leaderboardData = data.leaderboard || [];
    } catch(e) {
        console.log('Using local leaderboard');
        let local = localStorage.getItem("leaderboard");
        leaderboardData = local ? JSON.parse(local) : [];
    }
}

async function updateLeaderboard(userName, score) {
    try {
        await fetch(`${API_BASE_URL}/leaderboard/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: userName, score: score })
        });
    } catch(e) {
        console.log('Saving locally');
    }
    leaderboardData.push({ name: userName, score: score, date: new Date().toISOString() });
    leaderboardData.sort((a,b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboardData.slice(0,30)));
}

function downloadResume(filename) {
    alert(`Downloading ${filename}. For a full professional template, use the online templates linked above.`);
}

function navTo(page) {
    if (practiceTimerInterval) clearInterval(practiceTimerInterval);
    const view = document.getElementById('dynamic-content');
    view.innerHTML = "";
    
    if (page === 'practice') {
        practiceTimeLeft = 300;
        view.innerHTML = `
            <div style="display:flex; justify-content:space-between; margin-bottom:20px;">
                <h2><i class="fas fa-comment-dots"></i> 50 Practice Questions</h2>
                <span id="practiceTimerDisplay" class="timer-badge">05:00</span>
            </div>
            <div id="p-list"></div>
            <button class="btn-pop-white" onclick="endPracticeSession()">End Session</button>
        `;
        
        practiceQuestions.forEach(item => {
            document.getElementById('p-list').innerHTML += `
                <div style="margin-bottom:30px">
                    <p><strong>${item.id}. ${item.q}</strong></p>
                    <textarea id="answer-${item.id}" placeholder="Type your answer here..." style="width:100%; min-height:80px; background:#111; color:white; border-radius:12px; padding:12px;"></textarea>
                    <button class="btn-pop-white" style="font-size:0.7rem; padding:6px 18px; width:auto;" onclick="document.getElementById('sample-${item.id}').style.display='block'">Show Model Answer</button>
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
            <div style="display:flex; justify-content:space-between; margin-bottom:20px;">
                <h2><i class="fas fa-check-circle"></i> MCQ Test (50 Questions)</h2>
                <span id="mcqTimerDisplay" class="timer-badge">10:00</span>
            </div>
            <div id="m-list"></div>
            <button class="btn-pop-white" onclick="submitMCQTest()">Submit Test</button>
        `;
        
        mcqQuestions.forEach((m, idx) => {
            document.getElementById('m-list').innerHTML += `
                <div style="margin-bottom:35px; padding:15px; background:rgba(20,20,20,0.5); border-radius:16px;" data-mcq="${idx}">
                    <p><strong>${idx+1}. ${m.q}</strong></p>
                    ${m.options.map((opt, oi) => `<div class="mcq-option" data-qidx="${idx}" data-optidx="${oi}">${opt}</div>`).join('')}
                    <div id="mcq-fb-${idx}" class="ans-box" style="display:none;"></div>
                </div>`;
        });
        
        setTimeout(() => {
            document.querySelectorAll('.mcq-option').forEach(opt => {
                opt.addEventListener('click', () => {
                    const qidx = parseInt(opt.dataset.qidx);
                    const selected = parseInt(opt.dataset.optidx);
                    if (mcqResults.answeredFlags[qidx]) return;
                    mcqResults.answeredFlags[qidx] = true;
                    const isCorrect = (selected === mcqQuestions[qidx].correct);
                    if (isCorrect) mcqResults.correctCount++;
                    else mcqResults.wrongCount++;
                    const fbDiv = document.getElementById(`mcq-fb-${qidx}`);
                    fbDiv.style.display = 'block';
                    fbDiv.innerHTML = `<strong>${isCorrect ? "✅ CORRECT!" : "❌ WRONG!"}</strong><br>Correct: ${mcqQuestions[qidx].options[mcqQuestions[qidx].correct]}<br>💡 ${mcqQuestions[qidx].explanation}`;
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
        view.innerHTML = `<h2><i class="fas fa-book-open"></i> 50 Interview Notes</h2>`;
        interviewNotes.forEach(n => {
            view.innerHTML += `<div class="note-card"><strong>${n.id}. ${n.q}</strong><br><p style="margin-top:12px;">${n.a}</p></div>`;
        });
    }
    else if (page === 'resume') {
        view.innerHTML = `
            <h2><i class="fas fa-file-alt"></i> Resume Examples</h2>
            <div class="resume-grid">
                <div class="resume-card"><h4>💻 Software Engineer</h4><p>Technical resume with projects and skills</p><a href="https://rxresu.me/" target="_blank" class="btn-resume">View Template</a></div>
                <div class="resume-card"><h4>📊 Product Manager</h4><p>Results-driven resume with metrics</p><a href="https://www.canva.com/resumes/templates/" target="_blank" class="btn-resume">View Template</a></div>
                <div class="resume-card"><h4>🎨 UX Designer</h4><p>Creative portfolio-style resume</p><a href="https://www.behance.net/search/projects/resume" target="_blank" class="btn-resume">View Design</a></div>
                <div class="resume-card"><h4>📈 Data Scientist</h4><p>Technical resume with ML projects</p><a href="https://www.overleaf.com/gallery/tagged/cv" target="_blank" class="btn-resume">View Sample</a></div>
            </div>
            <div style="margin-top:30px; padding:20px; background:rgba(30,30,30,0.5); border-radius:20px;">
                <h3>💡 Resume Tips</h3>
                <ul><li>✓ Keep it concise - 1-2 pages</li><li>✓ Use action verbs</li><li>✓ Quantify achievements</li><li>✓ Tailor to job description</li></ul>
            </div>`;
    }
    else if (page === 'profile') {
        view.innerHTML = `
            <h2><i class="fas fa-user-circle"></i> My Profile</h2>
            <div class="ans-box">
                <p><strong>Name:</strong> ${currentUser.name}</p>
                <p><strong>Age:</strong> ${currentUser.age}</p>
                <p><strong>Field:</strong> ${currentUser.field}</p>
                <p><strong>Email:</strong> ${currentUser.email}</p>
            </div>
            <button class="btn-pop-white" onclick="navTo('practice')" style="width:auto;">Start Practice</button>`;
    }
    else if (page === 'score') {
        view.innerHTML = `<h2><i class="fas fa-chart-line"></i> My Score</h2>
            <div class="ans-box"><h3>Last Score: ${mcqResults.correctCount}/50</h3>
            <p>Correct: ${mcqResults.correctCount} | Wrong: ${mcqResults.wrongCount}</p>
            <button class="btn-pop-white" onclick="navTo('mcq')" style="width:auto;">Retake Test</button>
            <button class="btn-pop-white" onclick="navTo('practice')" style="width:auto;">Practice More</button></div>`;
    }
    else if (page === 'leaderboard') {
        renderLeaderboard(view);
    }
}

async function renderLeaderboard(view) {
    await loadLeaderboard();
    view.innerHTML = `<h2><i class="fas fa-trophy"></i> Leaderboard</h2>
        <div class="leaderboard-table"><table><thead><tr><th>Rank</th><th>Name</th><th>Score</th></tr></thead>
        <tbody id="leaderboard-body"></tbody></table></div>
        <button class="btn-pop-white" onclick="navTo('mcq')">Take Test</button>`;
    const sorted = [...leaderboardData].sort((a,b) => b.score - a.score);
    const tbody = document.getElementById('leaderboard-body');
    sorted.slice(0, 15).forEach((user, idx) => {
        tbody.innerHTML += `<tr><td>${idx+1}</td><td>${user.name}</td><td>${user.score}</td></tr>`;
    });
    if (sorted.length === 0) tbody.innerHTML = '<tr><td colspan="3">No scores yet</td></tr>';
}

function endPracticeSession() {
    if (practiceTimerInterval) clearInterval(practiceTimerInterval);
    alert("Practice session ended!");
    navTo('score');
}

function submitMCQTest() {
    if (window.mcqTimerInterval) clearInterval(window.mcqTimerInterval);
    updateLeaderboard(currentUser.name, mcqResults.correctCount);
    alert(`Score: ${mcqResults.correctCount}/50`);
    navTo('score');
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const msg = input.value.trim();
    if (!msg) return;
    const chatDiv = document.getElementById('chatMessages');
    chatDiv.innerHTML += `<div class="ans-box" style="background:#2c2c2c;">👤 ${msg}</div>`;
    input.value = '';
    chatDiv.scrollTop = chatDiv.scrollHeight;
    setTimeout(() => {
        let reply = "🤖 Great question! For interviews, preparation is key. Research the company, practice your answers, and prepare thoughtful questions.";
        if (msg.toLowerCase().includes("resume")) reply = "📄 For resumes: Use quantifiable achievements, tailor to job description, keep it to 1-2 pages.";
        else if (msg.toLowerCase().includes("star")) reply = "⭐ STAR Method: Situation, Task, Action, Result. Perfect for behavioral questions!";
        chatDiv.innerHTML += `<div class="ans-box">🤖 ${reply}</div>`;
        chatDiv.scrollTop = chatDiv.scrollHeight;
    }, 300);
}

function toggleChat() {
    const body = document.getElementById('chat-body');
    body.style.display = body.style.display === 'none' ? 'block' : 'none';
}

function logout() {
    currentUser = null;
    document.getElementById('main-dashboard').style.display = 'none';
    document.getElementById('chatBot').style.display = 'none';
    document.getElementById('auth-container').style.display = 'flex';
}

window.navTo = navTo;
window.logout = logout;
window.endPracticeSession = endPracticeSession;
window.submitMCQTest = submitMCQTest;
window.sendChatMessage = sendChatMessage;
window.toggleChat = toggleChat;
window.toggleAuth = toggleAuth;
window.downloadResume = downloadResume;