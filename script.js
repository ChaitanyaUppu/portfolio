document.addEventListener('DOMContentLoaded', function () {
    // Loading Screen Animation
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const loadingText = document.getElementById('loading-text');
    const loadingTexts = [
        'Initializing temporal interface',
        'Verifying timeline integrity',
        'Establishing variant credentials',
        'Loading personnel file',
        'Accessing TVA database'
    ];

    let progress = 0;
    let currentTextIndex = 0;

    const loadingInterval = setInterval(() => {
        progress += 2;

        // Update loading text based on progress
        if (progress < 20) {
            currentTextIndex = 0;
        } else if (progress < 40) {
            currentTextIndex = 1;
        } else if (progress < 60) {
            currentTextIndex = 2;
        } else if (progress < 80) {
            currentTextIndex = 3;
        } else {
            currentTextIndex = 4;
        }

        loadingText.textContent = loadingTexts[currentTextIndex];

        if (progress >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                mainContent.classList.remove('hidden');

                // Initialize other components after loading
                initTypingEffects();
                initMobileMenu();
                initTimeDisplay();
                initScrollHeader();
                initToggleDetails();
                initContactForm();
                setCurrentYear();
            }, 500);
        }
    }, 50);

    // Typing Effects
    function initTypingEffects() {
        const texts = [
            { id: 'typing-text-1', text: "ACCESSING TEMPORAL VARIANT AUTHORITY DATABASE...", delay: 30, startDelay: 0 },
            { id: 'typing-text-2', text: "PERSONNEL FILE LOADED. IDENTITY VERIFIED.", delay: 30, startDelay: 1200, className: 'success' },
            { id: 'typing-text-3', text: "CHAITANYA SAI UPPU", delay: 100, startDelay: 2000 },
            { id: 'typing-text-4', text: "UI/UX DESIGNER | FRONTEND DEVLOPER", delay: 50, startDelay: 2500 },
            { id: 'typing-text-5', text: "Creative UI/UX designer and frontend developer passionate about crafting intuitive user experiences and responsive, visually appealing web interfaces.", delay: 20, startDelay: 3000 }
        ];

        texts.forEach((item, index) => {
            setTimeout(() => {
                typeText(item.id, item.text, item.delay, item.className);
            }, item.startDelay);
        });
    }

    function typeText(elementId, text, delay, className = '') {
        const element = document.getElementById(elementId);
        let i = 0;

        const typingInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;

                // Add cursor effect
                if (i < text.length) {
                    element.classList.add('typing-cursor');
                } else {
                    element.classList.remove('typing-cursor');
                }
            } else {
                clearInterval(typingInterval);
                if (className) {
                    element.classList.add(className);
                }
            }
        }, delay);
    }

    // Mobile Menu Toggle
    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileNav = document.getElementById('mobile-nav');

        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('hidden');
        });

        // Close mobile menu when clicking a link
        const mobileLinks = mobileNav.querySelectorAll('.nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.add('hidden');
            });
        });
    }

    // Real-time Clock
    function initTimeDisplay() {
        const timeDisplay = document.getElementById('time-display');

        function updateTime() {
            const now = new Date();
            timeDisplay.innerHTML = `
        <span>⏱</span>
        ${now.toLocaleTimeString()} | ${now.toLocaleDateString()}
      `;
        }

        updateTime();
        setInterval(updateTime, 1000);
    }

    // Header Scroll Effect
    function initScrollHeader() {
        const header = document.getElementById('header');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Toggle Details for Education and Projects
    function initToggleDetails() {
        const toggleButtons = document.querySelectorAll('.toggle-details');

        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const details = button.nextElementSibling;
                details.classList.toggle('hidden');

                if (details.classList.contains('hidden')) {
                    button.textContent = 'Show Details';
                } else {
                    button.textContent = 'Hide Details';
                }
            });
        });
    }

    // Contact Form Submission
    function initContactForm() {
        const contactForm = document.getElementById('contact-form');
        const submitBtn = document.getElementById('submit-btn');
        const formStatus = document.getElementById('form-status');

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();

                // Disable button and show loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'SENDING...';

                // Simulate form submission
                setTimeout(() => {
                    // Reset form
                    contactForm.reset();

                    // Show success message
                    formStatus.textContent = "Message sent successfully! I'll respond as soon as possible.";
                    formStatus.style.color = '#4CAF50';

                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'SEND MESSAGE';

                    // Hide status message after 5 seconds
                    setTimeout(() => {
                        formStatus.textContent = '';
                    }, 5000);
                }, 1500);
            });
        }
    }

    // Set current year in footer
    function setCurrentYear() {
        const year = new Date().getFullYear();
        document.getElementById('current-year').textContent = year;
        document.getElementById('footer-year').textContent = year;
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Set active nav link based on scroll position
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});
