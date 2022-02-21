type CssStyleObject = Partial<CSSStyleDeclaration> & Record<string, string>;

export function addCSS<E extends HTMLElement>(
  element: E,
  styles: CssStyleObject
): E {
  for (const key in styles) {
    // @ts-ignore
    element.style[key] = styles[key];
  }

  return element;
}
