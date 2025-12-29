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
    // Calculate the correct transform based on screen size
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
    activePortfolio(); // Update portfolio carousel on resize
});

// Initialize portfolio carousel
activePortfolio();

// Prevent form submission (for demo purposes)
const contactForm = document.querySelector('.contact-box form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Form submission would happen here in a real application!');
    });
}

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
updatePortfolioGap(); // Initial call