// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed header
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Update navigation links to use smooth scrolling
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = 'none';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// Form submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        alert('¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
});

// Animation on scroll (simple implementation)
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('aos-animate');
        }
    });
}

// Initial check for animations
animateOnScroll();

// Check for animations on scroll
window.addEventListener('scroll', animateOnScroll);

// Chart animation
function animateCharts() {
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.opacity = '1';
        }, index * 200);
    });
}

// Trigger chart animation when hero section is visible
const hero = document.querySelector('.hero');
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCharts();
            heroObserver.unobserve(entry.target);
        }
    });
});

if (hero) {
    heroObserver.observe(hero);
}

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
            }
        }, 16);
    });
}

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector('.about');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            aboutObserver.unobserve(entry.target);
        }
    });
});

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Service card hover effects
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.borderColor = '#3b82f6';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.borderColor = '#e5e7eb';
    });
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingNavLink = document.querySelector(`a[href="#${sectionId}"]`);
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingNavLink) {
                correspondingNavLink.classList.add('active');
            }
        }
    });
});

// Form validation
const inputs = document.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearErrors);
});

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Basic validation
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Este campo es obligatorio');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Ingrese un email válido');
            return false;
        }
    }
    
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'Ingrese un teléfono válido');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorDiv);
}

function clearErrors(e) {
    const field = e.target;
    field.classList.remove('error');
    
    const errorMsg = field.parentNode.querySelector('.field-error');
    if (errorMsg) {
        errorMsg.remove();
    }
}

// Enhanced form submission with validation
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        alert('Por favor, corrija los errores en el formulario');
        return;
    }
    
    // Proceed with form submission
    const formData = new FormData(contactForm);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Success
        showSuccessMessage();
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
});

function showSuccessMessage() {
    // Create success modal or notification
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="success-icon">✓</div>
            <h3>¡Mensaje Enviado!</h3>
            <p>Gracias por contactarnos. Nos pondremos en contacto con usted pronto.</p>
            <button onclick="this.parentElement.parentElement.remove()" class="btn btn-primary">Cerrar</button>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    
    modal.querySelector('.modal-content').style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 1rem;
        text-align: center;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
    `;
    
    modal.querySelector('.success-icon').style.cssText = `
        width: 4rem;
        height: 4rem;
        background: #10b981;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        margin: 0 auto 1rem;
        font-weight: bold;
    `;
    
    document.body.appendChild(modal);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 5000);
}

// Initialize all animations and interactions when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code here
    console.log('ContableXpert website loaded successfully');
});