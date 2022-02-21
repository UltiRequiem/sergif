import RecordRTC from "recordrtc";
import {
  DownloadButton,
  RecordButtons,
  RecordingFrame,
  Title,
} from "./components";
import { addCSS, addToElement, createElement } from "./utils";

import { captureCamera, stopRecordingCallback } from "./gif";

import download from "downloadjs";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

addCSS(app, {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const appTitle = Title("SerGIF");

const GIFBox = RecordingFrame();

let data: Blob;

let recorder: {
  startRecording: () => void;
  camera: MediaStream;
  stopRecording: (_: () => void) => void;
};

const startRecordingButton = RecordButtons("Start", {
  functions: {
    async click() {
      this.disabled = true;

      const camera = await captureCamera();

      recorder = new RecordRTC(camera, {
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

const stopRecordingButton = RecordButtons("Stop", {
  functions: {
    click() {
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
  addToElement(createElement("div"), [
    startRecordingButton,
    stopRecordingButton,
  ]),
  addToElement(
    createElement("div", { classes: ["w-60", "h-60", "bg-lime-500"] }),
    [GIFBox]
  ),
  downloadButton,
  addToElement(
    createElement("footer", "Made with ❤️  by ", {
      classes: ["text-center", "text-gray-500"],
    }),
    [
      createElement("a", "UltiRequiem", {
        attributes: { href: "https://ultirequiem.com" },
      }),
    ]
  ),
]);
