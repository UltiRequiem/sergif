import { addToElement, createElement } from "./utils";
import { RecordButtons, Title, RecordingFrame } from "./components";

import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

const appTitle = Title("Sergif");

const startRecordingButton = RecordButtons("Start Recording", {
  functions: {
    click: () => {
      console.log("Start recording");
    },
  },
});

const stopRecordingButton = RecordButtons("Stop recording", {
  functions: {
    click: () => {
      console.log("Stop recording");
    },
  },
});

const GIFBoxContainer = createElement("div", { classes: "gif_box_container" });

const GIFBox = RecordingFrame();



addToElement(app, [
  appTitle,
  startRecordingButton,
  stopRecordingButton,
  addToElement(GIFBoxContainer, [GIFBox]),
]);
