const seriesButtons = Array.from(document.querySelectorAll(".series-button"));
const pageButtons = Array.from(document.querySelectorAll(".page-button"));
const homeButton = document.getElementById("homeButton");

const homeView = document.getElementById("homeView");
const worksView = document.getElementById("worksView");
const exhibitionsView = document.getElementById("exhibitionsView");
const textsView = document.getElementById("textsView");
const cvView = document.getElementById("cvView");
const contactView = document.getElementById("contactView");

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

const views = {
  home: homeView,
  works: worksView,
  exhibitions: exhibitionsView,
  texts: textsView,
  cv: cvView,
  contact: contactView
};

let currentSeries = "people";
let visibleItems = [];
let currentIndex = 0;

function formatSeriesName(series) {
  return series
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function setActiveView(viewName) {
  Object.values(views).forEach(view => {
    if (view) view.classList.remove("is-active");
  });

  if (views[viewName]) {
    views[viewName].classList.add("is-active");
  }

  pageButtons.forEach(button => {
    button.classList.toggle("is-active", button.dataset.page === viewName);
  });

  if (viewName !== "works") {
    seriesButtons.forEach(button => button.classList.remove("is-active"));
  }
}

function getVisibleItems() {
  if (!Array.isArray(artworks)) return [];
  return artworks.filter(item => item.series === currentSeries);
}

function renderGrid() {
  worksGrid.innerHTML = "";

  visibleItems.forEach((item, index) => {
    const button = document.createElement("button");
    button.className = "thumb";
    button.type = "button";
    button.innerHTML = `<img src="${item.image}" alt="${item.titleEn || item.title || ""}" />`;

    button.addEventListener("click", () => {
      openViewer(index);
    });

    worksGrid.appendChild(button);
  });
}

function updateGrid(series) {
  currentSeries = series;
  visibleItems = getVisibleItems();

  seriesButtons.forEach(button => {
    button.classList.toggle("is-active", button.dataset.series === series);
  });

  pageButtons.forEach(button => button.classList.remove("is-active"));

  worksCurrent.textContent = formatSeriesName(series);
  renderGrid();
  setActiveView("works");
  window.scrollTo({ top: 0, behavior: "smooth" });
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
  });
});

pageButtons.forEach(button => {
  button.addEventListener("click", () => {
    setActiveView(button.dataset.page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

if (homeButton) {
  homeButton.addEventListener("click", () => {
    setActiveView("home");
    pageButtons.forEach(button => button.classList.remove("is-active"));
    seriesButtons.forEach(button => button.classList.remove("is-active"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

if (viewerClose) viewerClose.addEventListener("click", closeViewer);
if (viewerNext) viewerNext.addEventListener("click", showNext);
if (viewerPrev) viewerPrev.addEventListener("click", showPrev);

if (viewer) {
  viewer.addEventListener("click", (event) => {
    if (event.target === viewer) closeViewer();
  });
}

document.addEventListener("keydown", (event) => {
  if (!viewer || !viewer.classList.contains("is-open")) return;
  if (event.key === "Escape") closeViewer();
  if (event.key === "ArrowRight") showNext();
  if (event.key === "ArrowLeft") showPrev();
});

window.addEventListener("DOMContentLoaded", () => {
  setActiveView("home");
});
