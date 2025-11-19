const searchInput = document.getElementById("autosearch"); // matches your first page
const videos = document.querySelectorAll(".video-grid article");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase().trim();

  videos.forEach(video => {
    const textContent = video.innerText.toLowerCase(); // includes title, description, actors
    if (textContent.includes(searchTerm)) {
      video.classList.remove("hide");
    } else {
      video.classList.add("hide");
    }
  });
});
