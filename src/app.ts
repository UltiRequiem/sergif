import download from "downloadjs";
import type { CustomCamera, Recorder } from "gif";
import { captureCamera, stopRecordingCallback } from "gif";
import { wrapElements } from "kumeru";
import { nanoid } from "nanoid";
import RecordRTC from "recordrtc";
import { buildTweetLink } from "services/twitter";
import Swal from "sweetalert2";
import { ActionButton, RecordButtons, ReloadButton } from "ui/components";
import { AppTitle, Footer, GIFBox, Legend, PreviousGIFS } from "ui/containers";

import "style.css";
import "sweetalert2/dist/sweetalert2.min.css";

let data: Blob, recorder: Recorder;

const TWITTER_SHARE_TEXT = "Check out this GIF I made with Sergif! 🎥✨";

const processStatus = {
  start: false,
  finished: false,
  saved: false,
  link: "",
};

const uploadGIF = async (): Promise<string | null> => {
  const response = await fetch("/.netlify/functions/upload", {
    method: "POST",
    body: data,
  });

  if (!response.ok) {
    await Swal.fire({
      title: "Server Error",
      text: "Please try again later",
      icon: "error",
    });

    return null;
  }

  const parsedResponse = (await response.json()) as { url: string };
  return parsedResponse.url;
};

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
        const uploadedUrl = await uploadGIF();
        if (!uploadedUrl) {
          return;
        }
        processStatus.link = uploadedUrl;
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

const twitterShareButton = ActionButton("Share on Twitter", false, {
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
        const uploadedUrl = await uploadGIF();

        if (!uploadedUrl) {
          return;
        }

        processStatus.link = uploadedUrl;
      }

      const tweetLink = buildTweetLink(processStatus.link, TWITTER_SHARE_TEXT);

      open(tweetLink, "_blank")?.focus();

      processStatus.saved = true;
    },
  },
});

let alreadyFetched = false;

const seeOtherUsersGIFsButton = ActionButton("See Other Users GIFs", false, {
  functions: {
    async click() {
      if (alreadyFetched) {
        return;
      }

      const gifs = await PreviousGIFS();

      alreadyFetched = true;

      if (App.children.length >= 9) {
        return;
      }

      App.insertBefore(gifs, App.children[7]);
    },
  },
});

const App = wrapElements(
  "flex flex-col items-center text-center",
  AppTitle,
  Legend,
  wrapElements(startRecordingButton, stopRecordingButton),
  wrapElements("w-80 h-60 bg-lime-500", GIFBox),
  wrapElements(downloadButton, shareButton, twitterShareButton),
  recordOtherGIF,
  seeOtherUsersGIFsButton,
  Footer
);

export default App;
