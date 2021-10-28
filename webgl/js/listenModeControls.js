
class ListenMode {
    previous
    next 
    play
    pause

    constructor(options){
        this.previous = options.previous;
        this.next = options.next;
        this.play = options.play;
     
        this.previous.addEventListener('pointerdown',() => {
            document.dispatchEvent(new Event("clickPrevious"))
        });
        this.next.addEventListener('pointerdown',() => {
            document.dispatchEvent(new Event("clickNext"))
        });
        this.play.addEventListener('pointerdown', () => {
            document.dispatchEvent(new Event("playSound"))
        })
    }


}

// To call our class as a function
const ListenModeInit = args => new ListenMode(args);

export default ListenModeInit;