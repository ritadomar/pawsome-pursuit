// delays the JS from running straight away!
// imagine the website has very heavy images. we have a safekeep below to allow the website to load first and the JS to run next
window.onload = function () {
  const startButtons = document.querySelectorAll('.start-button');
  const restartButton = document.getElementById('restart-button');
  let type;

  startButtons.forEach(button => {
    button.addEventListener('click', function () {
      type = button.getAttribute('id');
      startGame();
    });
  });

  const game = new Game(type);

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
