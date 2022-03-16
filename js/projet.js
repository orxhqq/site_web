import * as THREE from 'three';

const VoxelLoader = require("three-voxel-loader");



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let loader = new VoxelLoader();
loader.load("../models/monu2.vox",

function ( voxel ) {
	console.log("here")
	scene.add( voxel );
}
);
camera.position.z = 5;
renderer.render(scene, camera);

function animate(time) {
	requestAnimationFrame(animate)
	TWEEN.update(time)
}
requestAnimationFrame(animate)

window.mooveCamera = function() {
	const coords = { x: camera.position.x, y: camera.position.y };
	new TWEEN.Tween(coords)
		.to({ x: 2, y: 1 })
		.onUpdate(() => {
			console.log("here")
			camera.position.x = coords.x
			camera.position.y = coords.y
			renderer.render(scene, camera);})
		.easing(TWEEN.Easing.Quintic.Out)
		.start();
};

window.cameraPlace = function (){
	const coords = { x: camera.position.x, y: camera.position.y };
	new TWEEN.Tween(coords)
		.to({ x: 0, y: 0 })
		.onUpdate(() => {
			console.log("here")
			camera.position.x = coords.x
			camera.position.y = coords.y
			renderer.render(scene, camera);})
		.easing(TWEEN.Easing.Quintic.Out)
		.start();
};

