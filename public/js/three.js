import { createSounds } from "./audio/sound.js";
import { createCourse } from "./game/course.js";
import { startGameLoop } from "./game/loop.js";
import { createPlayers } from "./game/player.js";
import { createScene } from "./game/scene.js";
import { createGameState } from "./game/state.js";
import { createKeyboardInput } from "./input/keyboardInput.js";
import { registerSocketClient } from "./network/socketClient.js";

const socket = window.socket;

if (!socket) {
  throw new Error("Socket.IO client is not initialized.");
}

const { renderer, scene, camera } = createScene();
const course = createCourse(scene);
const { myMachine, opponentMachine } = createPlayers();
const keyState = createKeyboardInput();
const sounds = createSounds();
const state = createGameState();

registerSocketClient(socket, {
  scene,
  myMachine,
  opponentMachine,
  state,
  sounds
});

startGameLoop({
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
});
