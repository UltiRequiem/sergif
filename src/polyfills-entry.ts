// Polyfill entry point - must be loaded before main.ts
// This ensures Element.append() is available before any other code runs

if (!Element.prototype.append) {
  Element.prototype.append = function (...nodes: (Node | string)[]) {
    const fragment = document.createDocumentFragment();
    nodes.forEach((node) => {
      // Skip null and undefined values to match native behavior
      if (node === null || node === undefined) {
        return;
      }
      const nodeToAppend =
        typeof node === "string" ? document.createTextNode(node) : node;
      fragment.appendChild(nodeToAppend);
    });
    this.appendChild(fragment);
  };
}
