const camScale = 10;

class Obj {
	_mesh;

	model;
	view;
	proj

	prog;

	constructor(vtc, idc, nameVtx, nameFrag, loc = [0.0, 0.0, 0.0], rot = [0.0, 0.0, 0.0]) {
		this._mesh = new Mesh(vtc, idc);

		this.prog = new Prog(nameVtx, nameFrag);

		let attrLoc = gl.getAttribLocation(this.prog.id, 'pos');

		gl.vertexAttribPointer(attrLoc, 3, gl.FLOAT, gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);

		gl.enableVertexAttribArray(attrLoc);

		this.prog.use();

		this.uniModel = gl.getUniformLocation(this.prog.id, 'model');
		this.uniView = gl.getUniformLocation(this.prog.id, 'view');
		this.uniProj = gl.getUniformLocation(this.prog.id, 'proj');

		this.model = new Float32Array(16);
		this.view = new Float32Array(16);
		this.proj = new Float32Array(16);

		mat4.identity(this.model);

		mat4.translate(this.model, this.model, loc)

		for (let i = 0; i < 3; i++) {
			let vec = [0, 0, 0];
			vec[i] = 1;

			mat4.rotate(this.model, this.model, rot[i], vec);
		}

		mat4.lookAt(this.view, [-10, 10, -10], [0, 0, 0], [0, 1, 0]);
		mat4.ortho(this.proj, -camScale, camScale, -camScale, camScale, 0.1, 1000.0);

		gl.uniformMatrix4fv(this.uniModel, gl.FALSE, this.model);
		gl.uniformMatrix4fv(this.uniView, gl.FALSE, this.view);
		gl.uniformMatrix4fv(this.uniProj, gl.FALSE, this.proj);

		this.prog.unUse();
		gl.bindVertexArray(null);
	}

	draw() {
		mat4.ortho(this.proj, -camScale, camScale, -camScale, camScale, 0.1, 1000.0);

		gl.bindVertexArray(this._mesh._vao);
		this.prog.use();

		gl.uniformMatrix4fv(this.uniProj, gl.FALSE, this.proj);

		gl.drawElements(gl.TRIANGLES, this._mesh._noIdc, gl.UNSIGNED_SHORT, 0);

		this.prog.unUse();
		gl.bindVertexArray(null);
	}
}
