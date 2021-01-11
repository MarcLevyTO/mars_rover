class Plateau {
  constructor(width, height) {
    if (width <= 0 || height <= 0) {
      throw new Error('Plateau has bad initial values');
    }

    this.width = width;
    this.height = height;
    this.rovers = [];
  }

  // Code to get all rovers to execute instructions
  runRovers = () => { 
    // Tell each rover to run their instructions until completion
    // ! - ADVANCED STRATEGY: Use a queue and have each rover execute instructions until it runs
    // ! - into a possible collision. Then remove rover from front of queue and add to end of queue.
    // ! - Fully remove the rover from the queue when it has finished completing all instructions.
    this.rovers.forEach(rover => {
      let roverPosition = rover.getPosition();
      let roverPositions = this.getRoverPositions().filter(position => {
        // Return array of all over rovers, but exclude the current rover
        return !(position.x === roverPosition.x && position.y === roverPosition.y);
      });

      while (rover.getInstructions().length > 0) {
        // Test if rover performing next instruction will lead to doom
        let nextPosition = rover.testInstruction();
        if (this.willCollide(roverPositions, nextPosition)) {
          throw new Error('Rover will collide will other rover');
        }
        if (this.willFall(nextPosition)) {
          throw new Error('Rover will fall off plateau');
        }

        // Perform next instruction, update position
        rover.performInstruction();
        roverPosition = rover.getPosition();
      }
    });

    // Get final positions
    let outputs = this.rovers.map((rover, index) => {
      return `Rover${index+1}: ${rover.getOutput()}`;
    });

    return outputs.join('\n');
  }

  // Add rovers while checking current landscape of plateau
  addRover = (rover) => {
    let roverPosition = rover.getPosition();
    let roverPositions = this.getRoverPositions();

    // Check if rover within plateau borders
    if (this.willFall(roverPosition)) {
      throw new Error('Rover fell off plateau during add');
    }

    // Check if collision will occur adding new rover
    if (this.willCollide(roverPositions, roverPosition)) {
      throw new Error('Rover collided with existing rover during add');
    }

    this.rovers.push(rover);
  }

  // Check if there will be a collision if something moves to roverPosition
  willCollide = (roverPositions, roverPosition) => {
    return roverPositions.some((position) => {
      return (position.x === roverPosition.x && position.y === roverPosition.y);
    });
  }

  // Check if rover will fall off edge of plateau
  willFall = (roverPosition) => {
    return roverPosition.x < 0 || roverPosition.x > this.width || roverPosition.y < 0 || roverPosition.y > this.height;
  }

  // Get all current positions of the rovers
  getRoverPositions = () => {
    return this.rovers.map(rover => rover.getPosition());
  }
}

module.exports = Plateau;