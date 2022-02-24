import { addToElement, createElement } from ".";

export const wrapElements = (
  classes?: string | HTMLElement,
  ...elements: HTMLElement[]
) => {
  const firstIsElement =
    classes instanceof HTMLElement && !(typeof classes === "string");

  return addToElement(
    createElement("div", { classes: firstIsElement ? undefined : classes }),
    firstIsElement ? [classes, ...elements] : elements
  );
};
