#!/usr/bin/env python3
"""
Quick start script for the portfolio website
"""
import subprocess
import sys
import os

def install_requirements():
    """Install Python requirements"""
    try:
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'])
        print("✅ Dependencies installed successfully!")
    except subprocess.CalledProcessError:
        print("❌ Failed to install dependencies")
        sys.exit(1)

def run_app():
    """Run the Flask application"""
    try:
        from app import app, init_db
        print("🚀 Starting portfolio website...")
        print("📍 Open: http://localhost:5000")
        init_db()
        app.run(debug=True, port=5000)
    except ImportError:
        print("❌ Flask not installed. Installing dependencies...")
        install_requirements()
        run_app()

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == 'install':
        install_requirements()
    else:
        run_app()