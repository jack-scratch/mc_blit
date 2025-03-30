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

	const set = [];

	const strideS = brickLn * 2;
	const strideT = brickHt * 2;

	const red = [1.0, 0.0, 0.0];

	for (let y = 0; y < 3; y++) {
		set.push(new Brick(red, [y * strideS, y * strideT, 0.0]));

		for (let x = 1; x < 5; x++) {
			set.push(new Brick(red, [(x * strideS) + (y * strideS), y * strideT, -x * strideS]));
		}

		for (let x = -1; x > -5; x--) {
			set.push(new Brick(red, [(x * strideS) + (y * strideS), y * strideT, -x * strideS]));
		}
	}

	let loop = function () {
		for (let brick of set) {
			brick.draw();
		}

		requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);
});
