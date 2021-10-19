
class ListenMode {
    previous
    next 
    play
    pause

    constructor(options){
        this.previous = options.previous;
        this.next = options.next;
     
        this.previous.addEventListener('click',() => {
            console.log('hello');
        });
        this.next.addEventListener('click',() => {
            console.log('world');
        });
    
    }


}

// To call our class as a function
const ListenModeInit = args => new ListenMode(args);

export default ListenModeInit;