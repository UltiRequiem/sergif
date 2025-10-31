// Polyfill for Element.append() for older browsers
// This method is not supported in IE11 and some older browsers

if (!Element.prototype.append) {
  Element.prototype.append = function (...nodes: (Node | string)[]) {
    const fragment = document.createDocumentFragment();
    nodes.forEach((node) => {
      const nodeToAppend =
        typeof node === "string" ? document.createTextNode(node) : node;
      fragment.appendChild(nodeToAppend);
    });
    this.appendChild(fragment);
  };
}
