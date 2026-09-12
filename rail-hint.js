const rail = document.querySelector(".project-rail");
const work = rail?.closest(".work");

if (rail && work) {
  rail.addEventListener("scroll", () => {
    if (rail.scrollLeft > 8) work.classList.add("has-scrolled");
  }, { passive: true });
}
