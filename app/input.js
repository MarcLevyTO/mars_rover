const fs = require('fs').promises;

const getInput = async () => {
  let inputString = await readFromFile();
  return doSetup(inputString);
}

const readFromFile = async () => {  
  let data = await fs.readFile('./input.txt', 'utf8');
  return Buffer.from(data).toString();
}

const doSetup = (inputString) => {
    let lines = inputString.trim().split('\n');

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

    if (typeof landing === 'undefined') {
      throw new Error('Missing rover landing information');
    }

    // Get rover landing information
    let landingSplit = landing.split(':');
    if (typeof landing === 'undefined' || !landingSplit[0].includes('Rover') || !landingSplit[0].includes('Landing')) {
      throw new Error('Missing rover landing information');
    }
    landing = landingSplit[1].trim();

    // Get rover instructions
    if (typeof instructions === 'undefined') {
      throw new Error('Missing rover instructions information');
    }
    
    let instructionsSplit = instructions.split(':');
    if (!instructionsSplit[0].includes('Rover') || !instructionsSplit[0].includes('Instructions')) {
      throw new Error('Missing rover instructions information');
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

module.exports = { getInput, doSetup };