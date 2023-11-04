// delays the JS from running straight away!
// imagine the website has very heavy images. we have a safekeep below to allow the website to load first and the JS to run next
window.onload = function () {
  const startButton = document.querySelector('#start-button');
  const playerSelector = document.querySelectorAll('.player-selector');
  const restartButton = document.getElementById('restart-button');
  let type = 'dog';

  // we may need a start game button to start the game separate from the player selection
  // playerSelector.forEach(button => {
  //   button.addEventListener('click', () => {
  //     type = button.getAttribute('id');
  //     return type;
  //   });
  // });

  console.log(type);
  const game = new Game(type);

  startButton.addEventListener('click', () => {
    startGame();
  });

  function startGame() {
    console.log('start game');

    game.start();
  }

  window.addEventListener('keydown', event => {
    event.preventDefault();

    switch (event.key) {
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
    }
  });
  restartButton.addEventListener('click', () => {
    // reloads the browser
    location.reload();
  });
};
