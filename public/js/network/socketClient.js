import { GAME_MODE, GAME_MODE_NAME } from "../game/state.js";
import { addToSceneOnce } from "../game/player.js";

export function registerSocketClient(socket, { scene, myMachine, opponentMachine, state, sounds }) {
  socket.on("opponent", (players) => {
    addToSceneOnce(scene, opponentMachine);
    if (players?.position) {
      opponentMachine.position.set(players.position.x, players.position.y, players.position.z);
    }
  });

  socket.on("myMachine", (player) => {
    addToSceneOnce(scene, myMachine);
    if (player?.position) {
      myMachine.position.set(player.position.x, player.position.y, player.position.z);
    }
    if (player?.scale) {
      myMachine.scale.set(player.scale.x, player.scale.y, player.scale.z);
    }
  });

  socket.on("start", (message) => {
    handleStart(state, message);
  });

  socket.on("gameStart", (message) => {
    console.log(message);
    state.mode = GAME_MODE.PLAYING;
    sounds.playGameStart();
    updateClientDebug(state, "gameStart");
  });

  socket.on("opponentScale", (players) => {
    if (players?.scale) {
      opponentMachine.scale.set(players.scale.x, players.scale.y, players.scale.z);
    }
  });

  if (window.serverStartReceived) {
    handleStart(state, window.serverStartMessage || "ゲームを開始します");
  }

  socket.emit("requestInitialState");
}

export function syncPlayer(socket, player) {
  socket.emit("position", player.position);
  socket.emit("scale", player.scale);
}

export function updateClientDebug(state, eventName, extra = {}) {
  window.gameDebugState = {
    ...(window.gameDebugState || {}),
    event: eventName,
    mode: state.mode,
    modeName: GAME_MODE_NAME[state.mode],
    ...extra
  };
  window.updateDebugPanel?.();
}

function handleStart(state, message) {
  console.log(message);
  console.log("make a circle");
  state.mode = GAME_MODE.WAITING_FOR_READY_POSE;
  updateClientDebug(state, "start");
}
