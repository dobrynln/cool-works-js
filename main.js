//slider 1
let upBtn = document.querySelector(".up-button");
let downBtn = document.querySelector(".down-button");
let leftBg = document.querySelector(".slider-left");
let rightBg = document.querySelector(".slider-right");
let rightBgAll = rightBg.querySelectorAll(".slider-right__bg").length;

let containerSliders = document.querySelector('.slider-container')
let activeSlide = 0;
leftBg.style.top = `-${(rightBgAll - 1) * 100}vh`;

upBtn.addEventListener("click", () => {
  changeslide("up");
});
downBtn.addEventListener("click", () => {
  changeslide("down");
});

function changeslide(btn) {
  if (btn === "up") {
    activeSlide++;
    if (activeSlide === rightBgAll) {
      activeSlide = 0;
    }
  } else if (btn === "down") {
    activeSlide--;
    if (activeSlide < 0) {
      activeSlide = rightBgAll - 1;
    }
  }
  let heightContainer = containerSliders.clientHeight;
  rightBg.style.transform = `translateY(-${activeSlide * heightContainer}px)`
  leftBg.style.transform = `translateY(${activeSlide * heightContainer}px)`
}
//slider 2
const sliders = document.querySelectorAll('.slide')

sliders.forEach( (slide) => {
    slide.addEventListener('click', () => {
        RemoveClassesActive();
        slide.classList.add('active-slide')
       
    })
})
function RemoveClassesActive () {
    sliders.forEach( (slide) => {
        slide.classList.remove('active-slide')
    })
}
//doska
let board = document.querySelector('#board')
let colors = ['#872020', '#b31d6a', '#c25bb4', '#411ebd', '#443a66', '#146edb', '#14dbb0', '#17db14', '#c1db14', '#db7414']
const SQUARES_COUNTER = 500

for(let i = 0; i < SQUARES_COUNTER; i++){
    let square = document.createElement('div')
    square.classList.add('board-square')
    square.addEventListener('mouseover', () => setColor(square))
    square.addEventListener('mouseleave', () => removeColor(square))
    board.appendChild(square)
}
function setColor(el) {
    let getColor = randomColor()
    el.style.backgroundColor = getColor
    el.style.boxShadow = `0 0 2px ${getColor},0 0 10px ${getColor} `
}
function removeColor(el) {
    el.style.backgroundColor = '#1d1d1d'
    el.style.boxShadow = '0 0 2px #000'
}

function randomColor() {
    let idx = Math.floor(Math.random() * colors.length)
    return colors[idx]
}
//todos
let overlay = document.querySelector(".overlay");
function ModalTodo(el) {
  overlay.style.display = "block";
  el.classList.add("active-modal");
  document.body.style.overflow = "hidden";
}
function ModalTodoClose(el) {
  overlay.style.display = "none";
  el.classList.remove("active-modal");
  document.body.style.overflow = "visible";
}
// todo
let dragAll = document.querySelectorAll(".drag-wrapper__todo");
let statusAll = document.querySelectorAll(".drag-wrapper__descr");
let draggable = null;
dragAll.forEach((todo) => {
  todo.addEventListener("dragstart", dragStart);
  todo.addEventListener("dragend", dragEnd);
});
function dragStart(e) {
  draggable = this;
  setTimeout(() => {
    e.target.classList.add("hide");
  }, 0);
}
function dragEnd(e) {
  draggable = null;
  setTimeout(() => {
    e.target.classList.remove("hide");
  }, 0);
}
//
statusAll.forEach((status) => {
  status.addEventListener("dragover", dragOver);
  status.addEventListener("dragenter", dragEnter);
  status.addEventListener("dragleave", dragLeave);
  status.addEventListener("drop", dragDrop);
});

function dragOver(e) {
  e.preventDefault();
}
function dragEnter(e) {
  e.target.classList.add("active-column");
}
function dragLeave(e) {
  e.target.classList.remove("active-column");
}
function dragDrop(e) {
  this.appendChild(draggable);
  e.target.classList.remove("active-column");
}
//create

let addBtnTodo = document.querySelector(".add-todo");
addBtnTodo.addEventListener("click", () => {
  if (document.querySelector(".input").value > 0) {
    createTodo();
    textColumn()
  }
});



function createTodo() {
  let divTodo = document.createElement("div");
  let inputTodo = document.querySelector(".input").value;
  let txt = document.createTextNode(inputTodo);
  let defaultColumn = document.getElementById("defaultStatus");
  divTodo.appendChild(txt);
  divTodo.classList.add("drag-wrapper__todo");
  divTodo.setAttribute("draggable", "true");

  //span
  let span = document.createElement("span");
  let spanTxt = document.createTextNode("X");
  span.classList.add("delete");
  span.appendChild(spanTxt);

  divTodo.appendChild(span);
  defaultColumn.appendChild(divTodo);

  //
  divTodo.addEventListener("dragstart", dragStart);
  divTodo.addEventListener("dragend", dragEnd);
  //
  let modal = document.getElementById("modal");
  document.querySelector(".input").value = "";
  overlay.style.display = "none";
  modal.classList.remove("active-modal");
  document.body.style.overflow = "visible";
  //
  span.addEventListener("click", () => {
    divTodo.remove()
    textColumn()
  });
}
function textColumn() {
  if(document.querySelectorAll(".drag-wrapper__todo").length <= 0) {
    document.querySelector(".todo-no").style.display = 'block'
  } else {
    document.querySelector(".todo-no").style.display = 'none'
  }
}