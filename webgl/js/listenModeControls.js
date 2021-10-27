
class ListenMode {
    previous
    next 
    play
    pause
    paintingInfo

    constructor(options){
        this.previous = options.previous;
        this.next = options.next;
        this.paintingInfo = options.paintingInfo;
     
        this.previous.addEventListener('pointerdown',() => {
            document.dispatchEvent("clickPrevious")
        });
        this.next.addEventListener('pointerdown',() => {
            document.dispatchEvent("clickNext")
        });
    
        this.paintingInfo.addEventListener('', () => {

        })
        
    }


}

// To call our class as a function
const ListenModeInit = args => new ListenMode(args);

export default ListenModeInit;