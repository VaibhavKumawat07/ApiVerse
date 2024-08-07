"use strict";

// import { alert } from "./alert";
import axios from "axios";

const section = document.querySelector(".section-cnt");

export const pageData = async function () {
  try {
    const val = window.location.href;
    const arr = val.split("value=");
    const id = arr[1];
    const URL = `http://127.0.0.1:3000/apiVerse/v1/api/${id}`;
    const res = await axios.get(URL);
    const value = res.data.message[0];
    const desc = value.description;
    let result = "";

    desc.forEach((item) => {
      result += `<li>${item}</li>`;
    });

    const html = `      <div class="card-cnt">
          <img src="/img/api/${value.image}" class="img"/>
          <div class="content-cnt">
          <h3 class="name-of-api">${value.name}</h3>
          <ul class="function">
          ${result}           
          </ul>      
          </div>
        </div>

        <div class="text-cnt">
          <h3 class="api-link-heading">API Link</h3>
          <div class="api-link-cnt">
          <p class="api-link ">${value.link}</p>
          </div>
          <div class="btn-cnt">
          <a href="#" class="api-btn copy">Copy</a>
          <a href="" class="api-btn document">Document</a>
          </div><div class="wish-cnt">
          <p class="wishes">We're thrilled to have you here! At apiVerse, we believe in making the world of APIs accessible, easy, and fun for everyone. Whether you're a developer seeking the perfect API for your next project or simply curious about the endless possibilities of technology, we're here to help you explore and discover.</p>
          <p class="wishes">Dive into our collection, experiment with the APIs, and let your creativity soar. Remember, the only limit is your imagination.</p>
          <p class="wishes">Thank you for being a part of our journey. Happy coding!</p>
          </div>
        </div>`;
    if (section) section.insertAdjacentHTML("afterbegin", html);
    const copy = document.querySelector(".copy");
    copy.addEventListener("click", function (e) {
      e.preventDefault();
      const value = document.querySelector(".api-link").textContent;
      const tempInput = document.createElement("input");
      document.body.appendChild(tempInput);
      tempInput.value = value;
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
    });
  } catch (err) {
    console.log(err);
  }
};
