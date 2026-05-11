export function createKeyboardInput() {
  const keyState = {};

  document.addEventListener("keydown", (event) => {
    keyState[event.key] = true;
  }, false);

  document.addEventListener("keyup", (event) => {
    keyState[event.key] = false;
  }, false);

  return keyState;
}

export function applyKeyboardInput(keyState, player) {
  if (keyState["w"] || keyState["W"]) {
    player.position.z -= 10;
  }
  if (keyState["s"] || keyState["S"]) {
    player.position.z += 10;
  }
  if (keyState["a"] || keyState["A"]) {
    player.position.x -= 10;
  }
  if (keyState["d"] || keyState["D"]) {
    player.position.x += 10;
  }
}
