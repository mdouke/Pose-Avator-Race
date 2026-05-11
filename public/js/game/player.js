import * as THREE from "three";
import { MY_START_X, OPPONENT_START_X, PLAYER_Z } from "./constants.js";

export function createPlayers() {
  const myMachine = createCubePlayer(0x00ff00, MY_START_X);
  const opponentMachine = createCubePlayer(0xff6600, OPPONENT_START_X);

  return { myMachine, opponentMachine };
}

function createCubePlayer(color, startX) {
  const geometry = new THREE.BoxGeometry(200, 200, 200);
  const material = new THREE.MeshStandardMaterial({ color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(startX, 100, PLAYER_Z);
  return mesh;
}

export function addToSceneOnce(scene, mesh) {
  if (!mesh.parent) {
    scene.add(mesh);
  }
}
