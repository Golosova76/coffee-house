"use strict"

document.addEventListener("DOMContentLoaded", function() {

  //burger menu
  const iconMenu = document.querySelector('.icon-menu');
  const menuBody = document.querySelector('.header__menu')
  
  if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
      document.body.classList.toggle('lock');
      iconMenu.classList.toggle('menu-active');
      menuBody.classList.toggle('menu-active');
    });
  }

  document.addEventListener('click', function(event) {
    let isClickInsideMenu = menuBody.contains(event.target);
    let isClickOnButton = iconMenu.contains(event.target);

    if (!isClickInsideMenu && !isClickOnButton && menuBody.classList.contains('menu-active')) {
      document.body.classList.remove('lock');
      iconMenu.classList.remove('menu-active');
      menuBody.classList.remove('menu-active');
    }
  });
  //burger menu

  //click scrolling
  const menuLinks = document.querySelectorAll('.menu-header__link[data-goto]');
  
  if (menuLinks.length > 0) {
    
    menuLinks.forEach(menulink => {
      menulink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick (e) {
      const menuLink = e.target;
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {     
        const gotoBlock = document.querySelector(menuLink.dataset.goto);
        
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY;      
  
        if (iconMenu.classList.contains('menu-active')) {
          document.body.classList.remove('lock');
          iconMenu.classList.remove('menu-active');
          menuBody.classList.remove('menu-active');
        }
        window.scrollTo({
          top: gotoBlockValue,
          behavior: "smooth"
        });
        e.preventDefault();
      }
    }
  }
  //click scrolling

  

  //DON'T TOUCH!!!!!
});