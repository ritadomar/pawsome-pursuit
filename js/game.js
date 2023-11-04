class Game {
  // when creating a new game, receives as argument the player type (dog or cat)
  constructor(playerType) {
    // screens setup
    this.startScreen = document.getElementById('start-screen');
    this.gameScreen = document.getElementById('game-screen');
    this.gameContainer = document.getElementById('game-container');
    this.endScreen = document.getElementById('end-screen');
    this.height = 540; // adjust the numbers
    this.width = 820; // adjust the numbers

    // create player
    this.player = new Player(playerType, this.gameScreen, 200, 500, 100, 150); // adjust the numbers

    // starting obstacles - 2 friends, 3 foes
    this.friends = [
      new Obstacle(this.gameScreen, 'friend', this.player.playerType),
      new Obstacle(this.gameScreen, 'friend', this.player.playerType),
    ];
    this.foes = [
      new Obstacle(this.gameScreen, 'foe', this.player.playerType),
      new Obstacle(this.gameScreen, 'foe', this.player.playerType),
      new Obstacle(this.gameScreen, 'foe', this.player.playerType),
    ];

    this.allObstacles = [];
    this.getObstacles();
    console.log(this.allObstacles);

    // starting stats
    this.currentTime = 0;
    this.lives = 3;

    // to check if game is over
    this.isGameOver = false;
  }

  getObstacles() {
    this.friends.forEach(friend => {
      this.allObstacles.push(friend);
    });

    this.foes.forEach(foe => {
      this.allObstacles.push(foe);
    });
  }

  start() {
    // setting the game screen size
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    // hiding the start screen and showing the game screen
    this.startScreen.style.display = 'none';
    this.gameContainer.style.display = 'block';

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

    this.allObstacles.forEach((obstacle, index) => {
      // call obstacles move function
      obstacle.move();

      // call collision function
      if (this.player.didCollide(obstacle)) {
        // remove obstacle from the screen/DOM
        obstacle.element.remove();

        // remove obstacle from the obstacles array
        this.allObstacles.splice(index, 1);

        if (obstacle.type === 'friend') {
          // adds lives
          this.lives++; // ADD LOGIC TO GROW PLAYER
        } else if (obstacle.type === 'foe') {
          // reduce the lives by 1
          this.lives--;
        }
      }
    });

    // function to add more obstacles to the screen
    this.intervalId = setInterval(() => {}, 3000);

    // call function to collide & outcomes

    // call end game function
  }

  endGame() {
    // remove all elements from the screen
    this.player.element.remove();
    this.obstacles.forEach(obstacle => obstacle.element.remove());

    this.isGameOver = true;

    // stop obstacle creation

    // hide the game screen and show the end screen
    this.gameContainer.style.display = 'none';
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
