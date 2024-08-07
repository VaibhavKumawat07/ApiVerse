"use strict";
const btnNav = document.querySelector(".btn-mobile-nav");
const header = document.querySelector(".header");
const navlink = document.querySelectorAll(".nav-link");
const footer = document.querySelector(".footer-logo");
const hero = document.querySelector("#hero-nav");
const learn = document.querySelector(".learn-more-btn");
const profile = document.querySelector("#profile_");
const login = document.querySelector("#login");
const explore = document.querySelector("#explore");
const exploreLogin = document.querySelector("#exploreLogin");

const c = document.cookie.split(";");

if (c.includes("security=xyz65478247")) {
  profile.classList.remove("profile"); //profile contain display:none property
  login.classList.add("profile");
  explore.classList.remove("profile");
  exploreLogin.classList.add("profile");
} else {
  login.classList.remove("profile");
  profile.classList.add("profile");
  explore.classList.add("profile");
  exploreLogin.classList.remove("profile");
}

btnNav.addEventListener("click", function () {
  header.classList.toggle("nav-open");
});

navlink.forEach((value) => {
  value.addEventListener("click", function (e) {
    e.preventDefault();
    const section = value.getAttribute("href");
    const goto = document.querySelector(section);
    goto.scrollIntoView({ behavior: "smooth" });
    header.classList.remove("nav-open");
  });
});

footer.addEventListener("click", (e) => {
  e.preventDefault();
  hero.scrollIntoView({ behavior: "smooth" });
});

learn.addEventListener("click", (e) => {
  e.preventDefault();
  const section = learn.getAttribute("href");
  const goto = document.querySelector(section);
  goto.scrollIntoView({ behavior: "smooth" });
});

const nav = document.querySelector(".header").getBoundingClientRect().height;

const callBack = (e) => {
  const entry = e[0];
  if (entry.isIntersecting === false) {
    document.body.classList.add("sticky");
  }
  if (entry.isIntersecting === true) {
    document.body.classList.remove("sticky");
  }
};

const option = {
  root: null,
  rootMargin: `-${nav}px`,
  treshold: 0,
};
const observer = new IntersectionObserver(callBack, option);
observer.observe(hero);
