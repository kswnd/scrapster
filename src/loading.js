export class Loading {
    constructor() {
        this.animationInterval = null
        this.frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    }

    show() {
        let i = 0
        this.animationInterval = setInterval(() => {
            process.stdout.write('\r' + this.frames[i] + ' Getting data')
            i = (i + 1) % this.frames.length
        }, 100)
    }

    hide() {
        clearInterval(this.animationInterval)
        process.stdout.clearLine()
    }
}
