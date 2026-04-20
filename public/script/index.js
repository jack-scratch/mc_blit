document.addEventListener("DOMContentLoaded", async function() {
	window.canvas = document.getElementById('disp');

	canvas.width = wd;
	canvas.height = ht;

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

	let set = [];

	const strideS = brickLn * 2;
	const strideT = brickHt * 2;

	const red = [1.0, 0.0, 0.0];

	const locY = 0.0;

	set.push(new Brick(red, [0.0, locY, 0.0]));

	for (let x = 1; x < 8; x++) {
		set.push(new Brick(red, [(x * strideS), locY, -x * strideS]));
	}

	for (let x = -1; x > -8; x--) {
		set.push(new Brick(red, [(x * strideS), locY, -x * strideS]));
	}

	for (let y = 1; y < 6; y++) {
		const locY = y * strideT;

		set.push(new Brick(red, [y * strideS, locY, 0.0]));

		for (let x = 1; x < 8; x++) {
			set.push(new Brick(red, [(x * strideS) + (y * strideS), locY, -x * strideS]));
		}

		for (let x = -1; x > -8; x--) {
			set.push(new Brick(red, [(x * strideS) + (y * strideS), locY, -x * strideS]));
		}
	}

	for (let y = -1; y > -6; y--) {
		const locY = y * strideT;

		set.push(new Brick(red, [y * strideS, locY, 0.0]));

		for (let x = 1; x < 8; x++) {
			set.push(new Brick(red, [(x * strideS) + (y * strideS), locY, -x * strideS]));
		}

		for (let x = -1; x > -8; x--) {
			set.push(new Brick(red, [(x * strideS) + (y * strideS), locY, -x * strideS]));
		}
	}

	for (let brick of set) {
		brick.draw();
	}

	const link = document.getElementById('link');
	link.setAttribute('download', 'mc_blit.png');
	link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
});
