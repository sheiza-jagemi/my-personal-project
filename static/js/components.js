// ===== REUSABLE COMPONENTS =====

// Navigation Component
class Navigation {
    constructor() {
        this.nav = PortfolioUtils.$('nav');
        this.menuIcon = PortfolioUtils.$('#menuIcon');
        this.closeMenu = PortfolioUtils.$('#closeMenu');
        this.navMenu = PortfolioUtils.$('#navMenu');
        this.init();
    }
    
    init() {
        this.setupMobileMenu();
        this.setupScrollEffect();
        this.setupSmoothScroll();
    }
    
    setupMobileMenu() {
        if (this.menuIcon && this.closeMenu && this.navMenu) {
            this.menuIcon.addEventListener('click', () => this.navMenu.classList.add('show'));
            this.closeMenu.addEventListener('click', () => this.navMenu.classList.remove('show'));
            
            this.navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => this.navMenu.classList.remove('show'));
            });
        }
    }
    
    setupScrollEffect() {
        window.addEventListener('scroll', PortfolioUtils.throttle(() => {
            if (this.nav) {
                this.nav.classList.toggle('scrolled', window.scrollY > 100);
            }
        }, 100));
    }
    
    setupSmoothScroll() {
        PortfolioUtils.$$('a[href^=\"#\"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = PortfolioUtils.$(anchor.getAttribute('href'));
                if (target) {
                    PortfolioUtils.smoothScrollTo(target, 80);
                }
            });
        });
    }
}

// Theme Toggle Component
class ThemeToggle {
    constructor() {
        this.toggle = PortfolioUtils.$('#theme-toggle');
        this.icon = this.toggle?.querySelector('i');
        this.init();
    }
    
    init() {
        if (!this.toggle || !this.icon) return;
        
        const savedTheme = PortfolioUtils.getStorage('theme', 'dark');
        this.setTheme(savedTheme);
        
        this.toggle.addEventListener('click', () => this.toggleTheme());
    }
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.icon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        this.setTheme(newTheme);
        PortfolioUtils.setStorage('theme', newTheme);
    }
}

// Typing Effect Component
class TypingEffect {
    constructor(selector, texts, options = {}) {
        this.element = PortfolioUtils.$(selector);
        this.texts = texts;
        this.options = {
            typeSpeed: 100,
            deleteSpeed: 50,
            pauseTime: 2000,
            ...options
        };
        
        if (this.element) {
            this.init();
        }
    }
    
    init() {
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        let typeSpeed = this.isDeleting ? this.options.deleteSpeed : this.options.typeSpeed;
        
        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = this.options.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Loading Screen Component
class LoadingScreen {
    constructor() {
        this.loadingScreen = PortfolioUtils.$('#loading-screen');
        this.init();
    }
    
    init() {
        if (this.loadingScreen) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    PortfolioUtils.fadeOut(this.loadingScreen, 500);
                }, 1000);
            });
        }
    }
}

// Back to Top Component
class BackToTop {
    constructor() {
        this.button = PortfolioUtils.$('#backToTop');
        this.init();
    }
    
    init() {
        if (!this.button) return;
        
        window.addEventListener('scroll', PortfolioUtils.throttle(() => {
            this.button.classList.toggle('show', window.scrollY > 300);
        }, 100));
        
        this.button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Portfolio Filter Component
class PortfolioFilter {
    constructor(filterSelector, itemSelector) {
        this.filters = PortfolioUtils.$$(filterSelector);
        this.items = PortfolioUtils.$$(itemSelector);
        this.init();
    }
    
    init() {
        if (this.filters.length === 0) return;
        
        this.filters.forEach(filter => {
            filter.addEventListener('click', (e) => this.handleFilter(e));
        });
    }
    
    handleFilter(e) {
        const filter = e.target;
        const filterValue = filter.getAttribute('data-filter');
        
        // Update active filter
        this.filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        
        // Filter items
        this.items.forEach(item => {
            const shouldShow = filterValue === 'all' || item.classList.contains(filterValue);
            
            if (shouldShow) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }
}

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    new LoadingScreen();
    new Navigation();
    new ThemeToggle();
    new BackToTop();
    
    // Initialize typing effect if element exists
    const typingElement = PortfolioUtils.$('.typing-text');
    if (typingElement) {
        new TypingEffect('.typing-text', [
            'Full-Stack Developer',
            'JavaScript Expert',
            'Python Developer',
            'React Specialist',
            'Flask Developer'
        ]);
    }
    
    // Initialize portfolio filter if elements exist
    const filterButtons = PortfolioUtils.$$('.filter-btn');
    if (filterButtons.length > 0) {
        new PortfolioFilter('.filter-btn', '.work');
    }
    
    // Initialize animations
    const animationController = new AnimationController();
    const animatedElements = PortfolioUtils.$$('.fade-in, .slide-left, .slide-right, .scale-in, .card-hover');
    animationController.observe(animatedElements);
    
    // Set current year
    const currentYearEl = PortfolioUtils.$('#currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
    
    console.log('Portfolio components initialized successfully!');
});