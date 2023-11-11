class Player {
  constructor(playerType, gameScreen, width, height) {
    this.playerType = playerType;
    this.gameScreen = gameScreen;
    this.width = width;
    this.height = height;
    this.top = (document.documentElement.clientHeight * 0.7) / 2 - height / 2;
    this.left = (document.documentElement.clientWidth * 0.7) / 2 - width / 2;

    // to control direction movements
    this.directionX = 0; // -1 left, 0 still, 1 right
    this.directionY = 0; // -1 top, 0 still, 1 bottom

    // adding images to the class
    this.dogImage = './img/player/dog-player-right.gif';
    this.catImage = './img/player/cat-player-right.gif';

    // DOM manipulation: to insert the player in the screen
    this.element = document.createElement('div');

    // callback function to add player
    this.addPlayer(this.playerType);
  }

  // to add the player to the screen
  addPlayer(playerType) {
    this.element.setAttribute('id', 'player');

    let imgSrc;

    if (playerType === 'dog') {
      imgSrc = this.dogImage;
    } else if (playerType === 'cat') {
      imgSrc = this.catImage;
    }

    let image = document.createElement('img');
    image.setAttribute('id', 'player-image');
    image.src = imgSrc;
    image.style.width = `${this.width}px`;
    this.element.appendChild(image);

    this.element.style.position = 'absolute';
    this.element.style.width = `${this.width - 10}px`;
    this.element.style.height = `${this.height - 10}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.gameScreen.appendChild(this.element);
  }

  // to move the player
  move() {
    // update the player position
    this.left += this.directionX * 1.5;
    this.top += this.directionY * 1.5;

    // preventing the player from leaving the game screen
    // left side
    if (this.left < 10) {
      this.left = 10;
    }

    // top side
    if (this.top < 10) {
      this.top = 10;
    }

    // right side
    const rightMaxValue = this.gameScreen.offsetWidth - this.width - 10;

    if (this.left >= rightMaxValue) {
      this.left = rightMaxValue;
    }

    // bottom side
    const bottomMaxValue = this.gameScreen.offsetHeight - this.height - 10;

    if (this.top >= bottomMaxValue) {
      this.top = bottomMaxValue;
    }

    // callback function to update position
    this.updatePosition();
  }

  // DOM manipulation: to update the player position
  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  // to collide the player & obstacle
  didCollide(obstacle) {
    // get the rectangule around the player and the obstacle
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    // collision
    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }

  grow() {
    let playerImage = document.getElementById('player-image');

    this.width *= 1.1;
    this.height *= 1.1;

    playerImage.style.width = `${this.width}px`;

    this.element.style.width = `${this.width - 10 * 1.1}px`;
    this.element.style.height = `${this.height - 10 * 1.1}px`;
  }
}
