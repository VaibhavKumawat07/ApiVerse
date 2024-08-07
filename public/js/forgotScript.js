"use strict";
import { alert } from "./alert";
import axios from "axios";

const forgot = async function (e) {
  try {
    e.preventDefault();
    const message = document.querySelector(".model-text");
    const heading = document.querySelector(".model-heading");
    const email = document.querySelector("#email").value;
    const URL = "/apiVerse/v1/users/forgotPassword";
    const cred = {
      email: email,
    };
    const res = await axios.post(URL, cred);
    if (res.data.status === "success") {
      heading.textContent = "Success ✔️";
      message.textContent = res.data.message;
      alert();
    }
  } catch (err) {
    const message = document.querySelector(".model-text");
    message.textContent = err.response.data.message;
    alert();
  }
};

const forgotPassword = document.querySelector("#send-email");

export const forgotPasswordFunction = function () {
  forgotPassword.addEventListener("click", forgot);
};
