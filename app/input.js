const fs = require('fs').promises;

const getInput = async () => {
  // Read in data from file
  let data = await fs.readFile('./input.txt', 'utf8');
  let bufferData = Buffer.from(data).toString();
  let lines = bufferData.trim().split('\n');

  // Create return object
  let returner = {
    plateau: '',
    rovers: []
  };
  
  // Get plateau data
  [plateau, ...rest] = lines;
  let plateauSplit = plateau.split(':');
  if (plateauSplit[0] !== 'Plateau') {
    throw new Error('Missing plateau information');
  }
  returner.plateau = plateauSplit[1].trim();

  // Get rover data
  while(rest.length > 0) {
    [landing, instructions, ...rest] = rest;

    // Get rover landing information
    let landingSplit = landing.split(':');
    if (!landingSplit[0].includes('Rover') || !landingSplit[0].includes('Landing')) {
      throw new Error('Missing rover landing information');
    }
    landing = landingSplit[1].trim();

    // Get rover instructions
    let instructionsSplit = instructions.split(':');
    if (!instructionsSplit[0].includes('Rover') || !instructionsSplit[0].includes('Instructions')) {
      throw new Error('Missing rover landing information');
    }
    instructions = instructionsSplit[1].trim();
    
    // Create rover return data format
    let roverData = {
      landing, instructions
    };
    returner.rovers.push(roverData);
  }

  // Return data object
  return returner;
}

module.exports = { getInput };