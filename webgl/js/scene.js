import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { CameraControls } from './CameraControls';
import { ControlEvents } from './ControlEvents';
import { Loader } from './loader'

class SceneInit {

    shouldRender = false
    renderTime = 1

    constructor(options) {
        this.container = options.dom;
        this.scene = new THREE.Scene();

        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;

        this.camera = new THREE.PerspectiveCamera(
            45,
            this.width / this.height,
            0.1,
            100000
        );
        this.camera.position.x = -2
        this.camera.position.y = 2
        this.camera.position.z = 1


        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.collCube = new THREE.Mesh(geometry, material);
        this.collCube.position.copy(this.camera.position)
        this.scene.add(this.collCube);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMapSoft = true;
        this.container.appendChild(this.renderer.domElement);

        // this.control = new OrbitControls(this.camera, this.container);

        window.addEventListener('resize', this.onResize.bind(this));

        this.cameraControls = new CameraControls(this.camera)

        this.addLoader();
        this.addObjects();
        this.addControls()
        this.animate();

        this.lastCorrectPos = this.camera.position.clone()

        setInterval(() => {
            if (this.checkCollision()) {
                this.camera.position.copy(this.lastCorrectPos)
            }
            else {
                this.lastCorrectPos = this.camera.position.clone()
            }
        }, 100)
        this.needToRender(100)
    }

    addLoader() {
        this.loader = new Loader(this.scene, this.renderer);
    }

    addObjects() {
        this.loader.loadModel('artSpace.glb', true);
        // this.loader.loadModel('artSpaceCol.glb', true)
        // this.loader.loadModel('artPaintings.glb');
        // this.loader.loadModel('profileBoards.glb');
    }

    addControls() {
        this.controls = new ControlEvents(this.cameraControls, this)
        this.controls.addDesktopEvents()
        this.controls.addMobileEvents()
    }


    animate() {
        const animate = () => {
            requestAnimationFrame(animate);

            if (this.shouldRender) {
                if (this.renderTime >= 1) {
                    if (this.renderTime > 1) {
                        this.renderTime -= 1;
                    } else {
                        this.shouldRender = false;
                    }
                }
                let x = 0
                let y = 0
                if (this.controls.moveForward) {
                    y += 1
                }
                if (this.controls.moveBackward) {
                    y -= 1
                }
                if (this.controls.moveLeft) {
                    x += 1
                }
                if (this.controls.moveRight) {
                    x -= 1
                }
                if (x !== 0 || y !== 0) {
                    this.cameraControls.move(x, y)
                }
                this.cameraControls.updateMovement()
                this.collCube.position.copy(this.camera.position)
                
                this.renderer.render(this.scene, this.camera);
            }
        }
        animate()
    }


    onResize() {
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;

        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.width, this.height);

        this.renderer.render(this.scene, this.camera)

    }

    checkCollision() {
        let vert = []
        const positions = this.collCube.geometry.attributes.position.array;
        const ptCout = positions.length / 9;
        for (let i = 0; i < ptCout; i++) {
            const p = new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
            vert.push(p)
        }

        for (let i = 0; i < vert.length; i++) {
            const localVertex = vert[i].clone();
            const globalVertex = localVertex.applyMatrix4(this.collCube.matrix);
            const directionVector = globalVertex.sub(this.collCube.position);
            let r = new THREE.Raycaster(this.collCube.position, directionVector.clone().normalize())
            const collisionResults = r.intersectObjects(this.loader.allMeshes);
            if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
                vert = null
                r = null
                return true;
            }

        }
    }

    needToRender(value = 1) {
        this.renderTime = value
        this.shouldRender = true
    }



}

export default SceneInit;
