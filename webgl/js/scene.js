import * as THREE from 'three';
// eslint-disable-next-line import/no-named-as-default
import gsap from "gsap";
import { CameraControls } from './CameraControls';
import { ControlEvents } from './ControlEvents';
// eslint-disable-next-line import/namespace
import { Loader } from './loader'


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
    movieMesh1
    movieMesh2
    pointerdownCount = 0
    mouseRaycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    videoAudio = true

    constructor(options) {
        this.container = options.dom;
        this.scene = new THREE.Scene();
        //  set scene bg color

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
                for (let i = 0; i < self.loader.allMeshes.length; i++) {
                    if (self.loader.allMeshes[i].name === "gallery_lcd") {
                        self.loader.allMeshes[i].children[1].material = movieMaterial
                        self.movieMesh1 = self.loader.allMeshes[i].children[1]
                    }
                    if (self.loader.allMeshes[i].name === "rotunda_lcd") {
                        self.loader.allMeshes[i].children[1].material = movieMaterial
                        self.movieMesh2 = self.loader.allMeshes[i].children[1]
                    }
                }
                self.video.play();
                self.videoIsPlaying = true
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
            console.log("POINTERDOWN")
            self.mouse.x = (evt.clientX / window.innerWidth) * 2 - 1;
            self.mouse.y = - (evt.clientY / window.innerHeight) * 2 + 1;
            self.pointerdownCount++
            setTimeout(() => {
                self.pointerdownCount = 0
            }, 500)
            if (self.pointerdownCount >= 2) {
                self.mouseRaycaster.setFromCamera(self.mouse, self.camera);
                const intersects = self.mouseRaycaster.intersectObjects(self.scene.children);
                if (intersects[0].object === self.loader.allMeshes[self.loader.allMeshes.length - 1].children[8] || intersects[0].object === self.loader.allMeshes[self.loader.allMeshes.length - 1].children[9] || intersects[0].object === self.loader.allMeshes[self.loader.allMeshes.length - 2]) {
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
        const isMobile = this.mobileAndTabletCheck()
        if (isMobile) {
            this.controls.addMobileEvents()
        }
        else {
            this.controls.addDesktopEvents()
        }


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

            if (this.video !== undefined && this.videoImageContext !== undefined) {
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
        this.mouse.x = (evt.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = - (evt.clientY / window.innerHeight) * 2 + 1;

        this.mouseRaycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.mouseRaycaster.intersectObjects(this.scene.children);
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
            const dist1 = this.camera.position.distanceToSquared(this.movieMesh1.parent.position)
            const dist2 = this.camera.position.distanceToSquared(this.movieMesh2.parent.position)
            if (dist1 * 0.03 >= 0 && dist1 * 0.03 <= 1) {
                this.video.volume = 1 - (dist1 * 0.03)
            }
            else if(dist2 * 0.03 >= 0 && dist2 * 0.03 <= 1){
                this.video.volume = 1 - (dist2 * 0.03)
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

    mobileAndTabletCheck() {
        // eslint-disable-next-line
        let check = false;
        // eslint-disable-next-line
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return false;
    };

}

export default SceneInit;
