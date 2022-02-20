export function addCSS<E extends HTMLElement, S extends CSSStyleDeclaration>(
  element: E,
  styles: Partial<S>
): E {
  for (const key in styles) {
    // @ts-ignore
    element.style[key] = styles[key];
  }

  return element;
}
