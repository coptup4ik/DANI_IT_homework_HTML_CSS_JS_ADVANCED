let menuButton = document.querySelector('.hamburger');
menuButton.addEventListener('click',()=>{
  let menu = document.querySelector('.menu');
  menu.classList.toggle('active');
  menuButton.classList.toggle('is-active')
});