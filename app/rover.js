class Rover {
  constructor(x, y, direction, instructions) {
    if (x < 0 || y < 0) {
      throw new Error('Rover has bad initial positions');
    }

    this.x = x;
    this.y = y;
    this.direction = direction;
    this.instructions = instructions;
  }

  // Run the next instruction
  performInstruction = () => {
    let instruction, rest;
    [instruction, ...rest] = this.instructions;

    switch(instruction) {
      case 'left':
        this.turnLeft();
        break;
      case 'right':
        this.turnRight();
        break;
      case 'move':
        this.move();
        break;
    }

    this.instructions = rest;
  }

  // Get the position of rover IF next instruction were to run
  testInstruction = () => {
    let currentInstruction = this.instructions[0];
    this.currentX = this.x;
    this.currentY = this.y;
    this.currentDirection = this.direction;

    switch(currentInstruction) {
      case 'left':
        this.turnLeft();
        break;
      case 'right':
        this.turnRight();
        break;
      case 'move':
        this.move();
        break;
    }

    // Get position
    let nextPosition = this.getPosition();

    // Rollback changes
    this.x = this.currentX;
    this.y = this.currentY;
    this.direction = this.currentDirection;

    return nextPosition;
  }

  // Perform turn left action
  turnLeft = () => {
    this.direction = directions[this.direction].left;
  }

  // Perform turn right action
  turnRight = () => {
    this.direction = directions[this.direction].right;
  }

  // Perform move action
  move = () => {
    switch(this.direction) {
      case 'north':
        this.y++;
        break;
      case 'south':
        this.y--;
        break;
      case 'east':
        this.x++;
        break;
      case 'west':
        this.x--;
        break;
    }
  }

  // Get rover's current position
  getPosition = () => {
    return {
      x: this.x,
      y: this.y
    };
  }

  // Get rover's current direction
  getDirection = () => {
    return this.direction;
  }

  // Get rover's remaining instructions
  getInstructions = () => {
    return this.instructions;
  }

  // Print current direction and heading
  getOutput = () => {
    const directionTranslation = {'north': 'N', 'south': 'S', 'east': 'E', 'west': 'W'};
    return `${this.x} ${this.y} ${directionTranslation[this.direction]}`
  }
}

const directions = {
  'north': {
		left: 'west',
		right: 'east'
	},
	'south': {
		left: 'east',
		right: 'west'
	},
	'east': {
		left: 'north',
		right: 'south'
	},
	'west': {
		left: 'south',
		right: 'north'
	}
}

module.exports = Rover;