// https://css-tricks.com/snippets/javascript/random-hex-color/
function generateRandomColor() {
    return Math.floor(Math.random() * 16777215).toString(16);
}

function generateRandomNumber(min = 0, max = 999999999999999) {
    max = !min ? ++max : max
    return Math.floor(Math.random() * max) + min
}

function parseTitle(title) {
    return title.replaceAll(" ", "-").toLowerCase()

}