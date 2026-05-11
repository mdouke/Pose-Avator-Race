import * as THREE from "three";
import {
  CAMERA_OFFSET_Y,
  CAMERA_OFFSET_Z,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  PLAYER_Z
} from "./constants.js";

export function createScene() {
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#myCanvas")
  });
  renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
  renderer.setPixelRatio(window.devicePixelRatio);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87CEEB);

  const camera = new THREE.PerspectiveCamera(45, CANVAS_WIDTH / CANVAS_HEIGHT, 1, 10000);
  camera.position.set(0, CAMERA_OFFSET_Y, PLAYER_Z + CAMERA_OFFSET_Z);

  const light = new THREE.DirectionalLight(0xFFFFFF);
  light.intensity = 4;
  light.position.set(1, 2, 1);
  scene.add(light);

  return { renderer, scene, camera };
}

export function updateCamera(camera, target) {
  camera.position.set(
    target.position.x,
    target.position.y + CAMERA_OFFSET_Y,
    target.position.z + CAMERA_OFFSET_Z
  );
}
