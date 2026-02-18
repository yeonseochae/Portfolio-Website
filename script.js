console.log("JS connected");

// ---------------- CUSTOM CURSOR ----------------
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// ---------------- SHOW PROJECT ----------------
function showProject(projectId) {
  // Projects
  document.querySelectorAll('.project').forEach(p => p.classList.remove('active'));
  const project = document.getElementById(projectId);
  if (project) project.classList.add('active');

  // Descriptions
  document.querySelectorAll('.description').forEach(d => d.classList.remove('active'));
  const desc = document.getElementById("desc-" + projectId);
  if (desc) desc.classList.add('active');
}

// ---------------- MENU CLICK ----------------
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', () => {
    showProject(item.dataset.project);
  });
});
// Get references
const workButton = document.querySelector('.first-information .information p:nth-child(3)'); // "Work"
const secondColumn = document.querySelector('.column.second');

// Hide second column by default (in case CSS fails)
secondColumn.style.display = 'none';

// Show second column when "Work" is clicked
workButton.addEventListener('click', () => {
  secondColumn.style.display = 'flex'; // flex to maintain your layout
});
// ---------------- THEME TOGGLE ----------------
const themeToggle = document.getElementById("toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
});
