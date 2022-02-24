import RecordRTC from "recordrtc";
import Swal from "sweetalert2";
import download from "downloadjs";
import { nanoid } from "nanoid";
import {
  ActionButton,
  RecordButtons,
  RecordingFrame,
  ReloadButton,
  Title,
} from "./components";
import { addCSS, addToElement, createElement } from "./utils/browser";

import { captureCamera, stopRecordingCallback } from "./gif";
import type { Recorder, CustomCamera } from "./gif";

import "./style.css";
import "sweetalert2/dist/sweetalert2.min.css";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const app = document.querySelector<HTMLDivElement>("#app")!;

addCSS(app, {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
});

const appTitle = Title("SerGIF");

const GIFBox = RecordingFrame();

let data: Blob, recorder: Recorder;

const processStatus = { start: false, finished: false, saved: false, link: "" };

const stopRecordingButton = RecordButtons("Stop", {
  functions: {
    async click() {
      if (processStatus.finished) {
        await Swal.fire({
          title: "The process already finished",
          text: "Share or Download your GIF!",
        });
        return;
      } else if (!processStatus.start) {
        await Swal.fire({
          title: "The process is not started",
          text: "Please start the process",
        });
        return;
      }

      recorder.stopRecording(() => {
        const [blob, url] = stopRecordingCallback(recorder);
        data = blob;
        GIFBox.src = url;
      });

      processStatus.finished = true;
    },
  },
});

const startRecordingButton = RecordButtons("Start", {
  functions: {
    async click() {
      if (processStatus.start) {
        await Swal.fire({
          title: "The process already started",
          text: processStatus.finished
            ? `You want to record another? Check the "Record Again" button!`
            : "Please wait...",
        });
        return;
      }

      processStatus.start = true;

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
    },
  },
});

const downloadButton = ActionButton("Download", true, {
  functions: {
    async click() {
      if (!processStatus.start || !processStatus.finished) {
        await Swal.fire({
          title: `The process ${
            processStatus.start ? "didn't finish" : "is not started"
          } yet!`,
          text: "Please finish the process",
        });
        return;
      }

      download(data, `${nanoid()}.gif`, "image/gif");

      processStatus.saved = true;
    },
  },
});

const recordOtherGIF = ReloadButton("Record Again", {
  functions: {
    async click() {
      if (!processStatus.start) {
        const result = await Swal.fire({
          title: "You didn't start the process yet!",
          text: "You still want to restart the process anyways?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, restart it!",
        });

        if (!result.isConfirmed) {
          return;
        }
      } else if (processStatus.start && !processStatus.finished) {
        const result = await Swal.fire({
          title: "You didn't finish the process yet!",
          text: "You will lose the current GIF!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, restart it!",
        });

        if (!result.isConfirmed) {
          return;
        }
      } else if (processStatus.finished && !processStatus.saved) {
        const result = await Swal.fire({
          title: "You didn't Download/Share the GIF yet!",
          text: "You will lose the current GIF!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, restart it!",
        });

        if (!result.isConfirmed) {
          return;
        }
      }

      location.reload();
    },
  },
});

const shareButton = ActionButton("Share", false, {
  functions: {
    async click() {
      if (!processStatus.start || !processStatus.finished) {
        await Swal.fire({
          title: `The process ${
            processStatus.start ? "didn't finish" : "is not started"
          } yet!`,
          text: "Please finish the process",
        });
        return;
      }

      if (!processStatus.link) {
        const response = await fetch("/.netlify/functions/upload", {
          method: "POST",
          body: data,
        });

        const parsedResponse = (await response.json()) as { url: string };

        processStatus.link = parsedResponse.url;
      }

      await navigator.clipboard.writeText(processStatus.link);

      await Swal.fire({
        title: "The link is copied to clipboard",
        html: `Share your <a class="underline text-blue" href="${processStatus.link}" target="_blank">GIF</a>!`,
      });

      open(processStatus.link, "_blank")?.focus();

      processStatus.saved = true;
    },
  },
});

addToElement(app, [
  appTitle,
  createElement(
    "p",
    "Record GIFs with your camera, and share them with your friends!",
    { classes: "p-2" }
  ),
  addToElement(createElement("div"), [
    startRecordingButton,
    stopRecordingButton,
  ]),
  addToElement(
    createElement("div", { classes: ["w-80", "h-60", "bg-lime-500"] }),
    [GIFBox]
  ),
  addToElement(createElement("div"), [downloadButton, shareButton]),
  recordOtherGIF,
  addToElement(
    createElement("footer", "Made with ❤️  by ", {
      classes: ["text-center", "text-yellow-500"],
    }),
    [
      createElement("a", "UltiRequiem", {
        classes: [
          "text-pink-500",
          "text-xl",
          "hover:underline",
          "hover:text-pink-700",
        ],
        attributes: { href: "https://ultirequiem.com" },
      }),
      addToElement(createElement("p"), [
        createElement("a", "Visit the source code", {
          classes: [
            "text-gray-500",
            "text-sm",
            "hover:underline",
            "hover:text-gray-700",
          ],
          attributes: {
            href: "https://github.com/UltiRequiem/sergif",
            target: "_blank",
          },
        }),
      ]),
    ]
  ),
]);
