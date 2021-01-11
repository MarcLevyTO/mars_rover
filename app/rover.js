const directions = {
  'north': {
		left: 'west',
		right: 'east',
		move: () => {
      this.y++;
		}
	},
	'south': {
		left: 'east',
		right: 'west',
		move: () => {
      this.y--;
		}
	},
	'east': {
		left: 'north',
		right: 'south',
		move: () => {
      this.x++;
		}
	},
	'west': {
		left: 'south',
		right: 'north',
		move: () => {
      this.x--;
		}
	}
}

class Rover {
  constructor(x, y, direction, instructions) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.instructions = instructions;
  }

  // Run the next instruction
  performInstruction = () => {
    console.log("NUM INSTRUCTIONS - BEG -> ", this.instructions.length);

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
    console.log("NUM INSTRUCTIONS - END -> ", this.instructions.length);
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
    console.log("turn left");
    this.direction = directions[this.direction].left;
  }

  // Perform turn right action
  turnRight = () => {
    console.log("turn right");
    this.direction = directions[this.direction].right;
  }

  // Perform move action
  move = () => {
    console.log("move");
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

  // Get if rover has remaining instructions
  hasInstructions = () => {
    return this.instructions.length > 0;
  }

  // Print current direction and heading
  getOutput = () => {
    const directionTranslation = {'north': 'N', 'south': 'S', 'east': 'E', 'west': 'W'};
    return `${this.x} ${this.y} ${directionTranslation[this.direction]}`
  }
}

module.exports = Rover;