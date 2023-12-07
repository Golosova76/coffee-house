"use strict"

document.addEventListener("DOMContentLoaded", function() {
  const wrapper = document.querySelector('.slider__items');
  const slides = wrapper.querySelectorAll('.slider__item.content');
  const prevButton = document.querySelector('.slider__button-prev');
  const nextButton = document.querySelector('.slider__button-next');
  const progressBar = document.querySelectorAll('.slider__pagination .slider__line');
  const sliderInterval = 5000; //автоматперелистывание 5 сек (на время верстки 2 сек)
  const progressIntervalStep = 100;
  let slideWidth = slides[0].offsetWidth;
  let currentSlide = 0;
  let autoSliderInterval;
  let progressInterval;
  let progressAnimationFrame;
  let currentProgress;
  let cursorHovered = false; // Добавленная переменная
  let progressOnHover = 0; // Добавленная переменная

    
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

  function startProgressBar() {
    let progress = 0;
    let startTime;
    
    function animate() {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;

      progress += (elapsedTime / (sliderInterval / progressIntervalStep));

      progressBar[currentSlide].style.background = `linear-gradient(to right, 
        #665F55 ${Math.min(progress, 100)}%,
        #C1B6AD ${Math.min(progress, 100)}%)`;

      if (progress < 100) {
          startTime = currentTime;
          progressAnimationFrame = requestAnimationFrame(animate);
      } else {
          resetProgressBar();
          if (!cursorHovered) {
            currentProgress = 0; // Сбросить текущий 
            //прогресс только если курсор не был наведен
          }
      }
    }

    startTime = Date.now();
    progressAnimationFrame = requestAnimationFrame(animate);
  }

  function resetProgressBar(slideIndex) {
    progressBar[currentSlide].style.background = '#C1B6AD';
  }

  nextButton.addEventListener('click', moveNext);
  prevButton.addEventListener('click', movePrev);

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

 //остановка при наведении

  wrapper.addEventListener('mouseenter', function() {
  stopCarousel();
  cursorHovered = true;
  currentProgress = progressOnHover;
});

wrapper.addEventListener('mouseleave', function() {
  startAutoSlider();
  cursorHovered = false;
  currentProgress = progressOnHover;
});

  function stopCarousel() {
    clearInterval(autoSliderInterval);
    if (!cursorHovered) {
    cancelAnimationFrame(progressAnimationFrame);
  }
  }

  function startCarousel() {
    startAutoSlider();
  }


  //DON'T TOUCH!!!!!
  startAutoSlider();  
  
  //DON'T TOUCH!!!!!
});

