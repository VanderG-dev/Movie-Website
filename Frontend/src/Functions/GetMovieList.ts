//import { headerHomeButton } from "../../Utils/Elements.ts";
import { headerMoviesButton } from "../Utils/Elements.ts";
//import { headerSeriesButton } from "../../Utils/Elements.ts";
import { scrollToTop } from "../Utils/ScrollToTop.ts";
import { showMainPage } from "./Functions.ts";
import { showMoviePage } from "./Functions.ts";
import { options } from "../config/ApiConfig.ts";
import { SetNavStyle } from "./NavButtons.ts";
import { currentMovie } from "./Functions.ts";
import axios from "axios";

const ASSET_DIR = "./src/assets/img/";

export async function GetMovieList(Url: string, containerName: string) {
  try {
    const response = await axios.get(Url, options);
    const movies = response.data;
    const movie = movies.results;

    const Track = document.getElementById(`${containerName}_track`);
    let movieIdList = [];

    for (let i = 0; i <= movies.results.length - 1; i++) {
      let poster = movie[i].poster_path;

      let Image = "";
      let ImageSrc = `http://image.tmdb.org/t/p/w500/`;
      if (poster) {
        Image = movies.results[i].poster_path;
      } else {
        ImageSrc = `${ASSET_DIR}not-loaded.png`;
        Image = "";
      }

      let Title = movies.results[i].title;
      let movieRate = movies.results[i].vote_average;
      let roundedRate = movieRate.toFixed(1);
      let getMovieId = movies.results[i].id;

      const li = document.createElement("li");
      li.innerHTML = `
          <div class="slide">
            <h3 class="change"></h3>
            
            <img src="${ASSET_DIR}not-loaded.png" class="pre-img" draggable="false" />
            <img src="${ImageSrc}${Image}" class="slideimg" draggable="false" />
           
            <div class="red-circle">
            <img src="${ASSET_DIR}favorite-icon.png" class="add-favorite" draggable="false" width="32px"/>
            </div>

            <div class="slide_content">
              <p>${Title}</p>
              <div class="Rate">${roundedRate}</div>
            </div>
        
          </div>
        `;

      // Добавление закладок
      const addFavorite = li.querySelector(".add-favorite");
      addFavorite?.addEventListener("click", async function () {
        currentMovie.id = getMovieId;

        let movie_id = currentMovie.id;
        const dict_values = { movie_id };

        try {
          const res = await axios.post("/add_bookmark", dict_values, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log("Результат из фласка:", res.data);
        } catch (error) {
          console.error("Ошибка при добавлении в закладки:", error);
        }
      });

      const h3 = li.querySelector("h3");
      h3?.addEventListener("click", function () {
        currentMovie.id = getMovieId;

        showMoviePage();
        scrollToTop();

        SetNavStyle({
          button: headerMoviesButton,
          page: showMainPage,
          element: headerMoviesButton,
          style: "white",
          mode: "text",
        });
      });

      Track?.appendChild(li);
      movieIdList.push(getMovieId);
    }
  } catch (error) {
    console.error("Ошибка получения api:", error);

    const Track = document.getElementById(`${containerName}_track`);
    for (let i = 0; i <= 19; i++) {
      const li = document.createElement("li");
      li.innerHTML = `
          <div class="slide">
            <img src="../static/img/not-loaded.png" class="slideimg" draggable="false" />
          </div>
        `;
      Track?.appendChild(li);
    }
  }
}
