class Pointer {
    constructor(title = "Pointer " + generateRandomNumber(), color = null) {
        this.id = "pointer-" + generateRandomNumber()
        this.title = title
        this.color = color
    }
}