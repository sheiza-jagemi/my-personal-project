// ===== REUSABLE UTILITIES =====

class PortfolioUtils {
    // DOM Utilities
    static $(selector) {
        return document.querySelector(selector);
    }
    
    static $$(selector) {
        return document.querySelectorAll(selector);
    }
    
    static createElement(tag, className = '', content = '') {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (content) element.innerHTML = content;
        return element;
    }
    
    // Animation Utilities
    static fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        const start = performance.now();
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.opacity = progress;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    static fadeOut(element, duration = 300) {
        const start = performance.now();
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.opacity = 1 - progress;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    static slideToggle(element, duration = 300) {
        if (element.style.display === 'none' || !element.style.display) {
            this.slideDown(element, duration);
        } else {
            this.slideUp(element, duration);
        }
    }
    
    // Form Utilities
    static validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    static validateForm(formData, rules) {
        const errors = {};
        
        for (const [field, rule] of Object.entries(rules)) {
            const value = formData.get(field);
            
            if (rule.required && (!value || value.trim() === '')) {
                errors[field] = rule.message || `${field} is required`;
            }
            
            if (rule.email && value && !this.validateEmail(value)) {
                errors[field] = 'Please enter a valid email address';
            }
            
            if (rule.minLength && value && value.length < rule.minLength) {
                errors[field] = `${field} must be at least ${rule.minLength} characters`;
            }
        }
        
        return Object.keys(errors).length === 0 ? null : errors;
    }
    
    // API Utilities
    static async apiCall(url, options = {}) {
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API call failed:', error);
            throw error;
        }
    }
    
    // Storage Utilities
    static setStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Storage set failed:', error);
        }
    }
    
    static getStorage(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Storage get failed:', error);
            return defaultValue;
        }
    }
    
    // Scroll Utilities
    static smoothScrollTo(element, offset = 0) {
        const targetPosition = element.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    static isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= window.innerHeight &&
            rect.right <= window.innerWidth
        );
    }
    
    // Debounce Utility
    static debounce(func, wait) {
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
    
    // Throttle Utility
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Common Animation Controller
class AnimationController {
    constructor() {
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
    }
    
    observe(elements) {
        elements.forEach(el => this.observer.observe(el));
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Handle counters
                const counters = entry.target.querySelectorAll('.counter');
                if (counters.length > 0) {
                    this.animateCounters(counters);
                }
            }
        });
    }
    
    animateCounters(counters) {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
}

// Form Handler Class
class FormHandler {
    constructor(formSelector, apiEndpoint = null) {
        this.form = PortfolioUtils.$(formSelector);
        this.apiEndpoint = apiEndpoint;
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const submitBtn = this.form.querySelector('[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            if (this.apiEndpoint) {
                const result = await PortfolioUtils.apiCall(this.apiEndpoint, {
                    method: 'POST',
                    body: JSON.stringify(Object.fromEntries(formData))
                });
                
                this.showMessage(result.message || 'Success!', 'success');
                this.form.reset();
            } else {
                // Simulate submission
                await new Promise(resolve => setTimeout(resolve, 2000));
                this.showMessage('Thank you for your message!', 'success');
                this.form.reset();
            }
        } catch (error) {
            this.showMessage('Something went wrong. Please try again.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }
    
    showMessage(message, type) {
        // Create or update message element
        let messageEl = PortfolioUtils.$('.form-message');
        if (!messageEl) {
            messageEl = PortfolioUtils.createElement('div', 'form-message');
            this.form.appendChild(messageEl);
        }
        
        messageEl.textContent = message;
        messageEl.className = `form-message ${type}`;
        
        setTimeout(() => {
            if (messageEl) messageEl.remove();
        }, 5000);
    }
}

// Export for use in other files
window.PortfolioUtils = PortfolioUtils;
window.AnimationController = AnimationController;
window.FormHandler = FormHandler;