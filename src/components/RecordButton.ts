import { createElement } from "../utils/browser";
import type { EleOptions } from "../utils/browser";

export const RecordButtons = (
  text: string,
  optionals: EleOptions<HTMLButtonElement> = {}
) =>
  createElement("button", text, {
    classes: [
      "bg-blue-500",
      "mx-3",
      "my-3",
      "hover:bg-blue-700",
      "text-white",
      "font-bold",
      "py-1",
      "px-9",
      "rounded",
    ],
    ...optionals,
  });
