import nipplejs from "nipplejs"
import { Vector2 } from 'three'

export class ControlEvents {

    camera
    joystick
    touchDown = false
    mouseDown = false
    moveForward = false
    moveBackward = false
    moveLeft = false
    moveRight = false

    constructor(camera, scene) {
        this.camera = camera
        this.scene = scene
        this.joystick = nipplejs.create({
            zone: document.getElementById('controlsDiv'),
            mode: 'static',
            position: { left: '90%', top: '85%' },
            color: 'gray'
        });
    }

    addMobileEvents() {
        const self = this
        this.joystick.on("move", (evt, data) => {
            if (this.touchDown) {
                self.camera.forwardMovementScalar = data.vector.y / 10
                self.camera.sideMovementScalar = data.vector.x / 10
            }
            this.scene.needToRender(100)
        })

        this.joystick.on("start", () => {
            this.touchDown = true
            this.scene.needToRender(5)
        })

        this.joystick.on("end", () => {
            this.touchDown = false
            self.camera.forwardMovementScalar = 0
            self.camera.sideMovementScalar = 0
        })
        let thisPoint, lastPoint
        document.getElementById("threeDiv").addEventListener("touchstart", (event) => {
            lastPoint = new Vector2(event.targetTouches[0].clientX, event.targetTouches[0].clientY)
            this.scene.needToRender(5)
        })
        document.getElementById("threeDiv").addEventListener("touchmove", (event) => {
            if (event.targetTouches.length === 1) {
                thisPoint = new Vector2(event.targetTouches[0].clientX, event.targetTouches[0].clientY)
                this.camera.forwardRotationScalar = (thisPoint.x - lastPoint.x) / 100;
                this.camera.sideRotationScalar = (thisPoint.y - lastPoint.y) / 30000;
                this.scene.needToRender(100)
                event.preventDefault()
            }
        })

        document.getElementById("threeDiv").addEventListener("touchend", () => {
            this.camera.forwardRotationScalar = 0;
            this.camera.sideRotationScalar = 0;
        })
    }

    addDesktopEvents() {
        const self = this
        document.getElementById("threeDiv").addEventListener('mousedown', (evt) => {
            self.camera.setInitPointRotate(evt.clientX, evt.clientY)
            self.mouseDown = true
            this.scene.needToRender(60)
        })

        document.getElementById("threeDiv").addEventListener('mousemove', (evt) => {
            if (self.mouseDown === true) {
                self.camera.rotateMouse(evt.clientX)
                self.camera.rotateVerticalMouse(evt.clientY)
                self.camera.setInitPointRotate(evt.clientX, evt.clientY)
                this.scene.needToRender(100)
            }
        })

        const onKeyDown = (event) => {

            switch (event.code) {

                case 'ArrowUp':
                case 'KeyW':
                    this.moveForward = true;
                    this.scene.needToRender(100)
                    window.$nuxt.$emit('MENU-VIEW-EVENT','menu-view');
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    this.moveLeft = true;
                    this.scene.needToRender(100)
                    window.$nuxt.$emit('MENU-VIEW-EVENT','menu-view');
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    this.moveBackward = true;
                    this.scene.needToRender(100)
                    window.$nuxt.$emit('MENU-VIEW-EVENT','menu-view');
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    this.moveRight = true;
                    this.scene.needToRender(100)
                    window.$nuxt.$emit('MENU-VIEW-EVENT','menu-view');
                    break;
            }

        };

        const onKeyUp = (event) => {

            switch (event.code) {

                case 'ArrowUp':
                case 'KeyW':
                    this.moveForward = false;
                    this.scene.needToRender(5)
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    this.moveLeft = false;
                    this.scene.needToRender(5)
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    this.moveBackward = false;
                    this.scene.needToRender(5)
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    this.moveRight = false;
                    this.scene.needToRender(5)
                    break;

            }

        };

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);

        document.getElementById("threeDiv").addEventListener('mouseup', () => {
            self.mouseDown = false
        })

        document.getElementById("threeDiv").addEventListener("contextmenu", function (e) {
            e.preventDefault();
        }, false);
    }
}