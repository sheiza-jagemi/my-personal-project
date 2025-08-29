const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    const { Name, email, Message } = req.body;
    
    try {
        // Create transporter (using Gmail as example)
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER || 'your-email@gmail.com',
                pass: process.env.EMAIL_PASS || 'your-app-password'
            }
        });

        // Email options
        const mailOptions = {
            from: email,
            to: process.env.RECIPIENT_EMAIL || 'sheizajagemi1@gmail.com',
            subject: `Portfolio Contact: ${Name}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${Name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${Message}</p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);
        
        res.json({ 
            success: true, 
            message: 'Message sent successfully!' 
        });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send message. Please try again.' 
        });
    }
});

// API endpoint to get portfolio data
app.get('/api/portfolio', (req, res) => {
    const portfolioData = {
        projects: [
            {
                id: 1,
                title: "Social Media App",
                description: "Connect with talented people worldwide through our innovative platform.",
                image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                technologies: ["React", "Node.js", "MongoDB"],
                link: "#"
            },
            {
                id: 2,
                title: "Music App",
                description: "Stream your favorite music with personalized recommendations.",
                image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                technologies: ["Vue.js", "Express", "PostgreSQL"],
                link: "#"
            },
            {
                id: 3,
                title: "Online Shopping App",
                description: "Seamless shopping experience with intuitive navigation and secure checkout.",
                image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                technologies: ["Angular", "Django", "MySQL"],
                link: "#"
            }
        ]
    };
    
    res.json(portfolioData);
});

// API endpoint to get skills data
app.get('/api/skills', (req, res) => {
    const skillsData = {
        frontend: ["HTML5", "CSS3", "JavaScript", "React", "Vue.js", "Angular"],
        backend: ["Node.js", "Express", "Python", "Django", "PHP", "Laravel"],
        database: ["MongoDB", "MySQL", "PostgreSQL", "Firebase"],
        tools: ["Git", "Docker", "AWS", "Figma", "Adobe XD"]
    };
    
    res.json(skillsData);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});