class Obstacle {
  constructor(gameScreen, type, playerType) {
    this.gameScreen = gameScreen;

    this.type = type; // will be friend or foe, this will determine image added
    this.playerType = playerType;

    // if we decide on multiple sprites for obstacles
    this.dogImages = './img/obstacle/mermaid_dog.gif';
    this.catImages = './img/obstacle/sadnyancat.gif';

    // TBD: double check random position - currently copied from race-car
    this.left = Math.floor(
      Math.random() * (document.documentElement.clientWidth * 0.7)
    );
    this.top = Math.floor(
      Math.random() * (document.documentElement.clientHeight * 0.7)
    );

    // obstacles will also move, but automatically, will be randomized between 1 or -1
    this.directions = [1, -1];
    this.directionX = null; // -1 left, 1 right
    this.directionY = null; // -1 top, 1 bottom

    // assuming square obstacle for now
    this.width = 50;
    this.height = 50;

    // method will randomize the direction so obstacles will move in different directions the moment they are created
    this.randomizeDirection();

    // this will make sure the obstacles are not created in the same space as the player
    this.randomizePlacement();

    // creating obstacle on the screen
    this.element = document.createElement('img');

    // creating an obstacle depending on player type and type
    this.addObstacle(this.playerType, this.type);
  }

  // FINISH ADD OBSTACLE
  addObstacle(playerType, type) {
    let imgSrc;
    if (playerType === 'dog') {
      if (type === 'friend') {
        imgSrc = this.dogImages;
      } else if (type === 'foe') {
        imgSrc = this.catImages;
      }
    } else if (playerType === 'cat') {
      if (type === 'friend') {
        imgSrc = this.catImages;
      } else if (type === 'foe') {
        imgSrc = this.dogImages;
      }
    }

    this.element.src = imgSrc;
    this.element.style.position = 'absolute';
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    // this.element.style.backgroundColor = 'red';
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
    const rightMaxValue =
      this.gameScreen.offsetWidth - this.gameScreen.offsetWidth * 0.3;
    const bottomMaxValue =
      this.gameScreen.offsetHeight - this.gameScreen.offsetHeight * 0.3;

    if (
      this.left > this.gameScreen.offsetWidth * 0.3 &&
      this.left < rightMaxValue
    ) {
      this.left = Math.floor(
        Math.random() * (document.documentElement.clientWidth * 0.7)
      );
    }

    if (
      this.top < this.gameScreen.offsetHeight * 0.3 &&
      this.top < bottomMaxValue
    ) {
      this.top = Math.floor(
        Math.random() * (document.documentElement.clientHeight * 0.7)
      );
    }
  }
}
