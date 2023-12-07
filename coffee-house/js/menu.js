"use strict"

document.addEventListener("DOMContentLoaded", function() {
  ///////////////close and open modal
  const modalMenu = document.querySelector('.modal-menu');
  const openModalMenu = document.querySelectorAll('.tabs-menu__card');
  const closeModalButton = document.querySelector('.button-modal-close');
  //console.log(openModalMenu)

  function closeModal() {
    const modal = document.querySelector('.modal.popup-open');
    modal.classList.remove('popup-open');
    document.body.classList.remove('lock-menu');
  }
  
  function openModal() {
    modalMenu.classList.add('popup-open');
    document.body.classList.add('lock-menu');
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
        document.body.classList.remove('lock-menu');
      }
    });
  }
  addCloseListener(modalMenu, '.modal-menu__content');

  closeModalButton.addEventListener('click', closeModal); 

  ///////////////close and open modal

//DON'T TOUCH!!!!!
});  