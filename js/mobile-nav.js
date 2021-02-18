"use strict";
{
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileMenu = document.querySelector(".mobile-menu");
  let targetItem = null;
  let currentList = null;

  const findTargetItem = (className) => {
    while (!targetItem.classList.contains(className)) {
      targetItem = targetItem.parentNode;
      if (targetItem.nodeName === "BODY") {
        targetItem = null;
        return;
      }
    }
  };

  const slideMobileNav = () => {};
  const dropdownMenu = () => {};

  const navClickHandler = (e) => {
    targetItem = e.target;
    findTargetItem("nav-active-btn");
    if (targetItem && targetItem.classList.contains("nav-active-btn")) {
      document.body.style.overflowY = "hidden";
      mobileMenu.style.transform = `translateX(0)`;
    }
    targetItem = e.target;
    findTargetItem("nav-inactive-btn");
    if (targetItem && targetItem.classList.contains("nav-inactive-btn")) {
      document.body.style.overflowY = "visible";
      mobileMenu.style.transform = `translateX(-100%)`;
      currentList.style.height = 0;
    }
    targetItem = e.target;
    findTargetItem("dropdown-menu");
    if (currentList) {
      currentList.style.height = 0;
    }
    if (targetItem && targetItem.classList.contains("dropdown-menu")) {
      currentList = targetItem.childNodes[3];
      currentList.style.height = `${currentList.scrollHeight}px`;
    }
  };

  mobileNav.addEventListener("click", navClickHandler);
}
