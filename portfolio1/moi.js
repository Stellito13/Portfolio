document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '50px'
    });

    const blocks = document.querySelectorAll('.experience-block');
    blocks.forEach((block, index) => {
        block.style.transitionDelay = `${index * 0.3}s`;
        observer.observe(block);
    });
});





document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Check if all fields are filled
        if (name && email && subject && message) {
            showPopup('Message envoyé avec succès !', 'success');
            form.reset();
        } else {
            showPopup('Veuillez remplir tous les champs', 'error');
        }
    });
});

function showPopup(message, type) {
    const popup = document.createElement('div');
    popup.className = `popup ${type}`;
    popup.textContent = message;
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.remove();
    }, 3000);
}
