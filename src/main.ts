import App from "app";
import { render } from "kumeru";

const app = document.getElementById("app");

if (!app) {
  throw new Error("App root element not found");
}

render(app, App);
