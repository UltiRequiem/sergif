export interface EleOptions {
  classes?: string[] | string;
  attributes?: { [key: string]: string | boolean };
}

export function createElement(
  tag: string,
  text: string,
  options: EleOptions = {}
) {
  const element = document.createElement(tag);

  element.textContent = text;

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

  return element;
}

export function addToApp(app: HTMLElement, ...elements: HTMLElement[]) {
  for (const element of elements) {
    app.appendChild(element);
  }
}
