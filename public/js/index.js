import { signup } from "./signup";
import { login } from "./login";
import { closeAlert } from "./alert";
import { feedback, reviews } from "./feedback";
import { cards } from "./apiScript";
import { pageData } from "./apiPageScript";
import { profileFun } from "./profileScript";
import { forgotPasswordFunction } from "./forgotScript";
import { resetPasswordFunction } from "./resetScript";

const signBtn = document.querySelector("#sign-btn");
const loginBtn = document.querySelector("#login-btn");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const feed = document.querySelector(".cta-btn");
const profile = document.querySelector("#profile_");
reviews();
if (window.location.href.includes("apiVerse/api")) {
  cards();
}

if (window.location.href.includes("apiVerse/apiPage")) {
  pageData();
}

if (window.location.href.includes("apiVerse/profile")) {
  profileFun();
}

if (window.location.href.includes("apiVerse/forgotPassword")) {
  forgotPasswordFunction();
}
if (window.location.href.includes("apiVerse/resetPassword/")) {
  resetPasswordFunction();
}

if (btnCloseModal) {
  btnCloseModal.addEventListener("click", closeAlert);
  overlay.addEventListener("click", closeAlert);
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeAlert();
  }
});
if (signBtn) {
  signBtn.addEventListener("click", signup);
}
if (loginBtn) {
  loginBtn.addEventListener("click", login);
}

if (feed) {
  feed.addEventListener("click", feedback);
}
