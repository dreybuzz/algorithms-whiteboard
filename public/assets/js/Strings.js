class Strings {
    constructor(title = "String " + generateRandomNumber(), color = generateRandomColor(), strings = loremGenerator(10)) {
        this.id = "string-" + generateRandomNumber()
        this.color = color
        this.title = title
        this.strings = strings
    }
}