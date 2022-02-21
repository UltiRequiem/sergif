import RecordRTC from "recordrtc";
import { addToElement, createElement, addCSS } from "./utils";
import {
  RecordButtons,
  Title,
  RecordingFrame,
  DownloadButton,
} from "./components";

import { captureCamera, stopRecordingCallback } from "./gif";

import "./style.css";
import download from "downloadjs";

const app = document.querySelector<HTMLDivElement>("#app")!;

addCSS(app, { display: "flex", flexDirection: "column", alignItems: "center" });

const appTitle = Title("Sergif");

const GIFBox = RecordingFrame();

let data: Blob;

let recorder: {
  startRecording: () => void;
  camera: MediaStream;
  stopRecording: (arg0: () => void) => void;
};

const startRecordingButton = RecordButtons("Start Recording", {
  functions: {
    async click() {
      // @ts-ignore
      this.disabled = true;

      const camera = await captureCamera();

      recorder = RecordRTC(camera, {
        type: "gif",
        frameRate: 10,
        quality: 10,
        width: 360,
        height: 240,
        hidden: 440,
        onGifPreview(gifURL: string) {
          GIFBox.src = gifURL;
        },
      });

      recorder.startRecording();

      recorder.camera = camera;

      stopRecordingButton.disabled = false;
    },
  },
});

const stopRecordingButton = RecordButtons("Stop recording", {
  functions: {
    click(this: HTMLButtonElement) {
      if (!recorder) {
        return;
      }
      this.disabled = true;
      recorder.stopRecording(() => {
        data = stopRecordingCallback(recorder, GIFBox);
      });
    },
  },
});

const downloadButton = DownloadButton({
  functions: {
    click() {
      download(data, "myGif.gif", "image/gif");
    },
  },
});

addToElement(app, [
  appTitle,
  startRecordingButton,
  stopRecordingButton,
  addToElement(
    createElement("div", { classes: ["w-60", "h-60", "bg-lime-500"] }),
    [GIFBox]
  ),
  downloadButton,
]);
