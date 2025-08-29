from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from datetime import datetime
import sqlite3

app = Flask(__name__)
CORS(app)

# Database setup
def init_db():
    conn = sqlite3.connect('portfolio.db')
    c = conn.cursor()
    
    # Projects table
    c.execute('''CREATE TABLE IF NOT EXISTS projects
                 (id INTEGER PRIMARY KEY, title TEXT, description TEXT, 
                  image TEXT, tech_stack TEXT, github_link TEXT, live_link TEXT)''')
    
    # Messages table
    c.execute('''CREATE TABLE IF NOT EXISTS messages
                 (id INTEGER PRIMARY KEY, name TEXT, email TEXT, 
                  message TEXT, timestamp TEXT)''')
    
    # Insert sample projects
    projects = [
        ('E-Commerce Platform', 'Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard. Built with modern technologies for scalability and performance.', 
         'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop', 
         'React,Node.js,MongoDB,Stripe,Redux,Express', 'https://github.com/sheiza/ecommerce-platform', 'https://ecommerce-demo.sheiza.dev'),
        ('Task Management System', 'Collaborative project management tool with real-time updates, team collaboration features, and advanced reporting capabilities.', 
         'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop', 
         'Vue.js,Python,PostgreSQL,Socket.io,Docker', 'https://github.com/sheiza/task-manager', 'https://tasks.sheiza.dev'),
        ('Social Media Analytics', 'Comprehensive analytics dashboard for social media platforms with data visualization and automated reporting.', 
         'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop', 
         'React,Django,MySQL,Chart.js,Redis', 'https://github.com/sheiza/social-analytics', 'https://analytics.sheiza.dev'),
        ('Weather Forecast App', 'Modern weather application with location-based forecasts, interactive maps, and weather alerts.', 
         'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop', 
         'JavaScript,Python,Flask,OpenWeather API', 'https://github.com/sheiza/weather-app', 'https://weather.sheiza.dev'),
        ('Portfolio Website', 'This very portfolio website showcasing full-stack development skills with modern design and functionality.', 
         'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop', 
         'JavaScript,Python,Flask,SQLite,HTML5,CSS3', 'https://github.com/sheiza/portfolio', 'https://sheiza.dev'),
        ('Restaurant Booking API', 'RESTful API for restaurant reservation system with authentication, booking management, and notifications.', 
         'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop', 
         'Python,FastAPI,PostgreSQL,JWT,Celery', 'https://github.com/sheiza/restaurant-api', 'https://api.restaurant.sheiza.dev')
    ]
    
    c.executemany('INSERT OR IGNORE INTO projects (title, description, image, tech_stack, github_link, live_link) VALUES (?,?,?,?,?,?)', projects)
    conn.commit()
    conn.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/projects')
def get_projects():
    conn = sqlite3.connect('portfolio.db')
    c = conn.cursor()
    c.execute('SELECT * FROM projects')
    projects = []
    for row in c.fetchall():
        projects.append({
            'id': row[0],
            'title': row[1],
            'description': row[2],
            'image': row[3],
            'tech_stack': row[4].split(','),
            'github_link': row[5],
            'live_link': row[6]
        })
    conn.close()
    return jsonify(projects)

@app.route('/api/skills')
def get_skills():
    skills = {
        'frontend': {
            'title': 'Frontend Development',
            'icon': 'fas fa-laptop-code',
            'skills': [
                {'name': 'JavaScript', 'level': 95, 'years': 3},
                {'name': 'React', 'level': 90, 'years': 2},
                {'name': 'HTML5', 'level': 95, 'years': 4},
                {'name': 'CSS3', 'level': 90, 'years': 4},
                {'name': 'Vue.js', 'level': 85, 'years': 2},
                {'name': 'TypeScript', 'level': 80, 'years': 1}
            ]
        },
        'backend': {
            'title': 'Backend Development',
            'icon': 'fas fa-server',
            'skills': [
                {'name': 'Python', 'level': 95, 'years': 3},
                {'name': 'Flask', 'level': 90, 'years': 2},
                {'name': 'Django', 'level': 85, 'years': 2},
                {'name': 'Node.js', 'level': 80, 'years': 2},
                {'name': 'FastAPI', 'level': 75, 'years': 1},
                {'name': 'Express', 'level': 80, 'years': 2}
            ]
        },
        'database': {
            'title': 'Database & Storage',
            'icon': 'fas fa-database',
            'skills': [
                {'name': 'PostgreSQL', 'level': 85, 'years': 2},
                {'name': 'MongoDB', 'level': 80, 'years': 2},
                {'name': 'SQLite', 'level': 90, 'years': 3},
                {'name': 'MySQL', 'level': 85, 'years': 2},
                {'name': 'Redis', 'level': 70, 'years': 1}
            ]
        },
        'tools': {
            'title': 'Tools & Technologies',
            'icon': 'fas fa-tools',
            'skills': [
                {'name': 'Git', 'level': 90, 'years': 3},
                {'name': 'Docker', 'level': 75, 'years': 1},
                {'name': 'AWS', 'level': 70, 'years': 1},
                {'name': 'Linux', 'level': 80, 'years': 2},
                {'name': 'VS Code', 'level': 95, 'years': 4},
                {'name': 'Postman', 'level': 85, 'years': 2}
            ]
        }
    }
    return jsonify(skills)

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    
    # Store in database
    conn = sqlite3.connect('portfolio.db')
    c = conn.cursor()
    c.execute('INSERT INTO messages (name, email, message, timestamp) VALUES (?,?,?,?)',
              (name, email, message, datetime.now().isoformat()))
    conn.commit()
    conn.close()
    
    # Send email (optional)
    try:
        send_email(name, email, message)
        return jsonify({'success': True, 'message': 'Message sent successfully!'})
    except Exception as e:
        return jsonify({'success': True, 'message': 'Message saved successfully!'})

def send_email(name, email, message):
    sender_email = os.getenv('EMAIL_USER', 'your-email@gmail.com')
    sender_password = os.getenv('EMAIL_PASS', 'your-password')
    
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = 'sheizajagemi1@gmail.com'
    msg['Subject'] = f'Portfolio Contact: {name}'
    
    body = f"""
    New contact form submission:
    
    Name: {name}
    Email: {email}
    Message: {message}
    """
    
    msg.attach(MIMEText(body, 'plain'))
    
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(sender_email, sender_password)
    server.send_message(msg)
    server.quit()

@app.route('/api/stats')
def get_stats():
    stats = {
        'projects_completed': 50,
        'years_experience': 3,
        'happy_clients': 25,
        'code_commits': 1200,
        'technologies_used': 15,
        'certifications': 5
    }
    return jsonify(stats)

@app.route('/api/testimonials')
def get_testimonials():
    testimonials = [
        {
            'name': 'John Doe',
            'position': 'CEO, Tech Startup',
            'image': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
            'rating': 5,
            'text': 'Sheiza delivered an exceptional web application that exceeded our expectations. Her attention to detail and technical expertise made the entire process smooth and professional.'
        },
        {
            'name': 'Sarah Johnson',
            'position': 'Product Manager, Digital Agency',
            'image': 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
            'rating': 5,
            'text': 'Working with Sheiza was a game-changer for our project. She brought innovative solutions and delivered high-quality code on time. Highly recommended!'
        },
        {
            'name': 'Michael Chen',
            'position': 'Founder, E-commerce Platform',
            'image': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
            'rating': 5,
            'text': 'Sheiza\'s full-stack development skills are impressive. She built our entire platform from scratch and it\'s been running flawlessly. Great communication throughout!'
        }
    ]
    return jsonify(testimonials)

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)