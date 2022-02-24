import App from "app";

import { addToElement } from "utils/browser";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.querySelector<HTMLDivElement>("#app")!;

addToElement(container, [App]);
