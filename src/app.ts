import RecordRTC from "recordrtc";
import Swal from "sweetalert2";
import download from "downloadjs";
import { nanoid } from "nanoid";

import { ActionButton, RecordButtons, ReloadButton } from "ui/components";
import { AppTitle, Legend, GIFBox, Footer } from "ui/containers";
import { addToElement, createElement, wrapElements } from "utils/browser";

import { captureCamera, stopRecordingCallback } from "utils/gif";
import type { Recorder, CustomCamera } from "utils/gif";

import "style.css";
import "sweetalert2/dist/sweetalert2.min.css";

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

const App = addToElement(
  createElement("div", { classes: "flex flex-col items-center" }),
  [
    AppTitle,
    Legend,
    wrapElements(startRecordingButton, stopRecordingButton),
    wrapElements("w-80 h-60 bg-lime-500", GIFBox),
    wrapElements(downloadButton, shareButton),
    addToElement(createElement("div"), [downloadButton, shareButton]),
    recordOtherGIF,
    Footer,
  ]
);

export default App;
