import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { LoadingManager, TextureLoader, PMREMGenerator, UnsignedByteType, AudioLoader, AudioListener, Audio } from 'three'
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
    allPaintingsDict = {
        subjection1:
        {
            position: 1,
            distance: 2,
            rotate: -0.85,
            x: 19.4,
            z: -40.6,
            object: {},
            sound: ''
        },
        subjection2:
        {
            position: 2,
            distance: 2,
            x: 22.27,
            z: -39.88,
            rotate: -0.6,
            object: {},
            sound: ''
        },
        subjection3:
        {
            position: 3,
            distance: 2,
            x: 24.05,
            z: -39.1,
            rotate: -0.4,
            object: {},
            sound: ''
        },
        sentient1:
        {
            position: 4,
            distance: 2,
            x: 2.33,
            z: -9.18,
            rotate: -1.25,
            object: {},
            sound: ''
        },
        sentient2:
        {
            position: 5,
            distance: 2,
            x: 1.96,
            z: -10.65,
            rotate: -1.25,
            object: {},
            sound: ''
        },
        sentient3:
        {
            position: 6,
            distance: 2,
            x: 1.64,
            z: -11.89,
            rotate: -1.1,
            object: {},
            sound: ''
        },
        suplication1:
        {
            position: 7,
            distance: 2,
            x: 21,
            z: -36.6,
            rotate: 3.14159,
            object: {},
            sound: ''
        },
        suplication2:
        {
            position: 8,
            distance: 2,
            x: 23,
            z: -36.71,
            rotate: 3.14159,
            object: {},
            sound: ''
        },
        suplication3:
        {
            position: 9,
            distance: 2,
            x: 25,
            z: -36.61,
            rotate: 3.14159,
            object: {},
            sound: ''
        },
        suplication4:
        {
            position: 10,
            distance: 2,
            x: 27,
            z: -36.63,
            rotate: 3.14159,
            object: {},
            sound: ''
        },
        suplication5:
        {
            position: 11,
            distance: 2,
            x: 29,
            z: -36.62,
            rotate: 3.14159,
            object: {},
            sound: ''
        },
        contrive:
        {
            position: 12,
            distance: 2,
            x: 29.17,
            z: -49.4,
            rotate: 4.71239,
            object: {},
            sound: ''
        },
        inunct1:
        {
            position: 13,
            distance: 2,
            x: 22,
            z: -48.64,
            rotate: 3.14159,
            object: {},
            sound: ''
        },
        inunct2:
        {
            position: 14,
            distance: 2,
            x: 24,
            z: -48.77,
            rotate: 3.14159,
            object: {},
            sound: ''
        },
        inunct3:
        {
            position: 15,
            distance: 2,
            x: 26,
            z: -48.87,
            rotate: 3.14159,
            object: {},
            sound: ''
        },
        inunct4:
        {
            position: 16,
            distance: 2,
            x: 28.0,
            z: -48.88,
            rotate: 3.14159,
            object: {},
            sound: ''
        },
        exempt:
        {
            position: 17,
            distance: 2,
            x: 23.02,
            z: -43.12,
            rotate: 2.4,
            object: {},
            sound: ''
        },
        landscapeoflife5:
        {
            position: 18,
            distance: 2,
            x: 7.03,
            z: -27.99,
            rotate: 3.125,
            object: {},
            sound: ''
        },
        landscapeoflife1:
        {
            position: 19,
            distance: 2,
            x: -0.5,
            z: -30.62,
            rotate: 0,
            object: {},
            sound: ''
        },
        landscapeoflife6:
        {
            position: 20,
            distance: 2,
            x: 4.48,
            z: -27.97,
            rotate: 3.15,
            object: {},
            sound: ''
        },
        landscapeoflife4:
        {
            position: 21,
            distance: 2,
            x: 7,
            z: -30.62,
            rotate: 0,
            object: {},
            sound: ''
        },
        landscapeoflife3:
        {
            position: 22,
            distance: 2,
            x: 4.5,
            z: -30.63,
            rotate: 0,
            object: {},
            sound: ''
        },
        landscapeoflife2:
        {
            position: 23,
            distance: 2,
            x: 2,
            z: -30.77,
            rotate: 0,
            object: {},
            sound: ''
        },
        kontemplasi1:
        {
            position: 24,
            distance: 2,
            x: 22,
            z: -46.23,
            rotate: 0,
            object: {},
            sound: ''
        },
        kontemplasi2:
        {
            position: 25,
            distance: 2,
            x: 24,
            z: -46.23,
            rotate: 0,
            object: {},
            sound: ''
        },
        kontemplasi3:
        {
            position: 26,
            distance: 2,
            x: 26.25,
            z: -45.62,
            rotate: 0,
            object: {},
            sound: ''
        },
        untitled2:
        {
            position: 27,
            distance: 2,
            x: 0.47,
            z: -22,
            rotate: -1.5708,
            object: {},
            sound: ''
        },
        hikayathidup2:
        {
            position: 28,
            distance: 2,
            x: -0.87,
            z: -10.35,
            rotate: 1.15,
            object: {},
            sound: ''
        },
        hikayathidup1:
        {
            position: 29,
            distance: 2,
            x: -1.12,
            z: -9.04,
            rotate: 1.25,
            object: {},
            sound: ''
        },
        untitled1:
        {
            position: 30,
            distance: 2,
            x: 0.44,
            z: -17,
            rotate: -1.5708,
            object: {},
            sound: ''
        },
        hikayathidup3:
        {
            position: 31,
            distance: 2,
            x: 0.046,
            z: -11.24,
            rotate: 1.05,
            object: {},
            sound: ''
        },
        kontemplasi4:
        {
            position: 32,
            distance: 2,
            x: 28.5,
            z: -48.51,
            rotate: 3.14159,
            object: {},
            sound: ''
        },
        kontemplasi5:
        {
            position: 33,
            distance: 2,
            x: 28.61,
            z: -45.5,
            rotate: -1.5708,
            object: {},
            sound: ''
        },
        baur:
        {
            position: 34,
            distance: 2,
            x: 24.2,
            z: -39.33,
            rotate: -0.315,
            object: {},
            sound: ''
        },
        kontemplasi7:
        {
            position: 35,
            distance: 2,
            x: 28.8,
            z: -43,
            rotate: -1.5708,
            object: {},
            sound: ''
        },
        kontemplasi8:
        {
            position: 36,
            distance: 2,
            x: 28.4,
            z: -38,
            rotate: -1.5708,
            object: {},
            sound: ''
        },
        kontemplasi6:
        {
            position: 37,
            distance: 2,
            x: 28.57,
            z: -40.5,
            rotate: -1.5708,
            object: {},
            sound: ''
        }
    }

    allSounds = []
    constructor(scene, renderer) {
        this.loadingManager = new LoadingManager();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/'); // use a full url path
        this.gltfLoader = new GLTFLoader(this.loadingManager);
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

    loadModel(asset, storeMeshes, storePainting = false) {
        const self = this
        // model
        this.gltfLoader.setPath(this.assetPath)
        this.gltfLoader.load(asset, (object) => {
            this.scene.add(object.scene);
            // load a resource
            if (storeMeshes) {
                for (let i = 0; i < object.scene.children[0].children.length; i++) {
                    self.allMeshes.push(object.scene.children[0].children[i])
                }
            }
            if (storePainting) {
                for (let i = 0; i < object.scene.children.length; i++) {
                    self.allPaintingsDict[object.scene.children[i].name].object = object.scene.children[i]
                }
                document.dispatchEvent(new Event("paintingsLoaded"))
            }
        });

    }

    loadAudio(sounds) {
        const audioLoader = new AudioLoader(this.loadingManager);
        const listener = new AudioListener();
        this.allSounds = []
        for (let i = 0; i < sounds.length; i++) {
            const sound = new Audio(listener);
            audioLoader.load(sounds[i], (buffer) => {
                sound.setBuffer(buffer);
                this.allSounds.push({
                    soundObj: sound,
                    index: i
                })
                switch (i) {
                    case 1: {
                        this.allPaintingsDict.subjection1.sound = sound
                        this.allPaintingsDict.subjection2.sound = sound
                        this.allPaintingsDict.subjection3.sound = sound
                        break
                    }
                    case 2: {
                        this.allPaintingsDict.sentient1.sound = sound
                        this.allPaintingsDict.sentient2.sound = sound
                        this.allPaintingsDict.sentient3.sound = sound
                        break
                    }
                    case 3: {
                        this.allPaintingsDict.suplication1.sound = sound
                        this.allPaintingsDict.suplication2.sound = sound
                        this.allPaintingsDict.suplication3.sound = sound
                        this.allPaintingsDict.suplication4.sound = sound
                        this.allPaintingsDict.suplication5.sound = sound
                        break
                    }
                    case 4: {
                        this.allPaintingsDict.contrive.sound = sound
                        break
                    }
                    case 5: {
                        this.allPaintingsDict.inunct1.sound = sound
                        this.allPaintingsDict.inunct2.sound = sound
                        this.allPaintingsDict.inunct3.sound = sound
                        this.allPaintingsDict.inunct4.sound = sound
                        break
                    }
                    case 6: {
                        this.allPaintingsDict.exempt.sound = sound
                        break
                    }
                    case 7: {
                        this.allPaintingsDict.baur.sound = sound
                        break
                    }
                    case 8: {
                        this.allPaintingsDict.hikayathidup1.sound = sound
                        break
                    }
                    case 9: {
                        this.allPaintingsDict.hikayathidup2.sound = sound
                        break
                    }
                    case 10: {
                        this.allPaintingsDict.hikayathidup3.sound = sound
                        break
                    }
                    case 11: {
                        this.allPaintingsDict.kontemplasi1.sound = sound
                        break
                    }
                    case 12: {
                        this.allPaintingsDict.kontemplasi1.sound = sound
                        break
                    }
                    case 13: {
                        this.allPaintingsDict.kontemplasi2.sound = sound
                        break
                    }
                    case 14: {
                        this.allPaintingsDict.kontemplasi3.sound = sound
                        break
                    }
                    case 15: {
                        this.allPaintingsDict.kontemplasi4.sound = sound
                        break
                    }
                    case 16: {
                        this.allPaintingsDict.kontemplasi5.sound = sound
                        break
                    }
                    case 17: {
                        this.allPaintingsDict.kontemplasi6.sound = sound
                        break
                    }
                    case 18: {
                        this.allPaintingsDict.kontemplasi7.sound = sound
                        break
                    }
                    case 19: {
                        this.allPaintingsDict.kontemplasi8.sound = sound
                        break
                    }
                    case 20: {
                        this.allPaintingsDict.landscapeoflife1.sound = sound
                        break
                    }
                    case 21: {
                        this.allPaintingsDict.landscapeoflife2.sound = sound
                        break
                    }
                    case 22: {
                        this.allPaintingsDict.landscapeoflife3.sound = sound
                        break
                    }
                    case 23: {
                        this.allPaintingsDict.landscapeoflife4.sound = sound
                        break
                    }
                    case 24: {
                        this.allPaintingsDict.landscapeoflife5.sound = sound
                        break
                    }
                    case 25: {
                        this.allPaintingsDict.landscapeoflife6.sound = sound
                        break
                    }
                    case 26: {
                        this.allPaintingsDict.untitled1.sound = sound
                        break
                    }
                    case 27: {
                        this.allPaintingsDict.untitled2.sound = sound
                        break
                    }
                    default:
                        break
                }
            });
        }
    }



    setUpLoadManager() {


        this.loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
            console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        };
        this.loadingManager.onLoad = () => {
            const event = new Event(this.onModelLoadEventName);
            document.dispatchEvent(event)
        };
        this.loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
            console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        };
        this.loadingManager.onError = (url) => {
            console.log( 'There was an error loading ' + url );
        };

    }



}
