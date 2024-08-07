"use strict";
const btnNav = document.querySelector(".btn-mobile-nav");
const header = document.querySelector(".header");
const subheading = document.querySelector(".sub-heading");
const cardCnt = document.querySelector(".card-cnt");

btnNav.addEventListener("click", function () {
  header.classList.toggle("nav-open");
  cardCnt.classList.toggle("pointer");
});

const nav = document.querySelector(".header").getBoundingClientRect().height;

const callBack = (e) => {
  const entry = e[0];
  // if (entry.isIntersecting === false) {
  //   document.body.classList.add("sticky");
  // }
  // if (entry.isIntersecting === true) {
  //   document.body.classList.remove("sticky");
  // }
};

const option = {
  root: null,
  rootMargin: `-${nav}px`,
  treshold: 0,
};
const observer = new IntersectionObserver(callBack, option);
observer.observe(subheading);
