import { currentMovie } from "./Functions";
import axios from "axios";

export function addBookMark(card: HTMLLIElement, movieId: number) {
  // Добавление закладок
  const addFavorite = card.querySelector(".add-favorite");
  addFavorite?.addEventListener("click", async function () {
    currentMovie.id = movieId;

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
}
