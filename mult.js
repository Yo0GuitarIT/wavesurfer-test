const multitrack = Multitrack.create(
  [
    {
      id: 0,
      draggable: true,
      startPosition: 0, // start time relative to the entire multitrack
      url: '/ImAlrightTrack/01_Kick.wav',
      volume: 1,
      options: {
        waveColor: 'hsl(46, 87%, 49%)',
        progressColor: 'hsl(46, 87%, 20%)',
      },
      markers: [
        {
          time: 0,
          label: '01_Kick.wav',
          color: 'hsla(600, 100%, 30%, 0.5)',
        }
      ],
    },
    {
      id: 1,
      draggable: true,
      startPosition: 0, // start time relative to the entire multitrack
      url: '/ImAlrightTrack/02_Snare.wav',

      volume: 1,
      options: {
        waveColor: 'hsl(46, 87%, 49%)',
        progressColor: 'hsl(46, 87%, 20%)',
      },
      markers: [
        {
          time: 0,
          label: '02_Snare.wav',
          color: 'hsla(600, 100%, 30%, 0.5)',
        }
      ],
    },
    {
      id: 2,
      draggable: true,
      startPosition: 0, // start time relative to the entire multitrack
      url: '/ImAlrightTrack/03_Overheads.wav',
      volume: 1,
      options: {
        waveColor: 'hsl(88, 87%, 49%)',
        progressColor: 'hsl(46, 87%, 20%)',
      },
      markers: [
        {
          time: 0,
          label: '03_Overheads.wav',
          color: 'hsla(600, 100%, 30%, 0.5)',
        }
      ],
    },
    {
      id: 3,
    },
    {
      id: 4,

    }

  ],
  {
    container: document.querySelector('#container'), // required!
    minPxPerSec: 40, // zoom level
    rightButtonDrag: false, // set to true to drag with right mouse button
    cursorWidth: 2,
    cursorColor: 'white',
    trackBackground: '#2D2D2D',
    trackBorderColor: '#7C7C7C',
    dragBounds: false,
    
  },
)

// Events
multitrack.on('start-position-change', ({ id, startPosition }) => {
  console.log(`Track ${id} start position updated to ${startPosition}`)
})

multitrack.on('start-cue-change', ({ id, startCue }) => {
  console.log(`Track ${id} start cue updated to ${startCue}`)
})

multitrack.on('end-cue-change', ({ id, endCue }) => {
  console.log(`Track ${id} end cue updated to ${endCue}`)
})

multitrack.on('volume-change', ({ id, volume }) => {
  console.log(`Track ${id} volume updated to ${volume}`)
})

multitrack.on('fade-in-change', ({ id, fadeInEnd }) => {
  console.log(`Track ${id} fade-in updated to ${fadeInEnd}`)
})

multitrack.on('fade-out-change', ({ id, fadeOutStart }) => {
  console.log(`Track ${id} fade-out updated to ${fadeOutStart}`)
})

multitrack.on('intro-end-change', ({ id, endTime }) => {
  console.log(`Track ${id} intro end updated to ${endTime}`)
})

multitrack.on('envelope-points-change', ({ id, points }) => {
  console.log(`Track ${id} envelope points updated to`, points)
})

multitrack.on('drop', ({ id }) => {
  const droppedFiles = event.dataTransfer.files;
  for (const file of droppedFiles) {
    const newTrackInfo = {
      id,
      url: URL.createObjectURL(file), // 使用文件的URL
      startPosition: 0,
      draggable: true,
      options: {
        waveColor: 'hsl(25, 87%, 49%)',
        progressColor: 'hsl(25, 87%, 20%)',
      },
      markers: [
        {
          time: 0,
          label: file.name,
          color: 'hsla(600, 100%, 30%, 0.5)',
        }],
    };
    console.log(newTrackInfo)
    multitrack.addTrack(newTrackInfo);
  }
});



// Play/pause button
const button = document.querySelector('#play')
button.disabled = true
multitrack.once('canplay', () => {
  button.disabled = false
  button.onclick = () => {
    multitrack.isPlaying() ? multitrack.pause() : multitrack.play()
    button.textContent = multitrack.isPlaying() ? 'Pause' : 'Play'
  }
})

// Forward/back buttons
const forward = document.querySelector('#forward')
forward.onclick = () => {
  multitrack.setTime(multitrack.getCurrentTime() + 30)
}
const backward = document.querySelector('#backward')
backward.onclick = () => {
  multitrack.setTime(multitrack.getCurrentTime() - 30)
}

// Zoom
const slider = document.querySelector('input[type="range"]')
slider.oninput = () => {
  multitrack.zoom(slider.valueAsNumber)
}

// Destroy all wavesurfer instances on unmount
// This should be called before calling initMultiTrack again to properly clean up
window.onbeforeunload = () => {
  multitrack.destroy()
}

// Set sinkId
multitrack.once('canplay', async () => {
  await multitrack.setSinkId('default')
  console.log('Set sinkId to default')
})
