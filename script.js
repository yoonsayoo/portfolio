const thumbs = Array.from(document.querySelectorAll(".thumb"));
const viewer = document.getElementById("viewer");
const viewerImage = document.getElementById("viewerImage");
const viewerCaption = document.getElementById("viewerCaption");
const viewerClose = document.getElementById("viewerClose");
const viewerPrev = document.getElementById("viewerPrev");
const viewerNext = document.getElementById("viewerNext");

const items = thumbs.map((thumb) => ({
  image: thumb.dataset.image,
  title: thumb.dataset.title,
  alt: thumb.querySelector("img")?.alt || thumb.dataset.title || ""
}));

let currentIndex = 0;

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
  const item = items[currentIndex];
  viewerImage.src = item.image;
  viewerImage.alt = item.alt;
  viewerCaption.textContent = item.title;
}

function showNext() {
  currentIndex = (currentIndex + 1) % items.length;
  updateViewer();
}

function showPrev() {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  updateViewer();
}

thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => openViewer(index));
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
