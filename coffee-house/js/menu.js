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
          selectedCategory = 'coffee';
          coffeeButton.classList.add('menu-button-active');
          teaButton.classList.remove('menu-button-active');
          dessertButton.classList.remove('menu-button-active');
        } else if (button === teaButton) {
          selectedCategory = 'tea';
          teaButton.classList.add('menu-button-active');
          coffeeButton.classList.remove('menu-button-active');
          dessertButton.classList.remove('menu-button-active');
        } else if (button === dessertButton) {
          selectedCategory = 'dessert';
          dessertButton.classList.add('menu-button-active');
          coffeeButton.classList.remove('menu-button-active');
          teaButton.classList.remove('menu-button-active');
        }
        updateDisplaySize();
      });
    });
  }

  function showCardsByCategory(category, limit = null) {
    const productsContainer = document.querySelector('.tabs-menu__body');
    //класс для плавного исчезновения
    productsContainer.classList.add('fade-out');

    // setTimeout для задержки перед обновлением контента
    setTimeout(() => {
      const filteredProducts = products.filter(product => product.category === category);
      productsContainer.innerHTML = '';

      let displayProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;

      // Генерируем и отображаем карточки
      displayProducts.forEach(product => {
        const cardElement = createCardElement(product);
        productsContainer.appendChild(cardElement);
        cardElement.addEventListener('click', () => {
          openModal(product);
        });
      });
      
      productsContainer.classList.remove('fade-out');
      productsContainer.classList.add('fade-in');
    }, 300); // 300ms для совпадения с продолжительностью анимации fade-out
  }


  function updateDisplaySize() {
    const windowWidth = window.innerWidth;
    const showMoreButton = document.querySelector('.menu__load');
    const filteredProducts = products.filter(product => product.category === selectedCategory);
    
    if (windowWidth <= 768 && filteredProducts.length > 4) {
      showCardsByCategory(selectedCategory, 4);
      showMoreButton.style.display = 'block';
    } else {
      showCardsByCategory(selectedCategory);
      showMoreButton.style.display = (windowWidth > 768 || filteredProducts.length <= 4) ? 'none' : 'block';
    }
  }
  
  document.querySelector('.menu__loader').addEventListener('click', () => {
    showCardsByCategory(selectedCategory);
    document.querySelector('.menu__load').style.display = 'none'; 
  });
  
  window.addEventListener('resize', updateDisplaySize);

  updateDisplaySize(); 

//============Categories of products
//============close and open modal
  const modalMenu = document.querySelector('.modal-menu');
  const closeModalButton = document.querySelector('.button-modal-close');
  const body = document.querySelector('body');
  const modalName = document.querySelector('.modal-menu__title');
  const modalText = document.querySelector('.modal-menu__text');
  const modalImage = document.querySelector('.modal-menu__image-ibg img');
  const modalSizesButtons = document.querySelectorAll('.menu-size__button');
  const modalAdditivesButtons = document.querySelectorAll('.menu-additives__button');
  const modalTotal = document.querySelector('.menu-price__count');
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
    resetAdditivesState();
    resetSizeState();
  }
  
  function openModal(product) {
    modalName.textContent = product.name;
    modalText.textContent = product.description;
    modalImage.src = product.image;
    modalTotal.textContent = `$${product.price}`;

    let totalPriceAdditives = 0;
    let totalPriceSize = 0;

    const updateTotalPrice = () => {
      const totalPrice = parseFloat(product.price) + parseFloat(totalPriceSize) + parseFloat(totalPriceAdditives);
      modalTotal.textContent = `$${totalPrice.toFixed(2)}`;
    };
    
    modalSizesButtons.forEach((button, index) => {
      const sizeKey = Object.keys(product.sizes)[index];
      const sizeValue = product.sizes[sizeKey];
      
      const sizeSpan = button.querySelector('.menu-size__name');
      const volumeSpan = button.querySelector('.menu-size__volume');
      
      sizeSpan.textContent = sizeKey.toUpperCase();
      volumeSpan.textContent = sizeValue.size;
      
      button.addEventListener('click', () => {
        modalSizesButtons.forEach(btn => btn.classList.remove('size-active'));
        button.classList.add('size-active');
        const size = sizeKey;
        totalPriceSize = parseFloat(product.sizes[size]['add-price']);
        updateTotalPrice();
      });
    });

    const additiveStates = Array.from({ length: modalAdditivesButtons.length }).fill(false);
    
    modalAdditivesButtons.forEach((button, index) => {
      const additive = product.additives[index];
      const additiveName = button.querySelector('.menu-additives__name');
      const additiveIndex = button.querySelector('.menu-additives__index');

      additiveName.textContent = additive.name;
      additiveIndex.textContent = (index + 1).toString();

      button.addEventListener('click', () => {
        // Изменение состояния кнопки добавки
        additiveStates[index] = !additiveStates[index];

        // Применение стилей в зависимости от состояния
        if (additiveStates[index]) {
          button.classList.add('additives-active');
        } else {
          button.classList.remove('additives-active');
        }
        totalPriceAdditives = calculateTotalPrice(product, additiveStates);
        updateTotalPrice();
      });
    });

    function calculateTotalPrice(product, additiveStates) {
      let total = 0;

      // Расчет цены за выбранные добавки
      additiveStates.forEach((isActive, index) => {
        if (isActive) {
          total += parseFloat(product.additives[index]['add-price']);
        }
      });

      return total;
    }
    
    modalMenu.classList.add('popup-open');
    if (modalMenu && unlock) {
      bodyLock();
    } 
  }

  function resetAdditivesState() {
    modalAdditivesButtons.forEach(button => {
      button.classList.remove('additives-active');
    });
  }

  function resetSizeState() {
    modalSizesButtons.forEach((button, index) => {
      if (index === 0) {
        button.classList.add('size-active');
      } else {
        button.classList.remove('size-active');
      }
    });
  }

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
//============close and open modal
});