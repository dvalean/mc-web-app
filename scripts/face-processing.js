// import { FaceDetection, isWithFaceDetection } from "./face-api.js";

var DrawBox = /** @class */ (function () {
    class DrawBox {
        constructor(box, options) {
            if (options === void 0) { options = {}; }
            this.box = new faceapi.Box(box);
            this.options = new faceapi.DrawBoxOptions(options);
        }
        draw(canvasArg) {
            var ctx = faceapi.getContext2dOrThrow(canvasArg);
            var _a = this.options, boxColor = _a.boxColor, lineWidth = _a.lineWidth;
            var _b = this.box, x = _b.x, y = _b.y, width = _b.width, height = _b.height;
            ctx.strokeStyle = boxColor;
            ctx.lineWidth = lineWidth;
            ctx.strokeRect(x, y, width, height);
        }
    }
    return DrawBox;
}());

var DrawEyeBox = /** @class */ (function () {
  class DrawBox {
        constructor(box, options) {
            if (options === void 0) { options = {}; }
            this.box = new faceapi.Box(box);
            this.options = new faceapi.DrawBoxOptions(options);
        }
        draw(canvasArg) {
            var ctx = faceapi.getContext2dOrThrow(canvasArg);
            var _a = this.options, boxColor = _a.boxColor, lineWidth = _a.lineWidth;
            // Position and Size change
            var _b = this.box, x = _b.x + 25, y = _b.y + 25, width = _b.width - 50, height = 0.5 * _b.height - 50;
            ctx.strokeStyle = boxColor;
            ctx.lineWidth = lineWidth;
            ctx.strokeRect(x, y, width, height);
        }
    }
  return DrawBox;
}());

export function drawDetections(canvasArg, detections, faceBox = true, eyesBox = true) {
    var detectionsArray = Array.isArray(detections) ? detections : [detections];
    detectionsArray.forEach(function (det) {
        var score = det instanceof faceapi.FaceDetection
            ? det.score
            : (isWithFaceDetection(det) ? det.detection.score : undefined);
        var box = det instanceof faceapi.FaceDetection
            ? det.box
            : (isWithFaceDetection(det) ? det.detection.box : new Box(det));
        var label = score ? "" + faceapi.round(score) : undefined;
        if (faceBox)
          new DrawBox(box, { label: label }).draw(canvasArg);
        if (eyesBox)
          new DrawEyeBox(box, { label: label }).draw(canvasArg);
    });
}