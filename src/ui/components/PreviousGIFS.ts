import { createElement, addToElement } from "utils/browser";

export const PreviousGIFS = async () => {
  const response = await fetch("/.netlify/functions/upload", {
    method: "POST",
    body: JSON.stringify({
      page: 1,
    }),
  });

  const data = (await response.json()) as string[];

  return addToElement(
    createElement("div", { classes: "flex flex-col" }),
    data.map((url) => createElement("img", { attributes: { src: url } }))
  );
};
