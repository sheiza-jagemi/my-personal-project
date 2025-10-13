from flask import Flask, request, jsonify, render_template
import os

app = Flask(__name__, template_folder='../templates', static_folder='../static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/projects')
def get_projects():
    return jsonify([
        {'id': 1, 'title': 'E-Commerce Platform', 'description': 'Full-stack e-commerce solution', 'image': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop', 'tech_stack': ['React', 'Node.js'], 'github_link': '#', 'live_link': '#', 'category': 'web'},
        {'id': 2, 'title': 'Task Management System', 'description': 'Collaborative project management tool', 'image': 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop', 'tech_stack': ['Vue.js', 'Python'], 'github_link': '#', 'live_link': '#', 'category': 'web'},
        {'id': 3, 'title': 'Weather App', 'description': 'Modern weather application', 'image': 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop', 'tech_stack': ['JavaScript', 'Python'], 'github_link': '#', 'live_link': '#', 'category': 'mobile'}
    ])

@app.route('/api/skills')
def get_skills():
    return jsonify({
        'frontend': {'title': 'Frontend Development', 'icon': 'fas fa-laptop-code', 'skills': [{'name': 'JavaScript', 'level': 95}]},
        'backend': {'title': 'Backend Development', 'icon': 'fas fa-server', 'skills': [{'name': 'Python', 'level': 95}]}
    })

@app.route('/api/contact', methods=['POST'])
def contact():
    return jsonify({'success': True, 'message': 'Message received!'})

if __name__ == '__main__':
    app.run(debug=True)