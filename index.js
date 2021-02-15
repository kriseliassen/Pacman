const width = 28
const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector("#score")
let squares = []
let score = 0

// 0 - pacdots
// 1 - wall
// 2 - ghost lair
// 3 - powerpellets
// 4 - empty

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

//create board
function createBoard() {
    for (let i = 0; i<layout.length; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)

        if (layout[i] === 0) {
            squares[i].classList.add('pac-dot')
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall')
        } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair')
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
        }
    }
}

createBoard()

//starting position of pacman
let pacmanCurrentIndex = 490
squares[pacmanCurrentIndex].classList.add("pacman")

//function to control pacman
// 40 - down
// 39 - right
// 38 - up
// 37 - left

function control(e) {
    squares[pacmanCurrentIndex].classList.remove("pacman")
    switch(e.keyCode) {
        case 40:
            if(
                !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
                !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair") &&
                pacmanCurrentIndex + width < width*width
                ) 
                pacmanCurrentIndex += width
        break

        case 39:
            if (
                !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
                !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair") &&
                pacmanCurrentIndex % width < width-1
                ) 
                pacmanCurrentIndex +=1
                if(pacmanCurrentIndex === 391) {
                pacmanCurrentIndex = 364
            }

        break
        
        case 38:
            if(
                !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
                !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair") &&
                pacmanCurrentIndex - width >=0
                ) 
                pacmanCurrentIndex -=width
        break

        case 37:
            if(
                !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
                !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair") &&
                pacmanCurrentIndex % width !== 0
                ) 
                pacmanCurrentIndex -=1
                if(pacmanCurrentIndex === 364) {
                pacmanCurrentIndex = 391
            }
        break
    }
    squares[pacmanCurrentIndex].classList.add("pacman")
    pacDotEaten()
    powerPelletEaten()
}

document.addEventListener('keyup', control)

function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
        squares[pacmanCurrentIndex].classList.remove("pac-dot")
        score++
        scoreDisplay.innerHTML = score
    }
}

function powerPelletEaten() {
    //if square pacman is in contains powerpellet
    if(squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
        //add score of ten
        score +=10
        scoreDisplay.innerHTML = score
        //remove power pellet
        squares[pacmanCurrentIndex].classList.remove("power-pellet")
        //change four ghosts to isScared
        ghosts.forEach(ghost => ghost.isScared = true)
        //use setTimeout to unscare ghosts after 10seconds
        setTimeout(unScareGhosts, 10000)
    }
}

function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerID = NaN
    }
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

//Draw ghosts onto grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add("ghost")
})

//move the ghosts
ghosts.forEach(ghost => moveGhost(ghost))


function moveGhost(ghost) {
    const directions = [-1, +1, -width, +width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerID = setInterval(function() {
        if(
            !squares[ghost.currentIndex + direction].classList.contains("ghost") &&
            !squares[ghost.currentIndex + direction].classList.contains("wall")
        ) {
              squares[ghost.currentIndex].classList.remove(ghost.className)
              squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost")
               ghost.currentIndex += direction
               squares[ghost.currentIndex].classList.add(ghost.className)
               squares[ghost.currentIndex].classList.add("ghost")
        } else direction = directions[Math.floor(Math.random() * directions.length)]

        //if ghost is currently scared
        if(ghost.isScared) {
            squares[ghost.currentIndex].classList.add("scared-ghost")
        }

        //if ghost is scared AND pacman is on it
        if(ghost.isScared && squares[ghost.currentIndex].classList.contains("pacman")) {
            //remove classnames - ghost.className, ghost, scared-ghost
            squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost")
            //change ghosts current index back to start index
            ghost.currentIndex = ghost.startIndex
            //add a score of 100 points
            score += 100
            scoreDisplay.innerHTML = score
            //re-add classnames of individual ghosts and ghost in new position
            squares[ghost.currentIndex].classList.add(ghost.className, "ghost")
        }

        checkForGameOver()
    }, ghost.speed)
}

//check for Game Over
function checkForGameOver() {
    //if square pacman is in contains ghost AND square does NOT contain scared-ghost
    if(
        squares[pacmanCurrentIndex].classList.contains("ghost") &&
        !squares[pacmanCurrentIndex].classList.contains("scared-ghost")
    ) {
        //for each ghost - stop it moving
        ghosts.forEach(ghost => clearInterval(ghost.timerID))
        //remove event listener from control function
        document.removeEventListener("keyup", control)
        //alert user that game is over
        alert("Game over!")
    }
}




//A+shift+option comment out block code