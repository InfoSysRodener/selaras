import * as THREE from 'three';
// eslint-disable-next-line import/no-named-as-default
import gsap from "gsap";
import { CameraControls } from './CameraControls';
import { ControlEvents } from './ControlEvents';
// eslint-disable-next-line import/namespace
import { Loader } from './loader'
import { Color } from 'three';


class SceneInit {

    shouldRender = false
    renderTime = 1
    arr = []
    currentSound
    bgMusic
    controlOn = true
    collisionOn = true
    yRaycaster
    video
    videoTexture
    videoImageContext
    videoIsPlaying = false
    movieMesh
    pointerdownCount = 0
    mouseRaycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    videoAudio = true

    constructor(options) {
        this.container = options.dom;
        this.scene = new THREE.Scene();
        //set scene bg color
        this.scene.background = new THREE.Color(0xffffff)

        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;

        this.camera = new THREE.PerspectiveCamera(
            45,
            this.width / this.height,
            0.1,
            100000
        );
        this.camera.position.x = -2
        this.camera.position.y = 1.5
        this.camera.position.z = 1


        const geometry = new THREE.BoxGeometry(1, 0.5, 1);
        const material = new THREE.MeshBasicMaterial();
        this.collCube = new THREE.Mesh(geometry, material);
        this.collCube.position.copy(this.camera.position)
        this.scene.add(this.collCube);

        const geometryExit = new THREE.BoxGeometry(1, 7, 5);
        const materialExit = new THREE.MeshBasicMaterial();
        const exitCube = new THREE.Mesh(geometryExit, materialExit);
        exitCube.visible = false
        this.scene.add(exitCube);
        exitCube.position.set(-12, 0, 0)

        const geometryExit2 = new THREE.BoxGeometry(12, 5, 1);
        const exitCube2 = new THREE.Mesh(geometryExit2, materialExit);
        exitCube2.rotateOnAxis(new THREE.Vector3(0, 1, 0), 1.2)
        exitCube2.visible = false
        this.scene.add(exitCube2);
        exitCube2.position.set(17.778081426688274, 2.203651356697083, -30.044229785896388)

        const geometryExit3 = new THREE.BoxGeometry(1, 7, 7.5);
        const exitCube3 = new THREE.Mesh(geometryExit3, materialExit);
        exitCube3.visible = false
        this.scene.add(exitCube3);
        exitCube3.position.set(0, 0, 0)

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMapSoft = true;
        this.container.appendChild(this.renderer.domElement);

        this.yRaycaster = new THREE.Raycaster(this.camera.position, new THREE.Vector3(0, -1, 0))


        const light = new THREE.AmbientLight(0x404040, 4);
        this.scene.add(light)

        window.addEventListener('resize', this.onResize.bind(this));

        this.cameraControls = new CameraControls(this.camera)

        this.addLoader();
        this.addObjects();
        this.addSounds()
        this.addControls()
        this.animate();

        this.lastCorrectPos = this.camera.position.clone()

        this.collisionInterval = setInterval(() => {
            if (this.checkCollision() && this.collisionOn) {
                this.controlOn = false
                gsap.to(this.camera.position,
                    {
                        x: this.lastCorrectPos.x, z: this.lastCorrectPos.z, duration: 1,
                        onComplete: () => {
                            this.controlOn = true
                        }
                    })
            }
            else {
                this.lastCorrectPos = this.camera.position.clone()
            }
            this.checkYColl()
            if (this.videoIsPlaying) {
                this.checkVideoDistance()
            }
        }, 100)

        const self = this

        document.addEventListener('paintingsLoaded', () => {
            this.loader.allMeshes.push(exitCube)
            this.loader.allMeshes.push(exitCube2)
            this.loader.allMeshes.push(exitCube3)
            this.video = document.createElement('video');
            this.video.src = "https://selaras-assets.s3.ap-southeast-1.amazonaws.com/selarasvideo+(2).mp4";
            this.video.loop = true;
            this.video.volume = 1
            this.video.crossOrigin = "anonymous"
            this.video.load();
            this.video.oncanplay = () => {
                const videoImage = document.createElement('canvas');
                videoImage.width = self.video.videoWidth;
                videoImage.height = self.video.videoHeight;

                self.videoImageContext = videoImage.getContext('2d');
                self.videoImageContext.fillStyle = '#000000';
                self.videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);

                self.videoTexture = new THREE.Texture(videoImage);
                self.videoTexture.minFilter = THREE.LinearFilter;
                self.videoTexture.magFilter = THREE.LinearFilter;
                self.videoTexture.mapping = THREE.UVMapping
                self.videoTexture.flipY = true
                self.videoTexture.wrapS = THREE.RepeatWrapping;
                self.videoTexture.repeat.x = - 1;

                const movieMaterial = new THREE.MeshBasicMaterial({ map: self.videoTexture });
                self.loader.allMeshes[0].children[1].material = movieMaterial
                self.loader.allMeshes[0].children[1].userData.ingore = true
                self.movieMesh = new THREE.Mesh(geometry, material);
                self.movieMesh.userData.ingore = true
                self.movieMesh.position.set(self.loader.allMeshes[0].position.x, 2, -7.25)
                self.movieMesh.visible = false
                self.scene.add(self.movieMesh);

                self.video.play();
                self.videoIsPlaying = true
                console.log(this.scene.children)
            }


            self.sortJsObject(self.loader.allPaintingsDict)
            self.showcaseTimeline(self.loader.allPaintingsDict)
            self.arr = Object.values(self.showcase)
            setTimeout(() => {
                for (let i = 0; i < self.loader.allSounds.length; i++) {
                    if (self.loader.allSounds[i].index === 27) {
                        self.bgMusic = self.loader.allSounds[i].soundObj
                        self.bgMusic.loop(true)
                        self.bgMusic.play();
                    }
                }
            }, 1000)
        })

        document.addEventListener('pointerdown', (evt) => {
            if (evt.target.tagName === 'CANVAS') {
                self.setTarget(evt, self.loader.allPaintingsDict)
            }
        })

        document.addEventListener("playSound", () => {
            if (self.currentObj.sound !== '') {
                if (self.currentSound) {
                    self.currentSound.stop();
                    window.$nuxt.$emit('CHANGE-PLAY-SOUND-EVENT', 'stop');
                }
                self.bgMusic.volume(0.25)
                self.video.volume = 0
                self.videoAudio = false
                self.currentSound = self.currentObj.sound
                self.currentSound.play();
                self.currentSound.once("end", () => {
                    // document.dispatchEvent("stopCurrentSound");
                    window.$nuxt.$emit('CHANGE-PLAY-SOUND-EVENT', 'stop');
                })

                // the selected painting sounds play event
                window.$nuxt.$emit('CHANGE-PLAY-SOUND-EVENT', 'playing');

                gsap.delayedCall(self.currentSound.duration(), () => {
                    self.bgMusic.volume(1)
                    self.videoAudio = true
                })
            }
        })

        document.addEventListener("moveFoward", () => {
            this.controls.moveForward = true
        })
        document.addEventListener("moveRight", () => {
            this.controls.moveRight = true
        })
        document.addEventListener("moveBackwards", () => {
            this.controls.moveBackward = true
        })
        document.addEventListener("moveLeft", () => {
            this.controls.moveLeft = true
        })

        document.addEventListener("pointerup", () => {
            this.controls.moveForward = false
            this.controls.moveRight = false
            this.controls.moveBackward = false
            this.controls.moveLeft = false
        })

        document.addEventListener("pauseCurrentSound", () => {
            if (self.currentSound) {
                self.currentSound.pause();
                self.bgMusic.volume(1)
                self.videoAudio = true
                window.$nuxt.$emit('CHANGE-PLAY-SOUND-EVENT', 'pause');
            }
        });

        document.addEventListener("resumeCurrentSound", () => {
            if (self.currentSound) {
                this.currentSound.play();
                self.bgMusic.volume(0.25)
                self.video.volume = 0
                self.videoAudio = false
                window.$nuxt.$emit('CHANGE-PLAY-SOUND-EVENT', 'playing');
            }
        })

        document.addEventListener("stopCurrentSound", () => {
            if (self.currentSound) {
                this.currentSound.stop();
                self.bgMusic.volume(1)
                self.videoAudio = true
                window.$nuxt.$emit('CHANGE-PLAY-SOUND-EVENT', 'stop');
            }
        })

        document.addEventListener("fullscreen", () => {
            this.fullScreen();
        })

        document.addEventListener("pointerdown", (evt) => {
            self.mouse.x = (evt.clientX / window.innerWidth) * 2 - 1;
            self.mouse.y = - (evt.clientY / window.innerHeight) * 2 + 1;
            self.pointerdownCount++
            setTimeout(() => {
                self.pointerdownCount = 0
            }, 500)
            if (self.pointerdownCount >= 2) {
                self.mouseRaycaster.setFromCamera(self.mouse, self.camera);
                const intersects = self.mouseRaycaster.intersectObjects(self.scene.children);
                if (intersects[0].object === self.loader.allMeshes[self.loader.allMeshes.length-1].children[8] || intersects[0].object === self.loader.allMeshes[self.loader.allMeshes.length-1].children[9] || intersects[0].object === self.loader.allMeshes[self.loader.allMeshes.length-2]) {
                    gsap.to(self.camera.position, {
                        x: intersects[0].point.x,
                        z: intersects[0].point.z,
                        duration: 1
                    })
                }
            }
        })

        // default listener
        this.container.addEventListener('fullscreenchange', (event) => {
            if (document.fullscreenElement) {
                window.$nuxt.$emit('FULLSCREEN-EVENT', true);
            } else {
                window.$nuxt.$emit('FULLSCREEN-EVENT', false);
            }
        });


        document.addEventListener('disposeAll', () => {
            this.dispose();
            console.log('disposed');
        });

        this.showcase = []
        this.currentObj = {}
    }

    addLoader() {
        this.loader = new Loader(this.scene, this.renderer);
    }

    addObjects() {
        this.loader.loadModel('artPaintings.glb', false, true);
        this.loader.loadModel('artSpace.glb', true);
        this.loader.loadModel('artSpaceLCD.glb', true);
    }

    addSounds() {
        const sounds = [
            '/3D/sounds/1.general_idea.mp3',
            '/3D/sounds/2.subjection.mp3',
            '/3D/sounds/3.sentient.mp3',
            '/3D/sounds/4.suplication.mp3',
            '/3D/sounds/5.contrive.mp3',
            '/3D/sounds/6.inunct.mp3',
            '/3D/sounds/7.exempt.mp3',
            '/3D/sounds/BAUR.mp3',
            '/3D/sounds/HPH_01.mp3',
            '/3D/sounds/HPH_02.mp3',
            '/3D/sounds/HPH_03.mp3',
            '/3D/sounds/KS_01.mp3',
            '/3D/sounds/KS_02.mp3',
            '/3D/sounds/KS_03.mp3',
            '/3D/sounds/KS_04.mp3',
            '/3D/sounds/KS_05.mp3',
            '/3D/sounds/KS_06.mp3',
            '/3D/sounds/KS_07.mp3',
            '/3D/sounds/KS_08.mp3',
            '/3D/sounds/LOL_01.mp3',
            '/3D/sounds/LOL_02.mp3',
            '/3D/sounds/LOL_03.mp3',
            '/3D/sounds/LOL_04.mp3',
            '/3D/sounds/LOL_05.mp3',
            '/3D/sounds/LOL_06.mp3',
            '/3D/sounds/UTL_01.mp3',
            '/3D/sounds/UTL_02.mp3',
            '/3D/sounds/Selaras_Solo_Piano.wav'
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
            this.animFrame = requestAnimationFrame(animate);
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
            this.yRaycaster.set(this.camera.position, new THREE.Vector3(0, -1, 0))

            if (this.video !== undefined) {
                if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
                    this.videoImageContext.drawImage(this.video, 0, 0);
                    if (this.videoTexture)
                        this.videoTexture.needsUpdate = true;
                }

            }
            this.renderer.render(this.scene, this.camera);
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
            if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() &&
                collisionResults[0].object.name !== "Cube085" &&
                collisionResults[0].object.name !== "Cube085_1") {
                vert = null
                r = null
                return true;
            }

        }
    }

    showcaseTimeline(dict) {
        const self = this
        for (const key in dict) {
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
        document.dispatchEvent(new Event("stopCurrentSound"))
        this.currentObj = target
        gsap.to(this.camera.position, {
            x: target.x, z: target.z, duration: 2,
            onComplete: () => {
                this.collisionOn = true
                this.camera.lookAt(target.object.position);
                // // backup original rotation
                // const startRotation = new THREE.Euler().copy(this.camera.rotation);

                // // final rotation (with lookAt)
                // this.camera.lookAt(target.object.position);
                // const endRotation = new THREE.Euler().copy(this.camera.rotation);

                // // revert to original rotation
                // this.camera.rotation.copy(startRotation);

                // gsap.to(this.camera.rotation, {
                //     x: endRotation.x,
                //     y: endRotation.y,
                //     z: endRotation.z,
                //     duration: 2,
                // })

                // make stay the painting view
                window.$nuxt.$emit('CHANGE-MENU-VIEW-EVENT', 'painting-view');
            }
        })

        for (let i = 0; i < this.arr.length; i++) {
            if (this.arr[i].object.name === target.object.name) {
                window.$nuxt.$emit('CHANGE-MENU-VIEW-EVENT', 'painting-view');
                window.$nuxt.$emit('SELECTED-PAINTING-EVENT', target.details);
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
                    this.collisionOn = false
                    this.goTo(dict[key])
                }
            }
        }
        else if (this.currentSound !== this.bgMusic) {
            this.currentSound = this.bgMusic
            this.currentSound.play()
        }
        else {
            this.collisionOn = true
        }
    }

    checkYColl() {
        const collisionResults = this.yRaycaster.intersectObjects(this.loader.allMeshes);
        if (collisionResults.length > 0) {
            if (collisionResults[0].object.userData.ingore !== true) {
                this.camera.position.y += 1.65 - collisionResults[0].distance
            }
        }

    }

    checkVideoDistance() {
        if (this.videoAudio) {
            const dist = this.camera.position.distanceToSquared(this.movieMesh.position)
            if (dist * 0.03 >= 0 && dist * 0.03 <= 1) {
                this.video.volume = 1 - (dist * 0.03)
            }
            else {
                this.video.volume = 0
            }
        }
    }

    moveBackCamera() {
        document.dispatchEvent(new Event("stopCurrentSound"));

        const oldPos = new THREE.Vector3().copy(this.camera.position)
        const v = new THREE.Vector3()
        v.setFromMatrixColumn(this.camera.matrix, 0);

        v.crossVectors(this.camera.up, v);

        this.camera.position.addScaledVector(v, -1)
        const newPos = new THREE.Vector3().copy(this.camera.position);
        this.camera.position.copy(oldPos)

        gsap.to(this.camera.position, {
            x: newPos.x, y: newPos.y, z: newPos.z,
            duration: 1
        })
    }

    dispose() {
        clearInterval(this.collisionInterval)

        // stop sounds
        for (let i = 0; i < this.loader.allSounds.length; i++) {
            this.loader.allSounds[i].soundObj.stop()
        }

        this.video.pause()
        this.video.removeAttribute('src'); // empty source
        this.video.load();


        const cleanMaterial = material => {
            // dispose material
            material.dispose()

            // dispose textures
            for (const key of Object.keys(material)) {
                const value = material[key]
                if (value && typeof value === 'object' && 'minFilter' in value) {
                    value.dispose()
                }
            }
        }
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
        for (let i = 0; i < gsap.globalTimeline.getChildren().length; i++) {
            gsap.globalTimeline.children[i].kill()
        }

        this.scene = null
        this.camera = null
        this.renderer && this.renderer.renderLists.dispose()
        this.renderer = null

        cancelAnimationFrame(this.animFrame)
    }

    fullScreen() {
        const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

        if (!fullscreenElement) {
            if (this.container.requestFullscreen) {
                this.container.requestFullscreen();
                window.$nuxt.$emit('FULLSCREEN-EVENT', true);
            } else if (this.container.webkitRequestFullscreen) {
                this.container.webkitRequestFullscreen();
                window.$nuxt.$emit('FULLSCREEN-EVENT', true);
            }

            window.$nuxt.$emit('FULLSCREEN-EVENT', true);
        }
        else {
            // eslint-disable-next-line no-lonely-if
            if (document.exitFullscreen) {
                document.exitFullscreen();
                window.$nuxt.$emit('FULLSCREEN-EVENT', false);
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
                window.$nuxt.$emit('FULLSCREEN-EVENT', false);
            }


        }
    }

}

export default SceneInit;
