import { headerMoviesButton } from "../Utils/Elements.ts";
import { showMoviePage } from "./Functions.ts";
import { options } from "../config/Config.ts";
import { SetNavStyle } from "./NavButtons.ts";
import { currentMovie } from "./Functions.ts";
import { ASSET_DIR } from "../config/Config.ts";
import axios from "axios";

let imagePath: string = `http://image.tmdb.org/t/p/w500/`;

export async function GetMovieList(Url: string, ListName: string) {
  try {
    const response = await axios.get(Url, options);
    const movies = response.data;
    const movie = movies.results;

    const CardList = document.getElementById(`${ListName}_CardList`);
    let movieIdList = [];

    for (let i = 0; i <= movies.results.length - 1; i++) {
      let image = imagePath + movie[i].poster_path;
      let Title = movie[i].title;
      let movieRate = movie[i].vote_average;
      let roundedRate = movieRate.toFixed(1);
      let MovieId = movie[i].id;

      if (!image) {
        image = `${ASSET_DIR}not-loaded.png`;
      }

      const card = document.createElement("li");
      card.innerHTML = `
          <div class="slide">
            <h3 class="change"></h3>
            
            <img src="${ASSET_DIR}not-loaded.png" class="pre-img" draggable="false" />
            <img src="${image}" class="slideimg" draggable="false" />
           
            <div class="red-circle">
            <img src="${ASSET_DIR}favorite-icon.png" class="add-favorite" draggable="false" width="32px"/>
            </div>

            <div class="slide_content">
              <p>${Title}</p>
              <div class="Rate">${roundedRate}</div>
            </div>
          </div>
        `;

      const CardListener = card.querySelector(".change") as HTMLElement;

      SetNavStyle({
        button: CardListener,
        page: showMoviePage,
        element: headerMoviesButton,
        style: "white",
        mode: "text",
      });

      CardListener?.addEventListener("click", function () {
        currentMovie.id = MovieId;
      });

      CardList?.appendChild(card);
      movieIdList.push(MovieId);
    }
  } catch (error) {
    console.error("error access api:", error);

    const CardList = document.getElementById(`${ListName}_CardList`);
    for (let i = 0; i <= 19; i++) {
      const card = document.createElement("li");
      card.innerHTML = `
          <div class="slide">
            <img src="${ASSET_DIR}not-loaded.png" class="slideimg" draggable="false" />
          </div>
        `;
      CardList?.appendChild(card);
    }
  }
}

GetMovieList("https://api.themoviedb.org/3/movie/popular?language=ru-RU&page=1", "first");
GetMovieList("https://api.themoviedb.org/3/movie/top_rated?language=ru-RU&page=1", "second");
