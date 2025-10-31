import { addToElement, createElement } from "kumeru";
import { getPreviousGIFS } from "services/get-previous-gifs";

export const PreviousGIFS = async (page = 1) => {
  const data = await getPreviousGIFS(page);

  return addToElement(
    createElement("div", { classes: "m-1 grid grid-cols-1 sm:grid-cols-3" }),
    data.map((src) =>
      createElement("img", {
        attributes: { src },
        functions: {
          click() {
            open(src, "_blank")?.focus();
          },
        },
        classes: "w-[90%] h-[90%]",
      })
    )
  );
};
