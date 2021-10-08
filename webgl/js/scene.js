import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Loader } from './loader'

class SceneInit {

    constructor(options) {
        this.container = options.dom;
        this.scene = new THREE.Scene();

        this.width = this.container.clientWidth;
        this.height =this.container.clientHeight;

        this.camera = new THREE.PerspectiveCamera(
            45,
            this.width / this.height,  
            1,
            1000
        );
        this.camera.position.z = 15;

        this.renderer = new THREE.WebGLRenderer({ antialias: true});
        this.renderer.setSize(this.width, this.height);
        this.container.appendChild(this.renderer.domElement);
        
        // this.control = new OrbitControls(this.camera,this.container);
        // this.scene.add(this.control);

        window.addEventListener('resize', this.onResize.bind(this));

        
        this.addLoader();
        this.addObjects();
        this.render();
    }

    addLoader(){
        this.loader = new Loader(this.scene, this.renderer);
    }

    addObjects(){
        this.loader.loadModel('/artSpace.glb');
        // this.scene.add(new THREE.Mesh(new THREE.PlaneBufferGeometry(1,1), new THREE.MeshNormalMaterial()));
    }


    render() {
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