import { Title } from "ui/components";
import { createElement } from "utils/browser";

export const AppTitle = Title("SerGIF");

export const Legend = createElement(
  "p",
  "Record GIFs with your camera, and share them with your friends!",
  { classes: "p-2" }
);

export const GIFBox = createElement("img", { classes: ["h-full"] });
