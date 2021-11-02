
class NavigationControl {
    up
    right 
    down
    left

    constructor(options){
        this.up = options.up;
        this.right = options.right;
        this.down = options.down;
        this.left = options.left;
     
        this.up.addEventListener('click',() => {
            console.log('up');
        });
        this.right.addEventListener('click',() => {
            console.log('right');
        });
        this.down.addEventListener('click',() => {
            console.log('down');
        });
        this.left.addEventListener('click',() => {
            console.log('left');
        });
        
    }


}

// To call our class as a function
const NavigationControlInit = args => new NavigationControl(args);

export default NavigationControlInit;