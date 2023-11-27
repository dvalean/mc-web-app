
const video = document.getElementById('video')

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
    faceapi.nets.faceLandmark68TinyNet.loadFromUri('./models'),
]).then(startVideo)

function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

function calculateAverage(array) {
    var total_x = 0;
    var total_y = 0;
    var count = 0;

    array.forEach(function(item, index) {
        total_x += item.x;
        total_y += item.y;
        count++;
    });
    x = total_x / count
    y = total_y / count
    return {x, y};
}

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.getElementsByTagName('div')[1].append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
        const useTinyModel = true
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks(useTinyModel)
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)

        const landmarks = await faceapi.detectFaceLandmarksTiny(canvas)
        avgPoints = calculateAverage(landmarks.getLeftEye())
        console.log(avgPoints)
    }, 100)
})