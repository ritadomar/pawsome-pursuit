window.onload = function () {
  const playerSelector = document.querySelectorAll('.player-selector');
  const restartButton = document.getElementById('restart-button');

  let type;
  let game;

  playerSelector.forEach(button => {
    button.addEventListener('click', () => {
      type = button.getAttribute('id');
      game = new Game(type);

      game.start();
    });
  });

  window.addEventListener('keydown', event => {
    event.preventDefault();

    /* switch (event.key) {
      case 'ArrowUp':
        game.player.directionY = -1;
        break;
      case 'ArrowDown':
        game.player.directionY = 1;
        break;
      case 'ArrowLeft':
        game.player.directionX = -1;
        break;
      case 'ArrowRight':
        game.player.directionX = 1;
        break;
    } */

    switch (event.key) {
      case 'ArrowUp':
        game.player.directionY = -1;
        game.player.directionX = 0;
        break;
      case 'ArrowDown':
        game.player.directionY = 1;
        game.player.directionX = 0;
        break;
      case 'ArrowLeft':
        game.player.directionX = -1;
        game.player.directionY = 0;
        break;
      case 'ArrowRight':
        game.player.directionX = 1;
        game.player.directionY = 0;
        break;

      case 'ArrowRight' && 'ArrowUp':
        game.player.directionY = -1;
        game.player.directionX = 1;
    }
  });

  restartButton.addEventListener('click', () => {
    // reloads the browser
    location.reload();
  });
};
