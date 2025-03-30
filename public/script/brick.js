const brickLn = 0.78;
const brickHt = 0.96;

const vtcBrick = [
	-brickLn, brickHt, -brickLn,
	-brickLn, brickHt, brickLn,
	brickLn, brickHt, brickLn,
	brickLn, brickHt, -brickLn,

	-brickLn, brickHt, brickLn,
	-brickLn, -brickHt, brickLn,
	-brickLn, -brickHt, -brickLn,
	-brickLn, brickHt, -brickLn,

	brickLn, brickHt, brickLn,
	brickLn, -brickHt, brickLn,
	brickLn, -brickHt, -brickLn,
	brickLn, brickHt, -brickLn,

	brickLn, brickHt, brickLn,
	brickLn, -brickHt, brickLn,
	-brickLn, -brickHt, brickLn,
	-brickLn, brickHt, brickLn,

	brickLn, brickHt, -brickLn,
	brickLn, -brickHt, -brickLn,
	-brickLn, -brickHt, -brickLn,
	-brickLn, brickHt, -brickLn,

	-brickLn, -brickHt, -brickLn,
	-brickLn, -brickHt, brickLn,
	brickLn, -brickHt, brickLn,
	brickLn, -brickHt, -brickLn
];

const vtcStud = [
	-0.4, 0.2 * 2, -0.4,
	-0.4, 0.2 * 2, 0.4,
	0.4, 0.2 * 2, 0.4,
	0.4, 0.2 * 2, -0.4,

	-0.4, 0.2 * 2, 0.4,
	-0.4, 0.0, 0.4,
	-0.4, 0.0, -0.4,
	-0.4, 0.2 * 2, -0.4,

	0.4, 0.2 * 2, 0.4,
	0.4, 0.0, 0.4,
	0.4, 0.0, -0.4,
	0.4, 0.2 * 2, -0.4,

	0.4, 0.2 * 2, 0.4,
	0.4, 0.0, 0.4,
	-0.4, 0.0, 0.4,
	-0.4, 0.2 * 2, 0.4,

	0.4, 0.2 * 2, -0.4,
	0.4, 0.0, -0.4,
	-0.4, 0.0, -0.4,
	-0.4, 0.2 * 2, -0.4,

	-0.4, 0.0, -0.4,
	-0.4, 0.0, 0.4,
	0.4, 0.0, 0.4,
	0.4, 0.0, -0.4
];

const idcCube = [
	0, 1, 2,
	0, 2, 3,

	5, 4, 6,
	6, 4, 7,

	8, 9, 10,
	8, 10, 11,

	13, 12, 14,
	15, 14, 12,

	16, 17, 18,
	16, 18, 19,

	21, 20, 22,
	22, 20, 23
];

class Brick extends Obj {
	constructor(col, loc = [0.0, 0.0, 0.0], rot = [0.0, 0.0, 0.0]) {
		super(vtcBrick, idcCube, "obj", "obj", loc, rot, [new Obj(vtcStud, idcCube, "obj", "obj", [0, brickHt, 0])]);

		this.prog.use();

		const uniCol = gl.getUniformLocation(this.prog.id, 'col');

		gl.uniform3fv(uniCol, col);

		this.prog.unUse();

		this._child[0].prog.use();

		const uniColChild = gl.getUniformLocation(this._child[0].prog.id, 'col');

		gl.uniform3fv(uniColChild, col);

		this._child[0].prog.unUse();
	}
}
