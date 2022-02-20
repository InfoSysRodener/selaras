
class ListenMode {
    previous
    next
    play
    pause
    resume

    constructor(options) {
        this.play = options.play;
        this.pause = options.pause;
        this.resume = options.resume;

        this.play.addEventListener('pointerdown', () => {
            document.dispatchEvent(new Event("playSound"))
        });

        this.pause.addEventListener('pointerdown', () => {
            document.dispatchEvent(new Event("pauseCurrentSound"))
        });

        this.resume.addEventListener('pointerdown', () => {
            document.dispatchEvent(new Event("resumeCurrentSound"))
        })
    }


}

// To call our class as a function
const ListenModeInit = args => new ListenMode(args);

export default ListenModeInit;