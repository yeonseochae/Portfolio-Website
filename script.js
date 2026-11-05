// =============================
// ELEMENT REFERENCES
// =============================

const thirdColumn = document.querySelector(".column.third");
const fourthColumn = document.querySelector(".column.fourth");

const thumbnailGrid = document.getElementById("thumbnails");
const thumbnails = document.querySelectorAll(".thumb");
const backButton = document.getElementById("back-to-thumbs");

const playPage = document.getElementById("play");
const aboutLanding = document.getElementById("about-landing");

const nameButton = document.querySelector(".myname");
const workButton = document.querySelector(".work-btn");
const playButton = document.querySelector(".play-btn");
const aboutButton = document.querySelector(".about-btn");
const themeToggle = document.getElementById("toggle");

const projects = document.querySelectorAll(".column.fourth > .project");
const descriptions = document.querySelectorAll(".column.third .description");


// =============================
// VIDEO CONTROLS
// =============================

function pauseAllVideos() {
  document.querySelectorAll("video").forEach(video => video.pause());
}

function playVideos(container) {
  if (!container) return;

  container.querySelectorAll("video").forEach(video => {
    // Videos with controls (like the A to Z film) wait for a click
    if (video.hasAttribute("controls")) return;

    video.muted = true;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn("Video could not autoplay:", video.currentSrc, error);
      });
    }
  });
}


// =============================
// PAGE SWITCHING
// =============================

// page is one of: "work", "play", "about", "project"
function setPage(page) {
  pauseAllVideos();

  // Forget which project was open (the sun goes back to its normal color)
  delete document.body.dataset.project;

  // Hide everything first
  projects.forEach(project => project.classList.remove("active"));
  descriptions.forEach(description => description.classList.remove("active"));
  if (thumbnailGrid) thumbnailGrid.classList.remove("active");
  if (playPage) playPage.classList.remove("active");
  if (aboutLanding) aboutLanding.classList.remove("active");

  // Page classes on <body> drive the layout in style.css
  document.body.classList.toggle("project-open", page === "project");
  document.body.classList.toggle("thumbs-open", page === "work" || page === "play");

  // Header: the current page is black, the others gray.
  // A project counts as part of Work.
  if (workButton) workButton.classList.toggle("active", page === "work" || page === "project");
  if (playButton) playButton.classList.toggle("active", page === "play");
  if (aboutButton) aboutButton.classList.toggle("active", page === "about");

  // Reset scrolling and bring the header back
  document.body.classList.remove("header-hidden");
  if (fourthColumn) fourthColumn.scrollTop = 0;
  if (thirdColumn) thirdColumn.scrollTop = 0;
  if (aboutLanding) aboutLanding.scrollTop = 0;
}

function showThumbnails() {
  setPage("work");
  if (thumbnailGrid) thumbnailGrid.classList.add("active");
  playVideos(thumbnailGrid);
}

function showPlay() {
  setPage("play");
  if (playPage) playPage.classList.add("active");
  playVideos(playPage);
}

function showAboutLanding() {
  setPage("about");
  if (aboutLanding) aboutLanding.classList.add("active");
}

function showProject(projectId) {
  const selectedProject = document.getElementById(projectId);

  if (!selectedProject || !selectedProject.classList.contains("project")) {
    console.error("Project container not found:", projectId);
    return;
  }

  setPage("project");

  // Remember which project is open, so CSS can color the sun for it
  document.body.dataset.project = projectId;

  selectedProject.classList.add("active");

  const selectedDescription = document.getElementById("desc-" + projectId);
  if (selectedDescription) selectedDescription.classList.add("active");

  playVideos(selectedProject);
  playVideos(selectedDescription);
}


// =============================
// CLICK EVENTS
// =============================

// Thumbnails (on Work and Off-the-Clock) open their project
thumbnails.forEach(thumb => {
  thumb.addEventListener("click", () => showProject(thumb.dataset.project));

  // Thumbnails that aren't real <button>s (like the one with a slider)
  // still open with Enter or Space on the keyboard
  if (thumb.tagName !== "BUTTON") {
    thumb.addEventListener("keydown", e => {
      if (e.target !== thumb) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        showProject(thumb.dataset.project);
      }
    });
  }
});

// Header
if (nameButton) nameButton.addEventListener("click", showThumbnails);
if (workButton) workButton.addEventListener("click", showThumbnails);
if (playButton) playButton.addEventListener("click", showPlay);
if (aboutButton) aboutButton.addEventListener("click", showAboutLanding);

// "← All work" inside a project
if (backButton) backButton.addEventListener("click", showThumbnails);


// =============================
// LIGHT / DARK MODE
// =============================

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");

    // Tells screen readers whether dark mode is on
    const isDark = document.body.classList.contains("dark-mode");
    themeToggle.setAttribute("aria-checked", isDark ? "true" : "false");
  });
}


// =============================
// SMOOTH SCROLLING
// =============================
// Mouse-wheel scrolling glides instead of jumping.
// SMOOTH_EASE controls the speed: higher = snappier, lower = floatier.
// 0.12 settles in a bit under half a second.

const SMOOTH_EASE = 0.12;

function addSmoothScroll(el) {
  let target = el.scrollTop;
  let current = el.scrollTop;
  let frame = null;

  function step() {
    // If something else moved the scroll (page switch, keyboard), stop
    if (Math.abs(el.scrollTop - Math.round(current)) > 2) {
      frame = null;
      return;
    }

    current += (target - current) * SMOOTH_EASE;

    if (Math.abs(target - current) < 0.5) {
      current = target;
      el.scrollTop = current;
      frame = null;
      return;
    }

    el.scrollTop = current;
    frame = requestAnimationFrame(step);
  }

  el.addEventListener("wheel", event => {
    // Leave pinch-zoom and sideways scrolling alone
    if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

    const max = el.scrollHeight - el.clientHeight;
    if (max <= 0) return;

    event.preventDefault();

    // Convert line/page scroll units to pixels
    let delta = event.deltaY;
    if (event.deltaMode === 1) delta *= 16;
    if (event.deltaMode === 2) delta *= el.clientHeight;

    // Start from the real position if no glide is running
    if (!frame) {
      target = el.scrollTop;
      current = el.scrollTop;
    }

    target = Math.max(0, Math.min(max, target + delta));

    if (!frame) frame = requestAnimationFrame(step);
  }, { passive: false });
}

// Skip for people who've turned on "reduce motion" in their settings
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll(".column, .about-landing").forEach(addSmoothScroll);
}


// =============================
// HIDE HEADER ON SCROLL
// =============================
// The header slides away once you scroll down a little,
// and comes back when you scroll back to the top.

const HIDE_AFTER = 40; // pixels scrolled before the header hides
const SHOW_BEFORE = 20; // header returns when this close to the top

document.querySelectorAll(".column, .about-landing").forEach(el => {
  el.addEventListener("scroll", () => {
    if (el.scrollTop > HIDE_AFTER) {
      document.body.classList.add("header-hidden");
    } else if (el.scrollTop < SHOW_BEFORE) {
      document.body.classList.remove("header-hidden");
    }
  }, { passive: true });
});


// =============================
// IMAGE SLIDERS
// =============================
// Any <div class="slider"> on the page gets working arrows
// and swipe on phones. The loop is seamless: after the last
// image it slides forward to the first (no rewinding through
// all the images), and the same backwards.

document.querySelectorAll(".slider, .thumb-slider").forEach(slider => {
  const track = slider.querySelector(".slider-track");
  const win = slider.querySelector(".slider-window");
  const prevBtn = slider.querySelector(".slider-prev");
  const nextBtn = slider.querySelector(".slider-next");
  const counter = slider.querySelector(".slider-count");

  const realSlides = Array.from(track.children);
  const count = realSlides.length;
  if (count === 0) return;

  // Hidden copies: last image at the start, first image at the end
  if (count > 1) {
    const firstCopy = realSlides[0].cloneNode(true);
    const lastCopy = realSlides[count - 1].cloneNode(true);
    firstCopy.setAttribute("aria-hidden", "true");
    lastCopy.setAttribute("aria-hidden", "true");
    track.appendChild(firstCopy);
    track.insertBefore(lastCopy, realSlides[0]);
  }

  const allSlides = track.children;
  let pos = count > 1 ? 1 : 0; // position in allSlides (1 = first real image)
  let moving = false;

  // The frame takes the height of the image showing, so shorter
  // images don't leave an empty gap underneath
  function fitHeight() {
    // Thumbnail sliders keep the fixed thumbnail shape instead
    if (slider.classList.contains("thumb-slider")) return;
    const h = allSlides[pos].offsetHeight;
    win.style.height = h > 0 ? h + "px" : "";
  }

  function show(animate) {
    if (!animate) track.style.transition = "none";
    track.style.transform = "translateX(" + (-100 * pos) + "%)";
    if (!animate) {
      track.offsetHeight; // apply the jump instantly
      track.style.transition = "";
    }
    if (counter) {
      const real = ((pos - 1) % count + count) % count;
      counter.textContent = (real + 1) + " / " + count;
    }
    fitHeight();
  }

  function move(step) {
    if (count < 2 || moving) return;
    moving = true;
    pos += step;
    show(true);
  }

  // After sliding onto a copy, jump silently to the real image
  track.addEventListener("transitionend", e => {
    if (e.target !== track || e.propertyName !== "transform") return;
    if (pos === count + 1) { pos = 1; show(false); }
    if (pos === 0) { pos = count; show(false); }
    moving = false;
  });

  // Re-fit when images finish loading, the window resizes,
  // or the project becomes visible
  const watcher = new ResizeObserver(fitHeight);
  Array.from(allSlides).forEach(slide => watcher.observe(slide));

  // stopPropagation: in a thumbnail, the arrows change the image
  // without also opening the project
  if (prevBtn) prevBtn.addEventListener("click", e => { e.stopPropagation(); move(-1); });
  if (nextBtn) nextBtn.addEventListener("click", e => { e.stopPropagation(); move(1); });

  // Swipe left/right on phones
  let startX = null;
  track.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener("touchend", e => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) move(dx < 0 ? 1 : -1);
    startX = null;
  });

  show(false);
});

// =============================
// TWO IMAGES SIDE BY SIDE: SAME HEIGHT, FULL WIDTH
// =============================
// Each image in a .project-row.two-col gets a width that matches its
// shape (wider images get more room), so both end up the same height
// and together they fill the whole row.

document.querySelectorAll(".project-row.two-col img").forEach(img => {
  function balance() {
    if (img.naturalWidth && img.naturalHeight) {
      img.style.flexGrow = img.naturalWidth / img.naturalHeight;
    }
  }
  if (img.complete) balance();
  img.addEventListener("load", balance);
});
// =============================
// INITIAL STATE
// =============================

showThumbnails();