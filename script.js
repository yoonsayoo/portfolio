const homeButton = document.getElementById("homeButton");
const homeView = document.getElementById("homeView");
const worksView = document.getElementById("worksView");
const worksGrid = document.getElementById("worksGrid");
const worksCurrent = document.getElementById("worksCurrent");
const seriesButtons = Array.from(document.querySelectorAll(".series-button"));

function showHome() {
  homeView.classList.remove("is-hidden");
  worksView.classList.add("is-hidden");

  seriesButtons.forEach(button => {
    button.classList.remove("is-active");
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showSeries(series) {
  const items = artworks.filter(item => item.series === series);

  worksGrid.innerHTML = "";

  items.forEach(item => {
    const button = document.createElement("button");
    button.className = "thumb";
    button.type = "button";
    button.innerHTML = `<img src="${item.image}" alt="${item.titleEn || item.title}" />`;
    worksGrid.appendChild(button);
  });

  worksCurrent.textContent = series === "people" ? "People" : series;

  homeView.classList.add("is-hidden");
  worksView.classList.remove("is-hidden");

  seriesButtons.forEach(button => {
    button.classList.toggle("is-active", button.dataset.series === series);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

homeButton.addEventListener("click", showHome);

seriesButtons.forEach(button => {
  button.addEventListener("click", () => {
    showSeries(button.dataset.series);
  });
});

showHome();
