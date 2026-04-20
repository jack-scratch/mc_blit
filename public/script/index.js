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

	let scn = [];

	const grn = [0.0, 1.0, 0.0];

	scn.push(new Block(grn, [0.0, 0.0, 0.0]));

	for (let block of scn) {
		block.draw();
	}

	const link = document.getElementById('link');
	link.setAttribute('download', 'mc_blit.png');
	link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
});
