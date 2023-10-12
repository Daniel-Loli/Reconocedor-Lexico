const fullscreenButton = document.getElementById("fullscreenButton");
const fullscreenImage = document.getElementById("fullscreenImage");

fullscreenButton.addEventListener("click", () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        fullscreenImage.style.display = "block";
        fullscreenImage.requestFullscreen().catch((err) => {
            console.error("Error al activar el modo de pantalla completa:", err);
        });
    }
});

document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
        fullscreenImage.style.display = "none";
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.fullscreenElement) {
        document.exitFullscreen();
    }
});