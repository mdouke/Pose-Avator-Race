import * as THREE from "three";
import { GOAL_Z, GROUND_LENGTH, GROUND_WIDTH, OBSTACLE_Z, PLAYER_Z } from "./constants.js";

export function createCourse(scene) {
  const obstacles = createObstacles();
  obstacles.forEach((obstacle) => scene.add(obstacle));

  const groundGeometry = new THREE.PlaneGeometry(GROUND_WIDTH, GROUND_LENGTH);
  const groundMaterial = new THREE.MeshStandardMaterial({ color: 0xA0A0A0 });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = 0;
  scene.add(ground);

  const wallGeometry = new THREE.PlaneGeometry(500, GROUND_LENGTH);
  const wallMaterial1 = new THREE.MeshStandardMaterial({ color: 0xB0B0B0 });
  const wallMaterial2 = new THREE.MeshStandardMaterial({ color: 0x909090 });
  const wall1 = new THREE.Mesh(wallGeometry, wallMaterial1);
  const wall2 = new THREE.Mesh(wallGeometry, wallMaterial2);
  wall1.position.set(GROUND_WIDTH / 2, 150, 0);
  wall1.rotation.y = -Math.PI / 2;
  wall1.rotation.x = -Math.PI / 2;
  wall2.position.set(-GROUND_WIDTH / 2, 150, 0);
  wall2.rotation.y = Math.PI / 2;
  wall2.rotation.x = -Math.PI / 2;
  scene.add(wall1);
  scene.add(wall2);

  const lineGeometry = new THREE.PlaneGeometry(GROUND_WIDTH, 200);
  const lineMaterial = new THREE.MeshStandardMaterial({ color: 0xE0E0E0 });
  const startLine = new THREE.Mesh(lineGeometry, lineMaterial);
  startLine.position.set(0, 1, PLAYER_Z - 200);
  startLine.rotation.x = -Math.PI / 2;
  scene.add(startLine);

  const goalLine = new THREE.Mesh(lineGeometry, lineMaterial);
  goalLine.position.set(0, 1, GOAL_Z);
  goalLine.rotation.x = -Math.PI / 2;
  scene.add(goalLine);

  return {
    obstacles,
    walls: {
      right: wall1,
      left: wall2
    }
  };
}

function createObstacles() {
  const material = new THREE.MeshStandardMaterial({ color: 0xD00000 });
  const geometries = {
    small: new THREE.BoxGeometry(400, 400, 200),
    medium: new THREE.BoxGeometry(800, 400, 200),
    large: new THREE.BoxGeometry(1200, 400, 200),
    wide: new THREE.BoxGeometry(1000, 400, 200)
  };

  const obstacleSettings = [
    [geometries.small, 0, OBSTACLE_Z],
    [geometries.small, 400, OBSTACLE_Z - 3000],
    [geometries.medium, -400, OBSTACLE_Z - 3000],
    [geometries.large, 650, OBSTACLE_Z - 6000],
    [geometries.medium, -550, OBSTACLE_Z - 6000],
    [geometries.large, -650, OBSTACLE_Z - 9000],
    [geometries.wide, 750, OBSTACLE_Z - 9000],
    [geometries.small, 1050, OBSTACLE_Z - 12000],
    [geometries.large, 50, OBSTACLE_Z - 12000],
    [geometries.small, -1050, OBSTACLE_Z - 12000]
  ];

  return obstacleSettings.map(([geometry, x, z]) => {
    const obstacle = new THREE.Mesh(geometry, material);
    obstacle.position.set(x, 100, z);
    return obstacle;
  });
}
