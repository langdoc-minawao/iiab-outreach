document.addEventListener("DOMContentLoaded", () => {

  // --- Dark mode toggle ---
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const darkMode = body.classList.contains("dark");
    themeToggle.textContent = darkMode ? "☀️" : "🌙";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  });

  // --- Simple live search ---
  const searchBox = document.getElementById("searchBox");
  const sessions = document.querySelectorAll(".session");

  searchBox.addEventListener("input", () => {
    const query = searchBox.value.toLowerCase();
    sessions.forEach(s => {
      const text = s.innerText.toLowerCase();
      s.style.display = text.includes(query) ? "" : "none";
    });
  });

  // --- Scroll to top button ---
  const btn = document.createElement("button");
  btn.textContent = "⬆️ Top";
  btn.id = "topButton";
  Object.assign(btn.style, {
    position: "fixed",
    right: "1em",
    bottom: "1em",
    padding: "0.5em 1em",
    background: "#0353a4",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    display: "none"
  });
  document.body.appendChild(btn);

  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  // --- Session expand/collapse toggle ---
  document.querySelectorAll('.toggle-container').forEach(container => {
    const icon = container.querySelector('.toggle-icon'); // the span
    container.addEventListener('click', () => {
      const session = container.parentElement;
      const isExpanded = session.classList.toggle('expanded');

      // Only update the icon text, remove CSS ::after use
      icon.textContent = isExpanded ? "▲ Hide description" : "▼ Show description";
    });
  });

});
