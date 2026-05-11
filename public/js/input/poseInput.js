import { CANVAS_HEIGHT, CANVAS_WIDTH, GOAL_Z } from "../game/constants.js";
import { GAME_MODE } from "../game/state.js";
import { updateClientDebug } from "../network/socketClient.js";

export function applyPoseInput({ poseResults, state, myMachine, opponentMachine, socket, sounds }) {
  const landmarks = poseResults?.landmarks?.[0];
  if (!landmarks) {
    return;
  }

  const landmark0 = landmarks[0];
  const landmark15 = landmarks[15];
  const landmark16 = landmarks[16];
  if (!landmark0 || !landmark15 || !landmark16) {
    return;
  }

  const isUp = landmark0.y > landmark15.y && landmark0.y > landmark16.y;
  const isDown = landmark0.y < landmark15.y && landmark0.y < landmark16.y;
  const distance = getDistance(
    landmark15.x * CANVAS_WIDTH,
    landmark15.y * CANVAS_HEIGHT,
    landmark16.x * CANVAS_WIDTH,
    landmark16.y * CANVAS_HEIGHT
  );
  const distanceX = getDistance(landmark15.x, 0, landmark16.x, 0);
  const is15Right = landmark0.x > landmark15.x;
  const is15Left = landmark0.x < landmark15.x;
  const is16Right = landmark0.x > landmark16.x;
  const is16Left = landmark0.x < landmark16.x;

  const closeDistance = CANVAS_WIDTH * 0.3;
  const readyPose = isUp && distance < closeDistance;
  updateClientDebug(state, "pose", {
    poseDetected: true,
    readyPose
  });

  if (state.mode === GAME_MODE.WAITING_FOR_READY_POSE && readyPose) {
    console.log("Ready");
    socket.emit("ready");
    state.mode = GAME_MODE.READY;
    updateClientDebug(state, "ready");
  }

  if (state.mode === GAME_MODE.PLAYING) {
    if (isDown && distance < closeDistance && is15Right && is16Right) {
      myMachine.position.x += 7;
    } else if (isDown && distance < closeDistance && is15Left && is16Left) {
      myMachine.position.x -= 7;
    }

    if (isDown && is15Left && is16Right && distanceX > 0.3) {
      myMachine.position.z -= 10 * (distanceX * 4 - 1);
      myMachine.scale.x = distanceX * 2;
    } else {
      myMachine.scale.x = 1;
    }
  }

  if (myMachine.position.z < GOAL_Z && opponentMachine.position.z > GOAL_Z && state.mode === GAME_MODE.PLAYING) {
    console.log("You Win!");
    sounds.playWinner();
    socket.emit("gameEnd");
    state.mode = GAME_MODE.FINISHED;
    updateClientDebug(state, "win");
  } else if (myMachine.position.z > GOAL_Z && opponentMachine.position.z < GOAL_Z && state.mode === GAME_MODE.PLAYING) {
    console.log("You Lose!");
    sounds.playLoser();
    socket.emit("gameEnd");
    state.mode = GAME_MODE.FINISHED;
    updateClientDebug(state, "lose");
  }
}

function getDistance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}
