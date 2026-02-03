// Smooth scroll for navigation links

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

// Active navigation highlighting on scroll
const observerOptions = {
    threshold: 0.3,
    rootMargin: '-50px 0px -50%'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Subtle fade-in animations on scroll
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Apply animations to project items and expertise cards
document.querySelectorAll('.project-item, .expertise-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// Navbar background on scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.borderBottomColor = 'rgba(210, 210, 215, 0.5)';
    } else {
        navbar.style.borderBottomColor = 'rgba(210, 210, 215, 1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Add active state styling for navigation
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #1d1d1f;
        opacity: 1;
        font-weight: 500;
    }
`;
document.head.appendChild(style);

// Minimal analytics event tracking (optional)
const trackEvent = (eventName) => {
    // Replace with your analytics implementation
    console.log(`Event tracked: ${eventName}`);
};

// Track section views
document.querySelectorAll('section').forEach(section => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.id) {
                trackEvent(`view_section_${entry.target.id}`);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(section);
});

// Contact link tracking
document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('click', () => {
        const text = link.textContent.trim();
        trackEvent(`contact_${text.toLowerCase()}`);
    });
});

console.log('Portfolio initialized');

