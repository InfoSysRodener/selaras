import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { CameraControls } from './CameraControls';
import { ControlEvents } from './ControlEvents';
import { Loader } from './loader'

class SceneInit {

    constructor(options) {
        this.container = options.dom;
        this.scene = new THREE.Scene();

        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;

        this.camera = new THREE.PerspectiveCamera(
            45,
            this.width / this.height,  
            1,
            1000
        );
        this.camera.position.x = -2
        this.camera.position.y = 2
        this.camera.position.z = 1
        

        this.renderer = new THREE.WebGLRenderer({ antialias: true});
        this.renderer.setSize(this.width, this.height);
        this.container.appendChild(this.renderer.domElement);
        
        // this.control = new OrbitControls(this.camera,this.container);
        // this.scene.add(this.control);

        window.addEventListener('resize', this.onResize.bind(this));

        this.cameraControls = new CameraControls(this.camera)
        
        this.addLoader();
        this.addObjects();
        this.addControls()
        this.render();
    }

    addLoader(){
        this.loader = new Loader(this.scene, this.renderer);
    }

    addObjects(){
        this.loader.loadModel('artSpace.glb');
        // this.loader.loadModel('artPaintings.glb');
        // this.loader.loadModel('profileBoards.glb');
    }

    addControls(){
        const controls = new ControlEvents(this.cameraControls)
        controls.addDesktopEvents()
        controls.addMobileEvents()
    }


    render() {
        this.cameraControls.updateMovement()
        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(this.render.bind(this));
    }


    onResize() {
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;

        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.width, this.height);

        this.renderer.render(this.scene, this.camera)
    }



}

export default SceneInit;
