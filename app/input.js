const fs = require('fs').promises;

const getInput = async () => {
  try {
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
    returner.plateau = plateau.split(':')[1].trim();

    // Get rover data
    while(rest.length > 0) {
      [landing, instructions, ...rest] = rest;
      landing = landing.split(':')[1].trim();
      instructions = instructions.split(':')[1].trim();
      let roverData = {
        landing, instructions
      };
      returner.rovers.push(roverData);
    }

    // Return data object
    return returner;
  } 
  catch (error) {
    console.log(error);
    return new Error("Something went wrong getting from input");
  }
}

module.exports = { getInput };