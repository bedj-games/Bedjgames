// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    }, 100);
});

// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#1100ff'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.8,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#04007c',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 200,
                line_linked: {
                    opacity: 0.5
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Smooth Scrolling for Navigation
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

// Parallax Effect on Scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Form Submission (prevent default for demo)
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We\'ll get back to you soon.');
    e.target.reset();
});

// Animate stats when they come into view
const stats = document.querySelectorAll('.stat-number');
const animateStats = () => {
    stats.forEach(stat => {
        const value = stat.innerText;
        if (value.includes('+')) {
            const num = parseInt(value.replace('+', ''));
            animateNumber(stat, 0, num, 2000, '+');
        } else if (value.includes('K')) {
            const num = parseInt(value.replace('K', '')) * 1000;
            animateNumber(stat, 0, num, 2000, 'K+');
        } else {
            animateNumber(stat, 0, parseInt(value), 2000, '');
        }
    });
};

const animateNumber = (element, start, end, duration, suffix) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        if (suffix === 'K+') {
            element.innerText = Math.floor(value / 1000) + 'K+';
        } else if (suffix === '+') {
            element.innerText = value + '+';
        } else {
            element.innerText = value;
        }
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stats')) {
                animateStats();
            }
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.stats, .game-card, .team-member').forEach(el => {
    observer.observe(el);
});

// Dynamic background color change on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollPosition / maxScroll) * 100;
    
    const hue = 0 + (scrollPercent * 0.5); // Shift from red to orange
    document.body.style.backgroundColor = `hsl(${hue}, 100%, 5%)`;
});

// Add hover sound effect (optional - you can add actual sounds)
const buttons = document.querySelectorAll('.btn, .social-link');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        // You could play a hover sound here
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

window.addEventListener("scroll", () => {
    const nav = document.querySelector(".nav");
    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});

const icons = [
    "bi-controller",
    "bi-stars",
    "bi-lightning",
    "bi-circle",
    "bi-square",
    "bi-triangle",
    "bi-dice-5",
    "bi-dice-6",
    "bi-bug",
    "bi-joystick"
];

const container = document.querySelector(".bg-shapes");

function createShapes(count = 40) {
    for (let i = 0; i < count; i++) {
        const span = document.createElement("i");

        // random icon
        const icon = icons[Math.floor(Math.random() * icons.length)];
        span.classList.add("bi", icon, "shape");

        // random position
        span.style.left = Math.random() * 100 + "vw";

        // random size
        const size = Math.random() * 20 + 10;
        span.style.fontSize = size + "px";

        // random animation speed
        span.style.animationDuration = (Math.random() * 15 + 10) + "s";

        // random delay
        span.style.animationDelay = Math.random() * 10 + "s";

        container.appendChild(span);
    }
}

createShapes(60);