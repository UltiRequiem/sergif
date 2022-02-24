import { addToElement, KumeroError } from ".";

export function render<T extends HTMLElement>(id: string, app: T) {
  const container = document.querySelector<HTMLElement>(`#${id}`);

  if (!container) {
    throw new KumeroError(`Could not find element with id ${id}`);
  }

  addToElement(container, [app]);
}
