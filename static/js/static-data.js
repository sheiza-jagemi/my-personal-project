// Static data for GitHub Pages deployment
const portfolioData = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard. Built with modern technologies for scalability and performance.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
        tech_stack: ["React", "Node.js", "MongoDB", "Stripe", "Redux", "Express"],
        github_link: "",
        live_link: ""
    },
    {
        id: 2,
        title: "Task Management System",
        description: "Collaborative project management tool with real-time updates, team collaboration features, and advanced reporting capabilities.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
        tech_stack: ["Vue.js", "Python", "PostgreSQL", "Socket.io", "Docker"],
        github_link: "",
        live_link: ""
    },
    {
        id: 3,
        title: "Social Media Analytics",
        description: "Comprehensive analytics dashboard for social media platforms with data visualization and automated reporting.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
        tech_stack: ["React", "Django", "MySQL", "Chart.js", "Redis"],
        github_link: "",
        live_link: ""
    },
    {
        id: 4,
        title: "Weather Forecast App",
        description: "Modern weather application with location-based forecasts, interactive maps, and weather alerts.",
        image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
        tech_stack: ["JavaScript", "Python", "Flask", "OpenWeather API"],
        github_link: "",
        live_link: ""
    },
    {
        id: 5,
        title: "Portfolio Website",
        description: "This very portfolio website showcasing full-stack development skills with modern design and functionality.",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
        tech_stack: ["JavaScript", "Python", "Flask", "SQLite", "HTML5", "CSS3"],
        github_link: "",
        live_link: ""
    },
    {
        id: 6,
        title: "Restaurant Booking API",
        description: "RESTful API for restaurant reservation system with authentication, booking management, and notifications.",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
        tech_stack: ["Python", "FastAPI", "PostgreSQL", "JWT", "Celery"],
        github_link: "",
        live_link: ""
    }
];

const skillsData = {
    frontend: {
        title: 'Frontend Development',
        icon: 'fas fa-laptop-code',
        skills: [
            {name: 'JavaScript', level: 95, years: 3},
            {name: 'React', level: 90, years: 2},
            {name: 'HTML5', level: 95, years: 4},
            {name: 'CSS3', level: 90, years: 4},
            {name: 'Vue.js', level: 85, years: 2},
            {name: 'TypeScript', level: 80, years: 1}
        ]
    },
    backend: {
        title: 'Backend Development',
        icon: 'fas fa-server',
        skills: [
            {name: 'Python', level: 95, years: 3},
            {name: 'Flask', level: 90, years: 2},
            {name: 'Django', level: 85, years: 2},
            {name: 'Node.js', level: 80, years: 2},
            {name: 'FastAPI', level: 75, years: 1},
            {name: 'Express', level: 80, years: 2}
        ]
    },
    database: {
        title: 'Database & Storage',
        icon: 'fas fa-database',
        skills: [
            {name: 'PostgreSQL', level: 85, years: 2},
            {name: 'MongoDB', level: 80, years: 2},
            {name: 'SQLite', level: 90, years: 3},
            {name: 'MySQL', level: 85, years: 2},
            {name: 'Redis', level: 70, years: 1}
        ]
    },
    tools: {
        title: 'Tools & Technologies',
        icon: 'fas fa-tools',
        skills: [
            {name: 'Git', level: 90, years: 3},
            {name: 'Docker', level: 75, years: 1},
            {name: 'AWS', level: 70, years: 1},
            {name: 'Linux', level: 80, years: 2},
            {name: 'VS Code', level: 95, years: 4},
            {name: 'Postman', level: 85, years: 2}
        ]
    }
};

const statsData = {
    projects_completed: 50,
    years_experience: 3,
    happy_clients: 25,
    technologies_mastered: 15
};

const blogData = [
    {
        id: 1,
        title: "10 JavaScript Tips Every Developer Should Know",
        excerpt: "Discover essential JavaScript techniques that will improve your code quality and development efficiency...",
        category: "JavaScript",
        date: "Dec 15, 2024",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
        tags: ["JavaScript", "Tips", "Best Practices"],
        link: "#"
    },
    {
        id: 2,
        title: "Mastering React Hooks: A Complete Guide",
        excerpt: "Learn how to effectively use React Hooks to build more efficient and maintainable components...",
        category: "React",
        date: "Dec 10, 2024",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?w=400&h=250&fit=crop",
        tags: ["React", "Hooks", "Frontend"],
        link: "#"
    },
    {
        id: 3,
        title: "Building RESTful APIs with Flask and Python",
        excerpt: "Step-by-step guide to creating robust and scalable APIs using Flask framework...",
        category: "Python",
        date: "Dec 5, 2024",
        readTime: "12 min read",
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
        tags: ["Python", "Flask", "API"],
        link: "#"
    }
];

const achievementsData = [
    {
        id: 1,
        title: "Software Engineering Graduate",
        organization: "Moringa School",
        date: "2024",
        icon: "fas fa-graduation-cap",
        description: "Completed intensive full-stack development bootcamp with focus on modern web technologies and industry best practices."
    },
    {
        id: 2,
        title: "Best Project Award",
        organization: "Moringa School Final Project",
        date: "2024",
        icon: "fas fa-trophy",
        description: "Recognized for outstanding full-stack web application demonstrating technical excellence and innovation."
    },
    {
        id: 3,
        title: "Open Source Contributor",
        organization: "GitHub Community",
        date: "2023-Present",
        icon: "fab fa-github",
        description: "Active contributor to open source projects with focus on web development tools and educational resources."
    },
    {
        id: 4,
        title: "Full-Stack Certification",
        organization: "JavaScript & Python Specialization",
        date: "2023",
        icon: "fas fa-code",
        description: "Certified in modern full-stack development using JavaScript, React, Python, and Flask frameworks."
    },
    {
        id: 5,
        title: "Team Leadership",
        organization: "Group Project Lead",
        date: "2024",
        icon: "fas fa-users",
        description: "Successfully led a team of 5 developers in creating a complex web application using agile methodologies."
    },
    {
        id: 6,
        title: "Client Satisfaction",
        organization: "100% Positive Reviews",
        date: "2022-Present",
        icon: "fas fa-star",
        description: "Maintained perfect client satisfaction rating across all freelance and professional projects."
    }
];

// Technology details for interactive display
const techDetails = {
    javascript: {
        name: 'JavaScript',
        experience: '3+ Years',
        proficiency: '95%',
        description: 'Expert in modern JavaScript (ES6+), DOM manipulation, async programming, and building interactive web applications.',
        projects: ['E-Commerce Platform', 'Weather App', 'Portfolio Website'],
        frameworks: ['React', 'Vue.js', 'Node.js']
    },
    react: {
        name: 'React',
        experience: '2+ Years',
        proficiency: '90%',
        description: 'Proficient in building component-based UIs, state management with Redux, hooks, and modern React patterns.',
        projects: ['Social Media Analytics', 'E-Commerce Platform'],
        frameworks: ['Redux', 'React Router', 'Material-UI']
    },
    python: {
        name: 'Python',
        experience: '3+ Years',
        proficiency: '95%',
        description: 'Advanced Python developer with expertise in web frameworks, data processing, and automation scripts.',
        projects: ['Task Management System', 'Restaurant API', 'Portfolio Backend'],
        frameworks: ['Flask', 'Django', 'FastAPI']
    },
    flask: {
        name: 'Flask',
        experience: '2+ Years',
        proficiency: '90%',
        description: 'Building RESTful APIs, web applications, and microservices with Flask. Expert in SQLAlchemy and Flask extensions.',
        projects: ['Portfolio Website', 'Weather API', 'Restaurant Booking System'],
        frameworks: ['SQLAlchemy', 'Flask-CORS', 'Flask-JWT']
    },
    postgresql: {
        name: 'PostgreSQL',
        experience: '2+ Years',
        proficiency: '85%',
        description: 'Database design, optimization, and management. Experience with complex queries and database migrations.',
        projects: ['Task Management System', 'E-Commerce Platform'],
        frameworks: ['SQLAlchemy', 'Alembic', 'pgAdmin']
    },
    docker: {
        name: 'Docker',
        experience: '1+ Years',
        proficiency: '75%',
        description: 'Containerizing applications, creating Docker images, and managing multi-container applications with Docker Compose.',
        projects: ['Task Management System', 'Microservices Architecture'],
        frameworks: ['Docker Compose', 'Kubernetes Basics']
    },
    git: {
        name: 'Git',
        experience: '3+ Years',
        proficiency: '90%',
        description: 'Version control expert with Git and GitHub. Experience with branching strategies, pull requests, and collaborative development.',
        projects: ['All Projects', 'Open Source Contributions'],
        frameworks: ['GitHub Actions', 'GitLab CI/CD']
    },
    aws: {
        name: 'AWS',
        experience: '1+ Years',
        proficiency: '70%',
        description: 'Cloud deployment and management using AWS services. Experience with EC2, S3, RDS, and Lambda functions.',
        projects: ['Production Deployments', 'Static Website Hosting'],
        frameworks: ['EC2', 'S3', 'RDS', 'Lambda']
    },
    vue: {
        name: 'Vue.js',
        experience: '2+ Years',
        proficiency: '85%',
        description: 'Building reactive user interfaces with Vue.js, Vuex for state management, and Vue Router for navigation.',
        projects: ['Task Management System', 'Admin Dashboard'],
        frameworks: ['Vuex', 'Vue Router', 'Vuetify']
    },
    html: {
        name: 'HTML5',
        experience: '4+ Years',
        proficiency: '95%',
        description: 'Semantic HTML, accessibility best practices, and modern HTML5 features for building structured web content.',
        projects: ['All Web Projects', 'Portfolio Website'],
        frameworks: ['Semantic HTML', 'Web Components', 'Progressive Web Apps']
    },
    css: {
        name: 'CSS3',
        experience: '4+ Years',
        proficiency: '90%',
        description: 'Advanced CSS including Flexbox, Grid, animations, and responsive design. Experience with preprocessors.',
        projects: ['Portfolio Website', 'E-Commerce Platform'],
        frameworks: ['Sass', 'Bootstrap', 'Tailwind CSS']
    },
    bootstrap: {
        name: 'Bootstrap',
        experience: '3+ Years',
        proficiency: '85%',
        description: 'Rapid prototyping and responsive design using Bootstrap framework and custom component development.',
        projects: ['Multiple Client Projects', 'Admin Dashboards'],
        frameworks: ['Bootstrap 5', 'Custom Themes', 'Bootstrap Icons']
    },
    django: {
        name: 'Django',
        experience: '2+ Years',
        proficiency: '85%',
        description: 'Full-featured web applications with Django, including ORM, admin interface, and REST framework.',
        projects: ['Social Media Analytics', 'Content Management System'],
        frameworks: ['Django REST Framework', 'Django ORM', 'Django Admin']
    },
    nodejs: {
        name: 'Node.js',
        experience: '2+ Years',
        proficiency: '80%',
        description: 'Server-side JavaScript development, building APIs, and real-time applications with Node.js.',
        projects: ['E-Commerce Backend', 'Real-time Chat App'],
        frameworks: ['Express.js', 'Socket.io', 'Mongoose']
    },
    express: {
        name: 'Express.js',
        experience: '2+ Years',
        proficiency: '80%',
        description: 'Building RESTful APIs and web applications with Express.js, middleware development, and routing.',
        projects: ['API Development', 'Microservices'],
        frameworks: ['Express Router', 'Middleware', 'Helmet.js']
    },
    fastapi: {
        name: 'FastAPI',
        experience: '1+ Years',
        proficiency: '75%',
        description: 'Modern Python API framework with automatic documentation, type hints, and high performance.',
        projects: ['Restaurant Booking API', 'Data Processing API'],
        frameworks: ['Pydantic', 'SQLAlchemy', 'OAuth2']
    },
    mongodb: {
        name: 'MongoDB',
        experience: '2+ Years',
        proficiency: '80%',
        description: 'NoSQL database design, aggregation pipelines, and integration with web applications.',
        projects: ['E-Commerce Platform', 'Content Management'],
        frameworks: ['Mongoose', 'MongoDB Atlas', 'Aggregation Framework']
    },
    mysql: {
        name: 'MySQL',
        experience: '2+ Years',
        proficiency: '85%',
        description: 'Relational database design, optimization, and management with MySQL for web applications.',
        projects: ['Social Media Analytics', 'Legacy System Migration'],
        frameworks: ['MySQL Workbench', 'phpMyAdmin', 'Sequelize']
    },
    sqlite: {
        name: 'SQLite',
        experience: '3+ Years',
        proficiency: '90%',
        description: 'Lightweight database solution for development and small-scale applications.',
        projects: ['Portfolio Website', 'Prototype Applications'],
        frameworks: ['SQLAlchemy', 'DB Browser', 'Python sqlite3']
    },
    redis: {
        name: 'Redis',
        experience: '1+ Years',
        proficiency: '70%',
        description: 'In-memory data structure store for caching, session management, and real-time applications.',
        projects: ['Caching Layer', 'Session Storage'],
        frameworks: ['Redis CLI', 'Redis Pub/Sub', 'Redis Sentinel']
    },
    github: {
        name: 'GitHub',
        experience: '3+ Years',
        proficiency: '90%',
        description: 'Code hosting, collaboration, and project management using GitHub features and workflows.',
        projects: ['All Projects', 'Open Source Contributions'],
        frameworks: ['GitHub Actions', 'GitHub Pages', 'Pull Requests']
    },
    linux: {
        name: 'Linux',
        experience: '2+ Years',
        proficiency: '80%',
        description: 'Command line proficiency, server administration, and deployment on Linux systems.',
        projects: ['Server Deployment', 'Development Environment'],
        frameworks: ['Ubuntu', 'CentOS', 'Shell Scripting']
    },
    vscode: {
        name: 'VS Code',
        experience: '4+ Years',
        proficiency: '95%',
        description: 'Advanced IDE usage with extensions, debugging, and productivity features for development.',
        projects: ['All Development Work', 'Custom Configurations'],
        frameworks: ['Extensions', 'Debugging', 'Git Integration']
    }
};