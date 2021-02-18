"use strict";

{
  const slideContainer = document.querySelector(".slide-container");
  const slideWrapper = document.querySelector(".slide-wrapper");
  let currentIndex = 0;
  let timer = null;

  //slide itme clone
  const firstChild = slideWrapper.firstElementChild;
  const lastChild = slideWrapper.lastElementChild;
  const clonedFrist = firstChild.cloneNode(true);
  const clonedLast = lastChild.cloneNode(true);
  slideWrapper.append(clonedFrist);
  slideWrapper.prepend(clonedLast);

  const slideItems = document.querySelectorAll(".slide-item");
  const sldieLength = slideItems.length;

  const setLayout = () => {
    slideItems.forEach((slideItem, index) => {
      slideItem.style.left = `${index * 100}%`;
    });
    slideContainer.style.height = `${slideItems[0].clientHeight}px`;
  };
  const moveToslide = (indexNum) => {
    indexNum = currentIndex;
    slideWrapper.style.transform = `translateX(${-100 * (currentIndex + 1)}%)`;
  };
  const goToSlide = () => {
    moveToslide();
    slideWrapper.classList.add("active");
  };
  const returnToSlide = () => {
    moveToslide(currentIndex);
    slideWrapper.classList.remove("active");
  };

  const goToPrev = () => {
    if (currentIndex > -1) {
      currentIndex--;
      goToSlide();
    }
    if (currentIndex === -1) {
      setTimeout(() => {
        currentIndex = sldieLength - 3;
        returnToSlide();
      }, 1001);
    }
  };
  const goToNext = () => {
    if (currentIndex < sldieLength - 2) {
      currentIndex++;
      goToSlide();
    }
    if (currentIndex === sldieLength - 2) {
      setTimeout(() => {
        currentIndex = 0;
        returnToSlide();
      }, 1001);
    }
  };
  const autoSlide = () => {
    timer = setInterval(goToNext, 3000);
  };
  const stopSlide = () => {
    clearInterval(timer);
  };
  const slideClickHandler = (e) => {
    const targetItem = e.target;

    if (targetItem.classList.contains("next-btn")) {
      goToNext();
    }
    if (targetItem.classList.contains("prev-btn")) {
      goToPrev();
    }
  };

  moveToslide(0);
  autoSlide();
  window.addEventListener("load", setLayout);
  window.addEventListener("resize", setLayout);
  slideContainer.addEventListener("mouseenter", stopSlide);
  slideContainer.addEventListener("mouseleave", autoSlide);
  slideContainer.addEventListener("click", slideClickHandler);
}
