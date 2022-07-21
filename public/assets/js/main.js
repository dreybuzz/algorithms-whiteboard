const workspace = document.getElementById("workspace")

function isDarkTheme() {
    return document.body.classList.contains("dark")
}

const themeToggler = document.getElementById("theme-toggler")
themeToggler.addEventListener("click", () => {
    isDarkTheme() ? document.body.classList.remove("dark") : document.body.classList.add("dark")
})


// Add New Board To Global Board
const addNewBoardBtn = document.getElementById("add-new-board")
addNewBoardBtn.addEventListener("click", () => {
    const boardTitle = "Board " + (Object.values(allBoards).length + 1)
    const newBoard = new Board(boardTitle, generateRandomColor())
    allBoards[boardTitle] = newBoard
    showBoard(newBoard)
})


// Add New Array To Global Board
const addNewArrayBtn = document.getElementById("add-new-array")
addNewArrayBtn.addEventListener("click", () => {
    const arrayTitle = "Array " + (Object.values(allBoardArrays).length + 1)
    const newBoardArray = new BoardArray([generateRandomNumber(1, 5), generateRandomNumber(2, 10), generateRandomNumber(21, 220)], arrayTitle)
    allBoardArrays[arrayTitle] = newBoardArray
    showNewArray(newBoardArray)
})


// Add New Pointer To Global Board
const addNewPointerBtn = document.getElementById("add-new-pointer")
addNewPointerBtn.addEventListener("click", () => {
    const pointerTitle = "Pointer " + Object.values(allPointers).length + 1
    const newPointer = new Pointer(pointerTitle)
    allPointers[pointerTitle] = newPointer
    showPointer(newPointer)
    console.log(newPointer)
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
    color ? boardHeader.style.background = color : ""


    // Add Header To Main Board
    boardElement.appendChild(boardHeader)

    return boardElement
}

// Show Board
function showBoard({ id: boardID, title, color }, board = "global") {
    const boardElement = createBoard(boardID, title, color)
    workspace.appendChild(boardElement)
    dragElement(boardElement, boardElement.id + "-header")
}


// Create Array Element
function createArray(newBoardArray) {
    const { id, title, array } = newBoardArray

    // Array Element Container
    const arrayElement = document.createElement("div")
    arrayElement.id = id
    arrayElement.classList.add("array", "draggable", "resizable", "bordered", "bordered-horizontal", "d-flex", "flex-column")


    // Array Header
    const arrayHeader = createArrayHeader(newBoardArray)
    arrayElement.appendChild(arrayHeader)


    // Array Tools
    const arrayTools = createArrayToolBox(newBoardArray)
    arrayElement.appendChild(arrayTools)


    // Array Elements
    const arrayElements = createArrayElements(array)
    arrayElement.appendChild(arrayElements)
    return arrayElement
}


function createArrayHeader(boardArray) {
    const { id, title } = boardArray
    const arrayHeader = document.createElement("div")
    arrayHeader.classList.add("draggable-header")
    arrayHeader.id = id + "-header"
    arrayHeader.innerHTML = `
    <span>[ ]</span> 
    <span class="d-flex flex-grow-1 justify-content-center">${title}</span>
    <span class="">X</span>`
    arrayHeader.classList.add("array-header", "p-2", "d-flex", "justify-content-between", "align-items-center", "bordered-bottom")
    return arrayHeader
}

function createArrayToolBox(boardArray) {
    const arrayToolsSchema = [
        {
            title: "Pop",
            icon: "dash-circle-fill",
            method: "pop"
        },
        {
            title: "Push",
            icon: "plus-circle-fill",
            method: "push"
        },

    ]
    const arrayTools = document.createElement("div")
    arrayTools.classList.add("bordered-bottom", "d-flex", "justify-content-evenly", "align-items-center", "p-2")
    arrayToolsSchema.forEach(arrayTool => {
        let arrayToolElement = document.createElement("div")
        arrayToolElement.classList.add("d-flex", "align-items-center")
        arrayToolElement.style.cursor = "pointer"
        arrayToolElement.addEventListener("click", () => {
            boardArray[arrayTool.method]()
            updateBoardArray(boardArray);
        })
        arrayToolElement.innerHTML = `<i class="bi bi-${arrayTool.icon}"></i>`
        arrayTools.appendChild(arrayToolElement)
    })
    return arrayTools
}

function createArrayElements(array) {
    const arrayElements = document.createElement("span")
    arrayElements.classList.add("d-flex", "justify-content-evenly", "flex-wrap", "align-items-center", "p-2", "bordered", "flex-grow-1")
    array.forEach(element => {
        let elementSpan = document.createElement("span")
        elementSpan.classList.add("bordered", "mx-1", "p-2")
        elementSpan.innerHTML = `${element}`
        arrayElements.appendChild(elementSpan)
    })
    return arrayElements
}


// Show Array
function showNewArray(newBoardArray, board = "global") {
    const arrayElement = createArray(newBoardArray)
    workspace.appendChild(arrayElement)
    dragElement(arrayElement, arrayElement.id + "-header")
}



function updateBoardArray(boardArray) {
    const boardArrayHeader = createArrayHeader(boardArray)
    const boardArrayToolbox = createArrayToolBox(boardArray)
    const arrayElements = createArrayElements(boardArray.array)
    const arrayElement = document.getElementById(boardArray.id)
    arrayElement.innerHTML = ``
    arrayElement.appendChild(boardArrayHeader)
    arrayElement.appendChild(boardArrayToolbox)
    arrayElement.appendChild(arrayElements)
    dragElement(arrayElement, arrayElement.id + "-header")
    return true
}



// Create Pointer
function createPointer(id, title, color) {
    const pointerElement = document.createElement("div")
    pointerElement.id = id
    pointerElement.classList.add("pointer", "draggable", "d-flex", "flex-column", "justify-content-center", "align-items-center")
    pointerElement.style.color = color

    pointerElement.innerHTML += `<i class="bi bi-arrow-up fw-bolder element-icon" id="${id}-icon"></i>`
    return pointerElement

}


// Show Pointer
function showPointer({ id: pointerID, title, color }, board = "global") {
    const pointerElement = createPointer(pointerID, title, color)
    workspace.appendChild(pointerElement)
    dragElement(pointerElement, pointerElement.id + "-header")
}



// function detectResize(nodeElement, width, height) {
//     let currentWidth = nodeElement.offsetWidth
//     let currentHeight = nodeElement.offsetHeight
//     // document.getElementById(nodeElement.id + "-icon").style.fontSize = currentWidth / 2 + "%"
// }

// setInterval(() => {
//     const element = document.querySelector(".pointer")
//     if (element) {
//         detectResize(element)
//     }

// }, 10)



// Make Element Draggable
// Sauce: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_draggable
function dragElement(element, header = element.id + "-header") {
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



function makeDraggable(nodeElement) {

    nodeElement.draggable = "true"
    nodeElement.style.position = "absolute"

    let initialCursorPositionX, initialCursorPositionY

    function onMouseDown(e) {
        e.preventDefault()
        initialCursorPositionX = e.clientX
        initialCursorPositionY = e.clientY
        document.onmousemove = onMouseMove
        document.onmouseup = onMouseUp
    }

    function onMouseMove(e) {
        e.preventDefault()
        // let currentPositionX = e.pageX
        // let currentPositionY = e.pageY

        let currentPositionX = initialCursorPositionX - e.clientX
        let currentPositionY = initialCursorPositionY - e.clientY
        currentPositionX = e.clientX
        currentPositionY = e.clientY
        nodeElement.style.left = currentPositionX + "px"
        nodeElement.style.top = currentPositionY + "px"

    }

    function onMouseUp(e) {
        document.onmouseup = null
        document.onmousemove = null
        // nodeElement = null
    }




    nodeElement.addEventListener("dragstart", (e) => {
        e.preventDefault()
        // onMouseDown(e)
        // console.log("Drag Start")
        let currentPositionX = e.pageX
        let currentPositionY = e.pageY
        nodeElement.style.left = currentPositionX + "px"
        nodeElement.style.top = currentPositionY + "px"
    })

    nodeElement.addEventListener("drop", (e) => {
        e.preventDefault()
        // onMouseDown(e)
        console.log("Drag End")
    })


}