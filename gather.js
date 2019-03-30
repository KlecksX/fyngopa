const cv = require('opencv4nodejs');

//Open Video Stream from Webcam
const devicePort = 0;
const vCap = new cv.VideoCapture(devicePort);

const delay = 10;

let keyStr = "";
let counter = 0;
let last = "";
while (keyStr != " ") {
  let frame = vCap.read();

  // Makes videos restart when they end.
  if (frame.empty) {
      vCap.reset();
      frame = vCap.read();
  }

  frame = frame.resizeToMax(360);

  const seconds = Math.round(new Date().getTime() / 1000);

  if (keyStr === 'c') {
    const path = `./training/${seconds}_${counter++}.jpg`;
    cv.imwrite(path, frame);
    last = path;
    console.log(path);
  }

  frame.putText(
    `Images taken: ${counter}`,
    new cv.Point2(10, 15), //origin
    cv.FONT_HERSHEY_PLAIN, 
    1, //Size
    new cv.Vec(0, 255, 255), 
    1, //Line Type
    3 //Thickness
  );

  frame.putText(
    `Last: ${last}`,
    new cv.Point2(10, 30), //origin
    cv.FONT_HERSHEY_PLAIN, 
    1, //Size
    new cv.Vec(255, 0, 0), 
    1, //Line Type
    3 //Thickness
  );

  cv.imshow('Capture', frame);

  keyStr = String.fromCharCode(cv.waitKey(delay));
}

vCap.release();
cv.destroyAllWindows();