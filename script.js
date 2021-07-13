function createCard(titleText, content) {
  let card = document.createElement("div");
  let title = document.createElement("h1");
  title.innerText = titleText;
  card.appendChild(title);
  let body = document.getElementById("table");
  card.className = "card";

  // Stick it in the DOM
  body.appendChild(card);
  makeDraggable();
}

function makeDraggable() {
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

    elRoot.style = "cursor: grabbing;";
  });

  window.addEventListener("mouseup", () => {
    // set elRoot style to cursor: grab
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
}

document.querySelector("#read-button").addEventListener("click", function () {
  if (document.querySelector("#file-input").files.length == 0) {
    alert("Error : No file selected");
    return;
  }

  // file selected by user
  let file = document.querySelector("#file-input").files[0];

  // new FileReader object
  let reader = new FileReader();

  // event fired when file reading finished
  reader.addEventListener("load", function (e) {
    // contents of the file
    let text = e.target.result;

    document.querySelector("#file-contents").textContent = text;
  });

  // event fired when file reading failed
  reader.addEventListener("error", function () {
    alert("Error : Failed to read file");
  });

  // read file as text file
  let content = reader.readAsText(file);

  createCard(title, content);
});

makeDraggable();
