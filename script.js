// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover effects to cards
document.querySelectorAll('.feature-card, .audience-card, .session-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = this.classList.contains('session-item') ? 
            'translateX(10px)' : 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = this.classList.contains('session-item') ? 
            'translateX(0)' : 'translateY(0) scale(1)';
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
document.querySelectorAll('.feature-card, .session-item, .audience-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Additional interactive features
document.addEventListener('DOMContentLoaded', function() {
    
    // Parallax effect for header background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Add typing effect to main title
    typeWriter();
    
    // Add progress indicator for sessions
    addSessionProgress();
});

// Typing effect for the main title
function typeWriter() {
    const title = document.querySelector('.hero-content h1');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    title.style.borderRight = '2px solid white';
    
    let i = 0;
    const speed = 100;
    
    function type() {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                title.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    // Start typing after a small delay
    setTimeout(type, 500);
}

// Add progress indicators to session items
function addSessionProgress() {
    document.querySelectorAll('.session-item').forEach((item, index) => {
        const progressBar = document.createElement('div');
        progressBar.className = 'session-progress';
        progressBar.style.cssText = `
            width: 0%;
            height: 3px;
            background: linear-gradient(135deg, #0070f3, #1a202c);
            margin-top: 15px;
            border-radius: 2px;
            transition: width 1.5s ease;
        `;
        
        item.appendChild(progressBar);
        
        // Animate progress bar when item comes into view
        const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        progressBar.style.width = '100%';
                    }, index * 200); // Stagger the animations
                }
            });
        }, { threshold: 0.5 });
        
        itemObserver.observe(item);
    });
}

// Add floating action button for quick access to YouTube
function addFloatingButton() {
    const fab = document.createElement('div');
    fab.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #ff0000, #cc0000);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(255, 0, 0, 0.3);
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    fab.innerHTML = '📺';
    fab.title = 'Watch on YouTube';
    
    fab.addEventListener('mouseenter', () => {
        fab.style.transform = 'scale(1.1)';
        fab.style.boxShadow = '0 8px 30px rgba(255, 0, 0, 0.4)';
    });
    
    fab.addEventListener('mouseleave', () => {
        fab.style.transform = 'scale(1)';
        fab.style.boxShadow = '0 4px 20px rgba(255, 0, 0, 0.3)';
    });
    
    fab.addEventListener('click', () => {
        window.open('https://www.youtube.com/@techconme/videos', '_blank');
    });
    
    document.body.appendChild(fab);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 200) {
            fab.style.opacity = '1';
            fab.style.pointerEvents = 'auto';
        } else {
            fab.style.opacity = '0';
            fab.style.pointerEvents = 'none';
        }
    });
}

// Initialize floating button
addFloatingButton();