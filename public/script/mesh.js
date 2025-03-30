const idcPlane = [
	0, 1, 2,
	2, 1, 3
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
