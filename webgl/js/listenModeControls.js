
class ListenMode {
    previous
    next 
    play
    pause

    constructor(options){
        this.play = options.play;
        this.pause = options.pause;

        this.play.addEventListener('pointerdown', () => {
            document.dispatchEvent(new Event("playSound"))
        });

        this.pause.addEventListener('pointerdown', () => {
            document.dispatchEvent(new Event("pauseCurrentSound"))
        })
    }


}

// To call our class as a function
const ListenModeInit = args => new ListenMode(args);

export default ListenModeInit;