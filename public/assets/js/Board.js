class Board {
    constructor(title = "Board " + generateRandomNumber(), color = "#" + generateRandomColor()) {
        this.id = "board-" + generateRandomNumber()
        this.title = title
        this.color = color
        allBoards[title] = this
    }
}