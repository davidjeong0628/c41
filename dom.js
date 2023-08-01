/* dom.js */

function init() {
  let element = document.getElementById("walkBtn");
  element.addEventListener("click", function () {
    walk();
  });

  element = document.getElementById("advancedWalkBtn");
  element.addEventListener("click", function () {
    advancedWalk();
  });

  element = document.getElementById("modifyBtn");
  element.addEventListener("click", function () {
    modify();
  });

  element = document.getElementById("advancedModifyBtn");
  element.addEventListener("click", function () {
    advancedModify();
  });

  element = document.getElementById("addBtn");
  element.addEventListener("click", function () {
    add();
  });

  element = document.getElementById("advancedAddBtn");
  element.addEventListener("click", function () {
    advancedAdd();
  });

  element = document.getElementById("removeBtn");
  element.addEventListener("click", function () {
    remove();
  });

  element = document.getElementById("safeRemoveBtn");
  element.addEventListener("click", function () {
    safeRemove();
  });

  element = document.getElementById("selectorRemoveBtn");
  element.addEventListener("click", function () {
    selectorRemove();
  });

  element = document.getElementById("basicCloneBtn");
  element.addEventListener("click", function () {
    basicClone();
  });

  element = document.getElementById("advancedCloneBtn");
  element.addEventListener("click", function () {
    advancedClone();
  });
}

function walk() {
  let el;

  el = document.getElementById("p1");
  showNode(el);

  el = el.firstChild;
  showNode(el);

  el = el.nextSibling;
  showNode(el);

  el = el.lastChild;
  showNode(el);

  el = el.parentNode.parentNode.parentNode;
  showNode(el);

  el = el.querySelector("section > *");
  showNode(el);
}

function advancedWalk() {
  let rootElement = document.querySelector(":root");
  let tree = advancedWalkHelper(rootElement, 1);

  let textarea = document.querySelector("#advancedTraversalNodeInfo");
  textarea.textContent = tree;
}

function advancedWalkHelper(currentElement, level) {
  if (!currentElement) {
    return;
  }

  let tree = currentElement.nodeName;
  let currentElementChildren = Array.from(currentElement.children);
  for (let i = 0; i < currentElementChildren.length; i++) {
    let subtree = advancedWalkHelper(currentElementChildren[i], level + 1);
    tree += `\n${" ".repeat(level * 2)}--${subtree}`;
  }

  return tree;
}

function showNode(el) {
  let nodeType = el.nodeType;
  let nodeName = el.nodeName;
  let nodeValue = el.nodeValue;

  let textarea = document.getElementById("nodeInfo");
  textarea.innerHTML += `Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}\n\n`;
}

function modify() {
  let el = document.getElementById("p1");

  // You can do all the properties one by one if you know them in HTML
  el.title = "I was changed by JS";

  // you can update the style as a string
  // el.style = 'color: blue; font-size: 1em;';

  // you also may prefer to update on the CSS object.  This is the same as above
  // el.style.color = 'blue';
  // el.style.fontSize = '1em';
  // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

  // you can also update the class list
  el.classList.add("fancy");

  // you can also update the dataset which change data-* attributes
  el.dataset.cool = "true"; // data-cool="true"
  el.dataset.coolFactor = "9000"; //data-cool-factor="9000"
}

function advancedModify() {
  let el = document.querySelector("h1");
  el.textContent = "DOM Manipulation is Fun!";

  let newColor = `var(--darkcolor${Math.floor(Math.random() * 6 + 1)})`;
  el.style.color = newColor;

  el = document.querySelector("#p1");
  el.classList.toggle("shmancy");
}

function add() {
  let p, em, txt1, txt2, txt3;

  // first we do things the long old-fashioned standard DOM way
  p = document.createElement("p"); // <p></p>
  em = document.createElement("em"); // <em></em>
  txt1 = document.createTextNode("This is a "); // "This is a"
  txt2 = document.createTextNode("test"); // "test"
  txt3 = document.createTextNode(" of the DOM"); // " of the DOM"

  p.appendChild(txt1); // <p>This is a</p>
  em.appendChild(txt2); // <em>test</em>
  p.appendChild(em); // <p>This is a<em>test</em></p>
  p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

  // go an insert this new copy below the old one
  let oldP = document.getElementById("p1");
  oldP.parentNode.insertBefore(p, oldP.nextSibling);

  // Alternative method using innerHTML and insertAdjacentHTML
  // let oldP = document.getElementById('p1');
  // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
  // clearly short hands are pretty easy!
}

function advancedAdd() {
  let elementTypeSelect = document.querySelector("#elementTypeSelect");
  let tagNameInput = document.querySelector("#tagNameInput");
  let elementContentInput = document.querySelector("#elementContentInput");

  let elementType = elementTypeSelect.value;
  let tagName = tagNameInput.value ? tagNameInput.value : "p";
  let elementContent = elementContentInput.value;

  let content = `[${new Date().toLocaleString()}]`;
  let element;
  if (elementType === "textNode") {
    if (!elementContent) {
      content += ` New Text Node\n`;
    } else {
      content += ` ${elementContent}\n`;
    }
    element = document.createTextNode(content);
  } else if (elementType === "comment") {
    if (!elementContent) {
      content += ` New Comment\n`;
    } else {
      content += ` ${elementContent}\n`;
    }
    element = document.createComment(content);
  } else {
    if (!elementContent) {
      content += ` New Element\n`;
    } else {
      content += ` ${elementContent}\n`;
    }
    element = document.createElement(tagName);
    element.textContent = content;
  }

  let output = document.querySelector("#addOutput");
  output.appendChild(element);
}

function remove() {
  document.body.removeChild(document.body.lastChild);
}

function safeRemove() {
  let elementsToDelete = Array.from(document.body.childNodes);
  elementsToDelete.forEach((element) => {
    if (element.id !== "controls") {
      element.remove();
    }
  });
}

function selectorRemove() {
  let selectorInput = document.querySelector("#selectorRemoveInput");
  let selector = selectorInput.value;

  let nodesToDelete = document.querySelectorAll(selector);
  nodesToDelete.forEach((node) => {
    node.remove();
  });
}

function basicClone() {
  let elemToClone = document.querySelector("#p1");
  let clonedElem = elemToClone.cloneNode(true);
  let newId = `p${Math.floor(Math.random() * 1000000)}`;
  clonedElem.id = newId;
  elemToClone.insertAdjacentElement("afterend", clonedElem);
}

function advancedClone() {
  const IMAGES = [
    { src: "europe.jpeg", alt: "A street in a charming European town" },
    { src: "beach.jpeg", alt: "Beach with a view of cliffs" },
    { src: "tokyo.jpeg", alt: "A crosswalk filled with people in Japan" },
  ];
  let imageNumber = Math.floor(Math.random() * 3);
  let imageObject = IMAGES[imageNumber];

  let template = document.querySelector("#cardTemplate");
  let clone = template.content.cloneNode(true);

  let cardNumber = Math.floor(Math.random() * 1000000);

  let title = clone.querySelector("h2");
  title.textContent = `Card ${cardNumber}`;

  let image = clone.querySelector("img");
  image.src = imageObject.src;
  image.alt = imageObject.alt;

  let paragraph = clone.querySelector("p");
  paragraph.textContent = `This card generated a random number of ${cardNumber}`;

  let link = clone.querySelector("a");
  link.href = "https://www.google.com";
  link.textContent = "Google Home Page";

  document.body.appendChild(clone);
}

window.addEventListener("DOMContentLoaded", init);
