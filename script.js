const seriesButtons = Array.from(document.querySelectorAll(".series-button"));
const worksCurrent = document.getElementById("worksCurrent");
const worksGrid = document.getElementById("worksGrid");

const viewer = document.getElementById("viewer");
const viewerImage = document.getElementById("viewerImage");
const viewerTitle = document.getElementById("viewerTitle");
const viewerYear = document.getElementById("viewerYear");
const viewerMaterial = document.getElementById("viewerMaterial");
const viewerSize = document.getElementById("viewerSize");
const viewerClose = document.getElementById("viewerClose");
const viewerPrev = document.getElementById("viewerPrev");
const viewerNext = document.getElementById("viewerNext");

let currentSeries = "people";
let visibleItems = [];
let currentIndex = 0;

function formatSeriesName(series) {
  return series
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getVisibleItems() {
  return artworks.filter(item => item.series === currentSeries);
}

function renderGrid() {
  worksGrid.innerHTML = "";

  visibleItems.forEach((item, index) => {
    const button = document.createElement("button");
    button.className = "thumb";
    button.type = "button";

    button.innerHTML = `
      <img src="${item.image}" alt="${item.titleEn || item.title}" />
    `;

    button.addEventListener("click", () => {
      openViewer(index);
    });

    worksGrid.appendChild(button);
  });
}

function updateGrid(series) {
  currentSeries = series;

  seriesButtons.forEach(button => {
    button.classList.toggle("is-active", button.dataset.series === series);
  });

  worksCurrent.textContent = formatSeriesName(series);
  visibleItems = getVisibleItems();
  renderGrid();
}

function openViewer(index) {
  currentIndex = index;
  updateViewer();

  viewer.classList.add("is-open");
  viewer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeViewer() {
  viewer.classList.remove("is-open");
  viewer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function updateViewer() {
  const item = visibleItems[currentIndex];
  if (!item) return;

  viewerImage.src = item.image;
  viewerImage.alt = item.titleEn || item.title || "";
  viewerTitle.textContent = item.titleEn || item.title || "";
  viewerYear.textContent = item.year || "";
  viewerMaterial.textContent = item.material || "";
  viewerSize.textContent = item.size || "";
}

function showNext() {
  if (!visibleItems.length) return;
  currentIndex = (currentIndex + 1) % visibleItems.length;
  updateViewer();
}

function showPrev() {
  if (!visibleItems.length) return;
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  updateViewer();
}

seriesButtons.forEach(button => {
  button.addEventListener("click", () => {
    updateGrid(button.dataset.series);

    document.getElementById("works").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

viewerClose.addEventListener("click", closeViewer);
viewerNext.addEventListener("click", showNext);
viewerPrev.addEventListener("click", showPrev);

viewer.addEventListener("click", (event) => {
  if (event.target === viewer) {
    closeViewer();
  }
});

document.addEventListener("keydown", (event) => {
  if (!viewer.classList.contains("is-open")) return;

  if (event.key === "Escape") closeViewer();
  if (event.key === "ArrowRight") showNext();
  if (event.key === "ArrowLeft") showPrev();
});

updateGrid(currentSeries);
