import * as THREE from 'three';
import { VOXLoader, VOXMesh } from './jsm/loaders/VOXLoader.js';

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 1000);
// camera.position.z = 5;
camera.position.set( 0.175, 0.075, 1 );


const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf400f3)
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
document.body.appendChild(renderer.domElement);


function animate(time) {
	requestAnimationFrame(animate)
	TWEEN.update(time)
	renderer.render(scene, camera);
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
			renderer.render(scene, camera);
			console.log(camera.position);
		})
		.easing(TWEEN.Easing.Quintic.Out)
		.start();
	console.log(camera.position);
};

window.cameraPlace = function (){
	console.log("camera place");
	const coords = { x: camera.position.x, y: camera.position.y };
	new TWEEN.Tween(coords)
		.to({ x: 0, y: 0 })
		.onUpdate(function() {
			console.log("here")
			camera.position.x = coords.x
			camera.position.y = coords.y
			renderer.render(scene, camera);
			console.log(camera.position);

		})
		.easing(TWEEN.Easing.Quintic.Out)
		.start();
	console.log(camera.position);
};

