import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { LoadingManager, TextureLoader, PMREMGenerator, UnsignedByteType } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { Howl } from 'howler';


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
            distance: 3,
            rotate: -48.7,
            x: 25.76,
            z: -55.17,
            object: {},
            sound: '',
            details: {
                artistName: 'Widi Wardani',
                photo: '',
                title: 'SUBJECTION I',
                meshName: 'subjection1',
                size: '40x30 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '3,500,000',
                audio: '2. subjection.mp3'
            }
        },
        subjection2:
        {
            position: 2,
            distance: 2,
            x: 26.67,
            z: -53.37,
            rotate: -0.6,
            object: {},
            sound: '',
            details: {
                artistName: 'Widi Wardani',
                photo: '',
                title: 'SUBJECTION II',
                meshName: 'subjection2',
                size: '40x30 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '3,500,000',
                audio: '2. subjection.mp3'
            }
        },
        subjection3:
        {
            position: 3,
            distance: 2,
            x: 28.39,
            z: -52.00,
            rotate: -0.4,
            object: {},
            sound: '',
            details: {
                artistName: 'Widi Wardani',
                photo: '',
                title: 'SUBJECTION III',
                meshName: 'subjection3',
                size: '40x30 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '3,500,000',
                audio: '2. subjection.mp3'
            }
        },
        sentient1:
        {
            position: 4,
            distance: 2,
            x: 1.0,
            z: -17,
            rotate: -1.25,
            object: {},
            sound: '',
            details: {
                artistName: 'Widi Wardani',
                photo: '',
                title: 'SENTIENT I',
                meshName: 'sentient1',
                size: '40x30 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '3,500,000',
                audio: '3. sentient.mp3'
            }
        },
        sentient2:
        {
            position: 5,
            distance: 2,
            x: 1.0,
            z: -20,
            rotate: -1.25,
            object: {},
            sound: '',
            details: {
                artistName: 'Widi Wardani',
                photo: '',
                title: 'SENTIENT II',
                meshName: 'sentient2',
                size: '40x30 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '3,500,000',
                audio: '3. sentient.mp3'
            }
        },
        sentient3:
        {
            position: 6,
            distance: 2,
            x: 1.0,
            z: -23,
            rotate: -1.1,
            object: {},
            sound: '',
            details: {
                artistName: 'Widi Wardani',
                photo: '',
                title: 'SENTIENT III',
                meshName: 'sentient3',
                size: '40x30 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '3,500,000',
                audio: '3. sentient.mp3'
            }
        },
        suplication1:
        {
            position: 7,
            distance: 2,
            x: 14.84,
            z: -56.07,
            rotate: 0,
            object: {},
            sound: '',
            details: {
                artistName: 'Widi Wardani',
                photo: '',
                title: 'SUPLICATION I',
                meshName: 'suplication1',
                size: '50x70 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '4,500,000',
                audio: '4. suplication.mp3'
            }
        },
        suplication2:
        {
            position: 8,
            distance: 2,
            x: 16.84,
            z: -56.07,
            rotate: 3.14159,
            object: {},
            sound: '',
            details: {
                artistName: 'Widi Wardani',
                photo: '',
                title: 'SUPLICATION II',
                meshName: 'suplication2',
                size: '50x70 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '4,500,000',
                audio: '4. suplication.mp3'
            }
        },
        suplication3:
        {
            position: 9,
            distance: 2,
            x: 18.84,
            z: -56.07,
            rotate: 3.14159,
            object: {},
            sound: '',
            details: {
                artistName: 'Widi Wardani',
                photo: '',
                title: 'SUPLICATION III',
                meshName: 'suplication3',
                size: '50x70 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '4,500,000',
                audio: '4. suplication.mp3'
            }
        },
        suplication4:
        {
            position: 10,
            distance: 2,
            x: 20.84,
            z: -56.07,
            rotate: 3.14159,
            object: {},
            sound: '',
            details: {
                artistName: 'Widi Wardani',
                photo: '',
                title: 'SUPLICATION IV',
                meshName: 'suplication4',
                size: '50x70 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '4,500,000',
                audio: '4. suplication.mp3'
            }
        },
        suplication5:
        {
            position: 11,
            distance: 2,
            x: 22.84,
            z: -56.07,
            rotate: 3.14159,
            object: {},
            sound: '',
            details: {
                artistName: 'Widi Wardani',
                photo: '',
                title: 'SUPLICATION V',
                meshName: 'suplication5',
                size: '50x70 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '4,500,000',
                audio: '4. suplication.mp3'
            }
        },
        contrive:
        {
            position: 12,
            distance: 2,
            x: 29.17,
            z: -49.4,
            rotate: 4.71239,
            object: {},
            sound: '',
            details: {
                artistName: 'Widi Wardani',
                photo: '',
                title: 'CONTRIVE',
                meshName: 'contrive',
                size: '60x40 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '5,500,000',
                audio: '5. contrive.mp3'
            }
        },
        inunct1:
        {
            position: 13,
            distance: 2,
            x: 22,
            z: -48.64,
            rotate: 3.14159,
            object: {},
            sound: '',
            details: {
                artistName: 'Widi Wardani',
                photo: '',
                title: 'INUNCT I',
                meshName: 'inunct1',
                size: '60x80 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '6,500,000',
                audio: '6. inunct.mp3'
            }
        },
        inunct2:
        {
            position: 14,
            distance: 2,
            x: 24,
            z: -48.77,
            rotate: 3.14159,
            object: {},
            sound: '',
            details: {
                artistName: 'Widi Wardani',
                photo: '',
                title: 'INUNCT II',
                meshName: 'inunct2',
                size: '60x80 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '6,500,000',
                audio: '6. inunct.mp3'
            }
        },
        inunct3:
        {
            position: 15,
            distance: 2,
            x: 26,
            z: -48.87,
            rotate: 3.14159,
            object: {},
            sound: '',
            details: {
                artistName: 'Widi Wardani',
                photo: '',
                title: 'INUNCT III',
                meshName: 'inunct3',
                size: '60x80 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '6,500,000',
                audio: '6. inunct.mp3'
            }
        },
        inunct4:
        {
            position: 16,
            distance: 2,
            x: 28.0,
            z: -48.88,
            rotate: 3.14159,
            object: {},
            sound: '',
            details: {
                artistName: 'Widi Wardani',
                photo: '',
                title: 'INUNCT IV',
                meshName: 'inunct4',
                size: '60x80 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '6,500,000',
                audio: '6. inunct.mp3'
            }
        },
        exempt:
        {
            position: 17,
            distance: 2,
            x: -1.00,
            z: -9.0,
            rotate: 2.4,
            object: {},
            sound: '',
            details: {
                artistName: 'Widi Wardani',
                photo: '',
                title: 'EXEMPT',
                meshName: 'exempt',
                size: '100x100 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '9,000,000',
                audio: '7. ecempt.mp3'
            }
        },
        landscapeoflife5:
        {
            position: 18,
            distance: 2,
            x: 7.03,
            z: -27.99,
            rotate: 3.125,
            object: {},
            sound: '',
            details: {
                artistName: 'Sandy Tisa',
                photo: '',
                title: 'LANDSCAPE OF LIFE SERIES',
                meshName: 'landscapeoflife5',
                size: '100x100 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '8,000,000',
                audio: 'LOL_01.mp4'
            }
        },
        landscapeoflife1:
        {
            position: 19,
            distance: 2,
            x: -0.5,
            z: -30.62,
            rotate: 0,
            object: {},
            sound: '',
            details: {
                artistName: 'Sandy Tisa',
                photo: '',
                title: 'LANDSCAPE OF LIFE SERIES',
                meshName: 'landscapeoflife1',
                size: '100x60 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '7,500,000',
                audio: 'LOL_02.mp4'
            }
        },
        landscapeoflife6:
        {
            position: 20,
            distance: 2,
            x: 4,
            z: -28,
            rotate: 3.15,
            object: {},
            sound: '',
            details: {
                artistName: 'Sandy Tisa',
                photo: '',
                title: 'LANDSCAPE OF LIFE SERIES',
                meshName: 'landscapeoflife6',
                size: '125x60 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '8,000,000',
                audio: 'LOL_03.mp4'
            }
        },
        landscapeoflife4:
        {
            position: 21,
            distance: 2,
            x: 7,
            z: -30.62,
            rotate: 0,
            object: {},
            sound: '',
            details: {
                artistName: 'Sandy Tisa',
                photo: '',
                title: 'LANDSCAPE OF LIFE SERIES',
                meshName: 'landscapeoflife4',
                size: '100x80 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '8,000,000',
                audio: 'LOL_04.mp4'
            }
        },
        landscapeoflife3:
        {
            position: 22,
            distance: 2,
            x: 4.5,
            z: -30.63,
            rotate: 0,
            object: {},
            sound: '',
            details: {
                artistName: 'Sandy Tisa',
                photo: '',
                title: 'LANDSCAPE OF LIFE SERIES',
                meshName: 'landscapeoflife3',
                size: '100x80 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '8,000,000',
                audio: 'LOL_05.mp4'
            }
        },
        landscapeoflife2:
        {
            position: 23,
            distance: 2,
            x: 2,
            z: -30.77,
            rotate: 0,
            object: {},
            sound: '',
            details: {
                artistName: 'Sandy Tisa',
                photo: '',
                title: 'LANDSCAPE OF LIFE SERIES',
                meshName: 'landscapeoflife2',
                size: '100x60 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '7,500,000',
                audio: 'LOL_06.mp4'
            }
        },
        kontemplasi1:
        {
            position: 24,
            distance: 2,
            x: 21.5,
            z: -46.0,
            rotate: 0,
            object: {},
            sound: '',
            details: {
                artistName: 'Sandy Tisa',
                photo: '',
                title: 'KONTEMPLASI SERIES',
                meshName: 'kontemplasi1',
                size: '50x50 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '4,000,000',
                audio: 'KS_02.mp4'
            }
        },
        kontemplasi2:
        {
            position: 25,
            distance: 2,
            x: -1,
            z: -12.0,
            rotate: 0,
            object: {},
            sound: '',
            details: {
                artistName: 'Sandy Tisa',
                photo: '',
                title: 'KONTEMPLASI SERIES',
                meshName: 'kontemplasi2',
                size: '50x50 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '4,000,000',
                audio: 'KS_03.mp4'
            }
        },
        kontemplasi3:
        {
            position: 26,
            distance: 2,
            x: 23.5,
            z: -45.5,
            rotate: 0,
            object: {},
            sound: '',
            details: {
                artistName: 'Sandy Tisa',
                photo: '',
                title: 'KONTEMPLASI SERIES',
                meshName: 'kontemplasi3',
                size: '100x100 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '8,000,000',
                audio: 'KS_01.mp4'
            }
        },
        untitled2:
        {
            position: 27,
            distance: 2,
            x: -1.00,
            z: -30.5,
            rotate: -1.5708,
            object: {},
            sound: '',
            details: {
                artistName: 'Sandy Tisa',
                photo: '',
                title: 'UNTITLED',
                meshName: 'untitled2',
                size: '100x100 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '8,000,000',
                audio: 'UTL_01.mp4'
            }
        },
        hikayathidup2:
        {
            position: 28,
            distance: 2,
            x: 23.5,
            z: -37.30,
            rotate: 1.15,
            object: {},
            sound: '',
            details: {
                artistName: 'Sandy Tisa',
                photo: '',
                title: 'HIKAYAT POHON HIDUP SERIES',
                meshName: 'hikayathidup2',
                size: '100x60 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '7,500,000',
                audio: 'HPH_02.mp4'
            }
        },
        hikayathidup1:
        {
            position: 29,
            distance: 2,
            x: 21.5,
            z: -37.50,
            rotate: 1.25,
            object: {},
            sound: '',
            details: {
                artistName: 'Sandy Tisa',
                photo: '',
                title: 'HIKAYAT POHON HIDUP SERIES',
                meshName: 'hikayathidup1',
                size: '100x60 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '7,500,000',
                audio: 'HPH_01.mp4'
            }
        },
        untitled1:
        {
            position: 30,
            distance: 2,
            x: -1.00,
            z: -28.5,
            rotate: -1.5708,
            object: {},
            sound: '',
            details: {
                artistName: 'Sandy Tisa',
                photo: '',
                title: 'UNTITLED',
                meshName: 'untitled1',
                size: '100x80 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '8,000,000',
                audio: 'UTL_02.mp4'
            }
        },
        hikayathidup3:
        {
            position: 31,
            distance: 2,
            x: 25.5,
            z: -38.0,
            rotate: 1.05,
            object: {},
            sound: '',
            details: {
                artistName: 'Sandy Tisa',
                photo: '',
                title: 'HIKAYAT POHON HIDUP SERIES',
                meshName: 'hikayathidup3',
                size: '80x150 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '10,000,000',
                audio: 'HPH_03.mp4'
            }
        },
        kontemplasi4:
        {
            position: 32,
            distance: 2,
            x: 26,
            z: -45.6,
            rotate: 3.14159,
            object: {},
            sound: '',
            details: {
                artistName: 'Sandy Tisa',
                photo: '',
                title: 'KONTEMPLASI SERIES',
                meshName: 'kontemplasi4',
                size: '100x100 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '8,000,000',
                audio: 'KS_04.mp4'
            }
        },
        kontemplasi5:
        {
            position: 33,
            distance: 2,
            x: 28.5,
            z: -45.5,
            rotate: -1.5708,
            object: {},
            sound: '',
            details: {
                artistName: 'Sandy Tisa',
                photo: '',
                title: 'KONTEMPLASI SERIES',
                meshName: 'kontemplasi5',
                size: '70x100 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '7,000,000',
                audio: 'KS_05.mp4'
            }
        },
        baur:
        {
            position: 34,
            distance: 2,
            x: 28,
            z: -38.00,
            rotate: -0.315,
            object: {},
            sound: '',
            details: {
                artistName: 'Sandy Tisa',
                photo: '',
                title: 'BAUR',
                meshName: 'baur',
                size: '125x125 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '10,000,000',
                audio: 'BAUR.mp4'
            }
        },
        kontemplasi7:
        {
            position: 35,
            distance: 2,
            x: 28.53,
            z: -41.5,
            rotate: -1.5708,
            object: {},
            sound: '',
            details: {
                artistName: 'Sandy Tisa',
                photo: '',
                title: 'KONTEMPLASI SERIES',
                meshName: 'kontemplasi7',
                size: '100x80 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '8,000,000',
                audio: 'KS_06.mp4'
            }
        },
        kontemplasi8:
        {
            position: 36,
            distance: 2,
            x: 28.03,
            z: -38.5,
            rotate: -1.5708,
            object: {},
            sound: '',
            details: {
                artistName: 'Sandy Tisa',
                photo: '',
                title: 'KONTEMPLASI SERIES',
                meshName: 'kontemplasi8',
                size: '140x120 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '12,000,000',
                audio: 'KS_07.mp4'
            }
        },
        kontemplasi6:
        {
            position: 37,
            distance: 2,
            x: 28.53,
            z: -44.5,
            rotate: -1.5708,
            object: {},
            sound: '',
            details: {
                artistName: 'Sandy Tisa',
                photo: '',
                title: 'KONTEMPLASI SERIES',
                meshName: 'kontemplasi6',
                size: '80x100 cm',
                media: 'acrylic on kanvas',
                year: '2021',
                price: '8,000,000',
                audio: 'KS_08.mp4'
            }
        }
    }

    allSounds = []
    constructor(scene, renderer) {
        this.loadingManager = new LoadingManager();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/'); // use a full url path
        // dracoLoader.setDecoderPath('/draco/'); 

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

                // that.scene.background = envMap;
                that.scene.environment = envMap;

                texture.dispose();
                pmremGenerator.dispose();

                that.renderer.render(that.scene, that.scene.camera);
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
                for (let i = 0; i < object.scene.children.length; i++) {
                    self.allMeshes.push(object.scene.children[i])
                }
            }
            if (storePainting) {
                for (let i = 0; i < object.scene.children.length; i++) {
                    // console.log('fixing',  self.allPaintingsDict[object.scene.children[i].name]);
                    // console.log( 'object length', object.scene.children.length)w
                    if(typeof self.allPaintingsDict[object.scene.children[i].name] !== 'undefined'){
                        self.allPaintingsDict[object.scene.children[i].name].object = object.scene.children[i]
                    }
                }
                document.dispatchEvent(new Event("paintingsLoaded"))
            }
        });

    }

    loadAudio(sounds) {
        this.allSounds = []
        for (let i = 0; i < sounds.length; i++) {
            const sound = new Howl({
                src: sounds[i]
            })

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
                    this.allPaintingsDict.kontemplasi2.sound = sound
                    break
                }
                case 13: {
                    this.allPaintingsDict.kontemplasi3.sound = sound
                    break
                }
                case 14: {
                    this.allPaintingsDict.kontemplasi4.sound = sound
                    break
                }
                case 15: {
                    this.allPaintingsDict.kontemplasi5.sound = sound
                    break
                }
                case 16: {
                    this.allPaintingsDict.kontemplasi6.sound = sound
                    break
                }
                case 17: {
                    this.allPaintingsDict.kontemplasi7.sound = sound
                    break
                }
                case 18: {
                    this.allPaintingsDict.kontemplasi8.sound = sound
                    break
                }
                case 19: {
                    this.allPaintingsDict.landscapeoflife1.sound = sound
                    break
                }
                case 20: {
                    this.allPaintingsDict.landscapeoflife2.sound = sound
                    break
                }
                case 21: {
                    this.allPaintingsDict.landscapeoflife3.sound = sound
                    break
                }
                case 22: {
                    this.allPaintingsDict.landscapeoflife4.sound = sound
                    break
                }
                case 23: {
                    this.allPaintingsDict.landscapeoflife5.sound = sound
                    break
                }
                case 24: {
                    this.allPaintingsDict.landscapeoflife6.sound = sound
                    break
                }
                case 25: {
                    this.allPaintingsDict.untitled1.sound = sound
                    break
                }
                case 26: {
                    console.log(sound)
                    this.allPaintingsDict.untitled2.sound = sound
                    break
                }
                default:
                    break
            }
        }
    }



    setUpLoadManager() {
        this.loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
            console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
        };
        this.loadingManager.onLoad = () => {
            // const event = new Event(this.onModelLoadEventName);
            // document.dispatchEvent(event)
        };
        this.loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
            console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
            const progress = (itemsLoaded / itemsTotal * 100);
            window.$nuxt.$emit('LOADING-SCENE', { itemsLoaded, itemsTotal, progress });
        };
        this.loadingManager.onError = (url) => {
            console.log('There was an error loading ' + url);
        };
    }



}
