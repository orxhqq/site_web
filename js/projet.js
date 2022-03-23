import * as THREE from 'three';
import { VOXLoader, VOXMesh } from '../vendor/jsm/loaders/VOXLoader.js';
import { OrbitControls } from '../vendor/jsm/controls/OrbitControls.js';

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 10000);
window.camera = camera;
// camera.position.z = 5;
// camera.setViewOffset (0.25, 0.25, 0.25, 0.25, 0.25, 0.25);
// camera.position.y = z;
// controls.update();

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x408096)
scene.add(camera)

const hemiLight = new THREE.HemisphereLight( 0x888888, 0x444444, 1 );
scene.add( hemiLight );
const dirLight = new THREE.DirectionalLight( 0xffffff, 0.75 );
dirLight.position.set( 1.5, 3, 2.5 );
scene.add( dirLight );

const loader = new VOXLoader();
loader.load("../models/monu2.vox",
	function (chunks) {
		for (let i = 0; i < chunks.length; i++) {
			const chunk = chunks[i];
			const mesh = new VOXMesh(chunk);
			mesh.scale.setScalar(0.0015);
			scene.add(mesh);
		}
	}
	,undefined, function(error){
		console.error(error);
	});

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
window.renderer = renderer;
window.scene = scene;
document.body.appendChild(renderer.domElement);

controls = new OrbitControls( camera, renderer.domElement );
				controls.minDistance = 0;
				controls.maxDistance = 10;
				
camera.position.set( -0.28, 0.0657, 0.442 );
// camera.lookAt (0, -1, 2);
// controls.update();
window.controls = controls;

function animate(time) {
	requestAnimationFrame(animate)
	TWEEN.update(time)
	controls.update();
	renderer.render(scene, camera);
	
}
requestAnimationFrame(animate)

window.mooveCamera = function() {
	const coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
	new TWEEN.Tween(coords)
		.to({ x: 2, y: 1, z: 0 })
		.onUpdate(() => {
			camera.position.x = coords.x
			camera.position.y = coords.y
			camera.position.z = coords.z
			renderer.render(scene, camera);
		})
		.easing(TWEEN.Easing.Quintic.Out)
		.start();
			console.log("move")
	controls.update();
	console.log(camera.position);
};

window.place1 = function (){
	console.log("camera place");
	const coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
	new TWEEN.Tween(coords)
		.to({ x: -0.28, y: -0.0657, z: 0.442 })
		.onUpdate(function() {
			camera.position.x = coords.x
			camera.position.y = coords.y
			camera.position.z = coords.z
			renderer.render(scene, camera);

		})
		.easing(TWEEN.Easing.Quintic.Out)
		.start();
			console.log("place")
	controls.update();
	console.log(camera.position);
};

window.place2 = function (){
	console.log("camera place2");
	const coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
	new TWEEN.Tween(coords)
		.to({ x: -0.2835, y: 0.0374, z: -0.04158 })
		.onUpdate(function() {
			camera.position.x = coords.x
			camera.position.y = coords.y
			camera.position.z = coords.z
			renderer.render(scene, camera);

		})
		.easing(TWEEN.Easing.Quintic.Out)
		.start();
			console.log("place")
	controls.update();
	console.log(camera.position);
};

