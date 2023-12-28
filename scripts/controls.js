const DELAY = 1000

const LEFT_AREA = window.innerWidth / 4
const RIGHT_AREA = window.innerWidth - window.innerWidth / 4

let startTime = Number.POSITIVE_INFINITY
let direction = null

webgazer.setGazeListener((data, timestamp) => {
    webgazer.showFaceOverlay(false)

    const videoFeed = document.getElementById('webgazerVideoFeed');
    if (videoFeed) {
        // Video feed custom styles
        // videoFeed.style.opacity = 0.0;
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
        console.log("DEBUG: You are looking: ", direction)
    }
}).begin()// Initialize WebGazer