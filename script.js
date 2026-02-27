const wheel = document.getElementById("projectWheel");
const prevButton = document.getElementById("wheelPrev");
const nextButton = document.getElementById("wheelNext");

if (wheel && prevButton && nextButton) {
  const getStepSize = () => {
    const firstTile = wheel.querySelector(".project-tile");
    if (!firstTile) return wheel.clientWidth * 0.9;

    const tileWidth = firstTile.getBoundingClientRect().width;
    const gap = Number.parseFloat(getComputedStyle(wheel).columnGap || "16");
    return tileWidth + gap;
  };

  const syncWheelState = () => {
    const maxScrollLeft = wheel.scrollWidth - wheel.clientWidth;
    const hasOverflow = maxScrollLeft > 1;

    wheel.classList.toggle("is-centered", !hasOverflow);

    if (!hasOverflow) {
      prevButton.disabled = true;
      nextButton.disabled = true;
      return;
    }

    prevButton.disabled = wheel.scrollLeft <= 1;
    nextButton.disabled = wheel.scrollLeft >= maxScrollLeft - 1;
  };

  prevButton.addEventListener("click", () => {
    wheel.scrollBy({ left: -getStepSize(), behavior: "smooth" });
  });

  nextButton.addEventListener("click", () => {
    wheel.scrollBy({ left: getStepSize(), behavior: "smooth" });
  });

  // Convert vertical mouse wheel into horizontal scrolling for easier browsing.
  wheel.addEventListener(
    "wheel",
    (event) => {
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        wheel.scrollLeft += event.deltaY;
      }
    },
    { passive: false }
  );

  wheel.addEventListener("scroll", syncWheelState);
  window.addEventListener("resize", syncWheelState);
  syncWheelState();
}
