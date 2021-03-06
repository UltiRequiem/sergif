import { createElement } from "kumeru";
import type { EleOptions } from "kumeru";

export const ReloadButton = (
  text: string,
  optionals: EleOptions<HTMLButtonElement> = {}
) =>
  createElement("button", text, {
    classes: [
      "bg-orange-500",
      "mx-3",
      "my-3",
      "hover:bg-orange-700",
      "text-white",
      "font-bold",
      "py-3",
      "px-12",
      "rounded",
    ],
    ...optionals,
  });
