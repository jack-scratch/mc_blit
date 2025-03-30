const shadVtxText = [
'precision mediump float;',
'',
'varying vec3 _pos;',
'attribute vec3 vertPosition;',
'attribute vec3 vertColor;',
'uniform mat4 mWorld;',
'uniform mat4 mView;',
'uniform mat4 mProj;',
'',
'void main()',
'{',
'  _pos = vertPosition;',
'  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);',
'}'
].join('\n');

const shadFragText = [
'precision mediump float;',
'varying vec3 _pos;',
'',
'void main()',
'{',
'  gl_FragColor = vec4(_pos, 1.0);',
'}'
].join('\n');

document.addEventListener("DOMContentLoaded", async function() {
	const canvas = document.getElementById('disp');

	const gl = canvas.getContext('webgl');

	if (!gl) {
		console.log('WebGL not supported, falling back on experimental-webgl');
		gl = canvas.getContext('experimental-webgl');
	}

	if (!gl) {
		alert('Your browser does not support WebGL');
	}

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
	gl.cullFace(gl.BACK);

	const shadVtx = gl.createShader(gl.VERTEX_SHADER);
	const shadFrag = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(shadVtx, shadVtxText);
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

	let prog = gl.createProgram();
	gl.attachShader(prog, shadVtx);
	gl.attachShader(prog, shadFrag);
	gl.linkProgram(prog);
	if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
		console.error('ERROR linking program!', gl.getProgramInfoLog(prog));
		return;
	}

	gl.validateProgram(prog);
	if (!gl.getProgramParameter(prog, gl.VALIDATE_STATUS)) {
		console.error('ERROR validating program!', gl.getProgramInfoLog(prog));
		return;
	}

	const vtc = [
		-1.0, 1.0, -1.0,   0.5, 0.5, 0.5,
		-1.0, 1.0, 1.0,    0.5, 0.5, 0.5,
		1.0, 1.0, 1.0,     0.5, 0.5, 0.5,
		1.0, 1.0, -1.0,    0.5, 0.5, 0.5,

		-1.0, 1.0, 1.0,    0.75, 0.25, 0.5,
		-1.0, -1.0, 1.0,   0.75, 0.25, 0.5,
		-1.0, -1.0, -1.0,  0.75, 0.25, 0.5,
		-1.0, 1.0, -1.0,   0.75, 0.25, 0.5,

		1.0, 1.0, 1.0,    0.25, 0.25, 0.75,
		1.0, -1.0, 1.0,   0.25, 0.25, 0.75,
		1.0, -1.0, -1.0,  0.25, 0.25, 0.75,
		1.0, 1.0, -1.0,   0.25, 0.25, 0.75,

		1.0, 1.0, 1.0,    1.0, 0.0, 0.15,
		1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
		-1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
		-1.0, 1.0, 1.0,    1.0, 0.0, 0.15,

		1.0, 1.0, -1.0,    0.0, 1.0, 0.15,
		1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
		-1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
		-1.0, 1.0, -1.0,    0.0, 1.0, 0.15,

		-1.0, -1.0, -1.0,   0.5, 0.5, 1.0,
		-1.0, -1.0, 1.0,    0.5, 0.5, 1.0,
		1.0, -1.0, 1.0,     0.5, 0.5, 1.0,
		1.0, -1.0, -1.0,    0.5, 0.5, 1.0,
	];

	const idc = [
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

	let vbo = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vtc), gl.STATIC_DRAW);

	let ibo = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(idc), gl.STATIC_DRAW);

	let attrLoc = gl.getAttribLocation(prog, 'vertPosition');
	let colorAttribLocation = gl.getAttribLocation(prog, 'vertColor');
	gl.vertexAttribPointer(attrLoc, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
	gl.vertexAttribPointer(colorAttribLocation, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

	gl.enableVertexAttribArray(attrLoc);
	gl.enableVertexAttribArray(colorAttribLocation);

	gl.useProgram(prog);

	let uniWorld = gl.getUniformLocation(prog, 'mWorld');
	let uniView = gl.getUniformLocation(prog, 'mView');
	let uniProj = gl.getUniformLocation(prog, 'mProj');

	let world = new Float32Array(16);
	let view = new Float32Array(16);
	let proj = new Float32Array(16);
	mat4.identity(world);
	mat4.lookAt(view, [-10, 10, -10], [0, 0, 0], [0, 1, 0]);
	mat4.perspective(proj, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);

	gl.uniformMatrix4fv(uniWorld, gl.FALSE, world);
	gl.uniformMatrix4fv(uniView, gl.FALSE, view);
	gl.uniformMatrix4fv(uniProj, gl.FALSE, proj);

	let xRotationMatrix = new Float32Array(16);
	let yRotationMatrix = new Float32Array(16);

	let identityMatrix = new Float32Array(16);
	mat4.identity(identityMatrix);
	let loop = function () {
		gl.drawElements(gl.TRIANGLES, idc.length, gl.UNSIGNED_SHORT, 0);

		requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);
});
