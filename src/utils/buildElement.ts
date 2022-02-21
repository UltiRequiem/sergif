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
    options = text;
  }

  if (options) {
    if (options.classes) {
      if (typeof options.classes === "string") {
        options.classes = options.classes.split(" ");
      }

      element.classList.add(...options.classes);
    }

    if (options.attributes) {
      for (const key in options.attributes) {
        element.setAttribute(key, options.attributes[key].toString());
      }
    }

    if (options.functions) {
      for (const key in options.functions) {
        element.addEventListener(key, options.functions[key]);
      }
    }
  }

  return element;
}
