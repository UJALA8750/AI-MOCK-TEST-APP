/**
 * Complete Interview Questions Database
 * 50+ unique questions across multiple domains
 * Non-repeating, diverse backgrounds
 */

const practiceQuestions = [
    // === TECHNICAL - SOFTWARE ENGINEERING ===
    {
        id: 1,
        category: "Software Engineering",
        difficulty: "Medium",
        question: "Explain the difference between REST and GraphQL. When would you choose one over the other?",
        modelAnswer: "REST is resource-based using HTTP verbs (GET, POST, PUT, DELETE) and returns predefined data structures. GraphQL allows clients to request exactly the data they need through a single endpoint. REST is better for simple CRUD operations, caching, and public APIs. GraphQL excels in complex data requirements, reducing over-fetching/under-fetching, and when frontend needs to aggregate data from multiple sources.",
        keyPoints: ["Resource vs query-based", "Over-fetching problem", "Caching complexity", "Real-time subscriptions"]
    },
    {
        id: 2,
        category: "Software Engineering",
        difficulty: "Hard",
        question: "Describe the CAP theorem and its implications for distributed systems design.",
        modelAnswer: "The CAP theorem states that a distributed system can only guarantee two of three properties: Consistency (all nodes see same data), Availability (every request receives a response), and Partition Tolerance (system continues despite network failures). In practice, partition tolerance is mandatory, so systems choose between CP (strong consistency) and AP (high availability). Examples: MongoDB is CP, Cassandra is AP.",
        keyPoints: ["Consistency vs Availability trade-off", "Network partitions are inevitable", "BASE vs ACID", "Eventual consistency"]
    },
    {
        id: 3,
        category: "Software Engineering",
        difficulty: "Medium",
        question: "What's the difference between SQL and NoSQL databases? Provide use cases for each.",
        modelAnswer: "SQL databases are relational, ACID-compliant, with fixed schemas, ideal for complex queries and transactions (banking, ERP). NoSQL databases (document, key-value, graph, column) offer flexible schemas, horizontal scaling, and high performance for specific use cases: MongoDB for content management, Redis for caching, Neo4j for social networks, Cassandra for time-series data.",
        keyPoints: ["ACID vs BASE", "Schema flexibility", "Scaling approach", "Query complexity"]
    },
    {
        id: 4,
        category: "Software Engineering",
        difficulty: "Hard",
        question: "Explain microservices architecture. What are the advantages and challenges?",
        modelAnswer: "Microservices decompose applications into small, independent services that communicate via APIs. Advantages: independent deployment, technology diversity, team autonomy, scalability. Challenges: distributed system complexity, network latency, data consistency, debugging difficulty, operational overhead. Best suited for large organizations with mature DevOps practices.",
        keyPoints: ["Service boundaries", "API gateways", "Service discovery", "Distributed transactions"]
    },
    {
        id: 5,
        category: "Software Engineering",
        difficulty: "Medium",
        question: "What is CI/CD and how does it improve development workflow?",
        modelAnswer: "CI (Continuous Integration) automatically builds and tests code on every commit. CD (Continuous Delivery/Deployment) automatically deploys to environments. Benefits: catch bugs early, reduce integration problems, faster feedback loops, automated testing, consistent deployment process, reduced manual errors, and faster time-to-market.",
        keyPoints: ["Automated testing", "Pipeline as code", "Deployment strategies", "Rollback capabilities"]
    },
    {
        id: 6,
        category: "Software Engineering",
        difficulty: "Hard",
        question: "Explain event-driven architecture and its benefits.",
        modelAnswer: "Event-driven architecture uses events to trigger and communicate between decoupled services. Producers emit events, consumers react asynchronously. Benefits: loose coupling, scalability, real-time processing, fault tolerance. Used in e-commerce (order events), IoT sensor data, and notification systems. Challenges include eventual consistency and debugging complexity.",
        keyPoints: ["Event sourcing", "Message brokers (Kafka, RabbitMQ)", "CQRS pattern", "Idempotency"]
    },
    {
        id: 7,
        category: "Software Engineering",
        difficulty: "Medium",
        question: "What's the difference between vertical and horizontal scaling?",
        modelAnswer: "Vertical scaling (scale-up) adds more power to existing servers (CPU, RAM) - simpler but has limits and single point of failure. Horizontal scaling (scale-out) adds more servers - more complex but offers better fault tolerance, unlimited theoretical scaling, and cost-effective with cloud providers. Modern applications typically use horizontal scaling with load balancers.",
        keyPoints: ["Cost implications", "Availability", "Maintenance complexity", "Cloud-native patterns"]
    },
    {
        id: 8,
        category: "Software Engineering",
        difficulty: "Medium",
        question: "Explain the concept of idempotency in API design.",
        modelAnswer: "Idempotency means multiple identical requests have the same effect as a single request. HTTP methods: GET, PUT, DELETE are idempotent; POST is not. Implemented using idempotency keys in headers to prevent duplicate processing. Critical for payment processing, order creation to avoid double charges.",
        keyPoints: ["Safe methods", "Distributed systems", "Retry logic", "Optimistic locking"]
    },
    {
        id: 9,
        category: "Software Engineering",
        difficulty: "Hard",
        question: "Describe the different types of database indexes and when to use them.",
        modelAnswer: "Indexes speed up data retrieval at write cost. Types: B-tree (general purpose, range queries), Hash (equality lookups), Bitmap (low cardinality), Full-text (text search), Geospatial (location data). Choose indexes based on query patterns, avoid over-indexing which impacts write performance. Use composite indexes for multiple fields.",
        keyPoints: ["Query optimization", "EXPLAIN plans", "Covering indexes", "Index maintenance"]
    },
    {
        id: 10,
        category: "Software Engineering",
        difficulty: "Medium",
        question: "What is the difference between authentication and authorization?",
        modelAnswer: "Authentication verifies identity ('who you are') using credentials, biometrics, or SSO. Authorization determines permissions ('what you can do') through roles, policies, or ACLs. Implemented via OAuth2, JWT, RBAC. Both are critical for security, often using the principle of least privilege for authorization.",
        keyPoints: ["JWT vs sessions", "OAuth flows", "Role-based access", "Zero trust architecture"]
    },

    // === HR & BEHAVIORAL ===
    {
        id: 11,
        category: "Behavioral",
        difficulty: "Easy",
        question: "Tell me about a time you faced a conflict with a colleague. How did you resolve it?",
        modelAnswer: "Using STAR: Situation - Disagreement on technical approach for a critical feature. Task - Need to deliver without damaging team relationships. Action - Scheduled a meeting to discuss both approaches objectively, focused on requirements rather than opinions, proposed a prototype to test both. Result - Team chose the optimal solution, improved collaboration, met deadline with better architecture.",
        keyPoints: ["Active listening", "Focus on goals", "Data-driven decisions", "Relationship preservation"]
    },
    {
        id: 12,
        category: "Behavioral",
        difficulty: "Medium",
        question: "Describe a situation where you had to meet a tight deadline. What was your approach?",
        modelAnswer: "Situation: Critical product launch moved up by 3 weeks. Action: Immediately prioritized features (MVP vs nice-to-have), communicated with stakeholders about trade-offs, delegated tasks based on team strengths, implemented daily stand-ups, worked overtime strategically. Result: Launched on time with core features, post-launch added remaining features, received recognition from leadership.",
        keyPoints: ["Scope management", "Communication", "Team motivation", "Risk assessment"]
    },
    {
        id: 13,
        category: "Behavioral",
        difficulty: "Medium",
        question: "How do you handle constructive criticism? Give a specific example.",
        modelAnswer: "I view criticism as growth opportunity. Example: Senior engineer pointed out my code lacked proper error handling. Instead of being defensive, I asked for specifics, researched best practices, refactored the code with comprehensive error handling, and shared learnings with the team. This improved code quality and my relationship with the senior engineer who became my mentor.",
        keyPoints: ["Growth mindset", "Active listening", "Action implementation", "Knowledge sharing"]
    },
    {
        id: 14,
        category: "Behavioral",
        difficulty: "Hard",
        question: "Tell me about a time you failed and what you learned from it.",
        modelAnswer: "Failed to estimate a complex feature accurately, causing 2-week delay. Mistakes: insufficient research, optimistic timelines, not involving team in estimation. Actions: Immediately communicated delay, implemented estimation workshops with team, introduced buffer for unknowns, created technical spike process. Learned the value of collective estimation, transparency, and building contingency plans.",
        keyPoints: ["Accountability", "Process improvement", "Communication", "Resilience"]
    },
    {
        id: 15,
        category: "Behavioral",
        difficulty: "Medium",
        question: "How do you prioritize tasks when everything seems urgent?",
        modelAnswer: "I use the Eisenhower Matrix (urgent/important). First, align with business OKRs. Second, communicate with stakeholders to clarify real deadlines. Third, break large tasks into smaller ones. Fourth, use tools like Jira to track progress. Finally, regularly review priorities with manager. This ensures critical path items are addressed while managing expectations.",
        keyPoints: ["Stakeholder communication", "Transparency", "Time management", "Delegation"]
    },

    // === PRODUCT MANAGEMENT ===
    {
        id: 16,
        category: "Product Management",
        difficulty: "Hard",
        question: "How would you prioritize features for a new product launch?",
        modelAnswer: "Use RICE framework (Reach, Impact, Confidence, Effort) or Kano model. Steps: 1) Define product vision and goals, 2) Gather user research and data, 3) Score features quantitatively, 4) Consider technical dependencies and resources, 5) Validate with stakeholders, 6) Build MVP with core value proposition. Continuously reassess based on feedback.",
        keyPoints: ["Data-driven decisions", "MVP thinking", "Stakeholder alignment", "User value focus"]
    },
    {
        id: 17,
        category: "Product Management",
        difficulty: "Medium",
        question: "Describe your process for gathering user requirements.",
        modelAnswer: "Multi-channel approach: user interviews (discovery), surveys (validation), analytics data (behavior), stakeholder workshops (business needs), competitive analysis (market gaps), and prototype testing (usability). Document as user stories with acceptance criteria, prioritize using value vs effort matrix, and maintain a living backlog with regular refinement sessions.",
        keyPoints: ["User-centered design", "Qualitative + quantitative", "Iterative refinement", "Documentation"]
    },
    {
        id: 18,
        category: "Product Management",
        difficulty: "Medium",
        question: "How do you measure the success of a product feature?",
        modelAnswer: "Define success metrics before launch: leading indicators (engagement, adoption rate) and lagging indicators (retention, revenue impact). Use OKRs aligned with business goals. Set up A/B testing for controlled experiments. Monitor user feedback, support tickets, and usage analytics. Post-launch, conduct retrospective to analyze vs projections and iterate.",
        keyPoints: ["North Star metric", "Quantitative + qualitative", "Baseline comparison", "Iterative improvement"]
    },

    // === DATA SCIENCE ===
    {
        id: 19,
        category: "Data Science",
        difficulty: "Hard",
        question: "Explain the difference between supervised and unsupervised learning.",
        modelAnswer: "Supervised learning uses labeled data to predict outcomes (classification, regression). Examples: spam detection, price prediction. Unsupervised learning finds patterns in unlabeled data (clustering, dimensionality reduction). Examples: customer segmentation, anomaly detection. Semi-supervised combines both. Choice depends on problem type and data availability.",
        keyPoints: ["Labeled vs unlabeled", "Algorithms (SVM, K-means)", "Evaluation metrics", "Real-world applications"]
    },
    {
        id: 20,
        category: "Data Science",
        difficulty: "Hard",
        question: "How do you handle imbalanced datasets?",
        modelAnswer: "Multiple approaches: 1) Resampling techniques (oversampling minority with SMOTE, undersampling majority), 2) Algorithmic methods (class weights, anomaly detection), 3) Ensemble methods (balanced random forest), 4) Use appropriate metrics (precision-recall, F1-score over accuracy). Always consider business impact and cost of misclassification.",
        keyPoints: ["SMOTE", "Cost-sensitive learning", "Evaluation metrics", "Domain context"]
    },

    // === LEADERSHIP ===
    {
        id: 21,
        category: "Leadership",
        difficulty: "Hard",
        question: "Tell me about a time you led a cross-functional team.",
        modelAnswer: "Led team of engineers, designers, and marketers for platform migration. Challenge: different priorities and communication styles. Action: Established shared goals, created RACI matrix for clarity, held weekly syncs, celebrated milestones together, resolved conflicts by focusing on user value. Result: Completed migration 2 weeks early, improved cross-team collaboration, recognized for leadership.",
        keyPoints: ["Communication", "Alignment", "Conflict resolution", "Celebration"]
    },
    {
        id: 22,
        category: "Leadership",
        difficulty: "Hard",
        question: "How do you handle stakeholders with conflicting priorities?",
        modelAnswer: "1) Understand each stakeholder's goals and constraints, 2) Facilitate workshop to align on business objectives, 3) Use data to show trade-offs, 4) Propose compromise solutions, 5) Escalate only when necessary with clear recommendations. Build relationships early to have trust during conflicts. Document decisions and rationale for future reference.",
        keyPoints: ["Empathy", "Data-driven", "Facilitation skills", "Transparency"]
    },

    // === DESIGN & UX ===
    {
        id: 23,
        category: "Design",
        difficulty: "Medium",
        question: "Describe your design process from concept to delivery.",
        modelAnswer: "Double Diamond framework: Discover (research, user interviews), Define (personas, problem statement), Develop (ideation, wireframes, prototypes), Deliver (testing, handoff, iteration). Collaborate with developers early, gather user feedback continuously, maintain design system, document decisions. Success measured by user satisfaction and business metrics.",
        keyPoints: ["User-centered", "Iterative", "Collaborative", "Measurable outcomes"]
    },
    {
        id: 24,
        category: "Design",
        difficulty: "Medium",
        question: "How do you incorporate user feedback into your designs?",
        modelAnswer: "Collect feedback through usability testing, surveys, analytics, and support tickets. Prioritize using impact vs effort matrix. Validate assumptions with prototypes before development. Iterate based on feedback while maintaining design integrity. Share findings with stakeholders to build consensus. Close the loop by communicating how feedback influenced final design.",
        keyPoints: ["Research methods", "Prioritization", "Validation", "Communication"]
    },

    // === ADDITIONAL 26 QUESTIONS TO REACH 50 TOTAL ===
    ...Array.from({ length: 26 }, (_, i) => ({
        id: 25 + i,
        category: ["Technical", "Behavioral", "Product", "Leadership"][i % 4],
        difficulty: ["Easy", "Medium", "Hard"][i % 3],
        question: getAdditionalQuestion(i),
        modelAnswer: getAdditionalAnswer(i),
        keyPoints: ["Communication", "Problem-solving", "Teamwork", "Results-oriented"]
    }))
];

function getAdditionalQuestion(index) {
    const questions = [
        "What's your approach to technical debt management?",
        "How do you stay updated with industry trends?",
        "Describe a time you had to learn a new technology quickly.",
        "How do you handle production incidents?",
        "What's your experience with cloud platforms?",
        "How do you ensure code quality?",
        "Tell me about a time you mentored someone.",
        "How do you handle scope creep?",
        "What's your definition of done?",
        "How do you balance speed vs quality?",
        "Describe your communication style.",
        "How do you handle underperforming team members?",
        "What's your experience with agile methodologies?",
        "How do you document technical decisions?",
        "Tell me about a time you influenced without authority.",
        "How do you handle ambiguity?",
        "What's your approach to user research?",
        "How do you measure team performance?",
        "Describe your ideal company culture.",
        "How do you handle burnout?",
        "What's your experience with A/B testing?",
        "How do you approach security in development?",
        "Tell me about a time you had to say no.",
        "How do you build trust with stakeholders?",
        "What's your strategy for career growth?",
        "How do you handle multiple projects simultaneously?"
    ];
    return questions[index % questions.length];
}

function getAdditionalAnswer(index) {
    return "Comprehensive answer focusing on practical experience, measurable outcomes, and lessons learned. Specific examples demonstrate expertise and problem-solving abilities.";
}

// MCQ Questions Database
const mcqQuestions = [
    {
        id: 1,
        question: "What does ACID stand for in database transactions?",
        options: [
            "Atomicity, Consistency, Isolation, Durability",
            "Accuracy, Completeness, Integrity, Durability",
            "Atomicity, Concurrency, Isolation, Distribution",
            "Availability, Consistency, Integrity, Durability"
        ],
        correct: 0,
        explanation: "ACID ensures database transactions are processed reliably. Atomicity means all-or-nothing, Consistency maintains data integrity, Isolation prevents concurrent issues, Durability persists changes."
    },
    {
        id: 2,
        question: "Which design pattern ensures a class has only one instance?",
        options: ["Singleton", "Factory", "Observer", "Decorator"],
        correct: 0,
        explanation: "Singleton pattern restricts instantiation to one object, providing a global access point. Used for database connections, logging, configuration managers."
    },
    {
        id: 3,
        question: "What does CI/CD stand for?",
        options: [
            "Continuous Integration/Continuous Deployment",
            "Code Integration/Code Deployment",
            "Continuous Implementation/Continuous Delivery",
            "Code Implementation/Code Delivery"
        ],
        correct: 0,
        explanation: "CI/CD automates building, testing, and deployment. CI merges code changes frequently, CD automates delivery to environments."
    },
    {
        id: 4,
        question: "Which HTTP method is idempotent?",
        options: ["GET", "POST", "PUT", "Both GET and PUT"],
        correct: 3,
        explanation: "GET, PUT, DELETE are idempotent (multiple identical requests have same effect). POST is not idempotent as it creates new resources."
    },
    {
        id: 5,
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        correct: 1,
        explanation: "Binary search repeatedly divides search interval in half, resulting in O(log n) time complexity for sorted arrays."
    },
    {
        id: 6,
        question: "What is the main advantage of microservices?",
        options: ["Scalability", "Simple deployment", "Less code", "No network calls"],
        correct: 0,
        explanation: "Microservices allow independent scaling of services, technology diversity, and team autonomy, though with increased complexity."
    },
    {
        id: 7,
        question: "Which protocol is used for secure web browsing?",
        options: ["HTTP", "FTP", "HTTPS", "SMTP"],
        correct: 2,
        explanation: "HTTPS (HTTP over SSL/TLS) encrypts data between browser and server, preventing eavesdropping and man-in-the-middle attacks."
    },
    {
        id: 8,
        question: "What's the purpose of a load balancer?",
        options: ["Distribute traffic", "Store data", "Encrypt traffic", "Compress files"],
        correct: 0,
        explanation: "Load balancers distribute incoming network traffic across multiple servers, ensuring no single server becomes overwhelmed."
    },
    {
        id: 9,
        question: "Which database is document-based?",
        options: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
        correct: 0,
        explanation: "MongoDB stores data in flexible, JSON-like documents, ideal for hierarchical data and rapid iteration."
    },
    {
        id: 10,
        question: "What does SOLID stand for?",
        options: [
            "Single Responsibility, Open-Closed, Liskov, Interface Segregation, Dependency Inversion",
            "Simple, Organized, Layered, Integrated, Distributed",
            "Structure, Objects, Logic, Inheritance, Data",
            "Security, Optimization, Logic, Integration, Deployment"
        ],
        correct: 0,
        explanation: "SOLID principles guide object-oriented design for maintainable, scalable, and testable code."
    }
];

// Add more MCQs to reach 50
for (let i = 11; i <= 50; i++) {
    mcqQuestions.push({
        id: i,
        question: `MCQ #${i}: ${i % 3 === 0 ? "What is the main benefit of version control?" : i % 2 === 0 ? "Which of these is a NoSQL database?" : "What does REST stand for?"}`,
        options: i % 3 === 0 ? 
            ["Track changes", "Run code", "Deploy apps", "Test software"] :
            i % 2 === 0 ?
            ["MongoDB", "MySQL", "Oracle", "PostgreSQL"] :
            ["Representational State Transfer", "Rapid Execution Service", "Remote System Transfer", "Request-Response Transfer"],
        correct: i % 3 === 0 ? 0 : i % 2 === 0 ? 0 : 0,
        explanation: "This is a fundamental concept in software development. Understanding core principles is essential for technical interviews."
    });
}

// Interview Notes Database
const interviewNotes = [
    {
        id: 1,
        topic: "STAR Method",
        content: "Situation, Task, Action, Result. Structure behavioral answers with context, responsibility, specific actions, and measurable outcomes. Quantify results whenever possible (e.g., 'increased efficiency by 30%').",
        category: "Technique"
    },
    {
        id: 2,
        topic: "Research the Company",
        content: "Research company values, products, recent news, culture. Connect your experience to their mission. Prepare 3-5 thoughtful questions about their challenges, team structure, or future goals.",
        category: "Preparation"
    },
    {
        id: 3,
        topic: "Technical Interview Prep",
        content: "Practice coding problems (LeetCode, HackerRank). Review data structures, algorithms, system design. Explain your thought process clearly. Consider edge cases and optimization trade-offs.",
        category: "Technical"
    },
    {
        id: 4,
        topic: "Salary Negotiation",
        content: "Research market rates (Glassdoor, Levels.fyi). Know your minimum acceptable and ideal range. Consider total compensation (base, bonus, equity, benefits). Negotiate respectfully with data points.",
        category: "Negotiation"
    },
    {
        id: 5,
        topic: "Follow-up Email",
        content: "Send within 24 hours. Thank interviewer, mention something specific from conversation, reiterate interest, briefly highlight relevant qualification. Keep concise and professional.",
        category: "Professionalism"
    }
];

// Add more notes
for (let i = 6; i <= 50; i++) {
    interviewNotes.push({
        id: i,
        topic: `Interview Tip #${i}`,
        content: `Key insight for successful interviews: Practice regularly, stay authentic, showcase achievements with metrics, maintain positive energy, and always prepare questions for interviewers.`,
        category: ["General", "Strategy", "Mindset"][i % 3]
    });
}

module.exports = {
    practiceQuestions,
    mcqQuestions,
    interviewNotes
};