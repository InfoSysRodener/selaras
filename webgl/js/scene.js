import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


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

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.width, this.height);
        this.container.appendChild(this.renderer.domElement);
        
        this.control = new OrbitControls(this.camera,this.container);
        this.scene.add(this.control);

        window.addEventListener('resize', this.onResize.bind(this));

        
        this.addObject();
        this.render();
    }

    addObject(){
        this.geometry = new THREE.BoxBufferGeometry(4,4,4);
        this.material = new THREE.MeshNormalMaterial();
        this.mesh = new THREE.Mesh(this.geometry,this.material);
        this.scene.add(this.mesh);
    }

   
    initLights() {
        
        const ambient = new THREE.AmbientLight(0xFFFFFF, 0.9);
        const point = new THREE.PointLight(0xCCCCCC, 0.1, 10);
        const directional = new THREE.DirectionalLight(0xFFFFFF, 0.5);

        this.scene.add(ambient);
        this.scene.add(point);
        this.scene.add(directional);
    }



    render() {

        this.mesh.rotation.x += 0.15 / 200;
        this.mesh.rotation.y += 0.15 / 200;

        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(this.render.bind(this));
    }


    onResize() {
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;

        this.renderer.setSize(this.width, this.height);

        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }

}

export default SceneInit;