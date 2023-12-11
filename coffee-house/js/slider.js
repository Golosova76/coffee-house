"use strict"

document.addEventListener("DOMContentLoaded", function() {
  const wrapper = document.querySelector('.slider__items');
  const slides = wrapper.querySelectorAll('.slider__item.content');
  const prevButton = document.querySelector('.slider__button-prev');
  const nextButton = document.querySelector('.slider__button-next');
  const progressBar = document.querySelectorAll('.slider__pagination .slider__line');
  const sliderInterval = 5000; //автоматперелистывание 5 сек
  let slideWidth = slides[0].offsetWidth;
  let currentSlide = 0;
  let autoSliderInterval;
  let progressInterval;
  let progressAnimationFrame;
  let progress = 0; // переменная для отслеживания прогресса
  let startTime = Date.now(); // переменная для отслеживания времени старта
  let cursorHovered = false;
  const MAX_PROGRESS = 100; //макс значение прогресса в %
  
    
  function getSlideOffset(index) {
    return -(index * slideWidth);
  }

  function moveSlider(slideIndex) {
    const offset = getSlideOffset(slideIndex);
    wrapper.style.transform = `translateX(${offset}px)`;
    resetProgressBar(currentSlide);
    currentSlide = slideIndex;
    startProgressBar();
  }

  function moveNext() {
    if (currentSlide < slides.length - 1) {
      moveSlider(currentSlide + 1);
    } else {
      moveSlider(0);
    }
    resetAutoSlider();
  }

  function movePrev() {
    if (currentSlide > 0) {
      moveSlider(currentSlide - 1);
    } else {
      moveSlider(slides.length - 1);
    }
    resetAutoSlider();
  }

  function autoSlider() {
    moveNext();
  }

  function startAutoSlider() {
    autoSliderInterval = setInterval(autoSlider, sliderInterval);
    startProgressBar();
  }

  function resetAutoSlider() {
    clearInterval(autoSliderInterval);
    clearInterval(progressInterval);
    resetProgressBar();
    startAutoSlider();
  }

  nextButton.addEventListener('click', moveNext);
  prevButton.addEventListener('click', movePrev);

  function startProgressBar() {
    function animate() {
      if (!cursorHovered) {
        progress = Math.min((Date.now() - startTime) / sliderInterval * MAX_PROGRESS, MAX_PROGRESS);
      }

      progressBar[currentSlide].style.background = `linear-gradient(to right, 
        #665F55 ${progress}%,
        #C1B6AD ${progress}%)`;

      if (progress < MAX_PROGRESS) {
        progressAnimationFrame = requestAnimationFrame(animate);
      } else {
        resetProgressBar();
        moveNext();
      }
    }
    cancelAnimationFrame(progressAnimationFrame);
    progressAnimationFrame = requestAnimationFrame(animate);
  }

  function resetProgressBar() {
    progressBar.forEach(bar => bar.style.background = '#C1B6AD');
    startTime = Date.now(); // Сброс времени начала
    progress = 0; // Сброс прогресса
  }

  // Функции обработки событий мыши
  wrapper.addEventListener('mouseenter', function() {
    cursorHovered = true;
    cancelAnimationFrame(progressAnimationFrame); // Остановить анимацию прогресса
  });

  wrapper.addEventListener('mouseleave', function() {
    cursorHovered = false;
    startProgressBar(); // Возобновить анимацию прогресса
  });


  //свайп вправо/влево касанием 
  let touchStartX = 0;
  let touchEndX = 0;
  
  wrapper.addEventListener("touchstart", function (event) {
    touchStartX = event.touches[0].clientX;
  });

  wrapper.addEventListener("touchmove", function (event) {
    touchEndX = event.touches[0].clientX;
  });

  wrapper.addEventListener("touchend", function () {
    makeSwipe();
  });

  function makeSwipe() {
    const swipeMin = 50; // Минимальное расстояние для считывания свайпа    
    const swipeDistance = touchEndX - touchStartX;
    if (swipeDistance > swipeMin) {
      movePrev();
    } else if (swipeDistance < -swipeMin) {
      moveNext();
    }
  }
  //свайп вправо/влево касанием


  //DON'T TOUCH!!!!!
  startAutoSlider();  
  
  //DON'T TOUCH!!!!!
});

