import RecordRTC from 'recordrtc';
import download from 'downloadjs';
import {
  DownloadButton,
  RecordButtons,
  RecordingFrame,
  Title,
} from './components';
import { addCSS, addToElement, createElement } from './utils';

import { captureCamera, stopRecordingCallback } from './gif';

import './style.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const app = document.querySelector<HTMLDivElement>('#app')!;

addCSS(app, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const appTitle = Title('SerGIF');

const GIFBox = RecordingFrame();

let data: Blob;

let recorder: {
  startRecording: () => void;
  camera: MediaStream;
  // eslint-disable-next-line no-unused-vars
  stopRecording: (_: () => void) => void;
};

const stopRecordingButton = RecordButtons('Stop', {
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

const startRecordingButton = RecordButtons('Start', {
  functions: {
    async click() {
      this.disabled = true;

      const camera = await captureCamera();

      recorder = new RecordRTC(camera, {
        type: 'gif',
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

const downloadButton = DownloadButton({
  functions: {
    click() {
      download(data, 'myGif.gif', 'image/gif');
    },
  },
});

addToElement(app, [
  appTitle,
  addToElement(createElement('div'), [
    startRecordingButton,
    stopRecordingButton,
  ]),
  addToElement(
    createElement('div', { classes: ['w-60', 'h-60', 'bg-lime-500'] }),
    [GIFBox],
  ),
  downloadButton,
  addToElement(
    createElement('footer', 'Made with ❤️  by ', {
      classes: ['text-center', 'text-gray-500'],
    }),
    [
      createElement('a', 'UltiRequiem', {
        attributes: { href: 'https://ultirequiem.com' },
      }),
    ],
  ),
]);
