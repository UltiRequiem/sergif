export function captureCamera() {
  return navigator.mediaDevices.getUserMedia({ video: true });
}

export function stopRecordingCallback(recorder: any, image: HTMLImageElement) {
  let ultiBlob: Blob | undefined;

  try {
    ultiBlob = recorder.getBlob();
    const url = URL.createObjectURL(ultiBlob as Blob);
    image.src = url;
  } catch (e) {
    console.log(e);
  }

  recorder.camera.stop();
  recorder.destroy();

  return ultiBlob as Blob;
}
