export function addToElement<T extends HTMLElement>(
  app: T,
  elements: HTMLElement[],
) {
  elements.forEach((element) => app.append(element));

  return app;
}
