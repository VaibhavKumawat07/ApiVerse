"use strict";
import { alert } from "./alert";
import axios from "axios";

const reset = async function (e) {
  try {
    e.preventDefault();
    const newPass = document.querySelector("#new-password");
    const confirm = document.querySelector("#confirm");
    const message = document.querySelector(".model-text");
    const heading = document.querySelector(".model-heading");
    const link = window.location.href.split("resetPassword/");
    console.log(newPass.value, confirm.value);
    const token = link[1];
    const URL = `/apiVerse/v1/users/resetPassword/${token}`;
    const cred = {
      password: newPass.value,
      confirmPassword: confirm.value,
    };
    const res = await axios.patch(URL, cred);
    console.log(res);
    if (res.data.status === "success") {
      heading.textContent = "Success ✔️";
      message.textContent = res.data.message;
      window.location.href = "/apiVerse/login";
    }
  } catch (err) {
    const message = document.querySelector(".model-text");
    message.textContent = err.response.data.message;
    alert();
  }
};

const changePassword = document.querySelector("#change-password");

export const resetPasswordFunction = function () {
  changePassword.addEventListener("click", reset);
};
