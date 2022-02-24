import { createElement } from "utils/browser";

export const Title = (text: string) =>
  createElement("h1", text, {
    classes: "underline hover:underline decoration-pink-500 text-7xl my-7",
  });
