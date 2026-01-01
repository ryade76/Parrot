/**
 * Nancy Forrester's Secret Garden
 * Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Initial check

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    const animateElements = document.querySelectorAll(
        '.about-content, .about-image, .parrot-card, .experience-card, .info-card, .contact-method'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        fadeInObserver.observe(el);
    });

    // Add staggered animation delay to cards
    document.querySelectorAll('.parrot-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });

    document.querySelectorAll('.experience-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.info-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });

    document.querySelectorAll('.contact-method').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Parallax effect for hero (subtle)
    const hero = document.querySelector('.hero-content');

    window.addEventListener('scroll', function() {
        if (window.scrollY < window.innerHeight) {
            const scrolled = window.scrollY;
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // Add hover effect sound (optional, can be enabled)
    // const cards = document.querySelectorAll('.parrot-card');
    // cards.forEach(card => {
    //     card.addEventListener('mouseenter', () => {
    //         // Play a subtle chirp sound
    //     });
    // });

    // Console welcome message
    console.log('%c🦜 Welcome to Nancy Forrester\'s Secret Garden! 🌴',
        'color: #2D8B4E; font-size: 20px; font-weight: bold;');
    console.log('%cAdopt — Do Not Shop 💚',
        'color: #E8B84A; font-size: 14px;');
});

// Preloader (optional enhancement)
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
