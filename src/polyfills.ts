// Polyfill for Element.append() for older browsers
// This method is not supported in IE11 and some older browsers

// Type augmentation for the polyfill
declare global {
  interface Element {
    append(...nodes: (Node | string)[]): void;
  }
}

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

export {}; // Make this a module
