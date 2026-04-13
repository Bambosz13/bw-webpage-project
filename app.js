document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const contactForm = document.getElementById('contactForm');

    function navigate(targetId) {
        pages.forEach(page => page.classList.remove('active'));
        const targetPage = document.getElementById(targetId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        links.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('data-target');
            navigate(targetId);
        });
    });

    const initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        navigate(initialHash);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); 
            
            const name = document.getElementById('name').value;
            
            alert(`Dziękujemy ${name}! Twoja wiadomość została wirtualnie wysłana.`);
            contactForm.reset(); 
        });
    }
});
