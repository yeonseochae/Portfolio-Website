console.log("JS connected");

// =============================
// CUSTOM CURSOR
// =============================
const cursor = document.getElementById("custom-cursor");

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
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

// =============================
// MENU ITEMS (second column)
// =============================
document.querySelectorAll(".menu-item").forEach(item => {
  item.addEventListener("click", () => {
    const projectId = item.dataset.project;

    // If not About/Experience, show second column
    const isWorkProject = projectId && !projectId.includes("about") && !projectId.includes("experience");

    showProject(projectId, true); // always show second column when clicking projects
  });
});

// =============================
// FIRST COLUMN BUTTONS
// =============================
const aboutButton = document.querySelector(".first-information .information p:nth-child(1)");
const experienceButton = document.querySelector(".first-information .information p:nth-child(2)");
const workButton = document.querySelector(".first-information .information p:nth-child(3)");

// ABOUT
aboutButton.addEventListener("click", () => showProject("about-section", false));

// EXPERIENCE
experienceButton.addEventListener("click", () => showProject("experience-section", false));

// WORK
workButton.addEventListener("click", () => showProject(null, true)); // show second column with all projects

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