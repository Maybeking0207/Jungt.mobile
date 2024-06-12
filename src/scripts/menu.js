// document.querySelector('.hamburger').addEventListener('click', () => {
// document.querySelector('.nav-links').classList.toggle('expanded');
// });
document.addEventListener('DOMContentLoaded', function() {
    const navbarHamburger = document.querySelector('[data-collapse-toggle="navbar-hamburger"]');
    const navbarMenu = document.getElementById('navbar-hamburger');

    navbarHamburger.addEventListener('click', function() {
        navbarMenu.classList.toggle('hidden');
    });
});
