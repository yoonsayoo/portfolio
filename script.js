const homeButton = document.getElementById("homeButton");
const sidebarNav = document.getElementById("sidebarNav");

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

function setActiveView(viewName) {
  Object.values(views).forEach((view) => {
    if (view) view.classList.remove("is-active");
  });

  if (views[viewName]) {
    views[viewName].classList.add("is-active");
  }

  document.querySelectorAll(".page-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.page === viewName);
  });

  if (viewName !== "works") {
    document.querySelectorAll(".menu-button[data-series]").forEach((button) => {
      button.classList.remove("is-active");
    });
  }
}

function setActiveSeriesButton(activeButton) {
  document.querySelectorAll(".menu-button[data-series]").forEach((button) => {
    button.classList.remove("is-active");
  });

  if (activeButton) {
    activeButton.classList.add("is-active");
  }
}

function getVisibleItems() {
  if (!Array.isArray(artworks)) return [];
  return artworks.filter((item) => item.series === currentSeries);
}

function renderGrid() {
  if (!worksGrid) return;

  worksGrid.innerHTML = "";

  visibleItems.forEach((item, index) => {
    const button = document.createElement("button");
    button.className = "thumb";
    button.type = "button";
    button.innerHTML = `
      <img src="${item.image}" alt="${item.titleEn || item.title || ""}" />
    `;

    button.addEventListener("click", () => {
      openViewer(index);
    });

    worksGrid.appendChild(button);
  });
}

function updateGrid(series, label, activeButton) {
  currentSeries = series;
  visibleItems = getVisibleItems();

  if (worksCurrent) {
    worksCurrent.textContent = label;
  }

  renderGrid();
  setActiveView("works");
  setActiveSeriesButton(activeButton);

  const activeGroup = activeButton ? activeButton.closest(".menu-group") : null;

  if (activeGroup) {
    activeGroup.classList.add("is-open");
  }
}

function openViewer(index) {
  currentIndex = index;
  updateViewer();

  if (viewer) {
    viewer.classList.add("is-open");
    viewer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
}

function closeViewer() {
  if (viewer) {
    viewer.classList.remove("is-open");
    viewer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
}

function updateViewer() {
  const item = visibleItems[currentIndex];
  if (!item) return;

  if (viewerImage) {
    viewerImage.src = item.image;
    viewerImage.alt = item.titleEn || item.title || "";
  }

  if (viewerTitle) viewerTitle.textContent = item.titleEn || item.title || "";
  if (viewerYear) viewerYear.textContent = item.year || "";
  if (viewerMaterial) viewerMaterial.textContent = item.material || "";
  if (viewerSize) viewerSize.textContent = item.size || "";
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

function renderSidebar() {
  if (!sidebarNav) return;

  sidebarNav.innerHTML = "";

  const worksTitle = document.createElement("div");
  worksTitle.className = "menu-title";
  worksTitle.textContent = "Works";
  sidebarNav.appendChild(worksTitle);

  siteStructure.works.forEach((section, sectionIndex) => {
    const group = document.createElement("div");
    group.className = "menu-group";

    if (sectionIndex === 0) {
      group.classList.add("is-open");
    }

    const subtitle = document.createElement("button");
    subtitle.className = "menu-subtitle";
    subtitle.type = "button";
    subtitle.textContent = section.title;

    const subitems = document.createElement("div");
    subitems.className = "menu-subitems";

    section.items.forEach((item) => {
      const button = document.createElement("button");
      button.className = "menu-button";
      button.type = "button";
      button.dataset.series = item.key;
      button.textContent = item.label;

      button.addEventListener("click", () => {
        updateGrid(item.key, item.label, button);
      });

      subitems.appendChild(button);
    });

    subtitle.addEventListener("click", () => {
      group.classList.toggle("is-open");
    });

    group.appendChild(subtitle);
    group.appendChild(subitems);
    sidebarNav.appendChild(group);
  });

  siteStructure.pages.forEach((page) => {
    const button = document.createElement("button");
    button.className = "menu-title page-button";
    button.type = "button";
    button.dataset.page = page.key;
    button.textContent = page.label;

    button.addEventListener("click", () => {
      setActiveView(page.key);
    });

    sidebarNav.appendChild(button);
  });
}

if (homeButton) {
  homeButton.addEventListener("click", () => {
    setActiveView("home");

    document.querySelectorAll(".page-button").forEach((button) => {
      button.classList.remove("is-active");
    });

    document.querySelectorAll(".menu-button[data-series]").forEach((button) => {
      button.classList.remove("is-active");
    });
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

renderSidebar();
