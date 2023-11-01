class Game {
  // when creating a new game, receives as argument the player type (dog or cat)
  constructor(playerType) {
    // screens setup
    this.startScreen = document.getElementById('start-screen');
    this.gameScreen = document.getElementById('game-container');
    this.endScreen = document.getElementById('end-screen');
    this.height = 540; // adjust the numbers
    this.width = 820; // adjust the numbers

    // create player
    this.player = new Player(
      playerType,
      this.gameScreen,
      200,
      500,
      100,
      150,
      imgSrc // add image
    ); // adjust the numbers

    // starting obstacles
    this.friends = [];
    this.foes = [];

    // starting stats
    this.currentTime = 0;
    this.lives = 3;

    // to check if game is over
    this.isGameOver = false;
  }

  start() {
    // setting the game screen size
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    // hiding the start screen and showing the game screen
    this.startScreen.style.display = 'none';
    this.gameScreen.style.display = 'block';

    // what makes the game run over and over again
    this.gameLoop();
  }

  gameLoop() {
    // interrupt the game loop if this variable was changed to true
    if (this.isGameOver) {
      return;
    }

    this.update();
    this.updateStats();

    // this function creates the game loop
    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    // call player move function
    this.player.move();

    // function to add more obstacles to the screen

    // call function to collide & outcomes

    // call end game function
  }

  endGame() {
    // remove all elements from the screen
    this.player.element.remove();
    this.obstacles.forEach(obstacle => obstacle.element.remove());

    this.isGameOver = true;

    // hide the game screen and show the end screen
    this.gameScreen.style.display = 'none';
    this.endScreen.style.display = 'block';
  }

  updateStats() {
    // update inner texts of Stats
    const lives = document.getElementById('lives');
    const time = document.getElementById('time');
    lives.innerText = this.lives;
    time.innerText = this.currentTime;
  }

  // function to count time
  timer() {}
}
