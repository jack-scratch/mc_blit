#version 300 es

precision mediump float;

in vec3 _pos;
out vec4 frag;

void main() {
	frag = vec4(_pos, 1.0);
}
