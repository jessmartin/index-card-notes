let cards = document.getElementsByClassName("card");

for (let i = 0; i < cards.length; i++) {
  makeDraggable(cards.item(i));
}

function makeDraggable(elRoot) {
  elRoot.setAttribute("startX", "");
  elRoot.setAttribute("startY", "");
  elRoot.setAttribute("startLeft", "");
  elRoot.setAttribute("startRight", "");
  elRoot.setAttribute("isDragging", false);

  elRoot.addEventListener("mousedown", (e) => {
    const rect = elRoot.getBoundingClientRect();
    elRoot.setAttribute("isDragging", true);

    elRoot.setAttribute("startX", e.pageX);
    elRoot.setAttribute("startY", e.pageY);

    elRoot.setAttribute("startLeft", rect.left);
    elRoot.setAttribute("startRight", rect.top);

    elRoot.className = "card grabbing";
  });

  window.addEventListener("mouseup", () => {
    elRoot.setAttribute("startX", "");
    elRoot.setAttribute("startY", "");
    elRoot.setAttribute("startLeft", "");
    elRoot.setAttribute("startRight", "");
    elRoot.setAttribute("isDragging", false);
    elRoot.className = "card";
  });

  window.addEventListener("mousemove", (e) => {
    let isDragging = "true" == elRoot.getAttribute("isDragging");
    if (!isDragging) return;

    let startX = parseInt(elRoot.getAttribute("startX"));
    let startY = parseInt(elRoot.getAttribute("startY"));

    const deltaX = e.pageX - startX;
    const deltaY = e.pageY - startY;

    let startLeft = parseInt(elRoot.getAttribute("startLeft"));
    let startTop = parseInt(elRoot.getAttribute("startRight"));

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
    let lines = text.split("\n");
    let title = lines.pop();
    let content = lines.join("\n").slice(0, 30);
    createCard(title, content);
  });

  // event fired when file reading failed
  reader.addEventListener("error", function () {
    alert("Error : Failed to read file");
  });

  // read file as text file
  let content = reader.readAsText(file);
});

function createCard(titleText, content) {
  let card = document.createElement("div");
  let title = document.createElement("h1");
  title.innerText = titleText;
  card.appendChild(title);
  let body = document.querySelector("body");
  card.className = "card";

  // Stick it in the DOM
  body.appendChild(card);
  makeDraggable(card);
}
