import { MODES } from "./constants.module.js";

export const drawState = {
  startX: 0,
  startY: 0,
  lastX: 0,
  lastY: 0,
  isUserDrawing: false,
  mode: MODES.pencil_draw,
  snapshot: undefined,
};
