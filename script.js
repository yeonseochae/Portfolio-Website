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


// =============================
// INITIAL STATE
// =============================
secondColumn.style.display = "none";


// =============================
// SHOW PROJECT / SECTIONS
// =============================
function showProject(projectId) {

  // Hide all projects
  document.querySelectorAll(".project").forEach(p =>
    p.classList.remove("active")
  );

  // Activate selected project
  if (projectId) {
    const project = document.getElementById(projectId);
    if (project) project.classList.add("active");
  }

  // Hide descriptions
  document.querySelectorAll(".description").forEach(d =>
    d.classList.remove("active")
  );

  // Show description for work projects
  if (
    projectId &&
    !projectId.includes("about") &&
    !projectId.includes("experience")
  ) {
    const desc = document.getElementById("desc-" + projectId);
    if (desc) desc.classList.add("active");
  }

  // Reset scroll
  secondColumn.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}


// =============================
// MENU ITEMS
// =============================
document.querySelectorAll(".menu-item").forEach(item => {
  item.addEventListener("click", () => {
    showProject(item.dataset.project);
  });
});


// =============================
// FIRST COLUMN BUTTONS
// =============================
const aboutButton = document.querySelector(
  ".first-information .information p:nth-child(1)"
);

const experienceButton = document.querySelector(
  ".first-information .information p:nth-child(2)"
);

const workButton = document.querySelector(
  ".first-information .information p:nth-child(3)"
);


// ABOUT
aboutButton.addEventListener("click", () => {
  firstColumn.style.display = "block";
  secondColumn.style.display = "none";
  showProject("about-section");
});


// EXPERIENCE
experienceButton.addEventListener("click", () => {
  firstColumn.style.display = "block";
  secondColumn.style.display = "none";
  showProject("experience-section");
});


// WORK  ✅ (this was missing)
workButton.addEventListener("click", () => {
  secondColumn.style.display = "flex";
  showProject(null);
});


// =============================
// THEME TOGGLE
// =============================
const themeToggle = document.getElementById("toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
});