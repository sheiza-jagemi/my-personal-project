# 🔥 Full-Stack Portfolio Website (JavaScript + Python)

A modern, responsive portfolio website with **JavaScript frontend** and **Python Flask backend**.

## 🏗️ Architecture

### Frontend (JavaScript)
- **HTML5, CSS3, Vanilla JavaScript** - Clean, responsive UI
- **Dynamic content loading** from Python API
- **Interactive animations** and smooth scrolling
- **Mobile-first responsive design**
- **Contact form** with real-time validation

### Backend (Python Flask)
- **RESTful API endpoints** for data management
- **SQLite database** for projects and messages
- **Email integration** for contact form
- **CORS enabled** for frontend communication

## 🚀 Setup Instructions

### 1. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 2. Configure Environment (Optional)
Create `.env` file for email functionality:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 3. Run the Application
```bash
python app.py
```

### 4. Access Your Portfolio
Open: `http://localhost:5000`

## API Endpoints

- `GET /` - Serves the main portfolio page
- `POST /api/contact` - Handles contact form submissions
- `GET /api/portfolio` - Returns portfolio projects data
- `GET /api/skills` - Returns skills and technologies data

## Email Setup

For Gmail, you need to:
1. Enable 2-factor authentication
2. Generate an app password
3. Use the app password in the `.env` file

## Technologies Used

**Frontend:**
- HTML5, CSS3, JavaScript
- Font Awesome icons
- Responsive design

**Backend:**
- Node.js
- Express.js
- Nodemailer
- CORS
- dotenv

## Project Structure
```
portfolio-website/
├── index.html          # Main HTML file
├── style.css           # Styles
├── index.js            # Frontend JavaScript
├── server.js           # Backend server
├── package.json        # Dependencies
├── .env               # Environment variables
├── .gitignore         # Git ignore rules
└── images/            # Image assets
```