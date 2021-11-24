const burgerMenu = document.querySelector('.header__burger'),
    nav = document.querySelector('.header__list');

burgerMenu.addEventListener('click', (event) => {
    let target = event.target;
    document.body.classList.toggle('lock');
    document.body.classList.toggle('opacity');
    if (!nav.contains(target) && burgerMenu.contains(target)) {
        burgerMenu.classList.toggle('active');
        nav.classList.toggle('active');
    }
});