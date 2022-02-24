import { createElement } from "utils/browser";
import type { EleOptions } from "utils/browser";

export const ActionButton = (
  text = "Download",
  download = true,
  others: EleOptions<HTMLButtonElement> = {}
) =>
  createElement("button", text, {
    classes: `transition mx-3 duration-500 border-0 text-lg h-12 w-36 ${
      download
        ? "bg-red-500 hover:bg-red-700"
        : "bg-purple-500 hover:bg-purple-700"
    } text-white mt-2 px-3 rounded-md font-bold`,
    ...others,
  });
