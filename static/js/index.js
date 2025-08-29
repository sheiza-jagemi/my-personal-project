// ===== GLOBAL VARIABLES =====
let currentTheme = localStorage.getItem('theme') || 'dark';
let isLoading = true;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// ===== INITIALIZE APPLICATION =====
function initializeApp() {
    // Set theme
    setTheme(currentTheme);
    
    // Initialize components
    initializeNavigation();
    initializeThemeToggle();
    initializeTypingEffect();
    initializeScrollAnimations();
    initializeBackToTop();
    initializeContactForm();
    
    // Load dynamic content
    loadPortfolioData();
    loadSkillsData();
    loadStats();
    
    // Hide loading screen
    setTimeout(() => {
        hideLoadingScreen();
    }, 1000);
    
    // Set current year
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}

// ===== THEME MANAGEMENT =====
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    currentTheme = theme;
    localStorage.setItem('theme', theme);
    
    const themeIcon = document.querySelector('#theme-toggle i');
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
}

// ===== LOADING SCREEN =====
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            isLoading = false;
        }, 500);
    }
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const menuIcon = document.getElementById('menuIcon');
    const navMenu = document.getElementById('navMenu');
    const closeMenu = document.getElementById('closeMenu');
    const nav = document.querySelector('nav');
    
    // Mobile menu toggle
    if (menuIcon && navMenu && closeMenu) {
        menuIcon.addEventListener('click', () => {
            navMenu.classList.add('active');
        });
        
        closeMenu.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
        
        // Close menu when clicking on links
        const navLinks = document.querySelectorAll('#navMenu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== TYPING EFFECT =====
function initializeTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const texts = [
        'Full-Stack Developer',
        'Python Enthusiast',
        'JavaScript Expert',
        'Problem Solver',
        'Tech Innovator'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    typeEffect();
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                
                // Animate skill bars
                if (entry.target.classList.contains('skill-item')) {
                    animateSkillBar(entry.target);
                }
                
                // Animate stats
                if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.skill-item, .stat-item, .work, .service-card, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
}

function animateSkillBar(skillItem) {
    const progressBar = skillItem.querySelector('.skill-progress');
    const percentage = skillItem.querySelector('.skill-percentage').textContent;
    
    if (progressBar) {
        setTimeout(() => {
            progressBar.style.width = percentage;
        }, 200);
    }
}

function animateCounter(statItem) {
    const counter = statItem.querySelector('h4');
    const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
    const suffix = counter.textContent.replace(/[0-9]/g, '');
    let current = 0;
    const increment = target / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = target + suffix;
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current) + suffix;
        }
    }, 30);
}

// ===== BACK TO TOP BUTTON =====
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('Name').trim();
        const email = formData.get('email').trim();
        const message = formData.get('Message').trim();
        const subject = formData.get('subject').trim();
        
        // Reset errors
        hideErrors();
        
        // Validate form
        let isValid = true;
        
        if (!name) {
            showError(nameError, 'Please enter your name');
            isValid = false;
        }
        
        if (!email || !isValidEmail(email)) {
            showError(emailError, 'Please enter a valid email');
            isValid = false;
        }
        
        if (!message) {
            showError(messageError, 'Please enter your message');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Submit form
        try {
            const submitBtn = contactForm.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('i');
            
            // Show loading state
            submitBtn.disabled = true;
            btnText.textContent = 'Sending...';
            btnIcon.className = 'fas fa-spinner fa-spin';
            
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message,
                    subject: subject
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                showNotification('Message sent successfully! I will get back to you soon.', 'success');
                contactForm.reset();
            } else {
                showNotification('Failed to send message. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('i');
            
            submitBtn.disabled = false;
            btnText.textContent = 'Send Message';
            btnIcon.className = 'fas fa-paper-plane';
        }
    });
}

function hideErrors() {
    document.querySelectorAll('.error').forEach(error => {
        error.style.display = 'none';
    });
}

function showError(errorElement, message) {
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// ===== PORTFOLIO DATA =====
async function loadPortfolioData() {
    try {
        const response = await fetch('/api/projects');
        const projects = await response.json();
        
        const portfolioGrid = document.getElementById('portfolioGrid');
        if (!portfolioGrid) return;
        
        portfolioGrid.innerHTML = '';
        
        projects.forEach((project, index) => {
            const projectElement = document.createElement('div');
            projectElement.className = 'work';
            projectElement.setAttribute('data-category', getProjectCategory(project.tech_stack));
            
            projectElement.innerHTML = `
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="work-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tech-stack">
                        ${project.tech_stack.map(tech => `<span class="tech">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.github_link}" target="_blank" title="View Code">
                            <i class="fab fa-github"></i>
                        </a>
                        <a href="${project.live_link}" target="_blank" title="Live Demo">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>
            `;
            
            portfolioGrid.appendChild(projectElement);
        });
        
        // Initialize portfolio filters
        initializePortfolioFilters();
        
    } catch (error) {
        console.error('Error loading portfolio data:', error);
    }
}

function getProjectCategory(techStack) {
    const webTechs = ['React', 'Vue.js', 'JavaScript', 'HTML5', 'CSS3'];
    const mobileTechs = ['React Native', 'Flutter', 'Swift', 'Kotlin'];
    const apiTechs = ['FastAPI', 'Express', 'Django', 'Flask'];
    
    if (techStack.some(tech => mobileTechs.includes(tech))) return 'mobile';
    if (techStack.some(tech => apiTechs.includes(tech))) return 'api';
    if (techStack.some(tech => webTechs.includes(tech))) return 'web';
    return 'web';
}

function initializePortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.work');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter projects
            projects.forEach(project => {
                if (filter === 'all' || project.getAttribute('data-category') === filter) {
                    project.style.display = 'block';
                    project.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
}

// ===== SKILLS DATA =====
async function loadSkillsData() {
    try {
        const response = await fetch('/api/skills');
        const skillsData = await response.json();
        
        const skillsContainer = document.getElementById('skillsContainer');
        if (!skillsContainer) return;
        
        skillsContainer.innerHTML = '';
        
        Object.entries(skillsData).forEach(([category, data]) => {
            const skillCategory = document.createElement('div');
            skillCategory.className = 'skill-category';
            
            skillCategory.innerHTML = `
                <div class="skill-category-icon">
                    <i class="${data.icon}"></i>
                </div>
                <h3>${data.title}</h3>
                <div class="skills-list">
                    ${data.skills.map(skill => `
                        <div class="skill-item">
                            <div class="skill-header">
                                <span class="skill-name">${skill.name}</span>
                                <span class="skill-percentage">${skill.level}%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 0%"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            
            skillsContainer.appendChild(skillCategory);
        });
        
    } catch (error) {
        console.error('Error loading skills data:', error);
    }
}

// ===== STATS DATA =====
async function loadStats() {
    try {
        const response = await fetch('/api/stats');
        const stats = await response.json();
        
        // Update stats in about section
        const statItems = document.querySelectorAll('.stat-item h4');
        if (statItems.length >= 3) {
            statItems[0].textContent = stats.projects_completed + '+';
            statItems[1].textContent = stats.years_experience + '+';
            statItems[2].textContent = stats.happy_clients + '+';
        }
        
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Lazy load images
document.addEventListener('DOMContentLoaded', () => {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ===== ANALYTICS (Optional) =====
function trackEvent(eventName, properties = {}) {
    // Add your analytics tracking code here
    console.log('Event tracked:', eventName, properties);
}

// Track page views
window.addEventListener('load', () => {
    trackEvent('page_view', {
        page: window.location.pathname,
        theme: currentTheme
    });
});

// Track button clicks
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn, .filter-btn, .project-links a')) {
        trackEvent('button_click', {
            button: e.target.textContent || e.target.title,
            section: e.target.closest('section')?.id || 'unknown'
        });
    }
});

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }
});

// Focus management
document.addEventListener('focusin', (e) => {
    if (e.target.matches('a, button, input, textarea')) {
        e.target.style.outline = '2px solid var(--primary-color)';
        e.target.style.outlineOffset = '2px';
    }
});

document.addEventListener('focusout', (e) => {
    if (e.target.matches('a, button, input, textarea')) {
        e.target.style.outline = 'none';
    }
});

// ===== PRELOAD CRITICAL RESOURCES =====
function preloadCriticalResources() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0',
        // Add other critical images
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadCriticalResources();