import { createElement, addToElement } from "utils/browser";

export const PreviousGIFS = async (page = 1) => {
  const response = await fetch("/.netlify/functions/upload", {
    method: "POST",
    body: JSON.stringify({
      page,
    }),
  });

  const data = response.ok
    ? ((await response.json()) as string[])
    : [
        "https://ultirequiem.is-from.space/r/kzzxiect30a.gif",
        "https://ultirequiem.is-from.space/r/l003gbbrc0a.gif",
        "https://ultirequiem.is-from.space/r/l00etl8t60a.gif",
      ];

  return addToElement(
    createElement("div", { classes: "grid grid-cols-1 sm:grid-cols-3" }),
    data.map((url) =>
      createElement("img", {
        attributes: { src: url },
        functions: {
          click: () => {
            window.open(url, "_blank");
          },
        },
        classes: "w-[90%] h-[90%]",
      })
    )
  );
};
