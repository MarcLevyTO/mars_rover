const Plateau = require('../app/plateau');
const Rover = require('../app/rover');

describe('plateau', () => {
	it('should create given valid input', () => {
		let plateau = new Plateau(5, 6);
		expect(plateau.width).toEqual(5);
		expect(plateau.height).toEqual(6);
		expect(plateau.rovers.length).toEqual(0);
	});

	it('should throw error given invalid input', () => {
		try {
			let plateau = new Plateau(5, 6);
		}
		catch (error) {
			expect(error.message).toEqual('Plateau has bad initial values');
		}
	});

	it('should add a rover with valid positions', () => {
		let plateau = new Plateau(5, 6);
		let rover = new Rover(1, 1, 'north', []);

		plateau.addRover(rover);
		expect(plateau.rovers.length).toEqual(1);
	});

	it('should fail to add a rover with invalid positions', () => {
		try {
			let plateau = new Plateau(5, 6);
			let rover = new Rover(7, 1, 'north', []);
			plateau.addRover(rover);
		}
		catch (error) {
			expect(error.message).toEqual('Rover fell off plateau during add');
		}
	});

	it('should fail to add a rover with invalid positions in collision', () => {
		try {
			let plateau = new Plateau(5, 6);
			let rover1 = new Rover(1, 1, 'north', []);
			plateau.addRover(rover1);
			expect(plateau.rovers.length).toEqual(1);

			let rover2 = new Rover(1, 1, 'south', []);
			plateau.addRover(rover2);
		}
		catch (error) {
			expect(error.message).toEqual('Rover collided with existing rover during add');
		}
	});

	it('should error if rover tries to go off plateau', () => {
		try {
			let plateau = new Plateau(2, 2);
			let rover = new Rover(1, 2, 'north', ['move']);
			plateau.addRover(rover);
			expect(plateau.rovers.length).toEqual(1);
			plateau.runRovers();
		}
		catch (error) {
			expect(error.message).toEqual('Rover will fall off plateau');
		}
	});

	it('should error if rover tries to go in occupied space', () => {
		try {
			let plateau = new Plateau(2, 2);
			let rover1 = new Rover(1, 2, 'north', []);
			plateau.addRover(rover1);
			expect(plateau.rovers.length).toEqual(1);
			let rover2 = new Rover(1, 1, 'north', ['move']);
			plateau.addRover(rover2);
			expect(plateau.rovers.length).toEqual(2);
			plateau.runRovers();
		}
		catch (error) {
			expect(error.message).toEqual('Rover will collide will other rover');
		}
	});

	it('should move a rover with correct instructions', () => {
		let plateau = new Plateau(3, 3);
			let rover = new Rover(1, 2, 'north', ['move']);
			plateau.addRover(rover);
			expect(plateau.rovers.length).toEqual(1);
			plateau.runRovers();
			expect(plateau.getRoverPositions()).toEqual([{x: 1, y: 3}]);
	});
});