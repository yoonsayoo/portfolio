const seriesButtons = Array.from(document.querySelectorAll(".series-button"));
const thumbs = Array.from(document.querySelectorAll(".thumb"));
const worksCurrent = document.getElementById("worksCurrent");

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
  return thumbs.filter(thumb => thumb.dataset.series === currentSeries);
}

function updateGrid(series) {
  currentSeries = series;

  seriesButtons.forEach(button => {
    button.classList.toggle("is-active", button.dataset.series === series);
  });

  thumbs.forEach(thumb => {
    const isMatch = thumb.dataset.series === series;
    thumb.classList.toggle("is-hidden", !isMatch);
  });

  worksCurrent.textContent = formatSeriesName(series);
  visibleItems = getVisibleItems();
}

function openViewer(index) {
  visibleItems = getVisibleItems();
  currentIndex = index;

  const item = visibleItems[currentIndex];
  if (!item) return;

  viewerImage.src = item.dataset.image;
  viewerImage.alt = item.dataset.title || "";
  viewerTitle.textContent = item.dataset.title || "";
  viewerYear.textContent = item.dataset.year || "";
  viewerMaterial.textContent = item.dataset.material || "";
  viewerSize.textContent = item.dataset.size || "";

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

  viewerImage.src = item.dataset.image;
  viewerImage.alt = item.dataset.title || "";
  viewerTitle.textContent = item.dataset.title || "";
  viewerYear.textContent = item.dataset.year || "";
  viewerMaterial.textContent = item.dataset.material || "";
  viewerSize.textContent = item.dataset.size || "";
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

thumbs.forEach(thumb => {
  thumb.addEventListener("click", () => {
    visibleItems = getVisibleItems();
    const index = visibleItems.indexOf(thumb);
    openViewer(index);
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
