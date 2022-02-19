export function captureCamera() {
  return navigator.mediaDevices.getUserMedia({ video: true });
}

export function stopRecordingCallback(recorder: any, image: HTMLImageElement) {
  image.src = URL.createObjectURL(recorder);
  recorder.camera.stop();
  recorder.destroy();
}
