document.addEventListener("DOMContentLoaded", async function() {
	window.canvas = document.getElementById('disp');

	window.gl = canvas.getContext('webgl2');

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

	const vtcBrick = [
		-0.78, 0.96, -0.78,
		-0.78, 0.96, 0.78,
		0.78, 0.96, 0.78,
		0.78, 0.96, -0.78,

		-0.78, 0.96, 0.78,
		-0.78, -0.96, 0.78,
		-0.78, -0.96, -0.78,
		-0.78, 0.96, -0.78,

		0.78, 0.96, 0.78,
		0.78, -0.96, 0.78,
		0.78, -0.96, -0.78,
		0.78, 0.96, -0.78,

		0.78, 0.96, 0.78,
		0.78, -0.96, 0.78,
		-0.78, -0.96, 0.78,
		-0.78, 0.96, 0.78,

		0.78, 0.96, -0.78,
		0.78, -0.96, -0.78,
		-0.78, -0.96, -0.78,
		-0.78, 0.96, -0.78,

		-0.78, -0.96, -0.78,
		-0.78, -0.96, 0.78,
		0.78, -0.96, 0.78,
		0.78, -0.96, -0.78
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

	const brick = new Obj(vtcBrick, idcCube, "obj", "green", [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [new Obj(vtcStud, idcCube, "obj", "blue", [0, 0.96, 0])]);

	let loop = function () {
		brick.draw();

		requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);
});
