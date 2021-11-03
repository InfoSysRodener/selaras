
class NavigationControl {
    up
    right
    down
    left

    constructor(options) {
        this.up = options.up;
        this.right = options.right;
        this.down = options.down;
        this.left = options.left;

        this.up.addEventListener('pointerdown', () => {
            document.dispatchEvent(new Event("moveFoward"))
        });
        this.right.addEventListener('pointerdown', () => {
            document.dispatchEvent(new Event("moveRight"))
        });
        this.down.addEventListener('pointerdown', () => {
            document.dispatchEvent(new Event("moveBackwards"))
        });
        this.left.addEventListener('pointerdown', () => {
            document.dispatchEvent(new Event("moveLeft"))
        });
    }


}

// To call our class as a function
const NavigationControlInit = args => new NavigationControl(args);

export default NavigationControlInit;