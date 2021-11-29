// mobile navbar
const burger = document.querySelector("#burger");
const closeIcon = document.querySelector("#close");
const mobileBtn = document.querySelector("#mobileBtn");
const navMenu = document.querySelector("#mobileNav");
const body = document.querySelector("body");

mobileBtn.addEventListener('click', () => {
    burger.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
    navMenu.classList.toggle('hidden');
    body.classList.toggle('no-scroll');
});
