class Obstacle {
  constructor(gameScreen, type, playerType) {
    this.gameScreen = gameScreen;

    this.type = type; // will be friend or foe, this will determine image added
    this.playerType = playerType;

    // array with multiple sprites for obstacles
    this.dogImages = [
      './img/obstacle/dog1-obs-right.gif',
      './img/obstacle/dog2-obs-right.gif',
    ];
    this.catImages = [
      './img/obstacle/cat1-obs-right.gif',
      './img/obstacle/cat2-obs-right.gif',
    ];

    // random position in the beginning
    this.left = Math.floor(
      Math.random() * document.documentElement.clientWidth * 0.7
    );
    this.top = this.randomizePlacement();

    // obstacles will also move, but automatically, will be randomized between 1 or -1
    this.directions = [1, -1];
    this.directionX = null; // -1 left, 1 right
    this.directionY = null; // -1 top, 1 bottom

    // assuming square obstacle for now
    this.width = 50;
    this.height = 50;

    // method will randomize the direction so obstacles will move in different directions the moment they are created
    this.randomizeDirection();

    // creating obstacle on the screen
    this.element = document.createElement('img');

    // creating an obstacle depending on player type and type
    this.addObstacle(this.playerType, this.type);
  }

  // to add obstacles in the game
  addObstacle(playerType, type) {
    let imgSrc;
    if (playerType === 'dog') {
      if (type === 'friend') {
        imgSrc =
          this.dogImages[Math.floor(Math.random() * this.dogImages.length)];
      } else if (type === 'foe') {
        imgSrc =
          this.catImages[Math.floor(Math.random() * this.catImages.length)];
      }
    } else if (playerType === 'cat') {
      if (type === 'friend') {
        imgSrc =
          this.catImages[Math.floor(Math.random() * this.catImages.length)];
      } else if (type === 'foe') {
        imgSrc =
          this.dogImages[Math.floor(Math.random() * this.dogImages.length)];
      }
    }

    this.element.src = imgSrc;
    this.element.style.position = 'absolute';
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.gameScreen.appendChild(this.element);
  }

  move() {
    // update the obstacle.position
    this.left += this.directionX;
    this.top += this.directionY;

    // using similar condition to avoid player leaving the canvas, but to randomize the direction
    if (this.left < 10) {
      this.left = 10;
      this.randomizeDirection();
    }

    // top side
    if (this.top < 10) {
      this.top = 10;
      this.randomizeDirection();
    }

    // right side
    const rightMaxValue = this.gameScreen.offsetWidth - this.width - 10;
    if (this.left > rightMaxValue) {
      this.left = rightMaxValue;
      this.randomizeDirection();
    }

    // bottom side
    const bottomMaxValue = this.gameScreen.offsetHeight - this.height - 10;
    if (this.top > bottomMaxValue) {
      this.top = bottomMaxValue;
      this.randomizeDirection();
    }

    // updates the obstacle position on the screen
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
  }

  randomizeDirection() {
    this.directionX = this.directions[Math.floor(Math.random() * 2)];
    this.directionY = this.directions[Math.floor(Math.random() * 2)];
  }

  randomizePlacement() {
    // randomized the left position
    // this.left = Math.floor(Math.random() * this.gameScreen.offsetWidth);

    // depending on left position, generates top value to avoid creating obstacles near player
    if (
      this.left < this.gameScreen.offsetWidth * 0.3 ||
      this.left > this.gameScreen.offsetWidth * 0.7
    ) {
      return Math.floor(
        Math.random() * document.documentElement.clientHeight * 0.7
      );
    } else {
      return this.randomizeTop();
    }
  }

  randomizeTop() {
    let min = document.documentElement.clientHeight * 0.7 * 0.8;
    let max = document.documentElement.clientHeight * 0.7;
    let topOptions = [
      Math.floor(Math.random() * (max - min) + min),
      Math.floor(Math.random() * (max * 0.2)),
    ];

    return topOptions[Math.floor(Math.random() * 2)];
  }
}
