import { Title, RecordingFrame } from "ui/components";
import { createElement } from "utils/browser";

export const AppTitle = Title("SerGIF");

export const Legend = createElement(
  "p",
  "Record GIFs with your camera, and share them with your friends!",
  { classes: "p-2" }
);

export const GIFBox = RecordingFrame();
