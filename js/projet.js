import { Application } from "@hotwired/stimulus"
import PresenterController from './presenter_controller.js';
import ModelController from './model_controller.js';
window.Stimulus = Application.start()
Stimulus.register("presenter", PresenterController)
Stimulus.register("model", ModelController)


import * as THREE from 'three';
// import { VOXLoader, VOXMesh } from '../vendor/jsm/loaders/VOXLoader.js';
//import { OrbitControls } from '../vendor/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '../vendor/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from '../vendor/jsm/loaders/DRACOLoader.js';


const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.01, 10000);
lookAt = new THREE.Vector3(57.6, -11.6, 8.4);
camera.position.set(-100, 62.4, 136);
camera.lookAt(lookAt);
window.lookAt = lookAt;
window.camera = camera;

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
		'model.glb',
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

function updateCamera() {
	camera.updateProjectionMatrix();
}
function updatelookAt() {
	console.log(lookAt);
	camera.lookAt(lookAt);
	camera.updateProjectionMatrix();

}

window.currentPlace = 1;

function animate(time) {
	requestAnimationFrame(animate)
	TWEEN.update(time)
	//controls.update();
	renderer.render(scene, camera);

}
requestAnimationFrame(animate)