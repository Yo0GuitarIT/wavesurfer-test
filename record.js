// import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js'

// const options = {
//   /** HTML element or CSS selector (required) */
//   container: 'body',
//   /** The height of the waveform in pixels */
//   height: 128,
//   /** The width of the waveform in pixels or any CSS value; defaults to 100% */
//   width: 600,
//   /** Render each audio channel as a separate waveform */
//   splitChannels: false,
//   /** Stretch the waveform to the full height */
// //   normalize: false,
//   /** The color of the waveform */
//   waveColor: '#ff4e00',
//   /** The color of the progress mask */
//   progressColor: '#dd5e98',
//   /** The color of the playpack cursor */
//   cursorColor: '#ddd5e9',
//   /** The cursor width */
//   cursorWidth: 2,
//   /** Render the waveform with bars like this: ▁ ▂ ▇ ▃ ▅ ▂ */
// //   barWidth: NaN,
// //   /** Spacing between bars in pixels */
// //   barGap: NaN,
// //   /** Rounded borders for bars */
// //   barRadius: NaN,
// //   /** A vertical scaling factor for the waveform */
// //   barHeight: NaN,
//   /** Vertical bar alignment **/
// //   barAlign: 'center',
// //   /** Minimum pixels per second of audio (i.e. zoom level) */
//   minPxPerSec: 200,
//   /** Stretch the waveform to fill the container, true by default */
// //   fillParent: true,
//   /** Audio URL */
//   url: 'm.mp3',
//   /** Whether to show default audio element controls */
//   mediaControls: true,
//   /** Play the audio on load */
// //   autoplay: true,
//   /** Pass false to disable clicks on the waveform */
// //   interact: true,
//   /** Allow to drag the cursor to seek to a new position */
// //   dragToSeek: false,
//   /** Hide the scrollbar */
// //   hideScrollbar: false,
//   /** Audio rate */
// //   audioRate: 1,
//   /** Automatically scroll the container to keep the current position in viewport */
// //   autoScroll: true,
//   /** If autoScroll is enabled, keep the cursor in the center of the waveform during playback */
// //   autoCenter: true,
//   /** Decoding sample rate. Doesn't affect the playback. Defaults to 8000 */
//   sampleRate: 48000,
// }

// const wavesurfer = WaveSurfer.create(options)

// wavesurfer.on('ready', () => {
//   wavesurfer.setTime(0)
// })

// // Generate a form input for each option
// const schema = {
//   height: {
//     value: 128,
//     min: 10,
//     max: 512,
//     step: 1,
//   },
//   width: {
//     value: 300,
//     min: 10,
//     max: 2000,
//     step: 1,
//   },
//   cursorWidth: {
//     value: 1,
//     min: 0,
//     max: 10,
//     step: 1,
//   },
//   minPxPerSec: {
//     value: 1,
//     min: 1,
//     max: 1000,
//     step: 1,
//   },
// //   barWidth: {
// //     value: 0,
// //     min: 1,
// //     max: 30,
// //     step: 1,
// //   },
// //   barHeight: {
// //     value: 1,
// //     min: 0.1,
// //     max: 4,
// //     step: 0.1,
// //   },
// //   barGap: {
// //     value: 0,
// //     min: 1,
// //     max: 30,
// //     step: 1,
// //   },
// //   barRadius: {
// //     value: 0,
// //     min: 1,
// //     max: 30,
// //     step: 1,
// //   },
// //   peaks: {
// //     type: 'json',
// //   },
// //   audioRate: {
// //     value: 1,
// //     min: 0.1,
// //     max: 4,
// //     step: 0.1,
// //   },
//   sampleRate: {
//     value: 8000,
//     min: 8000,
//     max: 48000,
//     step: 1000,
//   },
// }

// const form = document.createElement('form')
// Object.assign(form.style, {
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '1rem',
//   padding: '1rem',
// })
// document.body.appendChild(form)

// for (const key in options) {
//   if (options[key] === undefined) continue
//   const isColor = key.includes('Color')

//   const label = document.createElement('label')
//   Object.assign(label.style, {
//     display: 'flex',
//     alignItems: 'center',
//   })

//   const span = document.createElement('span')
//   Object.assign(span.style, {
//     textTransform: 'capitalize',
//     width: '7em',
//   })
//   span.textContent = `${key.replace(/[a-z0-9](?=[A-Z])/g, '$& ')}: `
//   label.appendChild(span)

//   const input = document.createElement('input')
//   const type = typeof options[key]
//   Object.assign(input, {
//     type: isColor ? 'color' : type === 'number' ? 'range' : type === 'boolean' ? 'checkbox' : 'text',
//     name: key,
//     value: options[key],
//     checked: options[key] === true,
//   })
//   if (input.type === 'text') input.style.flex = 1
//   if (options[key] instanceof HTMLElement) input.disabled = true

//   if (schema[key]) {
//     Object.assign(input, schema[key])
//   }

//   label.appendChild(input)
//   form.appendChild(label)

//   input.oninput = () => {
//     if (type === 'number') {
//       options[key] = input.valueAsNumber
//     } else if (type === 'boolean') {
//       options[key] = input.checked
//     } else if (schema[key] && schema[key].type === 'json') {
//       options[key] = JSON.parse(input.value)
//     } else {
//       options[key] = input.value
//     }
//     wavesurfer.setOptions(options)
//     // textarea.value = JSON.stringify(options, null, 2)
//   }
// }

////////////////////////////////////////

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

const volumeSlider = document.getElementById("volumeSlider");

volumeSlider.addEventListener("input", () => {
  const volume = volumeSlider.value / 100; // 0 to 1
  wavesurfer.setVolume(volume);
});

// 選擇 slider 元素
const widthSlider = document.getElementById("widthSlider");

// 選擇容器元素
const containerBox = document.getElementById("containerBox");

// 監聽 slider 變化
widthSlider.addEventListener("input", () => {
  const width = widthSlider.value + "px"; // 將值轉換為像素
  containerBox.style.width = width; // 設置容器寬度
});

// 初始設置容器寬度
containerBox.style.width = widthSlider.value + 'px';


/////////////////////////////////

const fileInput = document.getElementById("fileInput");
  const loadButton = document.getElementById("loadButton");

  fileInput.addEventListener("change", (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      console.log("Loading file:"+url);
        // 在此處將 URL 設定為音訊的 url
        options.url = url;
        
      wavesurfer.load(url);
    }
  });

  loadButton.addEventListener("click", () => {
    fileInput.click(); // 模擬點擊文件選擇框
  });




////////////////////////////////////////////////////////////////

import WaveSurfer from "https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js";

const options = {
  container: "player",
  height: 128,
  width: widthSlider.value,
  splitChannels: false,
  normalize: false,
  waveColor: "#ff4e00",
  progressColor: "#dd5e98",
  cursorColor: "#ddd5e9",
  cursorWidth: 2,
  barAlign: "",
  minPxPerSec: 0,
//   url: "m.mp3",
};

const wavesurfer = WaveSurfer.create(options);
wavesurfer.on("ready", () => {
  wavesurfer.setTime(0);
});

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

const form = document.createElement("form");
Object.assign(form.style, {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "1rem",
});
document.body.appendChild(form);

for (const key in options) {
  if (options[key] === undefined) continue;
  const isColor = key.includes("Color");

  const label = document.createElement("label");
  Object.assign(label.style, {
    display: "flex",
    alignItems: "center",
  });

  const span = document.createElement("span");
  Object.assign(span.style, {
    textTransform: "capitalize",
    width: "7em",
  });
  span.textContent = `${key.replace(/[a-z0-9](?=[A-Z])/g, "$& ")}: `;
  label.appendChild(span);

  const input = document.createElement("input");
  const type = typeof options[key];
  Object.assign(input, {
    type: isColor
      ? "color"
      : type === "number"
      ? "range"
      : type === "boolean"
      ? "checkbox"
      : "text",
    name: key,
    value: options[key],
    checked: options[key] === true,
  });
  if (input.type === "text") input.style.flex = 1;
  if (options[key] instanceof HTMLElement) input.disabled = true;

  if (schema[key]) {
    Object.assign(input, schema[key]);
  }

  label.appendChild(input);
  form.appendChild(label);

  input.oninput = () => {
    if (type === "number") {
      options[key] = input.valueAsNumber;
    } else if (type === "boolean") {
      options[key] = input.checked;
    } else if (schema[key] && schema[key].type === "json") {
      options[key] = JSON.parse(input.value);
    } else {
      options[key] = input.value;
    }
    wavesurfer.setOptions(options);
  };
}

