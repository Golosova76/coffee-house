"use strict"
import products from '../js/products.json' assert { type: 'json'}

document.addEventListener("DOMContentLoaded", function() {
//============Categories of products

  //const productsData = products; //массив объектов для работы
  //console.log(products);

  function createCardElement(product) {
    const li = document.createElement('li');
    li.classList.add('tabs-menu__item');

    const article = document.createElement('article');
    article.classList.add('tabs-menu__card');

    const h2 = document.createElement('h2');
    h2.classList.add('visually-hidden');
    h2.textContent = 'Product Card';

    const divImage = document.createElement('div');
    divImage.classList.add('tabs-menu__image');

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;

    const divContent = document.createElement('div');
    divContent.classList.add('tabs-menu__content');

    const divTitle = document.createElement('div');
    divTitle.classList.add('tabs-menu__title');
    divTitle.textContent = product.name;

    const divText = document.createElement('div');
    divText.classList.add('tabs-menu__text');
    divText.textContent = product.description;

    const divPrice = document.createElement('div');
    divPrice.classList.add('tabs-menu__price');
    divPrice.textContent = `$${product.price}`;

    divImage.appendChild(img);
    divContent.appendChild(divTitle);
    divContent.appendChild(divText);
    divContent.appendChild(divPrice);

    article.appendChild(h2);
    article.appendChild(divImage);
    article.appendChild(divContent);

    li.appendChild(article);

    return li;
  }


  const coffeeButton = document.querySelector('.button-coffee');
  const teaButton = document.querySelector('.button-tea');
  const dessertButton = document.querySelector('.button-dessert');
  const choiceButtons = document.querySelectorAll('.tabs-menu__button');
  let selectedCategory = 'coffee';

  if (choiceButtons.length > 0) {
    choiceButtons.forEach(button => {
      button.addEventListener('click', () => {
        if (button === coffeeButton) {
          showCardsByCategory('coffee');
          teaButton.classList.remove('menu-button-active');
          dessertButton.classList.remove('menu-button-active');
          coffeeButton.classList.add('menu-button-active');
        }
        if (button === teaButton) {
          showCardsByCategory('tea');
          coffeeButton.classList.remove('menu-button-active');
          dessertButton.classList.remove('menu-button-active');
          teaButton.classList.add('menu-button-active');
        }
        if (button === dessertButton) {
          showCardsByCategory('dessert');
          coffeeButton.classList.remove('menu-button-active');
          teaButton.classList.remove('menu-button-active');
          dessertButton.classList.add('menu-button-active');
        }
      });
    });
  }

  showCardsByCategory(selectedCategory);
  

  function showCardsByCategory(category) {
    const filteredProducts = products.filter(product => product.category === category);
    const productsContainer = document.querySelector('.tabs-menu__body');
    productsContainer.innerHTML = '';

  // Генерируем и отображаем карточки
    filteredProducts.forEach(product => {
      const cardElement = createCardElement(product);
      productsContainer.appendChild(cardElement);
      cardElement.addEventListener('click', () => {
            openModal(product);
        });
    });
  }



//============Categories of products


///////////////close and open modal
  const modalMenu = document.querySelector('.modal-menu');
  const openModalMenu = document.querySelectorAll('.tabs-menu__card');
  const closeModalButton = document.querySelector('.button-modal-close');
  const body = document.querySelector('body'); 
  const timeout = 500;
  let unlock = true;

  function closeModal() {
    const modal = document.querySelector('.modal.popup-open');    
    if (modal) {
      modal.classList.remove('popup-open');
      if (unlock) {
        bodyUnLock();
      }
    } 
  }
  
  function openModal(product) {
    const modalName = document.querySelector('.modal-menu__title');
    const modalText = document.querySelector('.modal-menu__text');
    const modalImage = document.querySelector('.modal-menu__image-ibg img')

    modalName.textContent = product.name;
    modalText.textContent = product.description;
    modalImage.src = product.image;
    
    modalMenu.classList.add('popup-open');
    if (modalMenu && unlock) {
      bodyLock();
    }
  }

  /*

  if (openModalMenu.length > 0) {
    document.body.addEventListener('click', (event) => {
      const clickedCard = event.target.closest('.tabs-menu__card');
      if (clickedCard) {
        const productData = clickedCard.product;
        openModal(productData);
      }
    });
  }
  */


  function addCloseListener(modal, contentClass) {
    modal.addEventListener('click', function(e) {
      if (!e.target.closest(contentClass)) {
        closeModal();
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