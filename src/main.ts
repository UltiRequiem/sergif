import RecordRTC from "recordrtc";

import { addToElement, createElement } from "./utils";
import { RecordButtons, Title, DownloadButton } from "./components";

import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

const AppTitle = Title("Sergif")

const startRecordingButton = RecordButtons("Start Recording");
const stopRecordingButton = RecordButtons("Stop recording", true);



const buttons = addToElement(
  createElement("div", { classes: "flex flex-col items-center" }),
  startRecordingButton,
  stopRecordingButton,
);

addToElement(app, AppTitle, buttons, DownloadButton());