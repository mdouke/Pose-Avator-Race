import { resolveCourseCollisions } from "./collision.js";
import { updateCamera } from "./scene.js";
import { applyKeyboardInput } from "../input/keyboardInput.js";
import { applyPoseInput } from "../input/poseInput.js";
import { syncPlayer } from "../network/socketClient.js";

export function startGameLoop({
  renderer,
  scene,
  camera,
  course,
  keyState,
  myMachine,
  opponentMachine,
  state,
  socket,
  sounds
}) {
  function animate() {
    requestAnimationFrame(animate);

    applyKeyboardInput(keyState, myMachine);
    resolveCourseCollisions(myMachine, course, sounds);
    applyPoseInput({
      poseResults: window.pose_results,
      state,
      myMachine,
      opponentMachine,
      socket,
      sounds
    });
    syncPlayer(socket, myMachine);
    updateCamera(camera, myMachine);

    renderer.render(scene, camera);
  }

  animate();
}
