"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");

const userProfile = document.querySelector("#user-profile");
const editProfile = document.querySelector("#edit-profile");
const editPassword = document.querySelector("#edit-password");
const username = document.querySelector("#username");
const updatePassword = document.querySelector("#update-password");
const updatePassword2 = document.querySelector("#update-password-2");
const saveUserName = document.querySelector("#save-user-name");

username.addEventListener("click", function (e) {
  e.preventDefault();
  userProfile.classList.toggle("hide");
  editProfile.classList.toggle("hide");
});

updatePassword.addEventListener("click", function (e) {
  e.preventDefault();
  editPassword.classList.toggle("hide");
  userProfile.classList.toggle("hide");
});

updatePassword2.addEventListener("click", function (e) {
  e.preventDefault();
  editPassword.classList.toggle("hide");
  editProfile.classList.toggle("hide");
});

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  // console.log(e.key);

  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
