import type { EleOptions } from "./types";

export function createElement<Tag extends keyof HTMLElementTagNameMap>(
  tag: Tag,
  text?: string | EleOptions,
  options?: EleOptions
): HTMLElementTagNameMap[Tag];
export function createElement(
  tag: string,
  text: string | EleOptions = {},
  options: EleOptions = {}
): HTMLElement {
  const element = document.createElement(tag);

  if (typeof text === "string") {
    element.textContent = text;
  } else {
    options = text;
  }
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

  return element;
}
