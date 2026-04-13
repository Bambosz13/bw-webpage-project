document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    function navigate(targetId) {
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        const targetPage = document.getElementById(targetId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
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
});
