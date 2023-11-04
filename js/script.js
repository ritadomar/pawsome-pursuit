// delays the JS from running straight away!
// imagine the website has very heavy images. we have a safekeep below to allow the website to load first and the JS to run next
window.onload = function () {
  // const startButton = document.querySelector('#start-button');
  const playerSelector = document.querySelectorAll('.player-selector');
  const restartButton = document.getElementById('restart-button');

  // check later if we can write the code in a separate way (not inside the for each)
  playerSelector.forEach(button => {
    button.addEventListener('click', () => {
      type = button.getAttribute('id');

      console.log(type);
      const game = new Game(type);

      game.start();

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
    });
  });

  /* startButton.addEventListener('click', () => {
    startGame();
  }); */

  restartButton.addEventListener('click', () => {
    // reloads the browser
    location.reload();
  });
};
