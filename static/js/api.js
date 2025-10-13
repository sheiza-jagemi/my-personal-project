// ===== API INTEGRATION =====

// Load skills from API
async function loadSkills() {
    try {
        const response = await fetch('/api/skills');
        const skills = await response.json();
        
        const skillsContainer = document.getElementById('skillsContainer');
        if (!skillsContainer) return;
        
        let skillsHTML = '<div class="skills-overview">';
        
        Object.values(skills).forEach(category => {
            skillsHTML += `
                <div class="skill-category">
                    <i class="${category.icon} skill-icon"></i>
                    <h3>${category.title}</h3>
                    <p>Professional experience with modern ${category.title.toLowerCase()} technologies</p>
                    <div class="skill-tags">
                        ${category.skills.map(skill => `<span class="tech-tag">${skill.name}</span>`).join('')}
                    </div>
                </div>
            `;
        });
        
        skillsHTML += '</div>';
        skillsContainer.innerHTML = skillsHTML;
        
    } catch (error) {
        console.error('Error loading skills:', error);
    }
}

// Load projects from API
async function loadProjects() {
    try {
        const response = await fetch('/api/projects');
        const projects = await response.json();
        
        const portfolioGrid = document.getElementById('portfolioGrid');
        if (!portfolioGrid) return;
        
        let projectsHTML = '';
        
        projects.forEach(project => {
            projectsHTML += `
                <div class="work ${project.category}">
                    <div class="work-img">
                        <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div class="work-content">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="work-tech">
                            ${project.tech_stack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                        <div class="work-links">
                            <a href="${project.github_link}" target="_blank">
                                <i class="fab fa-github"></i> Code
                            </a>
                            <a href="${project.live_link}" target="_blank">
                                <i class="fas fa-external-link-alt"></i> Live Demo
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });
        
        portfolioGrid.innerHTML = projectsHTML;
        
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Load stats from API
async function loadStats() {
    try {
        const response = await fetch('/api/stats');
        const stats = await response.json();
        
        // Update counter elements
        const counters = [
            { element: document.querySelector('.stat-item:nth-child(1) h4'), value: stats.projects_completed },
            { element: document.querySelector('.stat-item:nth-child(2) h4'), value: stats.years_experience },
            { element: document.querySelector('.stat-item:nth-child(3) h4'), value: stats.happy_clients }
        ];
        
        counters.forEach(counter => {
            if (counter.element) {
                counter.element.classList.add('counter');
                counter.element.setAttribute('data-target', counter.value);
                counter.element.textContent = '0';
            }
        });
        
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Enhanced contact form with API integration
async function handleContactForm(formData) {
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.get('Name'),
                email: formData.get('email'),
                message: formData.get('Message')
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            return { success: true, message: result.message };
        } else {
            return { success: false, message: 'Failed to send message. Please try again.' };
        }
        
    } catch (error) {
        console.error('Error sending message:', error);
        return { success: false, message: 'Network error. Please try again later.' };
    }
}

// Initialize API data loading
document.addEventListener('DOMContentLoaded', function() {
    loadSkills();
    loadProjects();
    loadStats();
    
    // Update contact form handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('Name');
            const email = formData.get('email');
            const message = formData.get('Message');
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            const result = await handleContactForm(formData);
            
            if (result.success) {
                alert(result.message);
                this.reset();
            } else {
                alert(result.message);
            }
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    }
});