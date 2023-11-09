import WaveSurfer from "https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js";

const schema = {
  height: {
    value: 128,
    min: 10,
    max: 512,
    step: 1,
  },
  width: {
    value: 300,
    min: 10,
    max: 2000,
    step: 1,
  },
  cursorWidth: {
    value: 1,
    min: 0,
    max: 10,
    step: 1,
  },
  minPxPerSec: {
    value: 1,
    min: 1,
    max: 1000,
    step: 1,
  },
  peaks: {
    type: "json",
  },
  sampleRate: {
    value: 8000,
    min: 8000,
    max: 48000,
    step: 1000,
  },
};

document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    // 如果按下的是空格键
    if (wavesurfer.isPlaying()) {
      wavesurfer.pause();
      playButton.textContent = "播放";
    } else {
      wavesurfer.play();
      playButton.textContent = "暫停";
    }
  }
});

const playButton = document.getElementById("playButton");
playButton.addEventListener("click", () => {
  if (wavesurfer.isPlaying()) {
    wavesurfer.pause();
    playButton.textContent = "播放";
  } else {
    wavesurfer.play();
    playButton.textContent = "暫停";
  }
});


const stopButton = document.getElementById("stopButton");

stopButton.addEventListener("click", () => {
  wavesurfer.stop(); // 停止音频播放
  wavesurfer.seekTo(0); // 将播放位置重置到开头
});

const volumeSlider = document.getElementById("volumeSlider");
volumeSlider.addEventListener("input", () => {
  const volume = volumeSlider.value / 100;
  wavesurfer.setVolume(volume);
});

const widthSlider = document.getElementById("widthSlider");
widthSlider.addEventListener("input", () => {
  const width = widthSlider.value;
  const minPxPerSec = width;
  options.minPxPerSec = minPxPerSec;
  wavesurfer.setOptions(options);
});

const fileInput = document.getElementById("fileInput");
const loadButton = document.getElementById("loadButton");

fileInput.addEventListener("change", (e) => {
  const selectedFile = e.target.files[0];
  if (selectedFile) {
    const url = URL.createObjectURL(selectedFile);
    options.url = url;
    wavesurfer.load(url);
  }
});

loadButton.addEventListener("click", () => {
  fileInput.click();
});

const options = {
  container: "player",
  height: 128,
  width: 800,
  splitChannels: false,
  normalize: false,
  waveColor: "#ff4e00",
  progressColor: "#dd5e98",
  cursorColor: "#ddd5e9",
  cursorWidth: 2,
  barAlign: "",
  minPxPerSec: 400,
  url: "Gt2.wav",
};

const wavesurfer = WaveSurfer.create(options);
wavesurfer.on("ready", () => {
  wavesurfer.setTime(0);
});
