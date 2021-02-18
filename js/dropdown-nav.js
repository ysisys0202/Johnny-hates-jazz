"use strict";
{
  const mainNav = document.querySelector(".main-nav");
  let targetItem = null;

  const findTargetItem = (className) => {
    while (!targetItem.classList.contains(className)) {
      targetItem = targetItem.parentNode;
      if (targetItem.nodeName === "BODY") {
        targetItem = null;
        return;
      }
    }
  };
  const mouseOutHandler = (e) => {
    targetItem = e.target;
    findTargetItem("dropdown-nav");
    if (targetItem && targetItem.classList.contains("dropdown-nav")) {
      const currentList = targetItem.childNodes[3];
      currentList.style.height = `0px`;
    }
  };
  const mouseOverHandler = (e) => {
    targetItem = e.target;
    findTargetItem("dropdown-nav");
    if (targetItem && targetItem.classList.contains("dropdown-nav")) {
      const currentList = targetItem.childNodes[3];
      currentList.style.height = `${currentList.scrollHeight}px`;
    }
  };
  mainNav.addEventListener("mouseover", mouseOverHandler);
  mainNav.addEventListener("mouseout", mouseOutHandler);
}
