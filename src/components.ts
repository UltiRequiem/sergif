import { createElement } from "./utils";
import type { EleOptions } from "./utils";

export function Button(text: string, options: EleOptions = {}) {
  return createElement("button", text, {
    classes: [
      "bg-blue-500",
      "max-w-2xl",
      "my-3",
      "hover:bg-blue-700",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "rounded",
    ],
    ...options,
  });
}
