import RecordRTC from "https://esm.sh/recordrtc";

const image = document.querySelector("img");
const startRecordingButton = document.getElementById("btn-start-recording");
const stopRecordingButton = document.getElementById("btn-stop-recording");

let recorder;

function captureCamera() {
  return navigator.mediaDevices.getUserMedia({ video: true });
}

function stopRecordingCallback() {
  image.src = URL.createObjectURL(recorder.getBlob());
  recorder.camera.stop();
  recorder.destroy();
}

async function startRecording() {
  this.disabled = true;

  const camera = await captureCamera();

  recorder = RecordRTC(camera, {
    type: "gif",
    frameRate: 10,
    quality: 10,
    width: 360,
    hidden: 240,
    onGifPreview(gifURL) {
      image.src = gifURL;
    },
  });

  recorder.startRecording();

  recorder.camera = camera;

  stopRecordingButton.disabled = false;
}

startRecordingButton.onclick = startRecording;

stopRecordingButton.onclick = function () {
  this.disabled = true;
  recorder.stopRecording(stopRecordingCallback);
};
