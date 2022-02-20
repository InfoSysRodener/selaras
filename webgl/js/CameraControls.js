import { Raycaster, Vector3 } from "three"

export class CameraControls {

    camera
    forwardMovementScalar = 0
    sideMovementScalar = 0
    forwardRotationScalar = 0
    sideRotationScalar = 0
    initPointX = 0
    initPointY = 0
    initPointXRotate = 0
    initPointYRotate = 0
    initAngle = 0
    initZoomDist = 0
    raycaster = new Raycaster()


    constructor(camera) {
        this.camera = camera
        this.camera.rotation.order = "YXZ"
    }

    updateMovement() {
        this.rotateVertical(this.sideRotationScalar);
        this.rotate(this.forwardRotationScalar);
        this.cameraFoward(this.forwardMovementScalar);
        this.cameraRight(this.sideMovementScalar);
    }

    rotateVertical(clientY) {
        const v1 = new Vector3(0, 1, 0)
        const v2 = new Vector3()
        this.camera.getWorldDirection(v2)

        const v3 = new Vector3((v1.y * v2.z) - (v1.z * v2.y), (v1.z * v2.x) - (v1.x * v2.z), (v1.x * v2.y) - (v1.y * v2.x))

        this.initAngle += clientY
        if (this.checkCameraRotationMouse(this.initAngle) === false) {
            this.camera.rotateOnWorldAxis(v3, -clientY * 3)
        } else {
            this.initAngle -= clientY
        }
        this.camera.rotation.z = 0
    }

    rotate(clientX) {
        this.camera.rotateOnWorldAxis(new Vector3(0, 1, 0), (clientX / 150))
        this.camera.rotation.z = 0
    }

    cameraFoward(distance) {
        this.controlsFoward(distance)
        if (this.checkLimits(this.camera.position.x, this.camera.position.y, this.camera.position.z) === false) {
            this.controlsFoward(-distance)
        }
    }

    cameraRight(distance) {
        this.controlsRight(distance)
        if (this.checkLimits(this.camera.position.x, this.camera.position.y, this.camera.position.z) === false) {
            this.controlsRight(-distance)
        }
    }

    checkLimits(x, y, z) {
        return true
    }

    checkCameraRotationMouse(y) {
        if (y < 0.75 && y > -0.58) {
            return false
        }
        return true
    }

    controlsFoward(distance, v = new Vector3()) {
        v.setFromMatrixColumn(this.camera.matrix, 0);

        v.crossVectors(this.camera.up, v);

        this.camera.position.addScaledVector(v, distance);
    }

    controlsRight(distance, v = new Vector3()) {
        v.setFromMatrixColumn(this.camera.matrix, 0);

        this.camera.position.addScaledVector(v, distance);
    }

    move(clientX, clientY) {
        const deltaX = clientX - this.initPointX
        const deltaY = clientY - this.initPointY

        this.controlsFoward(deltaY / 10)
        this.controlsRight(-deltaX / 20)
        if (this.checkLimits(this.camera.position.x, this.camera.position.y, this.camera.position.z) === false) {
            this.controlsFoward(-deltaY / 10)
            this.controlsRight(deltaX / 20)
        }
    }

    setInitPoint(clientX, clientY) {
        this.initPointX = clientX
        this.initPointY = clientY
    }

    setInitPointRotate(clientX, clientY) {
        this.initPointXRotate = clientX
        this.initPointYRotate = clientY
    }

    rotateMouse(clientX) {
        const deltaX = clientX - this.initPointXRotate

        this.camera.rotateOnWorldAxis(new Vector3(0, 1, 0), (-deltaX / 300))
        this.camera.rotation.z = 0
    }

    rotateVerticalMouse(clientY) {
        const v1 = new Vector3(0, 1, 0)
        const v2 = new Vector3()
        this.camera.getWorldDirection(v2)

        const v3 = new Vector3((v1.y * v2.z) - (v1.z * v2.y), (v1.z * v2.x) - (v1.x * v2.z), (v1.x * v2.y) - (v1.y * v2.x))

        const deltaY = clientY - this.initPointYRotate

        this.initAngle += deltaY
        // if(this.checkCameraRotationMouse(this.initAngle) ==== false){   
        this.camera.rotateOnWorldAxis(v3, deltaY / 300)
        // }
        this.camera.rotation.z = 0
    }

    showcaseTimeline() {

    }


}