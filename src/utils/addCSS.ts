export function addCSS<E extends HTMLElement>(
  element: E,
  styles: Partial<CSSStyleDeclaration>,
): E {
  Object.assign(element.style, styles);
  return element;
}
