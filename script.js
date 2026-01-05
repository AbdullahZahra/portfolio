document.addEventListener('DOMContentLoaded', () => {
    // Form handling
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real scenario, this would send data to a backend
            const btn = form.querySelector('button');
            const originalText = btn.textContent;

            btn.textContent = 'Message Sent!';
            btn.style.backgroundColor = '#4ade80'; // Success green
            btn.style.color = '#000';

            form.reset();

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                btn.style.color = '';
            }, 3000);
        });
    }

    // Scroll animation observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe all elements with .reveal class
    document.querySelectorAll('.reveal, .stagger-container').forEach(el => {
        observer.observe(el);
    });

    // 3D Tilt Effect
    document.querySelectorAll('.choice-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg rotation
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
});
