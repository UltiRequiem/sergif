import { createElement } from "../utils";
import type { EleOptions } from "../utils";


export const RecordButtons = (text: string, optionals: EleOptions = {}) =>
  createElement("button", text, {
    classes: [
      "bg-blue-500",
      "mx-3",
      "max-w-2xl",
      "my-3",
      "hover:bg-blue-700",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "rounded",
    ],
    ...optionals,
  });
