const allBoardArrays = {}


class BoardArray {
    constructor(arr, title = "Board Array " + generateRandomNumber(), length = null) {
        if (length && length < arr.length) {
            throw "Length cannot be less than original array's length."
        }
        this.id = "board-array-" + generateRandomNumber()
        this.array = [...arr]
        this.length = length || this.array.length
        allBoardArrays[title] = this
    }
}