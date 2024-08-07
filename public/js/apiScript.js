"use strict";
// import { alert } from "./alert";
import axios from "axios";

const cardCnt = document.querySelector(".card-cnt");
export const cards = async function () {
  try {
    const URL = "/apiVerse/v1/api";
    const res = await axios.get(URL);
    const value = res.data.message;
    value.forEach((arr) => {
      const reviewsCnt = ` <div class="card-inner-cnt">
            <img src="/img/api/${arr.image}" class="img-api" />
            <div class="content">
              <h3 class="heading">${arr.name}</h3>
              <p class="desc">
               ${arr.title}
              </p>
              <div class="btn-cnt">
                <a href="/apiVerse/apiPage?value=${arr._id}" class="imp-btn">Use it</a>
              </div>
            </div>
          </div>`;
      if (cardCnt) cardCnt.insertAdjacentHTML("afterbegin", reviewsCnt);
    });
  } catch (err) {
    console.log(err);
  }
};
