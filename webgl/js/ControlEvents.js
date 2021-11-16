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
    }

    addMobileEvents() {
        let thisPoint, lastPoint
        document.getElementById("threeDiv").addEventListener("touchstart", (event) => {
            console.log(event.target);
            if (event.target.tagName === 'CANVAS') {
                lastPoint = new Vector2(event.targetTouches[0].clientX, event.targetTouches[0].clientY)
            }

        })
        document.getElementById("threeDiv").addEventListener("touchmove", (event) => {
            if (event.target.tagName === 'CANVAS') {
                if (event.targetTouches.length === 1) {
                    thisPoint = new Vector2(event.targetTouches[0].clientX, event.targetTouches[0].clientY)
                    this.camera.forwardRotationScalar = (thisPoint.x - lastPoint.x) / 100;
                    this.camera.sideRotationScalar = (thisPoint.y - lastPoint.y) / 30000;
                    event.preventDefault()
                }
            }
        })

        document.getElementById("threeDiv").addEventListener("touchend", (event) => {
            this.camera.forwardRotationScalar = 0;
            this.camera.sideRotationScalar = 0;
        })
    }

    addDesktopEvents() {
        const self = this
        document.getElementById("threeDiv").addEventListener('mousedown', (evt) => {
            if (evt.target.tagName === 'CANVAS') {
                self.camera.setInitPointRotate(evt.clientX, evt.clientY)
                self.mouseDown = true
            }
        })

        document.getElementById("threeDiv").addEventListener('mousemove', (evt) => {
            if (self.mouseDown === true) {
                self.camera.rotateMouse(evt.clientX)
                self.camera.rotateVerticalMouse(evt.clientY)
                self.camera.setInitPointRotate(evt.clientX, evt.clientY)
            }
        })

        document.getElementById("threeDiv").addEventListener('mouseleave', (evt) => {
            self.mouseDown = false
        })

        const onKeyDown = (event) => {

            switch (event.code) {

                case 'ArrowUp':
                case 'KeyW':
                    this.moveForward = true;
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    this.moveLeft = true;
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    this.moveBackward = true;
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    this.moveRight = true;
                    break;
            }

        };

        const onKeyUp = (event) => {

            switch (event.code) {

                case 'ArrowUp':
                case 'KeyW':
                    this.moveForward = false;
                    window.$nuxt.$emit('CHANGE-MENU-VIEW-EVENT', 'menu-view');
                    document.dispatchEvent(new Event("stopCurrentSound"))
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    this.moveLeft = false;
                    window.$nuxt.$emit('CHANGE-MENU-VIEW-EVENT', 'menu-view');
                    document.dispatchEvent(new Event("stopCurrentSound"))
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    this.moveBackward = false;
                    window.$nuxt.$emit('CHANGE-MENU-VIEW-EVENT', 'menu-view');
                    document.dispatchEvent(new Event("stopCurrentSound"))
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    this.moveRight = false;
                    window.$nuxt.$emit('CHANGE-MENU-VIEW-EVENT', 'menu-view');
                    document.dispatchEvent(new Event("stopCurrentSound"))
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