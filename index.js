import { queryEl, queryEls } from "./js/utils.module.js";
import { drawState } from "./js/state.module.js";

const canvasEl = queryEl("#painting_zone");
const primary_color_selector = queryEl("#primary_color_selector");
const secondary_color_selector = queryEl("#secondary_color_selector");
const color_switcher = queryEl(".selected_colors_switcher");

const ctx = canvasEl.getContext("2d");

// PREPARATION

primary_color_selector.style.background =
  primary_color_selector.getAttribute("data-color");
secondary_color_selector.style.background =
  secondary_color_selector.getAttribute("data-color");

// CANVAS INTERACTION FUNCTIONS

let { isUserDrawing, lastX, lastY, startX, startY } = drawState;

function startCanvasInteraction(event) {
  isUserDrawing = true;
  const { offsetX, offsetY } = event;

  [lastX, lastY] = [offsetX, offsetY];
  [startX, startY] = [offsetX, offsetY];
}

function stopCanvasInteraction(event) {
  isUserDrawing = false;
}

function canvasInteraction(event) {
  if (!isUserDrawing) return;

  const { offsetX, offsetY } = event;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(offsetX, offsetY);
  ctx.stroke();

  [lastX, lastY] = [offsetX, offsetY];
}

// CANVAS EVENTS
canvasEl.addEventListener("mousedown", startCanvasInteraction);
canvasEl.addEventListener("mouseup", stopCanvasInteraction);
canvasEl.addEventListener("mousemove", canvasInteraction);
canvasEl.addEventListener("mouseLeave", stopCanvasInteraction);

//FOOTER INTERACTION

function changeColor(event) {
  const color = event.target.getAttribute("data-color");

  ctx.strokeStyle = "";
}

// FOOTER EVENTS
color_switcher.addEventListener("click", changeColor);
