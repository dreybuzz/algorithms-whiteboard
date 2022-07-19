const allBoards = {}

class Board {
    constructor(title = "Board " + generateRandomNumber(), color = "black") {
        this.id = "board-" + generateRandomNumber()
        this.title = title
        this.color = color
        allBoards[title] = this
    }
}