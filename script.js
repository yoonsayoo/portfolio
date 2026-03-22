const seriesButtons = document.querySelectorAll(".series-button");
const pageButtons = document.querySelectorAll(".page-button");
const homeButton = document.getElementById("homeButton");

const views = {
  home: document.getElementById("homeView"),
  works: document.getElementById("worksView"),
  exhibitions: document.getElementById("exhibitionsView"),
  texts: document.getElementById("textsView"),
  cv: document.getElementById("cvView"),
  contact: document.getElementById("contactView")
};

const worksGrid = document.getElementById("worksGrid");
const worksCurrent = document.getElementById("worksCurrent");

// viewer
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

// VIEW
function setView(name) {
  Object.values(views).forEach(v => v.classList.remove("is-active"));
  views[name].classList.add("is-active");
}

// GRID
function getItems(series) {
  return artworks.filter(a => a.series === series);
}

function renderGrid(series) {
  visibleItems = getItems(series);
  worksGrid.innerHTML = "";

  visibleItems.forEach((item, index) => {
    const el = document.createElement("button");
    el.className = "thumb";
    el.innerHTML = `<img src="${item.image}" />`;

    el.onclick = () => openViewer(index);
    worksGrid.appendChild(el);
  });

  worksCurrent.textContent = series.replace("-", " ");
}

// VIEWER
function openViewer(index) {
  currentIndex = index;
  updateViewer();
  viewer.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeViewer() {
  viewer.classList.remove("is-open");
  document.body.style.overflow = "";
}

function updateViewer() {
  const item = visibleItems[currentIndex];
  if (!item) return;

  viewerImage.src = item.image;
  viewerTitle.textContent = item.titleEn || item.title;
  viewerYear.textContent = item.year;
  viewerMaterial.textContent = item.material;
  viewerSize.textContent = item.size;
}

function next() {
  currentIndex = (currentIndex + 1) % visibleItems.length;
  updateViewer();
}

function prev() {
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  updateViewer();
}

// EVENTS
seriesButtons.forEach(btn => {
  btn.onclick = () => {
    currentSeries = btn.dataset.series;
    renderGrid(currentSeries);
    setView("works");
  };
});

pageButtons.forEach(btn => {
  btn.onclick = () => setView(btn.dataset.page);
});

homeButton.onclick = () => setView("home");

viewerClose.onclick = closeViewer;
viewerNext.onclick = next;
viewerPrev.onclick = prev;

document.addEventListener("keydown", e => {
  if (!viewer.classList.contains("is-open")) return;

  if (e.key === "Escape") closeViewer();
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") prev();
});
