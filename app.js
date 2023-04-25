const container = document.getElementById("container");

// Create Pacman element
const pacman = document.createElement("div");
pacman.classList.add("pacman");
container.appendChild(pacman);

// Set initial position of Pacman
let pacmanX = 0;
let pacmanY = 0;
pacman.style.transform = `translate(${pacmanX}px, ${pacmanY}px)`;

// Move Pacman using arrow keys
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      pacmanY -= 50;
      pacman.style.transform = `translate(${pacmanX}px, ${pacmanY}px)`;
      break;
    case "ArrowDown":
      pacmanY += 50;
      pacman.style.transform = `translate(${pacmanX}px, ${pacmanY}px)`;
      break;
    case "ArrowLeft":
      pacmanX -= 50;
      pacman.style.transform = `translate(${pacmanX}px, ${pacmanY}px)`;
      break;
    case "ArrowRight":
      pacmanX += 50;
      pacman.style.transform = `translate(${pacmanX}px, ${pacmanY}px)`;
      break;
  }
});
