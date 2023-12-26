window.saveDataAcrossSessions = true

const DELAY = 1000

const LEFT_AREA = window.innerWidth / 4
const RIGHT_AREA = window.innerHeight - window.innerWidth / 4

let startTime = Number.POSITIVE_INFINITY
let direction = null

webgazer.setGazeListener((data, timestamp) => {
    // Access the video feed element
    const videoFeed = document.getElementById('webgazerVideoFeed');

    // Apply custom styles to the video feed
    if (videoFeed) {
      videoFeed.style.width = '320px';  // Set your desired width
      videoFeed.style.height = '240px'; // Set your desired height
      videoFeed.style.position = 'absolute';
      videoFeed.style.bottom = '0';
      videoFeed.style.left = '0';
      videoFeed.style.border = '2px solid blue';  // Example: Change border color
      // You can apply other custom styles or manipulate properties here
    }
    
    webgazer.params.showVideo = false
    if (data == null) return

    if(data.x < LEFT_AREA && direction !== 'LEFT') {
        startTime = timestamp
        direction = 'LEFT'
    } else if (data.x > RIGHT_AREA && direction !== 'RIGHT') {
        startTime = timestamp
        direction = 'RIGHT'
    } else if (data.x >= LEFT_AREA && data.x <= RIGHT_AREA) {
        startTime = Number.POSITIVE_INFINITY
        direction = null
    }

    if (startTime + DELAY < timestamp) {
        console.log("DEBUG")
    }
}).begin()// Initialize WebGazer
