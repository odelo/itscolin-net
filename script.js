const wheel = document.getElementById("projectWheel");

if (wheel) {
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
}
