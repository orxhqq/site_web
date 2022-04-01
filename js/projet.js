import { Application } from "@hotwired/stimulus"
import PresenterController from './presenter_controller.js';
window.Stimulus = Application.start()
Stimulus.register("presenter", PresenterController)

import * as THREE from 'three';
// import { VOXLoader, VOXMesh } from '../vendor/jsm/loaders/VOXLoader.js';
//import { OrbitControls } from '../vendor/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { GLTFLoader } from '../vendor/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from '../vendor/jsm/loaders/DRACOLoader.js';



const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.01, 10000);
lookAt = new THREE.Vector3(57.6, -31.2, 8.4);
camera.position.set(-100, 18, 136);
camera.lookAt(lookAt);
window.lookAt = lookAt;
window.camera = camera;
// camera.position.z = 5;
// camera.setViewOffset (0.25, 0.25, 0.25, 0.25, 0.25, 0.25);
// camera.position.y = z;
// controls.update()e

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff)
scene.add(camera)

const hemiLight = new THREE.HemisphereLight(0x888888, 0x444444, 1);
scene.add(hemiLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.75);
dirLight.position.set(1.5, 3, 2.5);
scene.add(dirLight);

new GLTFLoader()
	.setPath('../models/')
	.setDRACOLoader(new DRACOLoader().setDecoderPath('../js/libs/draco/gltf/'))
	.load(
		// resource URL
		'untitled4.glb',
		// called when the resource is loaded
		function (gltf) {

			scene.add(gltf.scene);

			gltf.animations; // Array<THREE.AnimationClip>
			gltf.scene; // THREE.Group
			gltf.scenes; // Array<THREE.Group>
			gltf.cameras; // Array<THREE.Camera>
			gltf.asset; // Object

		},

		function (xhr) {

			console.log((xhr.loaded / xhr.total * 100) + '% loaded');

		},
		function (error) {

			console.log('An error happened');

		}
	);


const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
window.renderer = renderer;
window.scene = scene;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
document.getElementById("canvas").appendChild(renderer.domElement);



class MinMaxGUIHelper {
	constructor(obj, minProp, maxProp, minDif) {
		this.obj = obj;
		this.minProp = minProp;
		this.maxProp = maxProp;
		this.minDif = minDif;
	}
	get min() {
		return this.obj[this.minProp];
	}
	set min(v) {
		this.obj[this.minProp] = v;
		this.obj[this.maxProp] = Math.max(this.obj[this.maxProp], v + this.minDif);
	}
	get max() {
		return this.obj[this.maxProp];
	}
	set max(v) {
		this.obj[this.maxProp] = v;
		this.min = this.min;  // this will call the min setter
	}
}


function updateCamera() {
	camera.updateProjectionMatrix();
}
function updatelookAt() {
	console.log(lookAt);
	camera.lookAt(lookAt);
	camera.updateProjectionMatrix();

}
const gui = new GUI();
gui.add(camera, 'fov', 1, 180).onChange(updateCamera);
const minMaxGUIHelper = new MinMaxGUIHelper(camera, 'near', 'far', 0.1);
gui.add(minMaxGUIHelper, 'min', 0.1, 50, 0.1).name('near').onChange(updateCamera);
gui.add(minMaxGUIHelper, 'max', 0.1, 50, 0.1).name('far').onChange(updateCamera);
gui.add(camera.position, 'x', -200, 200).name("camera.position.x").onChange(updateCamera);
gui.add(camera.position, 'z', -200, 200).name("camera.position.z").onChange(updateCamera);
gui.add(camera.position, 'y', -200, 200).name("camera.position.y").onChange(updateCamera);
gui.add(lookAt, "x", -200, 200).onChange(updatelookAt);
gui.add(lookAt, "y", -200, 200).onChange(updatelookAt);
gui.add(lookAt, "z", -200, 200).onChange(updatelookAt);

window.gui = gui

//controls = new OrbitControls( camera, renderer.domElement );
//controls.minDistance = 0;
//controls.maxDistance = 10;


// controls.update();
//window.controls = controls;
console.log("ici")

window.currentPlace = 1;


function animate(time) {
	requestAnimationFrame(animate)
	TWEEN.update(time)
	//controls.update();
	renderer.render(scene, camera);

}
requestAnimationFrame(animate)

window.place1 = function () {
	console.log("camera place");
	const coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
	new TWEEN.Tween(coords)
		.to({ x: -100, y: 18, z: 136 })
		.onUpdate(function () {
			camera.position.x = coords.x
			camera.position.y = coords.y
			camera.position.z = coords.z

			lookAtplace = new THREE.Vector3(57.6, -31.2, 8.4)
			lookAt.x = lookAtplace.x
			lookAt.y = lookAtplace.y
			lookAt.z = lookAtplace.z
			camera.lookAt(lookAt);
			renderer.render(scene, camera);

		})
		.easing(TWEEN.Easing.Quintic.Out)
		.start();
	console.log("place")


	//controls.target.set(0.10, -0.086, -0.033);
	//controls.update();
	console.log(camera.position);
};

window.place2 = function () {
	console.log("camera place2");
	const coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
	new TWEEN.Tween(coords)
		.to({ x: -109.6, y: 72, z: -60.8 })
		.onUpdate(function () {
			camera.position.x = coords.x
			camera.position.y = coords.y
			camera.position.z = coords.z
			lookAtplace = new THREE.Vector3(57.6, -16.4, 112.4)
			lookAt.x = lookAtplace.x
			lookAt.y = lookAtplace.y
			lookAt.z = lookAtplace.z
			camera.lookAt(lookAt);
			renderer.render(scene, camera);

		})
		.easing(TWEEN.Easing.Quintic.Out)
		.start();
	console.log("place")
	console.log(camera.position);
};

window.place3 = function () {
	console.log("camera place2");
	const coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
	new TWEEN.Tween(coords)
		.to({ x: 52.4, y: 121.4, z: -70.4 })
		.onUpdate(function () {
			camera.position.x = coords.x
			camera.position.y = coords.y
			camera.position.z = coords.z
			lookAtplace = new THREE.Vector3(-55.6, 67.2, 77.2)
			lookAt.x = lookAtplace.x
			lookAt.y = lookAtplace.y
			lookAt.z = lookAtplace.z

			camera.lookAt(lookAt)
			renderer.render(scene, camera);

		})
		.easing(TWEEN.Easing.Quintic.Out)
		.start();
	console.log("place")
	console.log(camera.position);
};

window.place4 = function () {
	console.log("camera place2");
	const coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
	new TWEEN.Tween(coords)
		.to({ x: 106.4, y: 170.4, z: 121.2 })
		.onUpdate(function () {
			camera.position.x = coords.x
			camera.position.y = coords.y
			camera.position.z = coords.z
			lookAtplace = new THREE.Vector3( 22.8, 136, 13.2 )
			lookAt.x = lookAtplace.x
			lookAt.y = lookAtplace.y
			lookAt.z = lookAtplace.z

			camera.lookAt(lookAt)
			renderer.render(scene, camera);

		})
		.easing(TWEEN.Easing.Quintic.Out)
		.start();
	console.log("place")
	console.log(camera.position);
};

window.place = function (newCameraPlace) {
	if (newCameraPlace < 1 || newCameraPlace > 4) {
		return
	}
	window.currentPlace = newCameraPlace;
	console.log(window.cameraPlace);
	switch (newCameraPlace) {
		case 1:
			place1();
			break;
		case 2:
			place2();
			break;
		case 3:
			place3();
			break;
		case 4:
			place4();
			break;
	}
}

