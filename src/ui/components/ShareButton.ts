import { createElement } from "kumeru";
import type { EleOptions } from "kumeru";

export const DownloadButton = (others: EleOptions<HTMLButtonElement> = {}) =>
  createElement("button", "Download", {
    classes:
      "transition duration-500 border-0 text-lg h-12 w-36 bg-red-500 hover:bg-red-700 text-white mt-2 px-3 rounded-md",
    ...others,
  });
