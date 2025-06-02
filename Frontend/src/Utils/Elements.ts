export const pageContent = document.querySelector(".page-content");
export const logBtn = document.querySelector(".js-auth-button") as HTMLButtonElement;
export const switchUserButton = document.querySelector(".switch-user-button");
export const logBlock = document.querySelector(".log-block");
export const allModal = document.querySelector(".align-modal") as HTMLDivElement;
export const elementsInsideContainer = allModal?.querySelectorAll("*");
export const allElements = document.querySelectorAll("*");
export const exitModal = document.querySelector(".js-exit-modal") as HTMLButtonElement;
export const registerBtn = document.querySelector(".reg-in");
export const loginBtn = document.querySelector(".log-in");
export const logReg = document.querySelector(".js-log-reg-input");
export const authContent = document.querySelector(".auth-container");
export const responseAuth = document.querySelector(".response-auth");

export const searchButton = document.querySelector(".search-button") as HTMLButtonElement;
export const favoriteButton = document.querySelector(".favorite-button") as HTMLButtonElement;
export const headerHomeButton = document.querySelector(".header-home-button") as HTMLButtonElement;
export const headerMoviesButton = document.querySelector(".header-movies-button") as HTMLButtonElement;
export const headerSeriesButton = document.querySelector(".header-series-button") as HTMLButtonElement;
export const headerGenresButton = document.querySelector(".header-genres-button") as HTMLButtonElement;

export const mainLogo = document.querySelector(".main-logo") as HTMLImageElement;

interface HeaderButtons {
  search: HTMLButtonElement | null;
  favorite: HTMLButtonElement | null;
  home: HTMLButtonElement | null;
  movies: HTMLButtonElement | null;
  series: HTMLButtonElement | null;
  genres: HTMLButtonElement | null;
}

export const headerButtons: HeaderButtons = {
  search: document.querySelector(".search-button"),
  favorite: document.querySelector(".favorite-button"),
  home: document.querySelector(".header-home-button"),
  movies: document.querySelector(".header-movies-button"),
  series: document.querySelector(".header-series-button"),
  genres: document.querySelector(".header-genres-button"),
};
