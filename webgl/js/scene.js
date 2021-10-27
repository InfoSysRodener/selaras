import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// eslint-disable-next-line import/no-named-as-default
import gsap from "gsap";
import { CameraControls } from './CameraControls';
import { ControlEvents } from './ControlEvents';
import { Loader } from './loader'


class SceneInit {

    shouldRender = false
    renderTime = 1
    arr = []
    currentSound
    bgMusic
    controlOn = true

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
        this.addSounds()
        this.addControls()
        this.animate();

        this.lastCorrectPos = this.camera.position.clone()

        this.collisionInterval = setInterval(() => {
            if (this.checkCollision()) {
                // this.camera.position.copy(this.lastCorrectPos)
                this.controlOn = false
                gsap.to(this.camera.position,
                     {x: this.lastCorrectPos.x, z: this.lastCorrectPos.z, duration: 1,
                        onUpdate: () => {
                            this.needToRender(60)
                        },
                        onComplete: () => {
                            this.controlOn = true
                        }
                    })
            }
            else {
                this.lastCorrectPos = this.camera.position.clone()
            }
        }, 100)
        this.needToRender(100)

        const self = this

        document.addEventListener('onModelLoad', () => {
            self.sortJsObject(self.loader.allPaintingsDict)
            self.showcaseTimeline(self.loader.allPaintingsDict)
            self.arr = Object.values(self.showcase)

            setTimeout(() => {
                for (let i = 0; i < self.loader.allSounds.length; i++) {
                    if (self.loader.allSounds[i].index === 7) {
                        self.currentSound = self.loader.allSounds[i].soundObj
                        self.currentSound.play()
                        self.bgMusic = self.loader.allSounds[i].soundObj
                    }
                }
            }, 1000)
        })

        document.addEventListener('pointerdown', (evt) => {
            self.setTarget(evt, self.loader.allPaintingsDict)
        })

        document.addEventListener("clickPrevious", () => {
            self.goTo(self.previousObj)
        })

        document.addEventListener("clickNext", () => {
            self.goTo(self.nextObj)
        })

        this.showcase = []
        this.nextObj = {}
        this.previousObj = {}

    }

    addLoader() {
        this.loader = new Loader(this.scene, this.renderer);
    }

    addObjects() {
        // this.loader.loadModel('artSpace.glb', true);
        this.loader.loadModel('artSpace-v2.glb', true);
        // this.loader.loadModel('artSpaceCol.glb', true)
        this.loader.loadModel('artPaintings.glb', false, true);
        // this.loader.loadModel('profileBoards.glb');
    }

    addSounds() {
        const sounds = [
            '/3D/1.general_idea.mp3',
            '/3D/2.subjection.mp3',
            '/3D/3.sentient.mp3',
            '/3D/4.suplication.mp3',
            '/3D/5.contrive.mp3',
            '/3D/6.inunct.mp3',
            '/3D/7.exempt.mp3',
            '/3D/Selaras_Solo_Piano.wav'
        ]
        this.loader.loadAudio(sounds)
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
                if (this.controls.moveForward && this.controlOn) {
                    y += 1
                }
                if (this.controls.moveBackward && this.controlOn) {
                    y -= 1
                }
                if (this.controls.moveLeft && this.controlOn) {
                    x += 1
                }
                if (this.controls.moveRight && this.controlOn) {
                    x -= 1
                }
                if (x !== 0 || y !== 0 && this.controlOn) {
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

    showcaseTimeline(dict) {
        const self = this
        for (const key in dict) {
            // const t = gsap.to(this.camera.position, {
            //     x: dict[key].object.position.x, z: dict[key].object.position.z, duration: 10,
            //     onUpdate: () => {
            //         self.needToRender(60)
            //     }
            // })
            self.showcase.push(dict[key])
        }
    }

    sortJsObject(dict) {
        const keys = [];
        for (const key in dict) {
            keys[keys.length] = key;
        }

        const values = [];

        for (let i = 0; i < keys.length; i++) {
            values[values.length] = dict[keys[i]];
        }

        // const sortedValues = values.sort(this.sortNumber);
    }

    sortNumber(a, b) {
        return a - b;
    }

    goTo(target) {
        
      

        const self = this
        if (target.sound !== '') {
            self.currentSound = target.sound.play()
            self.currentSound.play()
        }
        gsap.to(this.camera.position, {
            x: target.x, z: target.z, duration: 2,
            onUpdate: () => {
                self.needToRender(60)
            },
        })

        gsap.to(this.camera.rotation, {
            y: target.rotate, duration: 2,
        })

        console.log('targetArray',this.arr);
        for (let i = 0; i < this.arr.length; i++) {
            if (JSON.stringify(this.arr[i].object) === JSON.stringify(target)) {
                if (i < this.arr.length - 1) {
                    this.nextObj = this.arr[i + 1]
                }
                if (i > 0) {
                    this.previousObj = this.arr[i - 1]
                }
                console.log(target);
                window.$nuxt.$store.dispatch('paintings/selected', target);
            }
        }
    }

    setTarget(evt, dict) {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        mouse.x = (evt.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (evt.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, this.camera);
        const intersects = raycaster.intersectObjects(this.scene.children);
        if (intersects[0]) {
            for (const key in dict) {
                if (intersects[0].object === dict[key].object.children[0]) {
                    this.goTo(dict[key])
                }
            }
        }
        else if (this.currentSound !== this.bgMusic) {
            this.currentSound = this.bgMusic
            this.currentSound.play()
        }
    }

    dispose() {
        clearInterval(this.collisionInterval)

        this.scene.traverse(object => {
            if (!object.isMesh) return

            // dispose geometry
            object.geometry.dispose()

            if (object.material.isMaterial) {
                cleanMaterial(object.material)
            } else {
                // an array of materials
                for (const material of object.material) cleanMaterial(material)
            }
        })

        const cleanMaterial = material => {
            // dispose material
            material.dispose()

            // dispose textures
            for (const key of Object.keys(material)) {
                const value = material[key]
                if (value && typeof value === 'object' && 'minFilter' in value) {
                    console.log('dispose texture!')
                    value.dispose()
                }
            }
        }

        for(let i = 0; i < gsap.globalTimeline.children.length; i++){
            gsap.globalTimeline.children[i].kill()
        }
    }

}

export default SceneInit;
