import { Controller } from "@hotwired/stimulus"
import * as THREE from 'three';
import { GLTFLoader } from '../vendor/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from '../vendor/jsm/loaders/DRACOLoader.js';

export default class extends Controller {
    static targets = [""]

    connect() {
    }

    moveCameraUp() {
        this._place(currentPlace + 1)
    }

    moveCameraDown() {
        this._place(currentPlace - 1)
    }

    _place(newCameraPlace) {
        if (newCameraPlace < 1 || newCameraPlace > 4) {
            return
        }
        window.currentPlace = newCameraPlace;
        console.log(window.cameraPlace);
        let lookAtplace
        let newPlace
        switch (newCameraPlace) {
            case 1:
                lookAtplace = new THREE.Vector3(57.6, -11.6, 8.4)
                newPlace = { x: -100, y: 62.4, z: 136 }
                this._moveCameraTo(newPlace, lookAtplace)
                break;
            case 2:
                lookAtplace = new THREE.Vector3(67.2, -11.6, 121.2)
                newPlace = { x: -124.4, y: 111.6, z: -100 }
                this._moveCameraTo(newPlace, lookAtplace)
                break;
            case 3:
                lookAtplace = new THREE.Vector3(-85.2, 77.2, 67.2)
                newPlace = { x: 72, y: 150.8, z: -100 }
                this._moveCameraTo(newPlace, lookAtplace)
                break;
            case 4:
                lookAtplace = new THREE.Vector3(52.4, 165.6, 13.2)
                newPlace = { x: 126.4, y: 190, z: 165.6 }
                this._moveCameraTo(newPlace, lookAtplace)
                break;
        }
    }

    _moveCameraTo(newPlace, lookAtplace) {
        console.log("moveCameraTo")

        const coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };

        new TWEEN.Tween(coords)
            .to(newPlace)
            .onUpdate(function () {
                camera.position.x = coords.x
                camera.position.y = coords.y
                camera.position.z = coords.z
                lookAt.x = lookAtplace.x
                lookAt.y = lookAtplace.y
                lookAt.z = lookAtplace.z

                camera.lookAt(lookAt)
                renderer.render(scene, camera);

            })
            .easing(TWEEN.Easing.Quintic.Out)
            .start();

        console.log(camera.position);
    }
}