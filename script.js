(function () {
  const elRoot = document.querySelector(".card");

  let isDragging = false;
  let startX = null;
  let startY = null;
  let startLeft = null;
  let startTop = null;

  elRoot.addEventListener("mousedown", (e) => {
    const rect = elRoot.getBoundingClientRect();
    isDragging = true;

    startX = e.pageX;
    startY = e.pageY;

    startLeft = rect.left;
    startTop = rect.top;
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
    startX = null;
    startY = null;
    startLeft = null;
    startTop = null;
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const deltaX = e.pageX - startX;
    const deltaY = e.pageY - startY;

    elRoot.style.left = `${startLeft + deltaX}px`;
    elRoot.style.top = `${startTop + deltaY}px`;
  });
})();
