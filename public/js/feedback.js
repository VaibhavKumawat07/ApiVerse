"use strict";
import { alert } from "./alert";
import axios from "axios";
const message = document.querySelector(".modal-text");
const modalMessage = document.querySelector(".modal-heading");
const cnt = document.querySelector("#feedback-nav");
const rev = document.querySelector(".reviews-cnt");
export const feedback = async function (e) {
  try {
    e.preventDefault();
    const name = document.querySelector("#fullName").value;
    const user_review = document.querySelector("#feedback").value;
    const URL = "/apiVerse/v1/reviews";

    const cred = {
      name: name,
      user_review: user_review,
    };
    const res = await axios.post(URL, cred);
    if (res.data.status === "success") {
      modalMessage.textContent = "Success ✔️";
      message.textContent = res.data.message;
      cnt.classList.add("overlay");
      alert();
    }
  } catch (err) {
    message.textContent = err.response.data.message;
    cnt.classList.add("overlay");
    alert();
  }
};

export const reviews = async function () {
  try {
    const URL = "/apiVerse/v1/reviews?page=1&limit=4?sort=createdAt";
    const res = await axios.get(URL);
    const value = res.data.message;
    value.forEach((arr) => {
      const reviewsCnt = `  <div class="review first">
            <p class="review-text">${arr.user_review}              
            </p>
            <span class="review-text name">${arr.name}</span>
          </div>`;
      if (rev != null) rev.insertAdjacentHTML("afterbegin", reviewsCnt);
    });
  } catch (err) {
    console.log(err);
  }
};

// reviews();
