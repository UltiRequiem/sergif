export function addToElement(root: HTMLElement, elements: HTMLElement[]) {
  for (const element of elements) {
    root.appendChild(element);
  }

  return root;
}
