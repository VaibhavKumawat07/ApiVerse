"use strict";
import { alert } from "./alert";
import axios from "axios";
const message = document.querySelector(".modal-text");
const heading = document.querySelector(".modal-heading");
const saveUserNameFun = async function (e) {
  try {
    e.preventDefault();
    const userNewName = text.value === " " ? data.name : text.value;
    const cred = {
      name: userNewName,
    };
    const URL = "/apiVerse/v1/users/";
    const res = await axios.patch(URL, cred);
    if (res.data.status === "success") {
      heading.textContent = "Success💥";
      message.textContent = "Username updated✔️";
      window.location.reload();
    }
  } catch (err) {
    message.textContent = err.response.data.message;
    alert();
  }
};

const changePasswordFun = async function (e) {
  try {
    e.preventDefault();
    const passwordOld = document.querySelector("#password-old");
    const newPassword = document.querySelector("#new-password");
    const pass = passwordOld.value;
    const npass = newPassword.value;
    const cred = {
      password: pass,
      newPassword: npass,
    };
    const URL = "/apiVerse/v1/users/updatePassword";

    const res = await axios.patch(URL, cred);
    console.log(res);
    if (res.data.status === "success") {
      heading.textContent = "Success💥";
      message.textContent = "Password Changed✔️";
      alert();
      window.location.href = "/apiVerse/index";
    }
  } catch (err) {
    message.textContent = err.response.data.message;
    alert();
  }
};

const logoutFun = async function (e) {
  try {
    e.preventDefault();
    const URL = "/apiVerse/v1/users/logout";

    const res = await axios.get(URL);
    console.log(res);
    if (res.data.status === "success") {
      window.location.href = "/apiVerse/index";
    }
  } catch (err) {
    console.log(err);
  }
};

export const profileFun = async function (e) {
  try {
    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const text = document.querySelector("#text");
    const saveUserName = document.querySelector("#save-user-name");
    const changePassword = document.querySelector("#change-password");
    const logout = document.querySelector("#logout");

    const URL = "/apiVerse/v1/users/profile";
    const res = await axios.get(URL);
    const data = res.data.data;
    if (res.data.status === "Success") {
      name.value = data.name;
      email.value = data.email;
      text.value = data.name;
    }
    //Updating user name
    saveUserName.addEventListener("click", saveUserNameFun);
    //Updating password
    changePassword.addEventListener("click", changePasswordFun);
    //logout
    logout.addEventListener("click", logoutFun);
  } catch (err) {
    // message.textContent = err.response.data.message;
    // alert();
    console.log(err);
  }
};
