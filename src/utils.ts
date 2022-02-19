export interface EleOptions {
  classes?: string[] | string;
  attributes?: { [key: string]: string | boolean };
}

interface hehe {
  [key: string]: string | boolean;
}

const pedro: hehe = {
  name: "Pedro",
  age: "23",
  isAlive: true,
};

export function createElement<Element extends HTMLElement>(
  tag: string,
  text: string,
  options: EleOptions = {}
): Element {
  const element: Element = document.createElement(tag);

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
  return app;
}
