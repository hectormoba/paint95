import {
  queryEl,
  queryEls,
  removeAllClassesFromElement,
} from "./js/utils.module.js";
import { drawState } from "./js/state.module.js";
import { MODES } from "./js/constants.module.js";

const canvasEl = queryEl("#painting_zone");
const ctx = canvasEl.getContext("2d", { willReadFrequently: true });
const primary_color_selector = queryEl("#primary_color_selector");
const secondary_color_selector = queryEl("#secondary_color_selector");
const color_switcher = queryEl(".selected_colors_switcher");

const freform = queryEl("#freform_btn");
const select = queryEl("#select_btn");
const eraser = queryEl("#eraser_btn");
const fill = queryEl("#fill_btn");
const colorPicker = queryEl("#color_picker_btn");
const magnifier = queryEl("#magnifier_btn");
const pencil = queryEl("#pencil_btn");
const brush = queryEl("#brush_btn");
const airbrush = queryEl("#airbrush_btn");
const text = queryEl("#text_btn");
const line = queryEl("#line_btn");
const curve = queryEl("#curve_btn");
const rect = queryEl("#rect_btn");
const polygon = queryEl("#polygon_btn");
const ellipse = queryEl("#ellipse_btn");
const roundRect = queryEl("#round_rect_btn");

// PREPARATION

primary_color_selector.style.background =
  primary_color_selector.getAttribute("data-color");
secondary_color_selector.style.background =
  secondary_color_selector.getAttribute("data-color");

// CANVAS INTERACTION FUNCTIONS

let { isUserDrawing, lastX, lastY, startX, startY, mode, snapshot } = drawState;

function startCanvasInteraction(event) {
  isUserDrawing = true;
  const { offsetX, offsetY } = event;

  [lastX, lastY] = [offsetX, offsetY];
  [startX, startY] = [offsetX, offsetY];

  snapshot = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);
}

function stopCanvasInteraction(event) {
  isUserDrawing = false;
}

function canvasInteraction(event) {
  if (!isUserDrawing) return;
  const { offsetX, offsetY } = event;

  console.log(mode);

  if (mode === MODES.pencil_draw || mode === MODES.erase) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();

    [lastX, lastY] = [offsetX, offsetY];
    return;
  }

  if (
    mode === MODES.forms.rectangle ||
    mode === MODES.forms.rounded_rectangle
  ) {
    const width = offsetX - startX;
    const height = offsetY - startY;

    ctx.putImageData(snapshot, 0, 0);
    ctx.beginPath();
    if (mode === MODES.forms.rectangle) {
      ctx.rect(startX, startY, width, height);
    } else {
      console.log("hre");
      ctx.roundRect(startX, startY, width, height, 8);
    }
    ctx.stroke();
    return;
  }

  if (mode === MODES.fill) {
  }
}

// CANVAS EVENTS
canvasEl.addEventListener("mousedown", startCanvasInteraction);
canvasEl.addEventListener("mouseup", stopCanvasInteraction);
canvasEl.addEventListener("mousemove", canvasInteraction);
canvasEl.addEventListener("mouseLeave", stopCanvasInteraction);

//TOOLS INTERACTIONS
function setMode(newMode) {
  mode = newMode;
  queryEl("button.active")?.classList.remove("active");
  removeAllClassesFromElement(canvasEl);

  switch (newMode) {
    case MODES.pencil_draw:
      pencil.classList.add("active");
      ctx.globalCompositeOperation = "source-over";
      break;
    case MODES.erase:
      eraser.classList.add("active");
      ctx.lineWidth = 20;
      ctx.globalCompositeOperation = "destination-out";
      break;
    case MODES.forms.rectangle:
      rect.classList.add("active");
      canvasEl.classList.add("cursor_precise");
      ctx.globalCompositeOperation = "source-over";
      break;
    case MODES.fill:
      fill.classList.add("active");
      canvasEl.classList.add("cursor_fill_bucket");
      ctx.globalCompositeOperation = "destination-over";
      break;
    case MODES.forms.rounded_rectangle:
      roundRect.classList.add("active");
      ctx.globalCompositeOperation = "source-over";
  }
}

//TOOLS EVENTS

pencil.addEventListener("click", () => setMode(MODES.pencil_draw));
eraser.addEventListener("click", () => setMode(MODES.erase));
rect.addEventListener("click", () => setMode(MODES.forms.rectangle));
fill.addEventListener("click", () => setMode(MODES.fill));
roundRect.addEventListener("click", () =>
  setMode(MODES.forms.rounded_rectangle)
);

//FOOTER INTERACTION

function changeColor(event) {
  const color = event.target.getAttribute("data-color");
  if (!color) return;

  ctx.strokeStyle = color;
}

// FOOTER EVENTS
color_switcher.addEventListener("click", changeColor);
