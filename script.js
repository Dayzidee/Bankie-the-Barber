// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Bankie The Barber website loaded successfully!');
    
    // Initialize all functionality
    initializeNavigation();
    initializeAnimations();
    initializeParticles();
    initializeTestimonials();
    initializeContactForm();
    initializeScrollEffects();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.menu a');
    
    // Add CSS custom properties for staggered animation
    navLinks.forEach((link, index) => {
        link.style.setProperty('--i', index);
    });
    
    // Toggle mobile menu
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Toggle hamburger animation
            const lines = hamburger.querySelectorAll('.line');
            lines.forEach((line, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) line.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) line.style.opacity = '0';
                    if (index === 2) line.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    line.style.transform = 'none';
                    line.style.opacity = '1';
                }
            });
        });
    }
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                
                const lines = hamburger.querySelectorAll('.line');
                lines.forEach(line => {
                    line.style.transform = 'none';
                    line.style.opacity = '1';
                });
            }
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Change nav background on scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.sticky-nav');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
            nav.style.background = 'rgba(26, 26, 26, 0.95)';
        }
    });
}

// Initialize GSAP animations
function initializeAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animations
    const heroTl = gsap.timeline();
    heroTl.from('.greeting', { opacity: 0, y: 30, duration: 0.8, delay: 0.2 })
          .from('.brand-name', { opacity: 0, y: 50, duration: 1, ease: 'power2.out' }, '-=0.5')
          .from('.hero-description', { opacity: 0, y: 30, duration: 0.8 }, '-=0.3')
          .from('.btn-group .cta-primary', { opacity: 0, x: -30, duration: 0.6 }, '-=0.2')
          .from('.btn-group .btn-secondary', { opacity: 0, x: 30, duration: 0.6 }, '-=0.4')
          .from('.hero-social .social-links a', { opacity: 0, y: 20, duration: 0.4, stagger: 0.1 }, '-=0.2')
          .from('.hero-image', { opacity: 0, scale: 0.8, duration: 1, ease: 'power2.out' }, '-=0.8');
    
    // Section animations on scroll
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Service cards animation
    gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 60,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Gallery items animation
    gsap.utils.toArray('.gallery-item').forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            delay: index * 0.05,
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // About stats animation
    gsap.utils.toArray('.stat').forEach(stat => {
        gsap.from(stat, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            scrollTrigger: {
                trigger: stat,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
        
        // Animate the numbers
        const numberElement = stat.querySelector('h4');
        if (numberElement) {
            const originalText = numberElement.textContent;
            const finalNumber = parseInt(originalText);
            const hasPlus = originalText.includes('+');
            const hasPercent = originalText.includes('%');
            
            // Set initial value to 0
            numberElement.textContent = '0' + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
            
            gsap.to({value: 0}, {
                value: finalNumber,
                duration: 2,
                ease: 'power2.out',
                onUpdate: function() {
                    const currentValue = Math.floor(this.targets()[0].value);
                    numberElement.textContent = currentValue + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
                },
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        }
    });
    
    // Contact items animation
    gsap.utils.toArray('.contact-item').forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            x: -50,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// Initialize particle background
function initializeParticles() {
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load('particle-background', {
            background: {
                color: {
                    value: 'transparent'
                }
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: 'push'
                    },
                    onHover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    resize: true
                },
                modes: {
                    push: {
                        quantity: 4
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    }
                }
            },
            particles: {
                color: {
                    value: '#DC143C'
                },
                links: {
                    color: '#DC143C',
                    distance: 150,
                    enable: true,
                    opacity: 0.2,
                    width: 1
                },
                collisions: {
                    enable: true
                },
                move: {
                    direction: 'none',
                    enable: true,
                    outModes: {
                        default: 'bounce'
                    },
                    random: false,
                    speed: 1,
                    straight: false
                },
                number: {
                    density: {
                        enable: true,
                        area: 800
                    },
                    value: 50
                },
                opacity: {
                    value: 0.3
                },
                shape: {
                    type: 'circle'
                },
                size: {
                    value: { min: 1, max: 3 }
                }
            },
            detectRetina: true
        });
    }
}

// Testimonials carousel
function initializeTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    let currentTestimonial = 0;
    
    if (testimonials.length === 0) return;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
    if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
    
    // Auto-rotate testimonials
    setInterval(nextTestimonial, 5000);
}

// Contact form handling
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const message = formData.get('message') || '';
            
            // Validate required fields
            if (!name || !phone || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Create WhatsApp message
            const whatsappMessage = `Hi! I'm ${name}.\n\nPhone: ${phone}\n\nMessage: ${message}`;
            const whatsappUrl = `https://wa.me/2348101595840?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Show success message
            showNotification('Redirecting to WhatsApp...', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Book appointment function (called from hero button)
function bookAppointment() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const offsetTop = contactSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Focus on name field after scroll
        setTimeout(() => {
            const nameField = document.getElementById('name');
            if (nameField) nameField.focus();
        }, 800);
    }
}

// Scroll effects
function initializeScrollEffects() {
    // Parallax effect for hero image
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        
        if (heroImage) {
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Show/hide scroll-to-top button
    const scrollProgress = document.createElement('div');
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #D4AF37, #B8860B);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(scrollProgress);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Add slide-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Gallery image click handler
document.addEventListener('click', function(e) {
    if (e.target.closest('.gallery-item')) {
        const img = e.target.closest('.gallery-item').querySelector('img');
        if (img) {
            // Create modal overlay
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                cursor: pointer;
            `;
            
            const modalImg = document.createElement('img');
            modalImg.src = img.src;
            modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 10px;
            `;
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            // Close modal on click
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            // Close modal on Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.parentNode) {
                    document.body.removeChild(modal);
                }
            });
        }
    }
});

// Add loading animation
window.addEventListener('load', function() {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0f0f0f;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    const loaderText = document.createElement('div');
    loaderText.textContent = 'BANKIE THE BARBER';
    loaderText.style.cssText = `
        font-family: 'Oswald', sans-serif;
        font-size: 2rem;
        background: linear-gradient(90deg, #D4AF37, #B8860B);
        -webkit-background-clip: text;
        color: var(--primary-red);
        letter-spacing: 3px;
        animation: pulse 1.5s infinite;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
    `;
    document.head.appendChild(style);
    
    loader.appendChild(loaderText);
    document.body.appendChild(loader);
    
    // Remove loader after 2 seconds
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            if (loader.parentNode) {
                document.body.removeChild(loader);
            }
        }, 500);
    }, 2000);
});

