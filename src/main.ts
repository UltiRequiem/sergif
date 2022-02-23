import RecordRTC from "recordrtc";
import download from "downloadjs";
import { nanoid } from "nanoid";
import {
  ActionButton,
  RecordButtons,
  RecordingFrame,
  Title,
} from "./components";
import { UploadFileResponse } from "./utils/server/tixte-types";
import { addCSS, addToElement, createElement } from "./utils/browser";

import { captureCamera, stopRecordingCallback } from "./gif";
import type { Recorder, CustomCamera } from "./gif";

import "./style.css";

import "boxicons";

const app = document.querySelector<HTMLDivElement>("#app")!;

addCSS(app, {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const appTitle = Title("SerGIF");

const GIFBox = RecordingFrame();

let data: Blob;

let recorder: Recorder;

const stopRecordingButton = RecordButtons("Stop", {
  attributes: {
    disabled: true,
  },
  functions: {
    click() {
      this.disabled = true;
      recorder.stopRecording(() => {
        const [blob, url] = stopRecordingCallback(recorder);
        data = blob;
        GIFBox.src = url;
      });
    },
  },
});

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
      }) as Recorder;

      recorder.startRecording();

      recorder.camera = camera as CustomCamera;

      stopRecordingButton.disabled = false;
      downloadButton.disabled = false;
      shareButton.disabled = false;
    },
  },
});

const downloadButton = ActionButton("Download", true, {
  attributes: { disabled: true },
  functions: {
    click() {
      download(data, `${nanoid()}.gif`, "image/gif");
    },
  },
});

const shareButton = ActionButton("Share", false, {
  attributes: { disabled: true },
  functions: {
    async click() {
      const response = await fetch("/.netlify/functions/upload", {
        method: "POST",
        body: data,
      });

      const parsedResponse = (await response.json()) as { url: string };

      await navigator.clipboard.writeText(parsedResponse.url);
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
  addToElement(createElement("div"), [downloadButton, shareButton]),
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
