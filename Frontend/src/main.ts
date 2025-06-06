import "./styles/index.scss";

import * as F from "./Functions/Functions.ts";
import { NavButtons } from "./Functions/NavButtons.ts";
import { Slider } from "./Utils/slider.ts";

import { showMainPage } from "./Functions/Functions.ts";
//F.Session();

// Кнопки хедера
NavButtons();
// Кнопки хедера

//модальное окно регистрации
F.registrationModal();
//модальное окно регистрации

// кнопки футера
const footerHomeButton = document.querySelector(".footer-home-button");
footerHomeButton?.addEventListener("click", function () {
  showMainPage();
});
// кнопки футера

// генерация карт сериалов на главной странице
F.mainPageSeries("https://api.themoviedb.org/3/tv/on_the_air?language=ru-RU&page=1", `fourth`);
F.mainPageSeries("https://api.themoviedb.org/3/tv/top_rated?language=ru-RU&page=1", `5`);
// генерация карт сериалов на главной странице

// кнопки слайдера
for (let i = 1; i <= 4; i++) {
  Slider(`[data-slider${i}]`, `[data-slider-track${i}]`, `[data-slider-prev${i}]`, `[data-slider-next${i}]`);
}
// кнопки слайдера

// скрытие пароля
const showHideBtn = document.querySelector(".show-hide-button");
const passwordInput = document.querySelector(".password-input");
F.ChangeHideButton(showHideBtn, passwordInput);
// скрытие пароля
