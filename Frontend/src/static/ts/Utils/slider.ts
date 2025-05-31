// Слайдер
export function Slider(fslider, ftrack, fprev, fnext) {
  const slider = document.querySelector(fslider);
  const track = slider.querySelector(ftrack);
  const prev = slider.querySelector(fprev);
  const next = slider.querySelector(fnext);
  if (track) {
    prev.addEventListener("click", () => {
      next.removeAttribute("disabled");
      track.scrollTo({
        left: track.scrollLeft - track.firstElementChild.offsetWidth,
        behavior: "smooth",
      });
    });
    next.addEventListener("click", () => {
      prev.removeAttribute("disabled");
      track.scrollTo({
        left: track.scrollLeft + track.firstElementChild.offsetWidth,
        behavior: "smooth",
      });
    });
  }
}
// Слайдер
