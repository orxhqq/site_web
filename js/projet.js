import { Application } from "@hotwired/stimulus"
import PresenterController from './presenter_controller.js';
import ModelController from './model_controller.js';
window.Stimulus = Application.start()
Stimulus.register("presenter", PresenterController)
Stimulus.register("model", ModelController)

window.currentPlace = 1;
import GUI from 'lil-gui';
import * as THREE from 'three';
import { GLTFLoader } from '../vendor/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from '../vendor/jsm/loaders/DRACOLoader.js';
const canvas = document.getElementById("canvas");
if (canvas.offsetWidth < 768)
	{fov = 45}
else { fov = 35 }
const camera = new THREE.PerspectiveCamera(fov, canvas.offsetWidth / window.innerHeight, 0.01, 10000);
lookAt = new THREE.Vector3(57.6, -11.6, -65.6)
camera.position.set(-124.4, 62.4, 121.2)
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


renderer.setSize(canvas.offsetWidth, window.innerHeight);
window.renderer = renderer;
window.scene = scene;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
document.getElementById("canvas").appendChild(renderer.domElement);

function animate(time) {
	requestAnimationFrame(animate)
	TWEEN.update(time)
	//controls.update();
	renderer.render(scene, camera);

}
requestAnimationFrame(animate)

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
const controlGui = false

if (controlGui) {
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
}
