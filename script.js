window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[data-target]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = link.getAttribute('data-target');
        });
    });

    // petite animation de fond avec JavaScript
    document.body.style.opacity = 0;
    document.body.style.transition = 'opacity 0.5s ease-in';
    requestAnimationFrame(() => {
        document.body.style.opacity = 1;
    });
});
