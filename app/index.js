const fs = require('fs').promises;

const { getInput } = require('./input');

const Plateau = require('./plateau');
const Rover = require('./rover');

const main = async () => {
  try {
    let input = await getInput();

    // Set up plateau
    [width, height] = input['plateau'].split(' ');
    let plateau = new Plateau(width, height);

    // Set up rover and add to plateau
    const directionTranslation = {'N': 'north', 'S': 'south', 'W': 'west', 'E': 'east'};
    const instructionTranslation = {'L': 'left', 'R': 'right', 'M': 'move'}
    input['rovers'].forEach(rover => {
      [x, y, direction] = rover['landing'].split(' ');
      let newRover = new Rover(parseInt(x, 10), parseInt(y, 10), directionTranslation[direction], rover['instructions'].split('').map(instruction => instructionTranslation[instruction]));
      plateau.addRover(newRover);
    });

    // Tell each rover to perform all instructions
    plateau.runRovers();
  }
  catch (error) {
    console.log(error);
  }
}

main();