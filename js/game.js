class Game {
  // when creating a new game, receives as argument the player type (dog or cat)
  constructor(playerType) {
    // screens setup
    this.startScreen = document.getElementById('start-screen');
    this.gameScreen = document.getElementById('game-screen');
    this.gameContainer = document.getElementById('game-container');
    this.endScreen = document.getElementById('end-screen');
    this.height = 70; // adjust the numbers
    this.width = 70; // adjust the numbers

    // create player
    this.player = new Player(playerType, this.gameScreen, 50, 50); // adjust the numbers

    // starting obstacles - 2 friends, 3 foes
    this.allObstacles = [
      new Obstacle(this.gameScreen, 'foe', this.player.playerType),
      new Obstacle(this.gameScreen, 'foe', this.player.playerType),
      new Obstacle(this.gameScreen, 'foe', this.player.playerType),
      new Obstacle(this.gameScreen, 'friend', this.player.playerType),
      new Obstacle(this.gameScreen, 'friend', this.player.playerType),
    ];

    // starting stats
    this.time = 0;
    this.lives = 3;
    this.score = 0;

    // to check if game is over
    this.isGameOver = false;
  }

  start() {
    // setting the game screen size
    this.gameScreen.style.height = `${this.height}vh`;
    this.gameScreen.style.width = `${this.width}vw`;

    // hiding the start screen and showing the game screen
    this.startScreen.style.display = 'none';
    this.gameContainer.style.display = 'flex';

    // what makes the game run over and over again
    this.gameLoop();

    // start the timer
    this.startTimer();
  }

  gameLoop() {
    // interrupt the game loop if this variable was changed to true
    if (this.isGameOver) {
      return;
    }

    this.getMinutes();
    this.getSeconds();

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
          // adds score
          this.score += 100;
          // grow player image
          this.player.grow();
        } else if (obstacle.type === 'foe') {
          // reduce the lives by 1
          this.lives--;

          // update images of lives: remove life-img & add lifeless-img
          document.querySelector('.life-img').className = 'lifeless-img';
          let lifelessArray = document.querySelectorAll('.lifeless-img');
          lifelessArray.forEach(element => {
            element.src = 'img/lives/lifeless.png';
          });
        }
      }
    });

    // function to add more obstacles to the screen
    const obstacleTypes = ['friend', 'foe'];
    if (this.allObstacles.length < 5) {
      // randomize obstacle type
      let selectedObstacle = obstacleTypes[Math.floor(Math.random() * 2)];

      // create a new obstacle - cat or dog
      let newObstacle = new Obstacle(
        this.gameScreen,
        selectedObstacle,
        this.player.playerType
      );

      newObstacle.randomizePlacement();

      // add new obstacle to array of obstacles
      this.allObstacles.push(newObstacle);
    } else if (Math.random() > 0.9977777 && this.allObstacles.length >= 5) {
      // randomize obstacle type
      let selectedObstacle = obstacleTypes[Math.floor(Math.random() * 2)];

      // create a new obstacle - cat or dog
      let newObstacle = new Obstacle(
        this.gameScreen,
        selectedObstacle,
        this.player.playerType
      );

      newObstacle.randomizePlacement();

      // add new obstacle to array of obstacles
      this.allObstacles.push(newObstacle);
    }

    // call end game function
    if (this.lives === 0) {
      this.endGame();
    }
  }

  endGame() {
    // remove all elements from the screen
    this.player.element.remove();
    this.allObstacles.forEach(obstacle => obstacle.element.remove());

    this.isGameOver = true;

    // hide the game screen and show the end screen
    this.gameContainer.style.display = 'none';
    this.endScreen.style.display = 'block';

    // stop time counting
    this.stopTimer();

    const finalScore = document.getElementById('final-score');
    finalScore.innerText = `${this.timeInMinutes}:${this.timeInSeconds}`;
  }

  updateStats() {
    // update inner texts of Stats: time & score
    const time = document.getElementById('time');
    const score = document.getElementById('score');
    time.innerText = `${this.timeInMinutes}:${this.timeInSeconds}`;
    score.innerText = this.score;
  }

  // function to count time
  startTimer() {
    this.intervalId = setInterval(() => {
      // increment the time by 1 second
      this.time += 1;
    }, 1000);

    return this.time;
  }

  getMinutes() {
    this.minutes = Math.floor(this.time / 60);
    return (this.timeInMinutes = this.computeTwoDigitNumber(this.minutes));
  }

  getSeconds() {
    this.remainingSeconds = Math.floor(this.time % 60);
    return (this.timeInSeconds = this.computeTwoDigitNumber(
      this.remainingSeconds
    ));
  }

  computeTwoDigitNumber(value) {
    // convert any number into a two-digits string representation
    if (value < 10) {
      return '0' + value.toString();
    } else {
      return value.toString();
    }
  }

  stopTimer() {
    // clear the existing interval timer
    clearInterval(this.intervalId);
  }
}
