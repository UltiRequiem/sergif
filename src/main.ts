import { createElement, addToApp } from "./utils";
import { Button } from "./components";

import { captureCamera, stopRecordingCallback } from "./gif";

// @ts-ignore: Not correct type definitions for this package
import RecordRTC from "recordrtc";

import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

const tittle = createElement("h1", "Sergif", {
  classes: "underline hover:underline decoration-pink-500 text-7xl my-7",
});

const image = document.createElement("img");
image.style.width = "360";
image.style.background = "black";

let recorder: any;

async function startRecording() {
  // @ts-ignore
  this.disabled = true;

  console.log("hey");

  const camera = await captureCamera();

  recorder = RecordRTC(camera, {
    type: "gif",
    frameRate: 10,
    quality: 10,
    width: 360,
    hidden: 240,
    onGifPreview(gifURL: string) {
      image.src = gifURL;
    },
  });

  recorder.startRecording();

  recorder.camera = camera;

  stopRecordingButton.disabled = false;
}

const startRecordingButton = Button("Start Recording") as HTMLButtonElement;

startRecordingButton.onclick = startRecording;

const stopRecordingButton = Button("Stop recording", {
  attributes: { disabled: true },
}) as HTMLButtonElement;

stopRecordingButton.onclick = function () {
  // @ts-ignore
  this.disabled = true;

  recorder.stopRecording((value: any) => {
    stopRecordingCallback(value, image);
  });
};

const buttons = addToApp(
  createElement("div", "", { classes: "flex flex-col items-center" }),
  startRecordingButton,
  stopRecordingButton,
  image

);

addToApp(app, tittle, buttons, image);
