"use strict";
{
  const picnic = document.querySelector(".picnic");
  const picnicTitle = document.querySelector(".picnic .banner-title");
  const categoryImgs = document.querySelectorAll(".category-img");
  let portableDeviceWidth = false;

  const scaleAnimation = (element) => {
    //element가 화면에 보이기 시작하는 시점 (element의 Y 위치 - window의 높이)
    const startPosition =
      window.pageYOffset +
      element.getBoundingClientRect().top -
      window.innerHeight;
    //element의 중간에 도달한 시점
    const endPosition = startPosition + element.offsetHeight / 2;
    //해당 element에서 스크롤이 이동한 위치
    const currentscrollPosition = window.pageYOffset - startPosition;
    //이벤트 활성 범위
    const scrollRange = endPosition - startPosition;
    //이벤트 활성 범위에서 스크롤이 움직인 값의 비율
    const scrollRatio = currentscrollPosition / scrollRange;
    if (
      window.pageYOffset > startPosition &&
      window.pageYOffset < endPosition
    ) {
      //scale 범위 1 ~ 0.75(endValue - startValue + initValue)
      element.style.transform = `scale(${1 - scrollRatio * 0.25})`;
    }
  };
  const opacityAnimation = (element) => {
    const startPosition =
      window.pageYOffset +
      element.getBoundingClientRect().top -
      window.innerHeight / 2;
    const endPosition = startPosition + element.offsetHeight / 2;
    const currentscrollPosition = window.pageYOffset - startPosition;
    const scrollRange = endPosition - startPosition;
    const scrollRatio = currentscrollPosition / scrollRange;
    if (
      window.pageYOffset > startPosition &&
      window.pageYOffset < endPosition
    ) {
      element.style.opacity = scrollRatio;
    }
  };
  const stickyAnimation = (element) => {
    const startPosition =
      window.pageYOffset + picnic.getBoundingClientRect().top;
    const endPosition =
      startPosition + picnic.offsetHeight - element.offsetHeight;
    if (
      window.pageYOffset > startPosition &&
      window.pageYOffset < endPosition
    ) {
      element.classList.add("animation-sticky");
      element.style.marginTop = 0;
    } else {
      element.classList.remove("animation-sticky");
      if (window.pageYOffset < startPosition) {
        element.style.marginTop = 0;
      } else if (window.pageYOffset > endPosition) {
        element.style.marginTop = `${
          picnic.offsetHeight - element.offsetHeight
        }px`;
      }
    }
  };
  const scrollHandler = () => {
    if (portableDeviceWidth.matches) {
      stickyAnimation(picnicTitle);
      categoryImgs.forEach((categoryImg) => {
        categoryImg.classList.add("animation-scale");
      });
    } else {
      categoryImgs.forEach((categoryImg) => {
        categoryImg.classList.remove("animation-scale");
      });
    }
    const transformAniItems = document.querySelectorAll(".animation-scale");
    const opacityAniItems = document.querySelectorAll(".animation-opacity");

    transformAniItems.forEach((transformAniItem) => {
      scaleAnimation(transformAniItem);
    });
    opacityAniItems.forEach((opacityAniItem) => {
      opacityAnimation(opacityAniItem);
    });
  };
  const checkMediaQuery = () => {
    portableDeviceWidth = window.matchMedia("( max-width: 992px )");
  };
  window.addEventListener("load", checkMediaQuery);

  window.addEventListener("resize", checkMediaQuery);
  window.addEventListener("scroll", scrollHandler);
}
