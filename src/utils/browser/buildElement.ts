import type { FindOptions } from "./types";

export function createElement<Tag extends keyof HTMLElementTagNameMap>(
  tag: Tag,
  text?: string | FindOptions<Tag>,
  options?: FindOptions<Tag>
): HTMLElementTagNameMap[Tag] {
  const element = document.createElement(tag);

  if (typeof text === "string") {
    element.textContent = text;
  } else {
    // eslint-disable-next-line no-param-reassign
    options = text;
  }

  if (options) {
    const { classes, attributes, functions } = options;

    if (classes) {
      const classesToAdd =
        typeof classes === "string" ? classes.split(" ") : classes;

      element.classList.add(...classesToAdd);
    }

    if (attributes) {
      Object.keys(attributes).forEach((key) => {
        element.setAttribute(key, attributes[key].toString());
      });
    }

    if (functions) {
      Object.keys(functions).forEach((key) => {
        element.addEventListener(key, functions[key]);
      });
    }
  }

  return element;
}
