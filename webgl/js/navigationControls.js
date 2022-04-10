
class NavigationControl {
    up
    right
    down
    left
    fullscreen

    constructor(options) {
        this.up = options.up;
        this.right = options.right;
        this.down = options.down;
        this.left = options.left;
        this.fullscreen = options.fullscreen;

        this.up.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            document.dispatchEvent(new Event("moveFoward"))
        });
        this.right.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            document.dispatchEvent(new Event("moveRight"))
        });
        this.down.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.code) > -1) {
                e.preventDefault();
            }
            document.dispatchEvent(new Event("moveBackwards"))
        });
        this.left.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            document.dispatchEvent(new Event("moveLeft"))
        });

        this.fullscreen.addEventListener('pointerdown', () => {
            document.dispatchEvent(new Event("fullscreen"))
        });
    }


}

// To call our class as a function
const NavigationControlInit = args => new NavigationControl(args);

export default NavigationControlInit;