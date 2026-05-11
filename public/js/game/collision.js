import * as THREE from "three";

export function detectCollision(mesh1, mesh2) {
  const mesh1Box = new THREE.Box3().setFromObject(mesh1);
  const mesh2Box = new THREE.Box3().setFromObject(mesh2);
  return mesh1Box.intersectsBox(mesh2Box);
}

export function resolveCourseCollisions(player, course, sounds) {
  for (let i = 0; i < course.obstacles.length; i++) {
    if (detectCollision(player, course.obstacles[i])) {
      player.position.z += 1500;
      sounds.playCollision();
    }
  }

  if (detectCollision(player, course.walls.right)) {
    player.position.x -= 50;
    sounds.playCollision();
  } else if (detectCollision(player, course.walls.left)) {
    player.position.x += 50;
    sounds.playCollision();
  }
}
