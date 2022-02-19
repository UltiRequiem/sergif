import { createElement, addToApp } from "./utils";
import { Button } from "./components";

import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

const tittle = createElement("h1", "Sergif", {
  classes: "no-underline hover:underline decoration-pink-500 text-2xl",
});

const startRecording = Button("Start Recording");

const stopRecording = Button("Stop recording", {
  attributes: { disabled: true },
});

addToApp(app, tittle, startRecording, stopRecording);
