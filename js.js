const parentUl = document.querySelector("ul.course-progress-lessons");
const allTitle = document.querySelectorAll(".course-progress-module");
const list_items = document.querySelectorAll(".not-completed");
let currentTitle;

allTitle.forEach((title) => {
  title.style.cursor = "pointer";

  const arrowSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">
<defs></defs><g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" ><path d="M 90 24.25 c 0 -0.896 -0.342 -1.792 -1.025 -2.475 c -1.366 -1.367 -3.583 -1.367 -4.949 0 L 45 60.8 L 5.975 21.775 c -1.367 -1.367 -3.583 -1.367 -4.95 0 c -1.366 1.367 -1.366 3.583 0 4.95 l 41.5 41.5 c 1.366 1.367 3.583 1.367 4.949 0 l 41.5 -41.5 C 89.658 26.042 90 25.146 90 24.25 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #fff; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
</g></svg>`;

  title.insertAdjacentHTML("beforeend", arrowSvg);

  const arrowImage = title.querySelector("svg");
  const titleH3 = title.querySelector("h3");
  arrowImage.style.maxHeight = 16 + "px";
  arrowImage.style.flex = "0 0 16px";
  arrowImage.style.transform = "rotate(180deg)";

  title.style.display = "flex";
  title.style.justifyContent = "space-between";
  title.style.alignItems = "center";

  titleH3.style.paddingRight = 10 + "px";
});

parentUl.addEventListener("click", function (e) {
  console.log(e.target);
  if (e.target.closest(".course-progress-module")) {
    e.stopPropagation();
    let title = e.target.closest(".course-progress-module");
    currentTitle = title;

    currentTitle.classList.contains("hidden") ? currentTitle.classList.remove("hidden") : currentTitle.classList.add("hidden");

    const arrowImage = title.querySelector("svg");
    if (title.classList.contains("hidden")) {
      arrowImage.style.transform = "rotate(0deg)";
    } else {
      arrowImage.style.transform = "rotate(180deg)";
    }

    //find siblings
    let siblingsArray = getSiblings(currentTitle);

    //add class to siblings
    addClassForSiblings(siblingsArray);

    //add style css
    newStyle(list_items);
  }
});

//find siblings
function getSiblings(elem) {
  var siblings = [];
  var sibling = elem;

  sibling = elem;

  while (sibling.nextElementSibling) {
    sibling = sibling.nextElementSibling;

    if (!sibling.classList.contains("not-completed")) break; //stop loot if find next title block

    sibling.nodeType == 1 && siblings.push(sibling);
  }
  return siblings;
}

//add class to list items
function addClassForSiblings(array) {
  if (currentTitle.classList.contains("hidden")) {
    for (const el of array) {
      el.classList.add("hidden_list_item");
    }
  } else {
    for (const el of array) {
      el.classList.remove("hidden_list_item");
    }
  }
}

//added style css
function newStyle(arr) {
  arr.forEach((list_item) => {
    if (list_item.classList.contains("hidden_list_item")) {
      list_item.style.maxHeight = 0 + "px";
      list_item.style.padding = 0 + "px";
      list_item.style.overflow = "hidden";

      for (let child of list_item.children) {
        child.style.padding = 0 + "px";
        child.style.maxHeight = 0 + "px";
      }
    }

    if (!list_item.classList.contains("hidden_list_item")) {
      list_item.style.maxHeight = null;
      list_item.style.padding = null;
      list_item.style.overflow = null;

      for (let child of list_item.children) {
        child.style.padding = null;
        child.style.maxHeight = null;
      }
    }
  });
}
