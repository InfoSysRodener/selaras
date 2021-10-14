import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { LoadingManager, TextureLoader, PMREMGenerator, UnsignedByteType } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'



export class Loader {

    loadingManager
    gltfLoader
    textureLoader
    scene
    onModelLoadEventName = 'onModelLoad'
    assetPath = '/3D/'
    allMeshes = []

    constructor(scene, renderer) {
        this.loadingManager = new LoadingManager();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/'); // use a full url path
        this.gltfLoader = new GLTFLoader();
        this.gltfLoader.setDRACOLoader(dracoLoader);

        this.textureLoader = new TextureLoader(this.loadingManager);
        this.scene = scene
        this.renderer = renderer


        this.setUpLoadManager()
        this.setUpLoader()
    }

    setUpLoader() {
        const that = this;
        const pmremGenerator = new PMREMGenerator(this.renderer);
        pmremGenerator.compileEquirectangularShader();
        // Loading of assets
        new RGBELoader().setDataType(UnsignedByteType)
            .setPath(this.assetPath)
            .load('urban_street_01_2k.hdr', function (texture) {

                const envMap = pmremGenerator.fromEquirectangular(texture).texture;

                that.scene.background = envMap;
                that.scene.environment = envMap;

                texture.dispose();
                pmremGenerator.dispose();

                //    that.renderer.render(that.scene, that.scene.camera);
            })
    }

    loadModel(asset, storeMeshes) {
        // model
        this.gltfLoader.setPath(this.assetPath)
        this.gltfLoader.load(asset, (object) => {
            this.scene.add(object.scene);
            if(storeMeshes){
                for (let i = 0; i < object.scene.children.length; i++) {
                    this.allMeshes.push(object.scene.children[i])
                }
            }
        });
    }

    setUpLoadManager() {

        this.loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
            // console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        };
        this.loadingManager.onLoad = function () {
            const event = new CustomEvent(this.onModelLoadEventName);
            document.dispatchEvent(event)
        };
        this.loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
            // console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        };
        this.loadingManager.onError = function (url) {
            // console.log( 'There was an error loading ' + url );
        };

    }
}