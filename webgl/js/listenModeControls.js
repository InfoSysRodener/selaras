
class ListenMode {
    previous
    next 
    play
    pause

    constructor(options){
        this.play = options.play;
        this.play.addEventListener('pointerdown', () => {
            document.dispatchEvent(new Event("playSound"))
        })
    }


}

// To call our class as a function
const ListenModeInit = args => new ListenMode(args);

export default ListenModeInit;