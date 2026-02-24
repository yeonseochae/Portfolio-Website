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
  if (projectId) {
    const project = document.getElementById(projectId);
    if (project) project.classList.add('active');
  }

  // Hide all descriptions in column 3
  document.querySelectorAll('.description').forEach(d => d.classList.remove('active'));
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

  // ---------------- SCROLL TO TOP ----------------
   // Scroll the second column to top if it exists
  if (secondColumn) {
    secondColumn.scrollTop = 0;
  }

  // Scroll the page to top
  document.documentElement.scrollTop = 0; // for most browsers
  document.body.scrollTop = 0;            // for Safari
}

// ---------------- MENU CLICK ----------------
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', () => {
    showProject(item.dataset.project);
  });
});

// ---------------- FIRST COLUMN CLICKS ----------------
const aboutButton = document.querySelector('.first-information .information p:nth-child(1)');
const experienceButton = document.querySelector('.first-information .information p:nth-child(2)');
const workButton = document.querySelector('.first-information .information p:nth-child(3)');
const secondColumn = document.querySelector('.column.second');

secondColumn.style.display = 'none';

aboutButton.addEventListener('click', () => showProject("about-section"));
experienceButton.addEventListener('click', () => showProject("experience-section"));
workButton.addEventListener('click', () => showProject(null));

// ---------------- THEME TOGGLE ----------------
const themeToggle = document.getElementById("toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
});

// ---------------- IMAGE ENLARGE / MODAL ----------------
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");

// Open modal when clicking any image except the GIF
document.querySelectorAll("img").forEach(img => {
  if (!img.classList.contains("corner-gif")) { // skip your GIF
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = img.src;
    });
  }
});

// Close modal when clicking anywhere on the modal
modal.addEventListener("click", () => {
  modal.style.display = "none";
});
