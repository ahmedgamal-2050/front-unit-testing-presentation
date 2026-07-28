// Framework-free navigation: buttons, keyboard shortcuts, and touch swipes.
const slides = [...document.querySelectorAll(".slide")];
const current = document.querySelector("#current");
const progress = document.querySelector("#progress");
let index = 0;
let start = 0;

function goTo(next) {
  const old = index;
  index = (next + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === index);
    slide.classList.toggle("exit", slideIndex === old && next > old);
  });

  current.textContent = String(index + 1).padStart(2, "0");
  progress.style.width = `${((index + 1) / slides.length) * 100}%`;
}

document.querySelector("#next").addEventListener("click", () => goTo(index + 1));
document.querySelector("#prev").addEventListener("click", () => goTo(index - 1));

document.addEventListener("keydown", (event) => {
  if (["ArrowRight", "PageDown", " "].includes(event.key)) {
    event.preventDefault();
    goTo(index + 1);
  } else if (["ArrowLeft", "PageUp"].includes(event.key)) {
    event.preventDefault();
    goTo(index - 1);
  } else if (event.key === "Home") {
    goTo(0);
  } else if (event.key === "End") {
    goTo(slides.length - 1);
  }
});

const slideArea = document.querySelector(".slides");
slideArea.addEventListener(
  "touchstart",
  (event) => {
    start = event.changedTouches[0].screenX;
  },
  { passive: true },
);

slideArea.addEventListener(
  "touchend",
  (event) => {
    const distance = event.changedTouches[0].screenX - start;
    if (Math.abs(distance) > 45) {
      goTo(index + (distance < 0 ? 1 : -1));
    }
  },
  { passive: true },
);
