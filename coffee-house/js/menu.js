"use strict"

document.addEventListener("DOMContentLoaded", function() {
  ///////////////close and open modal
  const modalMenu = document.querySelector('.modal-menu');
  const openModalMenu = document.querySelectorAll('.tabs-menu__card');
  const closeModalButton = document.querySelector('.button-modal-close');
  const body = document.querySelector('body'); 
  const timeout = 500;
  let unlock = true;

  function closeModal() {
    const modal = document.querySelector('.modal.popup-open');
    modal.classList.remove('popup-open');
    if (unlock) {
      bodyUnLock();
    }
  }
  
  function openModal() {
    modalMenu.classList.add('popup-open');
    if (modalMenu && unlock) {
      bodyLock();
    }
  }

  if (openModalMenu.length > 0) {
    openModalMenu.forEach(modal => {
      modal.addEventListener('click', openModal);
    });
  }

  function addCloseListener(modal, contentClass) {
    modal.addEventListener('click', function(e) {
      if (!e.target.closest(contentClass)) {
        modal.classList.remove('popup-open');
        if (unlock) {
          bodyUnLock();
        }
      }
    });
  }
  addCloseListener(modalMenu, '.modal-menu__content');

  closeModalButton.addEventListener('click', closeModal); 

  ///////////////block scroll

  function bodyLock() {
    const paddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    body.style.paddingRight = paddingValue;
    body.classList.add('lock-menu');

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }  
  
  function bodyUnLock() {
    setTimeout(function () {
      body.style.paddingRight = '0px';
      body.classList.remove('lock-menu');
    }, timeout);
    
    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }
  ///////////////close and open modal

//DON'T TOUCH!!!!!
});  