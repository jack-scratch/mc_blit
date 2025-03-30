const idcPlane = [
	0, 1, 2,
	2, 1, 3
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

class Mesh {
	_vbo;
	_ibo;

	_noIdc;

	constructor(vtc, idc) {
		this._noIdc = idc.length;

		this._vao = gl.createVertexArray();
		gl.bindVertexArray(this._vao);

		this._vbo = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vtc), gl.STATIC_DRAW);

		this._ibo = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(idc), gl.STATIC_DRAW);
	}
}
