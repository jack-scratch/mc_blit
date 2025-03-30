class Prog {
	id;

	constructor(nameVtx, nameFrag) {
		const shadVtx = gl.createShader(gl.VERTEX_SHADER);
		const shadFrag = gl.createShader(gl.FRAGMENT_SHADER);

		const shadVtxText = Fs.rd(`public/res/shad/${nameVtx}.vs`);
		gl.shaderSource(shadVtx, shadVtxText);

		const shadFragText = Fs.rd(`public/res/shad/${nameFrag}.fs`);
		gl.shaderSource(shadFrag, shadFragText);

		gl.compileShader(shadVtx);
		if (!gl.getShaderParameter(shadVtx, gl.COMPILE_STATUS)) {
			console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(shadVtx));

			return;
		}

		gl.compileShader(shadFrag);
		if (!gl.getShaderParameter(shadFrag, gl.COMPILE_STATUS)) {
			console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(shadFrag));

			return;
		}

		this.id = gl.createProgram();

		gl.attachShader(this.id, shadVtx);
		gl.attachShader(this.id, shadFrag);
		gl.linkProgram(this.id);
		if (!gl.getProgramParameter(this.id, gl.LINK_STATUS)) {
			console.error('ERROR linking program!', gl.getProgramInfoLog(this.id));

			return;
		}

		gl.validateProgram(this.id);
		if (!gl.getProgramParameter(this.id, gl.VALIDATE_STATUS)) {
			console.error('ERROR validating program!', gl.getProgramInfoLog(this.id));

			return;
		}
	}

	use() {
		gl.useProgram(this.id);
	}

	unUse() {
		gl.useProgram(null);
	}
}
