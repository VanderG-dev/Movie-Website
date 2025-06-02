import { elementsInsideContainer, headerButtons } from "../Utils/Elements.ts";
import { favoriteButton } from "../Utils/Elements.ts";
import { searchButton } from "../Utils/Elements.ts";
import { headerHomeButton } from "../Utils/Elements.ts";
import { headerMoviesButton } from "../Utils/Elements.ts";
import { headerSeriesButton } from "../Utils/Elements.ts";
import { exitModal } from "../Utils/Elements.ts";
import { mainLogo } from "../Utils/Elements.ts";
import { logBtn } from "../Utils/Elements.ts";
import { scrollToTop } from "../Utils/ScrollToTop.ts";

import { MovieList, showMainPage, SearchPage, FavoritePage, SeriesList } from "./Functions.ts";

export const greyColor = "rgba(255, 255, 255, 0.452)";

function ResetNavStyles(): void {
  headerButtons.search?.style.setProperty("background", "transparent");
  headerButtons.favorite?.style.setProperty("background", "transparent");
  headerButtons.home?.style.setProperty("color", greyColor);
  headerButtons.series?.style.setProperty("color", greyColor);
  headerButtons.movies?.style.setProperty("color", greyColor);
}

interface NavStyle {
  button: HTMLElement;
  page: (...args: any[]) => void;
  element: HTMLButtonElement;
  style: string;
  mode: string;
  pageValue?: string | number;
}

export function SetNavStyle({ button, page, element, style, mode, pageValue = "" }: NavStyle): void {
  button.addEventListener("click", function () {
    page(pageValue);
    ResetNavStyles();
    scrollToTop();

    if (mode === "background") {
      element.style.background = style;
    } else if (mode === "text") {
      element.style.color = style;
    }
  });
}

// Кнопки хедера
export function NavButtons() {
  // Кнопка лого
  SetNavStyle({
    button: mainLogo,
    page: showMainPage,
    element: headerHomeButton,
    style: "white",
    mode: "text",
  });

  // Кнопка поиска
  SetNavStyle({
    button: searchButton,
    page: SearchPage,
    element: searchButton,
    style: "rgb(41, 103, 184)",
    mode: "background",
    pageValue: `м, ${1}`,
  });

  // Кнопка закладки
  SetNavStyle({
    button: favoriteButton,
    page: FavoritePage,
    element: favoriteButton,
    style: "rgb(41, 103, 184)",
    mode: "background",
  });

  // Кнопка домой
  SetNavStyle({
    button: headerHomeButton,
    page: showMainPage,
    element: headerHomeButton,
    style: "white",
    mode: "text",
  });

  // Кнопка кино
  SetNavStyle({
    button: headerMoviesButton,
    page: MovieList,
    element: headerMoviesButton,
    style: "white",
    mode: "text",
    pageValue: 1,
  });

  // Кнопка сериалов
  SetNavStyle({
    button: headerSeriesButton,
    page: SeriesList,
    element: headerSeriesButton,
    style: "white",
    mode: "text",
    pageValue: 1,
  });

  // кнопка выхода из модального окна
  exitModal?.addEventListener("click", function () {
    elementsInsideContainer?.forEach(function (element) {
      (element as HTMLElement).style.setProperty("display", "none");
    });
  });
  // кнопка выхода из модального окна

  // кнопка для открытия модальнaого окна
  logBtn?.addEventListener("click", function () {
    elementsInsideContainer?.forEach(function (element) {
      (element as HTMLElement).style.setProperty("display", "flex");
    });
  });
  // кнопка для открытия модального окна
}
// Кнопки хедера
