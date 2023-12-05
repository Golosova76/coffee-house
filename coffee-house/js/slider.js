"use strict"

document.addEventListener("DOMContentLoaded", function() {
  const wrapper = document.querySelector('.slider__items');
  const slides = wrapper.querySelectorAll('.slider__item.content');
  const prevButton = document.querySelector('.slider__button-prev');
  const nextButton = document.querySelector('.slider__button-next');
  const progressBar = document.querySelectorAll('.slider__pagination .slider__line');  
  const sliderInterval = 5000; //автоматперелистывание 5 сек (на время верстки 2 сек)
  let slideWidth = slides[0].offsetWidth;
  let currentSlide = 0;
  let autoSlidernterval;
  let progressInterval;
    
  function getSlideOffset(index) {
    return -(index * slideWidth);
  }

  function moveSlider(slideIndex) {
    const offset = getSlideOffset(slideIndex);
    wrapper.style.transform = `translateX(${offset}px)`;
    currentSlide = slideIndex;
    resetProgressBar();
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
    autoSlidernterval = setInterval(autoSlider, sliderInterval);
    startProgressBar();
  }

  function resetAutoSlider() {
    clearInterval(autoSliderInterval);
    clearInterval(progressInterval);
    resetProgressBar();
  }

  function startProgressBar() {
    //progressBar[currentSlide].style.width = '100%';
    progressBar[currentSlide].style.backgroundColor = '#665F55';
    let progress = 0;
    progressInterval = setInterval(() => {
      progress += (100 / (sliderInterval / 100));
      progressBar[currentSlide].style.background = `linear-gradient(to right, #665F55 ${Math.min(progress, 100)}%, #C1B6AD ${Math.min(progress, 100)}%)`;
      if (progress >= 100) {
        clearInterval(progressInterval);
        progressBar[currentSlide].style.background = '#C1B6AD';
      }
    }, 100);
  }

  function resetProgressBar() {
    clearInterval(progressInterval);
    //progressBar[currentSlide].style.width = '40px';
    progressBar[currentSlide].style.backgroundColor = '#C1B6AD';
    startProgressBar();
  }

  nextButton.addEventListener('click', moveNext);
  prevButton.addEventListener('click', movePrev);
  
  startAutoSlider();


  //DON'T TOUCH!!!!!
});

