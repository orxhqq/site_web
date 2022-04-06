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
                lookAtplace = new THREE.Vector3(57.6, -11.6, -65.6)
                newPlace = { x: -124.4, y: 62.4, z: 121.2 }
                this._moveCameraTo(newPlace, lookAtplace)
                break;
            case 2:
                lookAtplace = new THREE.Vector3(67.2, -11.6, 92)
                newPlace = { x: -102, y: 111.6, z: -124 }
                this._moveCameraTo(newPlace, lookAtplace)
                break;
            case 3:
                lookAtplace = new THREE.Vector3(-85.2, 77.2, 82)
                newPlace = { x: 118, y: 150.8, z: -114.8 }
                this._moveCameraTo(newPlace, lookAtplace)
                break;
            case 4:
                lookAtplace = new THREE.Vector3(13.2, 160.8, 22.8)
                newPlace = { x: 112.2, y: 190, z: 116 }
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