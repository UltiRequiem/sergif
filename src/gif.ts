export interface Recorder {
  startRecording: () => void;
  camera: MediaStream;
  // eslint-disable-next-line no-unused-vars
  stopRecording: (_: () => void) => void;
}

export async function captureCamera() {
  return navigator.mediaDevices.getUserMedia({ video: true });
}

export function stopRecordingCallback(recorder: any): [Blob, string] {
  const ultiBlob: Blob = recorder.getBlob();

  const url = URL.createObjectURL(ultiBlob);

  recorder.camera.stop();
  recorder.destroy();

  return [ultiBlob, url];
}
