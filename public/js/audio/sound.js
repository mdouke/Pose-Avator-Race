export function createSounds() {
  const collisionSound = new Audio("sounds/collision.mp3");
  const gameStartSound = new Audio("sounds/gameStart.mp3");
  const winnerSound = new Audio("sounds/winner.mp3");
  const loserSound = new Audio("sounds/loser.mp3");

  return {
    playCollision() {
      playFromStart(collisionSound);
    },
    playGameStart() {
      playFromStart(gameStartSound);
    },
    playWinner() {
      playFromStart(winnerSound);
    },
    playLoser() {
      playFromStart(loserSound);
    }
  };
}

function playFromStart(sound) {
  sound.currentTime = 0;
  sound.play();
}
