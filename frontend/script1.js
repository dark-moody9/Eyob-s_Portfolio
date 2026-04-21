// ===================== EXISTING CODE (preserved) =====================

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
        
        if (window.innerWidth <= 768) {
            nav.classList.remove('active');
        }
        
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

menuIcon.addEventListener('click', () => {
    nav.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        !e.target.closest('nav') && 
        !e.target.closest('#menu-icon') &&
        nav.classList.contains('active')) {
        nav.classList.remove('active');
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        nav.classList.remove('active');
    }
    activePortfolio();
});

activePortfolio();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
        }
    });
});

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

// ===================== BACKEND CONTACT FORM HANDLER =====================
// Replace with your actual backend endpoint (from Option 2 or your own server)
// Example: 'https://your-backend.onrender.com/api/contact' or 'http://localhost:3000/api/contact'
const BACKEND_API_URL = '/api/contact';  // Change this to your real endpoint

const contactForm = document.querySelector('.contact-box form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form fields – adjust selectors to match your actual input names/ids
        const fullNameInput = contactForm.querySelector('input[name="fullName"]');
        const phoneInput = contactForm.querySelector('input[name="phone"]');
        const subjectInput = contactForm.querySelector('input[name="subject"]');
        const messageInput = contactForm.querySelector('textarea[name="message"]');
        
        // Also try alternative common names/ids if needed
        const fullName = fullNameInput?.value || 
                         contactForm.querySelector('#name')?.value || 
                         contactForm.querySelector('input[name="name"]')?.value || '';
                         
        const phone = phoneInput?.value || '';
        const subject = subjectInput?.value || '';
        const message = messageInput?.value || 
                        contactForm.querySelector('#message')?.value || '';

        // Basic validation
        if (!fullName.trim() || !message.trim()) {
            alert('❌ Please enter your name and message.');
            return;
        }

        // Get submit button for loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnHTML = submitBtn.innerHTML;
        
        // Disable button and show spinner
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            const response = await fetch(BACKEND_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: fullName,
                    email: contactForm.querySelector('input[type="email"]')?.value || '',
                    phone: phone,
                    subject: subject,
                    message: message
                })
            });

            const result = await response.json();

            if (response.ok) {
                alert('✅ Message sent successfully! I will get back to you soon.');
                contactForm.reset(); // Clear all fields
            } else {
                throw new Error(result.error || 'Server responded with an error');
            }
        } catch (error) {
            console.error('Backend error:', error);
            alert('❌ Failed to send message. Please try again later.\n' + (error.message || ''));
        } finally {
            // Restore button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;
        }
    });
}