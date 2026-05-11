window.pose_results = undefined;

function setup() {
  let p5canvas = createCanvas(400, 400);
  p5canvas.parent('#canvas');

  window.gotPoses = function (results) {
    window.pose_results = results; 

    adjustCanvas();
  }
}

function draw() {
  clear();

  const poseResults = window.pose_results;
  const landmarks = poseResults?.landmarks?.[0];

  if (landmarks) {
    let landmark0 = landmarks[0];
    let landmark15 = landmarks[15];
    let landmark16 = landmarks[16];
    if (!landmark0 || !landmark15 || !landmark16) {
      return;
    }

    fill(255, 0, 0);
    noStroke();
    circle(landmark0.x * width, landmark0.y * height, 5);
    circle(landmark15.x * width, landmark15.y * height, 5);
    circle(landmark16.x * width, landmark16.y * height, 5);

  }
}

function windowResized() {
  adjustCanvas();
}

function adjustCanvas() {
  var element_webcam = document.getElementById('webcam');
  resizeCanvas(element_webcam.clientWidth, element_webcam.clientHeight);
}
