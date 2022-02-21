export function addToElement<T extends HTMLElement>(
  app: T,
  elements: HTMLElement[]
) {
  for (const element of elements) {
    app.appendChild(element);
  }

  return app;
}
