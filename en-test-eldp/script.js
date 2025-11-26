const videoGrid = document.getElementById("videoGrid");
const searchInput = document.getElementById("autosearch");

fetch('videos.json')
  .then(response => response.json())
  .then(videos => {
    videos.forEach((video, index) => {
      const article = document.createElement("article");

      // Add staggered animation delay
      article.style.animationDelay = `${index * 0.1}s`;

      article.innerHTML = `
        <video controls src="${video.source}"></video>
        <div class="meta">
          <span>🎬 ${video.title}</span>
          <span>📅 ${video.date}</span>
        </div>
        <button class="desc-toggle">
          More.. ▼
        </button>
        <div class="description">${video.description}</div>
      `;

      videoGrid.appendChild(article);

      const toggleBtn = article.querySelector(".desc-toggle");
      const descDiv = article.querySelector(".description");

      toggleBtn.addEventListener("click", () => {
        const isShown = descDiv.classList.toggle("show");
        toggleBtn.classList.toggle("expanded", isShown);
      });
    });
  });

// Search functionality
searchInput.addEventListener("keyup", () => {
  const term = searchInput.value.toLowerCase().trim();
  const articles = videoGrid.querySelectorAll("article");
  articles.forEach(article => {
    const text = article.innerText.toLowerCase();
    article.style.display = text.includes(term) ? "" : "none";
  });
});
