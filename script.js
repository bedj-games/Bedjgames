        // Custom cursor
        const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');
        if (cursor && follower) {
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                setTimeout(() => {
                    follower.style.left = e.clientX + 'px';
                    follower.style.top = e.clientY + 'px';
                }, 80);
            });
        }

        // Particles config (unchanged)
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#1100ff' },
                shape: { type: 'circle' },
                opacity: { value: 0.9, random: true, anim: { enable: true, speed: 1, opacity_min: 0.7, sync: false } },
                size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.5, sync: false } },
                line_linked: { enable: true, distance: 150, color: '#04007c', opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
                modes: { grab: { distance: 200, line_linked: { opacity: 0.8 } }, push: { particles_nb: 4 } }
            },
            retina_detect: true
        });

        // smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

        // nav background on scroll
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('.nav');
            if (window.scrollY > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        });

        // Animated stats when visible
        const statNumbers = document.querySelectorAll('.stat-number');
        const animateNumber = (el, endVal, suffixType) => {
            let start = 0;
            let duration = 1500;
            let stepTime = 20;
            let steps = duration / stepTime;
            let increment = endVal / steps;
            let current = 0;
            let interval = setInterval(() => {
                current += increment;
                if (current >= endVal) {
                    current = endVal;
                    if (suffixType === 'K+') el.innerText = Math.floor(endVal / 1000) + 'K+';
                    else if (suffixType === '+') el.innerText = Math.floor(endVal) + '+';
                    else el.innerText = Math.floor(endVal);
                    clearInterval(interval);
                } else {
                    if (suffixType === 'K+') el.innerText = Math.floor(current / 1000) + 'K+';
                    else if (suffixType === '+') el.innerText = Math.floor(current) + '+';
                    else el.innerText = Math.floor(current);
                }
            }, stepTime);
        };

        const observerStats = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statDivs = document.querySelectorAll('.stat-item');
                    statDivs.forEach((item, idx) => {
                        const numSpan = item.querySelector('.stat-number');
                        if (numSpan) {
                            let raw = numSpan.innerText;
                            if (raw.includes('K+')) animateNumber(numSpan, 50000, 'K+');
                            else if (raw.includes('+')) animateNumber(numSpan, parseInt(raw), '+');
                            else animateNumber(numSpan, parseInt(raw), '');
                        }
                    });
                    observerStats.disconnect();
                }
            });
        }, { threshold: 0.5 });
        const aboutSection = document.querySelector('#about');
        if (aboutSection) observerStats.observe(aboutSection);

        // background shapes (original style)
        const icons = ["bi-controller", "bi-stars", "bi-lightning", "bi-circle", "bi-square", "bi-triangle", "bi-dice-5", "bi-dice-6", "bi-bug", "bi-joystick"];
        const shapeContainer = document.querySelector(".bg-shapes");
        if (shapeContainer) {
            for (let i = 0; i < 50; i++) {
                const span = document.createElement("i");
                const icon = icons[Math.floor(Math.random() * icons.length)];
                span.classList.add("bi", icon, "shape");
                span.style.left = Math.random() * 100 + "vw";
                const size = Math.random() * 22 + 12;
                span.style.fontSize = size + "px";
                span.style.animationDuration = (Math.random() * 15 + 10) + "s";
                span.style.animationDelay = Math.random() * 12 + "s";
                shapeContainer.appendChild(span);
            }
        }

        // tiny parallax (hero gentle move)
// Fixed Parallax - only affects hero background, not layout
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    const particles = document.querySelector('#particles-js');
    
    // Only move the backgrounds, not the hero container itself
    if (heroBg && scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    if (particles && scrolled < window.innerHeight) {
        particles.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});