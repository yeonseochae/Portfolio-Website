console.log("JS connected");

// ---------------- CUSTOM CURSOR ----------------
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// ---------------- SHOW PROJECT / SECTIONS ----------------
function showProject(projectId) {
  // Hide all projects (includes About & Experience)
  document.querySelectorAll('.project').forEach(p => p.classList.remove('active'));

  // Show selected project if one is given
  if (projectId) {
    const project = document.getElementById(projectId);
    if (project) project.classList.add('active');
  }

  // Hide all descriptions in column 3
  document.querySelectorAll('.description').forEach(d => d.classList.remove('active'));

  // Only show description if it’s a normal project (not About/Experience)
  if (projectId && !projectId.includes("about") && !projectId.includes("experience")) {
    const desc = document.getElementById("desc-" + projectId);
    if (desc) desc.classList.add('active');
  }

  // Handle second column (menu) visibility
  if (projectId === "about-section" || projectId === "experience-section" || projectId === null) {
    secondColumn.style.display = projectId ? 'none' : 'flex';
  } else {
    secondColumn.style.display = 'flex';
  }
}

// ---------------- MENU CLICK ----------------
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', () => {
    showProject(item.dataset.project);
  });
});

// ---------------- FIRST COLUMN CLICKS ----------------
const aboutButton = document.querySelector('.first-information .information p:nth-child(1)'); // "About"
const experienceButton = document.querySelector('.first-information .information p:nth-child(2)'); // "Experience"
const workButton = document.querySelector('.first-information .information p:nth-child(3)'); // "Work"

const secondColumn = document.querySelector('.column.second');

// Hide second column by default (in case CSS fails)
secondColumn.style.display = 'none';

// About click
aboutButton.addEventListener('click', () => showProject("about-section"));

// Experience click
experienceButton.addEventListener('click', () => showProject("experience-section"));

// Work click
workButton.addEventListener('click', () => {
  showProject(null); // hides About/Experience, shows menu
});

// ---------------- THEME TOGGLE ----------------
const themeToggle = document.getElementById("toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
});
