"use strict";
import { alert } from "./alert";
import axios from "axios";
const message = document.querySelector(".modal-text");

export const login = async function (e) {
  try {
    e.preventDefault();
    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#login-password").value;
    const URL = "/apiVerse/v1/users/login";
    const cred = {
      email: email,
      password: password,
    };
    const res = await axios.post(URL, cred);
    if (res.data.status === "success") {
      window.location.href = "/apiVerse/index";
      console.log("success");
    }
  } catch (err) {
    message.textContent = err.response.data.message;
    alert();
  }
};
