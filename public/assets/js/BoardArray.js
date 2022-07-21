class BoardArray {
    constructor(arr, title = "Board Array " + generateRandomNumber(), length = null) {
        if (length && length < arr.length) {
            throw "Length cannot be less than original array's length."
        }
        this.id = "board-array-" + generateRandomNumber()
        this.array = [...arr]
        this.title = title
        this.length = length || this.array.length
    }

    pop() {
        this.array.pop()
        return true
    }

    push(val = generateRandomNumber()) {
        this.array.push(val)
    }
}