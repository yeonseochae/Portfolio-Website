console.log("JS connected");

// =============================
// CUSTOM CURSOR
// =============================
const cursor = document.getElementById("custom-cursor");

function getFirstProjectId() {
  const firstMenuItem = document.querySelector(".menu-item");
  return firstMenuItem ? firstMenuItem.dataset.project : null;
}

document.addEventListener("mousemove", (e) => {
  if (!cursor) return;
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// =============================
// COLUMN REFERENCES
// =============================
const firstColumn = document.querySelector(".column.first");
const secondColumn = document.querySelector(".column.second");
const fourthColumn = document.querySelector(".column.fourth"); // projects column

// =============================
// INITIAL STATE
// =============================
secondColumn.style.display = "none"; // hide menu initially

// =============================
// SHOW PROJECT / SECTIONS
// =============================

function showProject(projectId, showSecondColumn = false) {

  // Hide all projects
  document.querySelectorAll(".project").forEach(p => 
    p.classList.remove("active")
  );

  // Activate selected project
  if (projectId) {
    const project = document.getElementById(projectId);
    if (project) project.classList.add("active");
  }

  // Hide all descriptions
  document.querySelectorAll(".description").forEach(d => 
    d.classList.remove("active")
  );

  // Show description for work projects
  if (projectId && !projectId.includes("about") && !projectId.includes("experience")) {
    const desc = document.getElementById("desc-" + projectId);
    if (desc) desc.classList.add("active");
  }

  // Column visibility
  firstColumn.style.display = "block";
  secondColumn.style.display = showSecondColumn ? "flex" : "none";

  // ✅ Scroll page to top
  window.scrollTo({ top: 0, left: 0, behavior: "instant" }); fourthColumn.scrollTop=0;
}


// =============================
// MENU ITEMS (second column)
// =============================
document.querySelectorAll(".menu-item").forEach(item => {
  item.addEventListener("click", () => {

    // remove bold from all items
    document.querySelectorAll(".menu-item")
      .forEach(i => i.classList.remove("active"));

    // bold the clicked one
    item.classList.add("active");

    const projectId = item.dataset.project;

    showProject(projectId, true);
  });
});

// =============================
// FIRST COLUMN BUTTONS
// =============================
const aboutButton = document.querySelector(".about-btn");
const workButton = document.querySelector(".work-btn");

// ABOUT
aboutButton.addEventListener("click", () => showProject("about-section", false));

// // EXPERIENCE
// experienceButton.addEventListener("click", () => showProject("experience-section", false));

const experienceLink = document.querySelector(".experience-link");

experienceLink.addEventListener("click", (e) => {
  e.preventDefault(); // stop page jump
  showProject("experience-section", false);
});

// WORK
workButton.addEventListener("click", () => {
  const firstProject = getFirstProjectId();
  showProject(firstProject, true);
});
// =============================
// THEME TOGGLE
// =============================
const themeToggle = document.getElementById("toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
});

const nameButton = document.querySelector(".myname");

nameButton.addEventListener("click", () => {
  // Hide all projects
  document.querySelectorAll(".project").forEach(p => p.classList.remove("active"));

  // Hide all descriptions
  document.querySelectorAll(".description").forEach(d => d.classList.remove("active"));

  // Show first column, hide second column
  firstColumn.style.display = "block";
  secondColumn.style.display = "none";

  // Reset scroll
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
});