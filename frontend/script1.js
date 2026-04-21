// ===================== EXISTING CODE (unchanged except contact form handler) =====================

const navlinks = document.querySelectorAll('header nav a');
const logolink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.getElementById('menu-icon');
const nav = document.querySelector('header nav');

const header = document.querySelector('header');
header.classList.remove('active');
setTimeout(() => {
    header.classList.add('active');
}, 1100);

const setActiveLink = (activeLink) => {
    navlinks.forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
};

navlinks.forEach((link, idx) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveLink(link);
        sections.forEach(section => {
            section.classList.remove('active');
        });
        sections[idx].classList.add('active');
        
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
            nav.classList.remove('active');
        }
        
        // Scroll to top for mobile
        if (window.innerWidth <= 768) {
            window.scrollTo(0, 0);
        }
    });
});

logolink.addEventListener('click', (e) => {
    e.preventDefault();
    setActiveLink(navlinks[0]);
    sections.forEach(section => {
        section.classList.remove('active');
    });
    sections[0].classList.add('active');
    
    // Close mobile menu if open
    if (window.innerWidth <= 768) {
        nav.classList.remove('active');
    }
});

const resumeBtns = document.querySelectorAll('.resume-btn');
const resumeDetails = document.querySelectorAll('.resume-detail');

resumeBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        resumeBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');

        resumeDetails.forEach(detail => detail.classList.remove('active'));
        resumeDetails[idx].classList.add('active');
    });
});

const arrowRight = document.querySelector('.portfolio-box .navigate .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigate .arrow-left');
const portfolioDetails = document.querySelectorAll('.portfolio-detail');
const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
const totalItems = portfolioDetails.length;

let index = 0;

const activePortfolio = () => {
    const gap = window.innerWidth <= 768 ? 0 : 2;
    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * gap}rem))`;

    portfolioDetails.forEach(detail => detail.classList.remove('active'));
    portfolioDetails[index].classList.add('active');

    arrowLeft.classList.toggle('disabled', index === 0);
    arrowRight.classList.toggle('disabled', index === totalItems - 1);
};

arrowRight.addEventListener('click', () => {
    if (index < totalItems - 1) {
        index++;
    }
    activePortfolio();
});

arrowLeft.addEventListener('click', () => {
    if (index > 0) {
        index--;
    }
    activePortfolio();
});

// Mobile Menu Functionality
menuIcon.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        !e.target.closest('nav') && 
        !e.target.closest('#menu-icon') &&
        nav.classList.contains('active')) {
        nav.classList.remove('active');
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        nav.classList.remove('active');
    }
    activePortfolio();
});

// Initialize portfolio carousel
activePortfolio();

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
        }
    });
});

// Update portfolio gap on resize
const updatePortfolioGap = () => {
    if (window.innerWidth <= 768) {
        imgSlide.style.gap = '0';
    } else {
        imgSlide.style.gap = '2rem';
    }
    activePortfolio();
};

window.addEventListener('resize', updatePortfolioGap);
updatePortfolioGap();

// ===================== NEW: EMAILJS CONTACT FORM HANDLER =====================
// IMPORTANT: You must include the EmailJS library in your HTML:
// <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>

// REPLACE THESE WITH YOUR ACTUAL EMAILJS CREDENTIALS (get them free from emailjs.com)
const EMAILJS_CONFIG = {
    publicKey: 'YOUR_PUBLIC_KEY',      // e.g., 'user_abc123xyz'
    serviceID: 'YOUR_SERVICE_ID',      // e.g., 'service_abc123'
    templateID: 'YOUR_TEMPLATE_ID'     // e.g., 'template_xyz789'
};

// Initialize EmailJS once (the library must be loaded first)
if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_CONFIG.publicKey);
} else {
    console.error('EmailJS library not loaded. Add the script tag to your HTML.');
}

const contactForm = document.querySelector('.contact-box form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get the submit button to show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnHTML = submitBtn.innerHTML;
        
        // Disable button and show spinner
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            // Collect form data (adjust selectors to match your form input names/ids)
            const fullName = contactForm.querySelector('input[name="fullName"]')?.value || '';
            const phone = contactForm.querySelector('input[name="phone"]')?.value || '';
            const subject = contactForm.querySelector('input[name="subject"]')?.value || '';
            const message = contactForm.querySelector('textarea[name="message"]')?.value || '';

            // Basic validation
            if (!fullName.trim() || !message.trim()) {
                throw new Error('Please enter your name and message.');
            }

            // Send email via EmailJS
            const response = await emailjs.send(
                EMAILJS_CONFIG.serviceID,
                EMAILJS_CONFIG.templateID,
                {
                    fullName: fullName,
                    phone: phone,
                    subject: subject,
                    message: message
                }
            );

            if (response.status === 200) {
                alert('✅ Message sent successfully! I will get back to you soon.');
                contactForm.reset(); // Clear all form fields
            } else {
                throw new Error('Unexpected response status: ' + response.status);
            }
        } catch (error) {
            console.error('EmailJS error:', error);
            alert('❌ Failed to send message. Please try again later.\n' + (error.message || ''));
        } finally {
            // Restore button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;
        }
    });
}