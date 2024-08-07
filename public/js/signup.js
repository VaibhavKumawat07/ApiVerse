"use strict";
import { alert } from "./alert";
import axios from "axios";
const message = document.querySelector(".modal-text");

export const signup = async function (e) {
  try {
    e.preventDefault();

    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confrim-password").value;
    const URL = "/apiVerse/v1/users/signup";
    const cred = {
      name: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    const res = await axios.post(URL, cred);
    if (res.data.status === "success") {
      window.location.href = "/ApiVerse/index";
      console.log("success");
    }
  } catch (err) {
    message.textContent = err.response.data.message;
    alert();
  }
};
