import * as THREE from 'three';
import { VOXLoader, VOXMesh } from '../vendor/jsm/loaders/VOXLoader.js';
//import { OrbitControls } from '../vendor/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';




const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.01, 10000);
lookAt = new THREE.Vector3( 0.042, -0.156, -0.058 );
camera.position.set( -0.156, -0.058, 0.1735 );
camera.lookAt(lookAt);
window.camera = camera;
// camera.position.z = 5;
// camera.setViewOffset (0.25, 0.25, 0.25, 0.25, 0.25, 0.25);
// camera.position.y = z;
// controls.update()e

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
	camera.lookAt(lookAt);
}
const gui = new GUI();
gui.add(camera, 'fov', 1, 180).onChange(updateCamera);
const minMaxGUIHelper = new MinMaxGUIHelper(camera, 'near', 'far', 0.1);
gui.add(minMaxGUIHelper, 'min', 0.1, 50, 0.1).name('near').onChange(updateCamera);
gui.add(minMaxGUIHelper, 'max', 0.1, 50, 0.1).name('far').onChange(updateCamera);
gui.add(camera.position, 'x', -1, 1).name("camera.position.x").onChange(updateCamera);
gui.add(camera.position, 'z', -1, 1).name("camera.position.z").onChange(updateCamera);
gui.add(camera.position, 'y', -1, 1).name("camera.position.y").onChange(updateCamera);
gui.add(lookAt, "x", -1, 1).onChange(updatelookAt);
gui.add(lookAt, "y", -1, 1).onChange(updatelookAt);
gui.add(lookAt, "z", -1, 1).onChange(updatelookAt);


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
	//controls.update();
	console.log(camera.position);
};

window.place1 = function (){
	console.log("camera place");
	const coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
	new TWEEN.Tween(coords)
		.to({ x: -0.156, y: -0.058, z: 0.1735 })
		.onUpdate(function() {
			camera.position.x = coords.x
			camera.position.y = coords.y
			camera.position.z = coords.z
      camera.lookAt( new THREE.Vector3( 0.042, -0.156, -0.058 ));
			renderer.render(scene, camera);

		})
		.easing(TWEEN.Easing.Quintic.Out)
		.start();
	console.log("place")


	//controls.target.set(0.10, -0.086, -0.033);
	//controls.update();
	console.log(camera.position);
};

window.place2 = function (){
	console.log("camera place2");
	const coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
	new TWEEN.Tween(coords)
		.to({ x: -0.156, y: 0.016, z: -0.156 })
		.onUpdate(function() {
			camera.position.x = coords.x
			camera.position.y = coords.y
			camera.position.z = coords.z
			
      camera.lookAt( new THREE.Vector3( 0.336, -0.278, 0.238 ));
			renderer.render(scene, camera);

		})
		.easing(TWEEN.Easing.Quintic.Out)
		.start();
	console.log("place")
	console.log(camera.position);
};

window.place3 = function (){
	console.log("camera place2");
	const coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
	new TWEEN.Tween(coords)
		.to({ x: 0.164, y: 0.09, z: -0.156 })
		.onUpdate(function() {
			camera.position.x = coords.x
			camera.position.y = coords.y
			camera.position.z = coords.z
			
      camera.lookAt( new THREE.Vector3( 0.042, 0.02, -0.032 ));
			renderer.render(scene, camera);

		})
		.easing(TWEEN.Easing.Quintic.Out)
		.start();
	console.log("place")
	console.log(camera.position);
};

window.place4 = function (){
	console.log("camera place2");
	const coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
	new TWEEN.Tween(coords)
		.to({ x: 0.14, y: 0.148, z: 0.134 })
		.onUpdate(function() {
			camera.position.x = coords.x
			camera.position.y = coords.y
			camera.position.z = coords.z
			
      camera.lookAt( new THREE.Vector3( -0.008, 0.062, -0.012 )); 
			renderer.render(scene, camera);

		})
		.easing(TWEEN.Easing.Quintic.Out)
		.start();
	console.log("place")
	console.log(camera.position);
};

window.place = function (newCameraPlace){
	if(newCameraPlace < 1 || newCameraPlace > 4){
		return
	}	
	window.currentPlace = newCameraPlace;
	console.log(window.cameraPlace);
	switch(newCameraPlace){
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

