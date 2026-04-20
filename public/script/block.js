const blockLn = 1;
const blockHt = 1;

const vtcBlock = [
	-blockLn, blockHt, -blockLn,
	-blockLn, blockHt, blockLn,
	blockLn, blockHt, blockLn,
	blockLn, blockHt, -blockLn,

	-blockLn, blockHt, blockLn,
	-blockLn, -blockHt, blockLn,
	-blockLn, -blockHt, -blockLn,
	-blockLn, blockHt, -blockLn,

	blockLn, blockHt, blockLn,
	blockLn, -blockHt, blockLn,
	blockLn, -blockHt, -blockLn,
	blockLn, blockHt, -blockLn,

	blockLn, blockHt, blockLn,
	blockLn, -blockHt, blockLn,
	-blockLn, -blockHt, blockLn,
	-blockLn, blockHt, blockLn,

	blockLn, blockHt, -blockLn,
	blockLn, -blockHt, -blockLn,
	-blockLn, -blockHt, -blockLn,
	-blockLn, blockHt, -blockLn,

	-blockLn, -blockHt, -blockLn,
	-blockLn, -blockHt, blockLn,
	blockLn, -blockHt, blockLn,
	blockLn, -blockHt, -blockLn
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

class Block extends Obj {
	constructor(loc = [0.0, 0.0, 0.0], rot = [0.0, 0.0, 0.0]) {
		super(vtcBlock, idcCube, "obj", "obj", loc, rot);

		this.prog.use();

		const uniCol = gl.getUniformLocation(this.prog.id, 'col');

		gl.uniform3fv(uniCol, [0, 1, 0]);

		this.prog.unUse();
	}
}
