import nipplejs from "nipplejs"
import { Vector2 } from 'three'

export class ControlEvents {

    camera
    joystick
    touchDown = false
    mouseDown = false

    constructor(camera) {
        this.camera = camera
        this.joystick = nipplejs.create({
            zone: document.getElementById('controlsDiv'),
            mode: 'static',
            position: { left: '90%', top: '90%' },
            color: 'red'
        });
    }

    addMobileEvents() {
        const self = this
        this.joystick.on("move", (evt, data) => {
            if (this.touchDown) {
                console.log(data)
                self.camera.forwardMovementScalar = data.vector.y / 10
                self.camera.sideMovementScalar = data.vector.x / 10
            }
        })

        this.joystick.on("start", () => {
            this.touchDown = true
        })

        this.joystick.on("end", () => {
            this.touchDown = false
            self.camera.forwardMovementScalar = 0
            self.camera.sideMovementScalar = 0
        })
        let thisPoint, lastPoint
        document.getElementById("threeDiv").addEventListener("touchstart", (event) => {
            lastPoint = new Vector2(event.targetTouches[0].clientX, event.targetTouches[0].clientY)
        })
        document.getElementById("threeDiv").addEventListener("touchmove", (event) => {
            if (event.targetTouches.length === 1) {
                thisPoint = new Vector2(event.targetTouches[0].clientX, event.targetTouches[0].clientY)
                this.camera.forwardRotationScalar = (thisPoint.x - lastPoint.x) / 100;
                this.camera.sideRotationScalar = (thisPoint.y - lastPoint.y) / 30000;

                event.preventDefault()
            }
        })

        document.getElementById("threeDiv").addEventListener("touchend", () => {
            this.camera.forwardRotationScalar = 0;
            this.camera.sideRotationScalar = 0;
        })
    }

    addDesktopEvents(){
        const self = this
        document.getElementById("threeDiv").addEventListener('mousedown', (evt) => {
            self.camera.setInitPoint(evt.clientX/10, evt.clientY/10)
            self.camera.setInitPointRotate(evt.clientX, evt.clientY)
            self.mouseDown = true
        })

        document.getElementById("threeDiv").addEventListener('mousemove', (evt) => {
            if (evt.buttons === 1 && self.mouseDown === true) {
                self.camera.move(evt.clientX/10, evt.clientY/10)
                self.camera.setInitPoint(evt.clientX/10, evt.clientY/10)
            } else if (evt.buttons  === 2 && self.mouseDown === true) {
                self.camera.rotateMouse(evt.clientX)
                self.camera.rotateVerticalMouse(evt.clientY)
                self.camera.setInitPointRotate(evt.clientX, evt.clientY)
            }
        })

        document.getElementById("threeDiv").addEventListener('mouseup', () => {
            self.mouseDown = false
        })

        document.getElementById("threeDiv").addEventListener("contextmenu", function (e) {
            e.preventDefault();
        }, false);
    }
}