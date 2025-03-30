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

	const brick = new Brick([1.0, 0.0, 0.0]);

	let loop = function () {
		brick.draw();

		requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);
});
