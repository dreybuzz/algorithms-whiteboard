const themeToggler = document.getElementById("theme-toggler")
themeToggler.addEventListener("click", () => {
    let isDarkTheme = document.body.classList.contains("dark")
    isDarkTheme ? document.body.classList.remove("dark") : document.body.classList.add("dark")
})


// Add New Board To Global Board
const addNewBoardBtn = document.getElementById("add-new-board")
addNewBoardBtn.addEventListener("click", () => {
    let newBoard = new Board("Board " + (Object.values(allBoards).length + 1), "#" + generateRandomColor())
    showBoard(newBoard)
})


// Add New Array To Global Board
const addNewArrayBtn = document.getElementById("add-new-array")
addNewArrayBtn.addEventListener("click", () => {
    let newArray = new BoardArray([generateRandomNumber(), generateRandomNumber()], "Array " + (Object.values(allBoardArrays).length + 1),)
    showArray(newArray)
})


// Create Board Element
function createBoard(id, title, color) {
    // Main Board
    const boardElement = document.createElement("div")
    boardElement.id = id
    boardElement.classList.add("board", "draggable", "resizable", "bordered")

    // Header
    const boardHeader = document.createElement("div")
    boardHeader.id = id + "-header"
    boardHeader.textContent = title
    boardHeader.classList.add("board-header", "p-2", "d-flex", "justify-content-center", "bordered-bottom")
    boardHeader.style.background = color


    // Add Header To Main Board
    boardElement.appendChild(boardHeader)

    return boardElement
}

// Show Board
function showBoard({ id: boardID, title, color }, board = "global") {
    let workspace = document.getElementById("workspace")
    const boardElement = createBoard(boardID, title, color)
    workspace.appendChild(boardElement)
    dragElement(boardElement, boardElement.id + "-header")
}


// Create Array Element
function createArray({ id, title }) {
    // Array Elements
    const arrayElement = document.createElement("div")
    arrayElement.id = id
    arrayElement.classList.add("array", "draggable", "resizable", "bordered")


    // Array Header
    const arrayHeader = document.createElement("div")
    arrayHeader.id = id + "-header"
    arrayHeader.textContent = title
    arrayHeader.classList.add("array-header", "p-2", "d-flex", "justify-content-center", "bordered-bottom")

    return arrayElement
}

// Show Array
function showArray({ id: arrayID, title }, board = "global") {
    let workspace = document.getElementById("workspace")
    const arrayElement = createArray(arrayID, title)
    workspace.appendChild(arrayElement)
    dragElement(arrayElement, arrayElement.id + "-header")
}













// Make Element Draggable
// Sauce: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_draggable
function dragElement(element, header) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(header)) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(header).onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}