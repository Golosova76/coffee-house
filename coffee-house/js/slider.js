"use strict"

document.addEventListener("DOMContentLoaded", function() {
  const wrapper = document.querySelector('.slider__items');
  const slides = wrapper.querySelectorAll('.slider__item.content');
  const prevButton = document.querySelector('.slider__button-prev');
  const nextButton = document.querySelector('.slider__button-next');
  let slideWidth = slides[0].offsetWidth;
  let currentSlide = 0;
  let autoSlidernterval;
  
  function getSlideOffset(index) {
    return -(index * slideWidth);
  }

  function moveSlider(slideIndex) {
    const offset = getSlideOffset(slideIndex);
    wrapper.style.transform = `translateX(${offset}px)`;
    currentSlide = slideIndex;
  }

  function moveNext() {
    if (currentSlide < slides.length - 1) {
      moveSlider(currentSlide + 1);
    } else {
      moveSlider(0);
    }
  }

  function movePrev() {
    if (currentSlide > 0) {
      moveSlider(currentSlide - 1);
    } else {
      moveSlider(slides.length - 1);
    }
  }

  function autoSlider() {
    moveNext();
  }

  function startAutoSlider() {
    autoSlidernterval = setInterval(autoSlider, 2000); //автоматперелистывание 5 сек (на время верстки 2 сек)
  }

  function resetAutoSlider() {
    clearInterval(autoSlidernterval);
    startAutoSlider();
  }

  startAutoSlider();

  nextButton.addEventListener('click', moveNext);
  prevButton.addEventListener('click', movePrev);
  


  //DON'T TOUCH!!!!!
});