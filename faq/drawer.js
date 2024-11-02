document.addEventListener('click', function (event) {
    if (event.target.classList.contains('drawer-toggle')) {
        const drawerId = event.target.getAttribute('datadrawer-toggle');
        
        const drawerContent = document.querySelector(`.drawer[datadrawer="${drawerId}"] .drawer-content`);
        
        const isOpen = drawerContent.style.display === 'block';
        
        const allDrawerContents = document.querySelectorAll('.drawer-content');
        const allDrawerToggles = document.querySelectorAll('.drawer-toggle');
        allDrawerContents.forEach(content => content.style.display = 'none');
        allDrawerToggles.forEach(toggle => toggle.classList.remove('open'));

        if (!isOpen) {
            drawerContent.style.display = 'block';
            event.target.classList.add('open');
        }
    }
});
