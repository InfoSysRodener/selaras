import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { LoadingManager, TextureLoader, PMREMGenerator, UnsignedByteType } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


export class Loader {

    loadingManager
    gltfLoader
    textureLoader
    scene
    onModelLoadEventName = 'onModelLoad'
    assetPath = '../assets/fonts/'
    

    constructor(scene, renderer) {
        this.loadingManager = new LoadingManager();
        this.gltfLoader = new GLTFLoader(this.loadingManager);
        this.textureLoader = new TextureLoader(this.loadingManager);
        this.scene = scene
        this.renderer = renderer

        this.setUpLoadManager()
        this.setUpLoader()
    }

    setUpLoader() {
        const pmremGenerator = new PMREMGenerator(this.renderer);
        pmremGenerator.compileEquirectangularShader();
        // Loading of assets
        new RGBELoader().setDataType(UnsignedByteType)
            .setPath(this.assetPath)
            .load('urban_street_01_2k.hdr', function (texture) {

                const envMap = pmremGenerator.fromEquirectangular(texture).texture;

                this.scene.background = envMap;
                this.scene.environment = envMap;

                texture.dispose();
                pmremGenerator.dispose();

                this.renderer.render(this.scene, this.camera);
            })
    }

    loadModel(asset) {
        // model
        this.gltfLoader.setPath(this.assetPath)
        this.gltfLoader.load(asset, function (object) {
            this.scene.add(object.scene);

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