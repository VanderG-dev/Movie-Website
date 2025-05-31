import * as H from "./innerHtml.ts";
import { options } from "./config/ApiConfig.ts";
import { scrollToTop } from "./Utils/ScrollToTop.ts";
import { mainPageMovies } from "./Functions/MainPageMovies/MainPageMovies.ts";
import { Slider } from "./Utils/slider.ts";

export function ChangeHideButton(buttonHide, input) {
  buttonHide.addEventListener("click", () => {
    if (input.type === "text") {
      input.type = "password";
      buttonHide.src = "../static/img/hide.png";
    } else {
      input.type = "text";
      buttonHide.src = "../static/img/show.png";
    }
  });
}
function EventHandler() {}
const pageContent = document.querySelector(".page-content");
const logBtn = document.querySelector(".js-auth-button");
const switchUserButton = document.querySelector(".switch-user-button");
const logBlock = document.querySelector(".log-block");
const allModal = document.querySelector(".align-modal");
const elementsInsideContainer = allModal!.querySelectorAll("*");
const allElements = document.querySelectorAll("*");
const exitModal = document.querySelector(".js-exit-modal");
const registerBtn = document.querySelector(".reg-in");
const loginBtn = document.querySelector(".log-in");
const logReg = document.querySelector(".js-log-reg-input");
const authContent = document.querySelector(".auth-container");
const responseAuth = document.querySelector(".response-auth");

// переменные для хедера
const searchButton = document.querySelector(".search-button");
const favoriteButton = document.querySelector(".favorite-button");
const headerHomeButton = document.querySelector(".header-home-button");
const headerMoviesButton = document.querySelector(".header-movies-button");
const headerSeriesButton = document.querySelector(".header-series-button");
const headerGenresButton = document.querySelector(".header-genres-button");
const mainLogo = document.querySelector(".main-logo");
const greyColor = "rgba(255, 255, 255, 0.452)";
// переменные для хедера

export function GenerateLoginModal() {
  switchUserButton.innerHTML = `
  <button class="js-auth-button">
  <img src="../static/img/user-icon.png" width="32px" />
  <h1>Войти</h1>
</button>
`;

  H.logBlockHTML();
  registrationModal();

  const logBtn = document.querySelector(".js-auth-button");
  const allModal = document.querySelector(".align-modal");
  const exitModal = document.querySelector(".js-exit-modal");
  const elementsInsideContainer = allModal.querySelectorAll("*");
  // кнопка выхода из модального окна
  exitModal.removeEventListener("click", EventHandler);
  exitModal.addEventListener("click", function () {
    elementsInsideContainer.forEach(function (element) {
      element.style.display = "none";
    });
  });
  // кнопка выхода из модального окна

  // кнопка для открытия модального окна
  logBtn.removeEventListener("click", EventHandler);
  logBtn.addEventListener("click", function () {
    elementsInsideContainer.forEach(function (element) {
      element.style.display = "flex";
    });
  });
  // кнопка для открытия модального окна
}

export function GenerateProfileModal(username) {
  switchUserButton.innerHTML = `
  <button class="js-auth-button">
      <img src="../static/img/user-icon.png" width="32px" />
      <h1>Профиль</h1>
  </button>
`;
  const logBtn = document.querySelector(".js-auth-button");
  logBtn.removeEventListener("click", EventHandler);
  logBtn.addEventListener("click", function () {
    $.ajax({
      url: "/profile",
      type: "GET",
      success: function (response) {
        console.log("Результат из фласка :", response);
        logBlock.innerHTML = `
      <button class="js-exit-modal">🞨</button>
      <button class="js-logout">
          <img src="../static/img/logout.png" width="32px" />
          <h1 class="Profile-text"> выйти </h1>
      </button>
      <h1 class="Profile-text"> профиль </h1>

       <div class="avatar-text">
       <div class="black-box"></div>
        <img src="../static/img/${response.profile.avatar_url}" width="90px"class="profile-pic" >
        <h2 class="change-avatar">изменить</h2>
        <h1> ${username}</h1>
       </div>

       <div class="avatar-modal">
       </div> 

       <h1 class="Profile-second-text">Ваши данные</h1>

      <div class="other-info">
      <div class="black-box-second"></div>

       <div class="align-info">
       <h1>ID:</h1>
       <h2 class="response-email">${response.profile.user_id}</h2>
       </div>

       <div class="align-info">
       <h1>Год рождения:</h1>
       <h2 class="response-birthday">${response.profile.birthdate}</h2>
       </div>

       <div class="align-info">
       <h1>Страна:</h1>
       <h2 class="response-country">${response.profile.country}</h2>
       </div>

      </div>

      <button class="change-profile-btn">Редактировать профиль</button> 
      <div class="profile-modal">
      </div> 

      
  `;

        // изменение профиля
        const changeAvatar = document.querySelector(".change-avatar");
        const profileModal = document.querySelector(".profile-modal");
        const changeProfile = document.querySelector(".change-profile-btn");
        changeProfile.addEventListener("click", function () {
          profileModal.innerHTML = `
          <h1 class="profile-modal-text">Редактирование профиля</h1>

          <div class="align-profile-input">

          <button class="change-profile-email">изменить данные</button>
          <button class="delete-account">удалить аккаунт</button>
          <h1 class="profile-edit-text">Имя: <input class="profile-edit-name" placeholder="Введите своё имя"></h1>
          <h1 class="profile-edit-text">Страна: <input class="profile-edit-country"placeholder="Введите свою страну" ></h1>
          <h1 class="profile-edit-text">Дата рождения: <input type="date" class="date-box" ></h1>
         
          </div>

          <div class="profile-black-box"></div>

          <button class="send-profile-data">Изменить</button>
          <div class="avatar-modal-box"></div>
          `;

          // удаление аккаунта
          const deleteAccount = document.querySelector(".delete-account");
          deleteAccount.addEventListener("click", function () {
            $.ajax({
              url: "/delete_Account",
              type: "GET",
              success: function (response) {
                console.log("Результат из фласка:", response);
              },
              error: function (error) {
                console.error("Error:", error);
              },
            });
          });
          // удаление аккаунта

          // изменение почты
          const changeEmail = document.querySelector(".change-profile-email");
          changeEmail.addEventListener("click", function () {
            profileModal.innerHTML = `
          <h1 class="profile-modal-text">Смена данных</h1>
          <div class="align-profile-input-2">
          <h1 class="profile-edit-text">Email: <input class="email-edit" placeholder="Введите новую почту"></h1>
          <h1 class="profile-edit-text">Пароль: <input class="password-edit" placeholder="Введите новый пароль"></h1>
          <h1 class="resultEmail"></h1>
          </div>
          <button class="send-email-data">Изменить почту</button>
          <div class="avatar-modal-box"></div>
          `;

            const sendEmailData = document.querySelector(".send-email-data");

            sendEmailData.addEventListener("click", function () {
              const email = document.querySelector(".email-edit").value;
              const password = document.querySelector(".email-edit").value;

              const dataJson = { email, password };

              console.log(dataJson);
              $.ajax({
                url: "/change_Email",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(dataJson),
                success: function (response) {
                  console.log("Результат из фласка :", response);
                  const resultEmail = document.querySelector(".resultEmail");
                  resultEmail.textContent = `${response.message}`;
                  resultEmail.style.color = `${response.color}`;
                },
                error: function (error) {
                  console.error("Error:", error);
                },
              });
            });
          });
          // изменение почты

          // изменение данных профиля
          const sendProfileData = document.querySelector(".send-profile-data");
          sendProfileData.addEventListener("click", function () {
            const name = document.querySelector(".profile-edit-name").value;
            const country = document.querySelector(".profile-edit-country").value;
            const birthdate = document.querySelector(".date-box").value;

            const profileJson = { name, country, birthdate };
            $.ajax({
              url: "/edit_profile",
              type: "POST",
              contentType: "application/json",
              data: JSON.stringify(profileJson),
              success: function (response) {
                console.log("Результат из фласка :", response);

                $.ajax({
                  url: "/profile",
                  type: "GET",
                  success: function (response) {
                    console.log("Результат из фласка :", response);

                    const updateEmail = document.querySelector(".response-email");
                    const updateCountry = document.querySelector(".response-country");
                    const updateBithDay = document.querySelector(".response-bithday");

                    updateCountry.textContent = `${response.profile.country}`;
                  },
                  error: function (error) {
                    console.error("Error:", error);
                  },
                });
              },
              error: function (error) {
                console.error("Error:", error);
              },
            });

            profileModal.innerHTML = ``;
          });
          // изменение данных профиля
        });

        // изменение профиля

        // изменение аватара
        const avatarModal = document.querySelector(".avatar-modal");
        changeAvatar.addEventListener("click", function () {
          avatarModal.innerHTML = `
          <h1 class="avatar-modal-text">Выберите аватар профиля</h1>
          <div class="avatar-modal-box"></div>
          `;

          for (let i = 1; i <= 17; i++) {
            const avatarImg = document.createElement("div");
            avatarImg.classList.add("avatar-image-container");
            avatarImg.innerHTML = `<img src="../static/img/avatar${i}.png" width="90px"class="profile-pic-choose" >`;
            avatarImg.addEventListener("click", function () {
              const avatar_url = `avatar${i}.png`;
              const avatarJson = { avatar_url };
              $.ajax({
                url: "/edit_profile",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(avatarJson),
                success: function (response) {
                  console.log("Результат из фласка :", response);
                  const elementsInsideAvatar = avatarModal.querySelectorAll("*");
                  elementsInsideAvatar.forEach(function (element) {
                    element.style.display = "none";
                  });

                  const profile_pic = document.querySelector(".profile-pic");
                  $.ajax({
                    url: "/profile",
                    type: "GET",
                    success: function (response) {
                      profile_pic.src = `../static/img/${response.profile.avatar_url}`;
                    },
                    error: function (error) {
                      console.error("Error:", error);
                    },
                  });
                },
                error: function (error) {
                  console.error("Error:", error);
                },
              });
            });
            avatarModal.append(avatarImg);
          }
        });
        // изменение аватара

        // выйти из аккаунта
        const logoutButton = document.querySelector(".js-logout");
        logoutButton.removeEventListener("click", EventHandler());
        logoutButton.addEventListener("click", function () {
          logoutRequest();
        });
        // выйти из аккаунта

        //закрыть модальное окно
        const exitModal = document.querySelector(".js-exit-modal");
        exitModal.removeEventListener("click", EventHandler());
        exitModal.addEventListener("click", function () {
          elementsInsideContainer.forEach(function (element) {
            element.style.display = "none";
          });
        });
        //закрыть модальное окно
      },
      error: function (error) {
        console.error("Error:", error);
      },
    });
  });

  // открыть модальное окно
  logBtn.addEventListener("click", function () {
    elementsInsideContainer.forEach(function (element) {
      element.style.display = "flex";
    });
  });
  // открыть модальное окно
}

// export function Session() {
//   if (py_username) {
//     console.log("Сессия работает:", py_username);
//     GenerateProfileModal(py_username);
//   } else {
//     console.log("Сессия не работает.");
//   }
// }

let currentMovie = 0;

export function registerRequest() {
  const responseAuth = document.querySelector(".response-auth");

  const login = document.querySelector(".register-login-input").value;
  const email = document.querySelector(".register-email-input").value;
  const password = document.querySelector(".register-password-input").value;
  const repeat_password = document.querySelector(".register-repeat-input").value;

  const dict_values = { login, email, password, repeat_password };
  console.log(dict_values);
  $.ajax({
    url: "/register",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(dict_values),
    success: function (response) {
      console.log("Результат из фласка (регистрация):", response);
      responseAuth.style.color = `${response.color}`;
      responseAuth.textContent = `${response.message}`;
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });
}

export function loginRequest() {
  const responseAuth = document.querySelector(".response-auth");

  const login = document.querySelector(".login-input").value;
  const password = document.querySelector(".password-input").value;

  const dict_values = { login, password };

  console.log(dict_values);

  $.ajax({
    url: "/login",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(dict_values),
    success: function (response) {
      console.log("Результат из фласка (логин):", response);
      let color = response.color;
      responseAuth.style.color = `${response.color}`;
      responseAuth.textContent = `${response.message}`;

      if (color == "green") {
        GenerateProfileModal(py_username);
      } else {
      }
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });
}

export function logoutRequest() {
  let logout = true;

  const dict_values = { logout };
  console.log(dict_values);
  $.ajax({
    url: "/logout",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(dict_values),
    success: function (response) {
      console.log("Результат из фласка:", response);
      GenerateLoginModal();

      elementsInsideContainer.forEach(function (element) {
        element.style.display = "none";
      });
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });
}

export function FavoritePage() {
  if (!py_username) {
    pageContent.innerHTML = `
    <h1 class=>Авторизируйтесь чтобы создавать закладки</h1>
    `;
    pageContent.style.width = "1100px";
  } else if (py_username) {
    pageContent.style.width = "1100px";

    // получение списка закладок
    $.ajax({
      url: "/bookmarks",
      type: "GET",
      contentType: "application/json",

      success: function (response) {
        if (response.bookmarks.length !== 1) {
          console.log("Результат из фласка:", response);

          pageContent.innerHTML = `
        <div class="align-text-favorite">
        <h1 class="Favorite-main-text">Закладки </h1>
        </div>

        <div class="align-favorite-cards">

        </div>
        `;

          const alignFavoriteCards = document.querySelector(".align-favorite-cards");

          for (let i = 1; i <= response.bookmarks.length; i++) {
            let cardList = response.bookmarks[i];
            fetch(`https://api.themoviedb.org/3/movie/${cardList}?language=ru-RU`, options)
              .then((response) => response.json())
              .then((movies) => {
                console.log(cardList);
                let movieIdList = [];

                let Image = movies.poster_path;
                let ImageSrc = "http://image.tmdb.org/t/p/w500/";

                let Title = movies.title;
                let movieRate = movies.vote_average;
                let roundedRate = movieRate.toFixed(1);
                let getMovieId = movies.id;

                const li = document.createElement("div");
                li.classList.add("alignRow");
                li.innerHTML = `
              <div class="slide">
              <h3 class="change"></h3>
                                                  
              <img src="../static/img/not-loaded.png" class="pre-img" draggable="false" />
              <img src="${ImageSrc}${Image}" class="slideimg" draggable="false" />
             
              <div class="black-square">
              <img src="../static/img/cross.png" class="remove-favorite" draggable="false" width="32px"/>
              </div>

              <div class="slide_content">
                <p>${Title}</p>
                <div class="Rate">${roundedRate}</div>
              </div>
          
            </div>
                  `;

                const h3 = li.querySelector("h3");
                h3.addEventListener("click", function () {
                  currentMovie = getMovieId;
                  pageContent.innerHTML = "";

                  showMoviePage();
                  scrollToTop();

                  headerHomeButton.style.color = greyColor;
                  headerMoviesButton.style.color = "white";
                  headerSeriesButton.style.color = greyColor;
                  headerGenresButton.style.color = greyColor;
                });
                alignFavoriteCards.appendChild(li);

                // удаление закладок
                const removeFavorite = li.querySelector(".remove-favorite");
                removeFavorite.addEventListener("click", function () {
                  currentMovie = getMovieId;
                  console.log(currentMovie);

                  let movie_id = currentMovie;
                  console.log(movie_id);
                  const remove_id = { movie_id };

                  $.ajax({
                    url: "/remove_bookmark",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(remove_id),
                    success: function (response) {
                      console.log("Результат из фласка :", response);
                      alignFavoriteCards.removeChild(li);
                    },
                    error: function (error) {
                      console.error("Error:", error);
                    },
                  });
                });
                // удаление закладок

                movieIdList.push(getMovieId);
              })
              .catch((err) => console.error(err));
          }
        } else {
          console.log("закладок нету");

          pageContent.innerHTML = `
        <div class="align-text-favorite">
        <h1 class="Favorite-main-text">Закладок нету</h1>
        </div>

        <div class="align-favorite-cards">

        </div>
        `;
        }
      },

      error: function (error) {
        console.error("Error:", error);
      },
    });
    // получение списка закладок
  }
}

// модальное окно регистрации
export function registrationModal() {
  const registerBtn = document.querySelector(".reg-in");
  const loginBtn = document.querySelector(".log-in");
  const logReg = document.querySelector(".js-log-reg-input");
  const authContent = document.querySelector(".auth-container");
  const responseAuth = document.querySelector(".response-auth");
  registerBtn.removeEventListener("click", EventHandler);
  registerBtn.addEventListener("click", function () {
    responseAuth.textContent = ``;
    registerBtn.style.background = `linear-gradient(90deg,rgb(41, 103, 184),  rgb(36, 160, 209))`;
    registerBtn.style.color = "white";
    loginBtn.style.color = "rgba(255, 255, 255, 0.452)";
    loginBtn.style.background = `transparent`;
    logReg.innerHTML = `
   <input class="register-login-input" type="input" placeholder="Логин">
   <input class="register-email-input" type="input" placeholder="Почта">
   <input class="register-password-input" type="password" type="input" placeholder="Пароль">
   <input class="register-repeat-input" type="password" type="input" placeholder="Повторите Пароль">
   <img src="../static/img/hide.png"  class="show-hide-button-register-first">
   <img src="../static/img/hide.png"  class="show-hide-button-register-second">

    `;

    // скрытие пароля
    const showHideBtnFirst = document.querySelector(".show-hide-button-register-first");
    const passwordInputFirst = document.querySelector(".register-password-input");
    ChangeHideButton(showHideBtnFirst, passwordInputFirst);
    // скрытие пароля

    // скрытие повторения пароля
    const showHideBtnSecond = document.querySelector(".show-hide-button-register-second");
    const repeatInput = document.querySelector(".register-repeat-input");
    ChangeHideButton(showHideBtnSecond, repeatInput);
    // скрытие повторения пароля

    authContent.innerHTML = `
    <div class="js-create-account">
    Создать аккаунт
    </div>
    `;

    // AJAX запрос
    let sendData = document.querySelector(".js-create-account");
    sendData.addEventListener("click", () => {
      registerRequest();
    });
    // AJAX запрос
  });
  loginBtn.removeEventListener("click", EventHandler);
  loginBtn.addEventListener("click", function () {
    responseAuth.textContent = ``;
    registerBtn.style.background = `transparent`;
    registerBtn.style.color = "rgba(255, 255, 255, 0.452)";
    loginBtn.style.color = "white";
    loginBtn.style.background = `linear-gradient(90deg,rgb(41, 103, 184),  rgb(36, 160, 209))`;
    logReg.innerHTML = `
    <input class="login-input" type="input" placeholder="Логин">
    <input class="password-input" type="password" type="input" placeholder="Пароль">
    <img src="../static/img/hide.png"  class="show-hide-button">
    `;

    // скрытие пароля
    const showHideBtn = document.querySelector(".show-hide-button");
    const passwordInput = document.querySelector(".password-input");
    ChangeHideButton(showHideBtn, passwordInput);
    // скрытие пароля

    authContent.innerHTML = `
    <div class="js-enter-account">
    Войти
    </div>
    `;

    // AJAX запрос
    let sendData = document.querySelector(".js-enter-account");
    sendData.addEventListener("click", () => {
      loginRequest();
    });
    // AJAX запрос
  });

  // создание ивента для кнопки входа
  let sendData = document.querySelector(".js-enter-account");
  sendData.addEventListener("click", () => {
    loginRequest();
  });
  // создание ивента для кнопки входа
}
// модальное окно регистрации

export function mainPageSeries(Url, containerName) {
  fetch(Url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("could not get a fetch resourse");
      }
      return response.json();
    })

    .then((response) => {
      const Track = document.getElementById(`${containerName}_track`);

      let seriesIdList = [];
      for (let i = 0; i <= 19; i++) {
        let ImageCheck = response.results[i].poster_path;
        let Image = "";
        let ImageSrc = "http://image.tmdb.org/t/p/w500/";
        if (ImageCheck) {
          Image = response.results[i].poster_path;
        } else {
          ImageSrc = "img/not-loaded.png";
          Image = "";
        }

        let Title = response.results[i].name;

        let movieRate = response.results[i].vote_average;
        let roundedRate = movieRate.toFixed(1);

        let getSeriesId = response.results[i].id;

        const li = document.createElement("li");
        li.innerHTML = `
              <div class="slide">
                <h3 class="change"></h3>
                <img src="${ImageSrc}${Image}" class="slideimg" draggable="false" />

                <div class="red-circle">
                <img src="../static/img/favorite-icon.png" class="add-favorite" draggable="false" width="32px"/>
                </div>

                <div class="slide_content">
                  <p>${Title}</p>
                  <div class="Rate">${roundedRate}</div>
                </div>
              </div>
            `;

        const h3 = li.querySelector("h3");

        h3.addEventListener("click", function () {
          currentMovie = getSeriesId;

          showSeriesPage();
          scrollToTop();
          headerHomeButton.style.color = greyColor;
          headerMoviesButton.style.color = greyColor;
          headerSeriesButton.style.color = "white";
          headerGenresButton.style.color = greyColor;
        });

        Track.appendChild(li);

        seriesIdList.push(getSeriesId);
      }
    })

    .catch((error) => {
      console.error("Ошибка получения api:", error);
      const Track = document.getElementById(`${containerName}_track`);
      for (let i = 0; i <= 19; i++) {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="slide">
              <img src="../static/img/not-loaded.png" class="slideimg" draggable="false" />
            </div>
          `;
        Track.appendChild(li);
      }
    });
}

// генерация главной страницы
export function showMainPage() {
  pageContent.style.width = "93%";
  mainPageMovies("https://api.themoviedb.org/3/movie/popular?language=ru-RU&page=1", "first");
  mainPageMovies("https://api.themoviedb.org/3/movie/top_rated?language=ru-RU&page=1", "second");

  mainPageSeries("https://api.themoviedb.org/3/tv/popular?language=ru-RU&page=1", `fourth`);
  mainPageSeries("https://api.themoviedb.org/3/tv/top_rated?language=ru-RU&page=1", `5`);

  pageContent.innerHTML = `
    <div class="division">
    <h1>- Фильмы -</h1>
    <div class="row">
      <h1>Популярное</h1>
      <div class="main-page-line"></div>
      <section class="slider">
        <div class="container">
          <div class="slider" data-slider1>
            <ul class="slider__track" id="first_track" data-slider-track1></ul>
  
            <div class="slider__button_left">
              <button class="slider__button" data-slider-prev1 disabled>
                <i class="fa fa-angle-left"><</i>
              </button>
            </div>
            <div class="slider__button_right">
              <button class="slider__button" data-slider-next1>
                <i class="fa fa-angle-right">></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  
    <div class="row">
      <h1>Высокие рейтинги</h1>
      <div class="main-page-line-second"></div>
      <section class="slider">
        <div class="container">
          <div class="slider" data-slider2>
            <ul class="slider__track" id="second_track" data-slider-track2></ul>
  
            <div class="slider__button_left">
              <button class="slider__button" data-slider-prev2 disabled>
                <i class="fa fa-angle-left"><</i>
              </button>
            </div>
            <div class="slider__button_right">
              <button class="slider__button" data-slider-next2>
                <i class="fa fa-angle-right">></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  <div class="division">
    <h1>- Сериалы -</h1>
    <div class="row">
      <h1>Популярное</h1>
      <div class="main-page-line"></div>
      <section class="slider">
        <div class="container">
          <div class="slider" data-slider4>
            <ul class="slider__track" id="fourth_track" data-slider-track4></ul>
  
            <div class="slider__button_left">
              <button class="slider__button" data-slider-prev4 disabled>
                <i class="fa fa-angle-left"><</i>
              </button>
            </div>
            <div class="slider__button_right">
              <button class="slider__button" data-slider-next4>
                <i class="fa fa-angle-right">></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  
    <div class="row">
      <h1>Высокие рейтинги</h1>
      <div class="main-page-line-second"></div>
      <section class="slider">
        <div class="container">
          <div class="slider" data-slider3>
            <ul class="slider__track" id="5_track" data-slider-track3></ul>
  
            <div class="slider__button_left">
              <button class="slider__button" data-slider-prev3 disabled>
                <i class="fa fa-angle-left"><</i>
              </button>
            </div>
            <div class="slider__button_right">
              <button class="slider__button" data-slider-next3>
                <i class="fa fa-angle-right">></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  </div>
  </div>
  </div>
    `;
  for (let i = 1; i <= 4; i++) {
    Slider(
      `[data-slider${i}]`,
      `[data-slider-track${i}]`,
      `[data-slider-prev${i}]`,
      `[data-slider-next${i}]`
    );
  }
}
// генерация главной страницы

// открытие страницы с 1 фильмом
export function showMoviePage() {
  const pageContent = document.querySelector(".page-content");
  if (currentMovie !== 0) {
    pageContent.style.width = "90%";

    fetch(`https://api.themoviedb.org/3/movie/${currentMovie}?language=ru-RU`, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("could not get a fetch resourse");
        }
        return response.json();
      })

      .then((movies) => {
        console.log("ID страницы: " + currentMovie);
        let poster = movies.poster_path;
        let genres = ``;

        let genreLength = movies.genres.length - 1;
        for (let i = 0; i <= genreLength; i++) {
          if (i < genreLength) {
            genres += `${movies.genres[i].name}, `;
          } else {
            genres += `${movies.genres[i].name} `;
          }
        }

        let budget = movies.budget;
        let budgetDots = budget.toLocaleString();

        if (budgetDots == 0) {
          budgetDots = "Неизвестно";
        } else {
          budgetDots += "$";
        }

        let date = movies.release_date;
        let releaseDate = date.split("-")[0];

        let title = movies.title;
        let tagline = movies.tagline;

        let overview = movies.overview;
        let rate = movies.vote_average;
        let roundedRate = rate.toFixed(1);

        pageContent.innerHTML = `
      <div class="align">
      
        <div class="movie-box">
        <img src="http://image.tmdb.org/t/p/w500${poster}" alt="${title}" class="movie-img" />
        
        <div class="info-box">
        <h1 class="movie-title">${title}</h1>
        <h1 class="movie-tagline">${tagline}</h1>
        
        <div class='info-row'>
        <h1 class="movie-releaseDate">Год Выпуска: </h1>
        <h2 class="movie-releaseDate">${releaseDate}г</h2>
        </div>
        
        <div class='info-row'>
        <h1 class="movie-genre">Жанры:</h1>
        <h2 class="movie-genre">${genres}</h2>
        </div>
  
        <div class='info-row'>
            <h1 class="movie-budget">Бюджет:</h1>
            <h2 class="movie-budget">${budgetDots}</h1>
            </div>
            
            <div class='info-column'>
            <h1>Описание: </h1>
            <h2 class="movie-overview">${overview}</h2>
            <div class='hide-text'></div>
            
            </div>
            
            <h1 class="movie-rate">${roundedRate}</h1>

            </div>
            </div>
            </div>

             <div class="player_container"></div>


             <div class="align-comments">
              <h1 class="text-comments">Комментарии</h1>
              <input class="comment-input" placeholder="Написать комментарий">
              <button class="send-comment">Отправить</button>
             </div>

             <div class="comments-container">
             </div>
            `;

        //<button class="change-comment">Редактировать</button>
        comments();
      })

      .catch((error) => {
        console.error("Ошибка", error);
      });
  }

  fetch(`https://api.themoviedb.org/3/movie/${currentMovie}/external_ids`, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("could not get a fetch resourse");
      }
      return response.json();
    })
    .then((response) => {
      let currentMoviePlayer = response["imdb_id"];

      const player_container = document.querySelector(".player_container");

      const box = document.createElement("div");
      box.classList.add("kinobox_player");

      const script1 = document.createElement("script");
      script1.src = "https://kinobox.tv/kinobox.min.js";

      const script2 = document.createElement("script");
      script2.textContent = `kbox('.kinobox_player', {search: {imdb: '${currentMoviePlayer}'}})`;

      player_container.appendChild(box);
      player_container.appendChild(script1);
      player_container.appendChild(script2);
    })
    .catch((err) => showMoviePage());
}
// открытие страницы с 1 фильмом

// генерация комментариев
export function comments() {
  // добавление комментария
  const sendComment = document.querySelector(".send-comment");
  sendComment.addEventListener("click", () => {
    const comment = document.querySelector(".comment-input").value;
    const page_id = currentMovie;
    const commentJson = { comment, page_id };
    console.log(commentJson);
    $.ajax({
      url: "/add_comment",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(commentJson),
      success: function (response) {
        console.log(response);
        comments();
      },
      error: function (error) {
        console.error("Error:", error);
      },
    });
  });
  // добавление комментария

  // получение списка комментариев
  const page_id = currentMovie;
  const listJson = { page_id };
  console.log(`ID для загрузки комментов: ` + page_id);
  $.ajax({
    url: "/comment_list",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(listJson),
    success: function (response) {
      console.log(response);
      const commentsContainer = document.querySelector(".comments-container");
      commentsContainer.innerHTML = ``;

      for (let i = 0; i <= response.length - 1; i++) {
        const commentBox = document.createElement("div");

        commentBox.classList.add("comment-box");
        commentBox.innerHTML = `
       
        <h1 class="comment-name">${response[i].user_name} 
           <button class="delete-comment">Удалить</button>

           <button class="change-comment">Редактировать</button>
        <h1>
        <img class="comment-avatar" src="../static/img/${response[i].avatar_url}" width="48px" />
          <h1 class="comment-text">${response[i].comment}<h1>
      
            `;

        // редактирование комментария
        const changeComment = commentBox.querySelector(".change-comment");
        changeComment.addEventListener("click", () => {
          const comment_Text = document.querySelector(".comment-input").value;
          const comment_id = response[i].comment_id;
          const page_id = currentMovie;
          const commentJson = { comment_Text, comment_id, page_id };
          console.log(commentJson);
          $.ajax({
            url: "/edit_comment",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(commentJson),
            success: function (response) {
              console.log(response);
            },
            error: function (error) {
              console.error("Не удалось получить редактирование комментариев");
            },
          });
        });
        // редактирование комментария

        // удаление комментариев
        const deleteComment = commentBox.querySelector(".delete-comment");
        deleteComment.addEventListener("click", function () {
          const page_id = currentMovie;
          const comment_id = response[i].comment_id;
          const commentJson = { page_id, comment_id };
          console.log(commentJson);
          $.ajax({
            url: "/delete_comment",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(commentJson),
            success: function (response) {
              console.log(response);
            },
            error: function (error) {
              console.error("Error:", error);
            },
          });
        });
        // удаление комментариев

        commentsContainer.appendChild(commentBox);
      }
    },
    error: function (error) {
      console.error("Не удалось получить список комментариев");
    },
  });
  // получение списка комментариев
}
// генерация комментариев

// Открытие страницы с сериалом
export function showSeriesPage() {
  const pageContent = document.querySelector(".page-content");
  if (currentMovie !== 0) {
    pageContent.style.width = "90%";

    fetch(`https://api.themoviedb.org/3/tv/${currentMovie}?language=ru-RU`, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("could not get a fetch resourse");
        }
        return response.json();
      })

      .then((series) => {
        let poster = series.poster_path;

        let budget = series.number_of_episodes;

        let date = series.last_air_date;
        let releaseDate = date.split("-")[0];
        let genres = ``;

        let genreLength = series.genres.length - 1;
        for (let i = 0; i <= genreLength; i++) {
          if (i < genreLength) {
            genres += `${series.genres[i].name}, `;
          } else {
            genres += `${series.genres[i].name} `;
          }
        }

        let title = series.name;
        let tagline = series.tagline;

        let overview = series.overview;
        let rate = series.vote_average;
        let roundedRate = rate.toFixed(1);

        pageContent.innerHTML = `
      <div class="align">
        <div class="movie-box">
        <img src="http://image.tmdb.org/t/p/w500${poster}" alt="${title}" class="movie-img" />
        
        <div class="info-box">
        <h1 class="movie-title">${title}</h1>
        <h1 class="movie-tagline">${tagline}</h1>
        
        <div class='info-row'>
        <h1 class="movie-releaseDate">Год выпуска: </h1>
        <h2 class="movie-releaseDate">${releaseDate}г</h2>
        </div>
        
        <div class='info-row'>
        <h1 class="movie-genre">Жанры:</h1>
        <h2 class="movie-genre">${genres}</h2>
        </div>
  
        <div class='info-row'>
            <h1 class="movie-budget">Серий:</h1>
            <h2 class="movie-budget">${budget}</h1>
            </div>
            
            <div class='info-column'>
            <h1>Описание: </h1>
            <h2 class="movie-overview">${overview}</h2>
            <div class='hide-text'></div>
            
            </div>
            
            
            
            <h1 class="movie-rate">${roundedRate}</h1>
            
            </div>
            </div>
            </div>
  
            <div class="player_container"></div>
            `;
      })

      .catch((err) => console.error(err));
  }

  pageContent.innerHTML = `<div class="player_container"></div>`;

  fetch(`https://api.themoviedb.org/3/tv/${currentMovie}/external_ids`, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("could not get a fetch resourse");
      }
      return response.json();
    })
    .then((response) => {
      currentMovie = response["imdb_id"];

      const player_container = document.querySelector(".player_container");

      const box = document.createElement("div");
      box.classList.add("kinobox_player");

      const script1 = document.createElement("script");
      script1.src = "https://kinobox.tv/kinobox.min.js";

      const script2 = document.createElement("script");
      script2.textContent = `kbox('.kinobox_player', {search: {imdb: '${currentMovie}'}})`;

      player_container.appendChild(box);
      player_container.appendChild(script1);
      player_container.appendChild(script2);
    })
    .catch((err) => console.error(err));
}
// Открытие страницы с сериалом

// Страница со списком фильмов
export function MovieList(Page) {
  pageContent.innerHTML = "";
  pageContent.style.width = "1100px";
  pageContent.innerHTML = `
    <div class='list-title'>
    <div class='list-big-box'></div>
    <h1 class="list-title-h1">- Популярные фильмы -<h1>
    </div>          
    `;

  fetch(`https://api.themoviedb.org/3/movie/popular?language=ru-RU&page=${Page}`, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not get a fetch resource");
      }
      return response.json();
    })
    .then((movies) => {
      let movieIdList = [];

      for (let i = 0; i <= 19; i++) {
        let ImageCheck = movies.results[i].poster_path;
        let Image = "";
        let ImageSrc = "http://image.tmdb.org/t/p/w500/";
        if (ImageCheck) {
          Image = movies.results[i].poster_path;
        } else {
          ImageSrc = "img/not-loaded.png";
          Image = "";
        }

        let Title = movies.results[i].title;
        let movieRate = movies.results[i].vote_average;
        let roundedRate = movieRate.toFixed(1);
        let getMovieId = movies.results[i].id;

        const li = document.createElement("div");

        li.classList.add("alignRow");
        li.innerHTML = `
  
          <div class="slide-movie-list">
          <h3 class="change"></h3>
          <img src="../static/img/not-loaded.png" class="pre-img" draggable="false" />
          <img src="${ImageSrc}${Image}" class="slideimg" draggable="false" />
            <div class="slide_content">
            <p>${Title}</p>
            <div class="Rate">${roundedRate}</div>
            </div>
          </div>
          `;

        const h3 = li.querySelector("h3");

        h3.addEventListener("click", function () {
          currentMovie = getMovieId;
          pageContent.innerHTML = "";

          showMoviePage();
          scrollToTop();

          headerHomeButton.style.color = greyColor;
          headerMoviesButton.style.color = "white";
          headerSeriesButton.style.color = greyColor;
          headerGenresButton.style.color = greyColor;
        });

        pageContent.appendChild(li);

        movieIdList.push(getMovieId);
      }

      let minusPage = Page;
      minusPage -= 4;
      if (minusPage < 5) {
        minusPage = 1;
      } else {
      }

      const buttonsAlign = document.createElement("div");
      buttonsAlign.classList.add("buttonsAlign");

      for (let i = minusPage; i <= Page + 4; i++) {
        let pageNumber = i;

        const li = document.createElement("div");
        li.classList.add("alignPageButtons");

        if (pageNumber == Page) {
          li.innerHTML = `
            <div class="page-button-white">
              <div class="page-button-content">
                ${pageNumber}
              </div>
            </div>`;
        } else if (pageNumber >= 501) {
        } else {
          li.innerHTML = `
            <div class="page-button">
              <div class="page-button-content">
                ${pageNumber}
              </div>
            </div>`;
        }

        li.addEventListener("click", function () {
          pageContent.innerHTML = "";
          MovieList(pageNumber);
          scrollToTop();

          headerHomeButton.style.color = greyColor;
          headerMoviesButton.style.color = "white";
          headerSeriesButton.style.color = greyColor;
          headerGenresButton.style.color = greyColor;
        });

        pageContent.appendChild(buttonsAlign);
        buttonsAlign.appendChild(li);
      }

      const li = document.createElement("div");
      li.classList.add("alignPageInput");

      li.innerHTML = `
      <div class="page-input">
        <input class="page-input-box" type="input" placeholder="Введите страницу"></input>
        <button class="page-send-input">Перейти</button>
      </div>
      `;

      pageContent.appendChild(li);

      let inputPage = document.querySelector(".page-input-box");
      let inputPageButton = document.querySelector(".page-send-input");

      inputPageButton.addEventListener("click", function () {
        let inputValue = parseInt(inputPage.value);

        MovieList(inputValue);
        scrollToTop();
      });
    })

    .catch((error) => {
      console.error("Ошибка получения api:", error);
      for (let i = 0; i <= 19; i++) {
        const li = document.createElement("div");
        li.classList.add("alignRow");
        li.innerHTML = `
          <div class="slide-movie-list">
          <img src="../static/img/not-loaded.png" class="slideimg" draggable="false" />
          </div>
          `;
        pageContent.appendChild(li);
      }

      let minusPage = Page;
      minusPage -= 4;
      if (minusPage < 5) {
        minusPage = 1;
      } else {
      }

      const buttonsAlign = document.createElement("div");
      buttonsAlign.classList.add("buttonsAlign");

      for (let i = minusPage; i <= Page + 4; i++) {
        let pageNumber = i;

        const li = document.createElement("div");
        li.classList.add("alignPageButtons");

        if (pageNumber == Page) {
          li.innerHTML = `
            <div class="page-button-white">
              <div class="page-button-content">
                ${pageNumber}
              </div>
            </div>`;
        } else if (pageNumber >= 501) {
        } else {
          li.innerHTML = `
            <div class="page-button">
              <div class="page-button-content">
                ${pageNumber}
              </div>
            </div>`;
        }

        li.addEventListener("click", function () {
          pageContent.innerHTML = "";
          MovieList(pageNumber);
          scrollToTop();

          headerHomeButton.style.color = greyColor;
          headerMoviesButton.style.color = "white";
          headerSeriesButton.style.color = greyColor;
          headerGenresButton.style.color = greyColor;
        });

        pageContent.appendChild(buttonsAlign);
        buttonsAlign.appendChild(li);
      }

      const li = document.createElement("div");
      li.classList.add("alignPageInput");

      li.innerHTML = `
      <div class="page-input">
        <input class="page-input-box" type="input" placeholder="Введите страницу"></input>
        <button class="page-send-input">Перейти</button>
      </div>
      `;

      pageContent.appendChild(li);

      let inputPage = document.querySelector(".page-input-box");
      let inputPageButton = document.querySelector(".page-send-input");

      inputPageButton.addEventListener("click", function () {
        let inputValue = parseInt(inputPage.value);

        MovieList(inputValue);
        scrollToTop();
      });
    });
}
// Страница со списком фильмов

// Страница со списком сериалов
export function SeriesList(Page) {
  pageContent.innerHTML = "";
  pageContent.style.width = "1100px";
  pageContent.innerHTML = `
   
    <div class='list-title'>
    <div class='list-big-box'></div>
    <h1 class="list-title-h1">- Популярные сериалы -<h1>
   
    </div>          
    `;

  fetch(`https://api.themoviedb.org/3/tv/top_rated?language=ru-RU&page=${Page}`, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not get a fetch resource");
      }
      return response.json();
    })
    .then((movies) => {
      let movieIdList = [];

      for (let i = 0; i <= 19; i++) {
        let ImageCheck = movies.results[i].poster_path;
        let Image = "";
        let ImageSrc = "http://image.tmdb.org/t/p/w500/";
        if (ImageCheck) {
          Image = movies.results[i].poster_path;
        } else {
          ImageSrc = "img/not-loaded.png";
          Image = "";
        }

        let Title = movies.results[i].name;
        let movieRate = movies.results[i].vote_average;
        let roundedRate = movieRate.toFixed(1);
        let getMovieId = movies.results[i].id;

        const li = document.createElement("div");

        li.classList.add("alignRow");
        li.innerHTML = `
  
          <div class="slide-movie-list">
          <h3 class="change"></h3>
          <img src="../static/img/not-loaded.png" class="pre-img" draggable="false" />
          <img src="${ImageSrc}${Image}" class="slideimg" draggable="false" />
            <div class="slide_content">
            <p>${Title}</p>
            <div class="Rate">${roundedRate}</div>
            </div>
          </div>
          `;

        const h3 = li.querySelector("h3");

        h3.addEventListener("click", function () {
          currentMovie = getMovieId;
          pageContent.innerHTML = "";

          showSeriesPage();
          scrollToTop();

          headerHomeButton.style.color = greyColor;
          headerMoviesButton.style.color = greyColor;
          headerSeriesButton.style.color = "white";
          headerGenresButton.style.color = greyColor;
        });

        pageContent.appendChild(li);

        movieIdList.push(getMovieId);
      }

      let minusPage = Page;
      minusPage -= 4;
      if (minusPage < 5) {
        minusPage = 1;
      } else {
      }

      const buttonsAlign = document.createElement("div");
      buttonsAlign.classList.add("buttonsAlign");

      for (let i = minusPage; i <= Page + 4; i++) {
        let pageNumber = i;

        const li = document.createElement("div");
        li.classList.add("alignPageButtons");

        if (pageNumber == Page) {
          li.innerHTML = `
            <div class="page-button-white">
              <div class="page-button-content">
                ${pageNumber}
              </div>
            </div>`;
        } else if (pageNumber >= 501) {
        } else {
          li.innerHTML = `
            <div class="page-button">
              <div class="page-button-content">
                ${pageNumber}
              </div>
            </div>`;
        }

        li.addEventListener("click", function () {
          pageContent.innerHTML = "";
          SeriesList(pageNumber);
          scrollToTop();

          headerHomeButton.style.color = greyColor;
          headerMoviesButton.style.color = greyColor;
          headerSeriesButton.style.color = "white";
          headerGenresButton.style.color = greyColor;
        });

        pageContent.appendChild(buttonsAlign);
        buttonsAlign.appendChild(li);
      }

      const li = document.createElement("div");
      li.classList.add("alignPageInput");

      li.innerHTML = `
      <div class="page-input">
        <input class="page-input-box" type="input" placeholder="Введите страницу"></input>
        <button class="page-send-input">Перейти</button>
      </div>
      `;

      pageContent.appendChild(li);

      let inputPage = document.querySelector(".page-input-box");
      let inputPageButton = document.querySelector(".page-send-input");

      inputPageButton.addEventListener("click", function () {
        let inputValue = parseInt(inputPage.value);

        MovieList(inputValue);
        scrollToTop();
      });
    })

    .catch((error) => {
      console.error("Ошибка получения api:", error);
      for (let i = 0; i <= 19; i++) {
        const li = document.createElement("div");
        li.classList.add("alignRow");
        li.innerHTML = `
          <div class="slide-movie-list">
          <img src="../static/img/not-loaded.png" class="slideimg" draggable="false" />
          </div>
          `;
        pageContent.appendChild(li);
      }

      let minusPage = Page;
      minusPage -= 4;
      if (minusPage < 5) {
        minusPage = 1;
      } else {
      }

      const buttonsAlign = document.createElement("div");
      buttonsAlign.classList.add("buttonsAlign");

      for (let i = minusPage; i <= Page + 4; i++) {
        let pageNumber = i;

        const li = document.createElement("div");
        li.classList.add("alignPageButtons");

        if (pageNumber == Page) {
          li.innerHTML = `
            <div class="page-button-white">
              <div class="page-button-content">
                ${pageNumber}
              </div>
            </div>`;
        } else if (pageNumber >= 501) {
        } else {
          li.innerHTML = `
            <div class="page-button">
              <div class="page-button-content">
                ${pageNumber}
              </div>
            </div>`;
        }

        li.addEventListener("click", function () {
          pageContent.innerHTML = "";
          MovieList(pageNumber);
          scrollToTop();

          headerHomeButton.style.color = greyColor;
          headerMoviesButton.style.color = "white";
          headerSeriesButton.style.color = greyColor;
          headerGenresButton.style.color = greyColor;
        });

        pageContent.appendChild(buttonsAlign);
        buttonsAlign.appendChild(li);
      }

      const li = document.createElement("div");
      li.classList.add("alignPageInput");

      li.innerHTML = `
      <div class="page-input">
        <input class="page-input-box" type="input" placeholder="Введите страницу"></input>
        <button class="page-send-input">Перейти</button>
      </div>
      `;

      pageContent.appendChild(li);

      let inputPage = document.querySelector(".page-input-box");
      let inputPageButton = document.querySelector(".page-send-input");

      inputPageButton.addEventListener("click", function () {
        let inputValue = parseInt(inputPage.value);

        MovieList(inputValue);
        scrollToTop();
      });
    });
}
// Страница со списком сериалов

// страница поиска фильмов
export function SearchPage(movieName, Page) {
  pageContent.innerHTML = "";
  pageContent.style.width = "1100px";

  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=ru-RU&page=${Page}`,
    options
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not get a fetch resource");
      }
      return response.json();
    })
    .then((movies) => {
      let movieIdList = [];

      pageContent.innerHTML = `
            <div class='search-bar-division'>
            <h1>Поиск кинофильмов<h1>
            
            <input class="page-search-input" type="input" placeholder="Введите название фильма"></input>
            <button class="page-search-button">Искать</button>
            </div>          
            `;
      for (let i = 0; i <= 19; i++) {
        let ImageCheck = movies.results[i].poster_path;
        let Image = "";
        let ImageSrc = "http://image.tmdb.org/t/p/w500/";
        if (ImageCheck) {
          Image = movies.results[i].poster_path;
        } else {
          ImageSrc = "img/not-loaded.png";
          Image = "";
        }

        let Title = movies.results[i].title;
        let movieRate = movies.results[i].vote_average;
        let roundedRate = movieRate.toFixed(1);
        let getMovieId = movies.results[i].id;

        const li = document.createElement("div");

        li.classList.add("alignRow");
        li.innerHTML = `
  
          <div class="slide-movie-list">
          <h3 class="change"></h3>
          <img src="../static/img/not-loaded.png" class="pre-img" draggable="false" />
          <img src="${ImageSrc}${Image}" class="slideimg" draggable="false" />
            <div class="slide_content">
            <p>${Title}</p>
            <div class="Rate">${roundedRate}</div>
            </div>
          </div>
          `;

        const h3 = li.querySelector("h3");

        h3.addEventListener("click", function () {
          currentMovie = getMovieId;

          showMoviePage();
          scrollToTop();

          headerHomeButton.style.color = greyColor;
          headerMoviesButton.style.color = "white";
          headerSeriesButton.style.color = greyColor;
          headerGenresButton.style.color = greyColor;
        });

        pageContent.appendChild(li);

        movieIdList.push(getMovieId);
      }

      const searchPageInput = document.querySelector(".page-search-input");
      const searchPageButton = document.querySelector(".page-search-button");

      searchPageButton.addEventListener("click", function () {
        let searchValue = searchPageInput.value;
        SearchPage(searchValue, 1);
      });

      searchPageInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          let searchValue = searchPageInput.value;
          SearchPage(searchValue, 1);
        }
      });
    })

    .catch((error) => {
      console.error("Ошибка получения api:", error);

      pageContent.innerHTML = `
            <div class='search-bar-division'>
            <h1>Поиск кинофильмов<h1>
            <input class="page-search-input" type="input" placeholder="Введите название фильма"></input>
            <button class="page-search-button">Искать</button>
            
            </div>          
            `;

      const li = document.createElement("div");
      li.classList.add("alignRow");
      li.innerHTML = `
          
         <h1 class="undefined">ФИЛЬМ НЕ НАЙДЕН</h1>
         
          `;
      pageContent.appendChild(li);

      const searchPageInput = document.querySelector(".page-search-input");
      const searchPageButton = document.querySelector(".page-search-button");

      searchPageButton.addEventListener("click", function () {
        let searchValue = searchPageInput.value;
        SearchPage(searchValue, 1);
      });

      searchPageInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          let searchValue = searchPageInput.value;
          SearchPage(searchValue, 1);
        }
      });
    });
}
// страница поиска фильмов
