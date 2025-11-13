// Typing Animation
const typingText = document.querySelector(".typing");
const roles = ["Web Developer", "Frontend Designer", "JavaScript Enthusiast", "Problem Solver"];
let i = 0, j = 0, currentRole = "", deleting = false;

function typeEffect() {
  if (!deleting && j <= roles[i].length) {
    currentRole = roles[i].substring(0, j++);
  } else if (deleting && j >= 0) {
    currentRole = roles[i].substring(0, j--);
  }

  typingText.textContent = currentRole;

  if (j === roles[i].length) {
    deleting = true;
    setTimeout(typeEffect, 1000);
  } else if (deleting && j === 0) {
    deleting = false;
    i = (i + 1) % roles.length;
    setTimeout(typeEffect, 200);
  } else {
    setTimeout(typeEffect, deleting ? 80 : 120);
  }
}
typeEffect();

// Scroll Animation
const elements = document.querySelectorAll("[data-animate]");
window.addEventListener("scroll", () => {
  elements.forEach(el => {
    const position = el.getBoundingClientRect().top;
    if (position < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});
