export interface CustomCamera extends MediaStream {
  stop: () => void;
}

export interface Recorder {
  startRecording: () => void;
  camera: CustomCamera;
  destroy: () => void;
  // eslint-disable-next-line no-unused-vars
  stopRecording: (_: () => void) => void;
  getBlob: () => Blob;
}

export async function captureCamera() {
  return navigator.mediaDevices.getUserMedia({ video: true });
}

export function stopRecordingCallback(recorder: Recorder): [Blob, string] {
  const ultiBlob: Blob = recorder.getBlob();

  const url = URL.createObjectURL(ultiBlob);

  recorder.camera.stop();
  recorder.destroy();

  return [ultiBlob, url];
}
