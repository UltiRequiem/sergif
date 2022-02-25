import { createElement } from "kumeru";

export const AppTitle = 
  createElement("h1", "Sergif", {
    classes: "underline hover:underline decoration-pink-500 text-7xl my-7",
  });

export const Legend = createElement(
  "p",
  "Record GIFs with your camera, and share them with your friends!",
  { classes: "p-2" }
);

export const GIFBox = createElement("img", { classes: ["h-full"] });
