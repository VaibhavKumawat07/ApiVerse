const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const cnt = document.querySelector("#feedback-nav");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  if (cnt) cnt.classList.remove("overlay");
  location.reload();
};

export const alert = function () {
  openModal();
};

export const closeAlert = function () {
  closeModal();
};
