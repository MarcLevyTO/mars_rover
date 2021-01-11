const { doSetup } = require('../app/input');

describe('input', () => {
  it('should return correct info from valid input', () => {
    const given = 'Plateau: 5 5\nRover1 Landing: 1 2 N\nRover1 Instructions: LMLMLMLMM\n';
    let setup = doSetup(given);
    let expected = {
      plateau: '5 5',
      rovers: [ { landing: '1 2 N', instructions: 'LMLMLMLMM' } ]
    }
    expect(setup).toEqual(expected);
  });

  it('should throw error from invalid input on plateau', () => {
    const given = 'Rover1 Landing: 1 2 N\nRover1 Instructions: LMLMLMLMM\n';
    try {
      doSetup(given);
    } 
    catch (error) {
      expect(error.message).toEqual('Missing plateau information');
    }
  });

  it('should throw error from invalid input on landing', () => {
    const given = 'Plateau: 5 5\nRover1 Instructions: LMLMLMLMM\n';
    try {
      doSetup(given);
    } 
    catch (error) {
      expect(error.message).toEqual('Missing rover landing information');
    }
  });

  it('should throw error from invalid input on instructions', () => {
    const given = 'Plateau: 5 5\nRover1 Landing: 1 2 N\n';
    try {
      doSetup(given);
    } 
    catch (error) {
      expect(error.message).toEqual('Missing rover instructions information');
    }
  });
});