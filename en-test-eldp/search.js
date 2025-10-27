    const searchInput = document.getElementById("autosearch");
    const videos = document.querySelectorAll(".video-grid article");

    searchInput.addEventListener("keyup", () => {
      const searchTerm = searchInput.value.toLowerCase().trim();

      videos.forEach(video => {
        const textContent = video.innerText.toLowerCase();
        if (textContent.includes(searchTerm)) {
          video.classList.remove("hide");
        } else {
          video.classList.add("hide");
        }
      });
    });