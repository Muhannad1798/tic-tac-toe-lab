/*-------------------------------- Constants --------------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset')
console.dir(squareEls[1])
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

//console.log(squareEls)
//squareEls[1].textContent = 'X'
/*---------------------------- Variables (state) ----------------------------*/
let board = ['', '', '', '', '', '', '', '', '']
let turn = 'O'
let winner = false
let tie = false
let squareIndex
let xn = 0
let on = 0
let em = false
let win = ''

/*------------------------ Cached Element References ------------------------*/

/*-------------------------------- Functions --------------------------------*/
const init = () => {
  board = ['', '', '', '', '', '', '', '', '']
  // turn = ''
  winner = false
  tie = false
  squareIndex
  xn = 0
  on = 0
  em = false
  win = ''
  updateBoard()
  updateMessage()
  render()
}

const render = () => {
  updateBoard()
  updateMessage()
}

const updateBoard = () => {
  for (let i = 0; i < 9; i++) {
    if (board[i] === 'X') {
      squareEls[i].textContent = 'X'
      updateMessage()
      turn = 'O'
    } else if (board[i] === 'O') {
      squareEls[i].textContent = 'O'
      updateMessage()
      turn = 'X'
    } else {
      squareEls[i].textContent = ''
    }
  }
}
//updateBoard()

const updateMessage = () => {
  if (winner === false && tie === false) {
    messageEl.textContent = `It is ${turn} time to play`
  } else if (tie === true) {
    console.log('losers')

    messageEl.textContent = 'No winner here just two losers.'
  }
  if (winner === true) {
    messageEl.textContent = `${win} is the winner.`
  }
}
//init()
//updateMessage()

const handleClick = (event) => {
  if (
    board[Number(event.target.id)] === 'X' ||
    board[Number(event.target.id)] === 'O' ||
    winner === true
  ) {
    return
  } else {
    squareIndex = event.target.id
    placePiece(Number(squareIndex))
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
  }
  // console.log(squareIndex)
}

const placePiece = (index) => {
  board[index] = turn
  squareEls[index].textContent = board[index]
}

const checkForWinner = () => {
  winningCombos.forEach((comp) => {
    comp.forEach((y) => {
      if (board[y] != '') {
        if (board[y] === 'X') {
          xn++
          on = 0
        } else if (board[y] === 'O') {
          on++
          xn = 0
        }
      }
    })
    if (xn === 3) {
      winner = true
      win = 'X'
      console.log('winner is X')
      updateMessage()
    } else if (on === 3) {
      winner = true
      win = 'O'
      console.log('winner is O')
      updateMessage()
    } else {
      xn = 0
      on = 0
    }
  })
}

const checkForTie = () => {
  let z = 0
  if (winner === true) {
    return
  } else {
    for (z = 0; z < 9; z++) {
      if (board[z] === '') {
        tie = false
        return
      }
    }
    if (z === 9 && board[8] != '') {
      tie = true
      updateMessage()
    }
  }
  console.log(tie)
}

const switchPlayerTurn = () => {
  if (winner === true) {
    return
  } else if (turn === 'X') {
    turn = 'O'
  } else if (turn === 'O') {
    turn = 'X'
  }
}

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((sqr) => {
  sqr.addEventListener('click', handleClick)
})

resetBtnEl.addEventListener('click', init)
