
class ListenMode {
    previous
    next 
    play
    pause

    constructor(options){
        this.previous = options.previous;
        this.next = options.next;
     
        this.previous.addEventListener('pointerdown',() => {
            document.dispatchEvent("clickPrevious")
        });
        this.next.addEventListener('pointerdown',() => {
            document.dispatchEvent("clickNext")
        });
    }


}

// To call our class as a function
const ListenModeInit = args => new ListenMode(args);

export default ListenModeInit;