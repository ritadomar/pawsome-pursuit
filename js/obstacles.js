class Obstacle {
  constructor(gameScreen, type, playerType) {
    this.gameScreen = gameScreen;

    this.type = type; // will be friend or foe, this will determine image added

    // if we decide on multiple sprites for obstacles
    this.dogImages = ['./img/obstacle/mermaid_dog.gif'];
    this.catImages = ['./img/obstacle/sadnyancat.gif'];

    // TBD: double check random position - currently copied from race-car
    this.left = Math.floor(Math.random() * 300 + 70);
    this.top = Math.floor(Math.random() * 300 + 70);

    // obstacles will also move, but automatically, will be randomized between 1 or -1
    this.directions = [1, -1];
    this.directionX = null; // -1 left, 1 right
    this.directionY = null; // -1 top, 1 bottom

    // assuming square obstacle for now
    this.width = 100;
    this.height = 100;

    // creating obstacle on the screen
    this.element = document.createElement('img');

    // giving it an image
    // TBD: generating image based on player type
    // if document.game.player.type = "dog" -> imgSrc = so, so and so
    // else if document.game.player.type = "cat" -> imgSrc = so, so and so
    this.addObstacle(playerType, type);

    // method will randomize the direction so obstacles will move in different directions the moment they are created
    this.randomizeDirection();
  }

  // FINISH ADD OBSTACLE
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
    if (this.left < 25) {
      this.randomizeDirection();
    }

    // top side
    if (this.top < 10) {
      this.randomizeDirection();
    }

    // right side
    const rightMaxValue = this.gameScreen.offsetWidth - this.width - 25;
    if (this.left > rightMaxValue) {
      this.randomizeDirection();
    }

    // bottom side
    const bottomMaxValue = this.gameScreen.offsetHeight - this.height - 10;
    if (this.top > bottomMaxValue) {
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
}
