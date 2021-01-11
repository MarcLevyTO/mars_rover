const Rover = require('../app/rover');

describe('rover', () => {
  it('should create given valid input', () => {
    let rover = new Rover(1, 1, 'north', []);
    expect(rover.getPosition()).toEqual({x: 1, y: 1});
    expect(rover.getDirection()).toEqual('north');
  });

  it('should fail to create if x,y coordinates are negative', () =>{ 
    try {
      let rover = new Rover(-1, -1, 'north', []);
    }
    catch (error) {
      expect(error.message).toEqual('Rover has bad initial positions');
    }
  });

  it('should turn correctly', () => {
    let rover = new Rover(1, 1, 'north', []);
    rover.turnLeft();
    expect(rover.getDirection()).toEqual('west');
    rover.turnRight();
    expect(rover.getDirection()).toEqual('north');
  });

  it('should move forward correctly', () => {
    let rover = new Rover(1, 1, 'north', []);
    rover.move();
    expect(rover.getDirection()).toEqual('north');
    expect(rover.getPosition()).toEqual({x: 1, y: 2});

    rover.turnRight();
    expect(rover.getDirection()).toEqual('east');
    expect(rover.getPosition()).toEqual({x: 1, y: 2});
    rover.move();
    expect(rover.getDirection()).toEqual('east');
    expect(rover.getPosition()).toEqual({x: 2, y: 2});
  });

  it('should test moving without moving', () => {
    let rover = new Rover(1, 1, 'north', ['move']);
    expect(rover.testInstruction()).toEqual({x: 1, y: 2});
    expect(rover.getPosition()).toEqual({x: 1, y: 1});
  });

  it('should perform instructions provided', () => {
    let rover = new Rover(1, 1, 'north', ['move', 'right', 'move']);
    expect(rover.getInstructions().length).toEqual(3);
    
    rover.performInstruction();
    expect(rover.getDirection()).toEqual('north');
    expect(rover.getPosition()).toEqual({x: 1, y: 2});
    expect(rover.getInstructions().length).toEqual(2);

    rover.performInstruction();
    expect(rover.getDirection()).toEqual('east');
    expect(rover.getPosition()).toEqual({x: 1, y: 2});
    expect(rover.getInstructions().length).toEqual(1);
    
    rover.performInstruction();
    expect(rover.getDirection()).toEqual('east');
    expect(rover.getPosition()).toEqual({x: 2, y: 2});
    expect(rover.getInstructions().length).toEqual(0);
  })
});