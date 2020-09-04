// let defaultState = {
//   players_turn: "X",
//   board: ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
//   winner: false,
// };

function getDefaultState() {
  return {
    players_turn: "X",
    board: ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
    winner: false,
  };
}

// let state = { ...defaultState, board: [...defaultState.board] };
let state = { ...getDefaultState(), xWins: 0, yWins: 0 };

function checkWinner() {
  return (
    checkSection(0, 1, 2) ||
    checkSection(3, 4, 5) ||
    checkSection(6, 7, 8) ||
    checkSection(0, 3, 6) ||
    checkSection(1, 4, 7) ||
    checkSection(2, 5, 8) ||
    checkSection(0, 4, 8) ||
    checkSection(2, 4, 6)
    // TODO CHECK TIE.
  );
}

function checkSection(index1, index2, index3) {
  const { board, players_turn } = state;
  return (
    board[index1] === players_turn &&
    board[index2] === players_turn &&
    board[index3] === players_turn
  );
}

function handleSquareClicked(index) {
  console.log(index);

  if (state.winner || state.board[index] !== "-") {
    return;
  }
  state.board[index] = state.players_turn;

  if (checkWinner()) {
    state.winner = true;
    if (state.players_turn === "X") {
      state.xWins++;
    } else {
      state.yWins++;
    }
    render();
    return;
  }

  state.players_turn = state.players_turn === "X" ? "Y" : "X";

  // if (state.players_turn === "X") {
  //   state.players_turn = "Y";
  // } else {
  //   state.players_turn = "X";
  // }

  render();
}

function renderSquares() {
  let squaresHtml = "";
  state.board.forEach(function (square, index) {
    squaresHtml += `<div class='square' onclick='handleSquareClicked(${index})'>${square}</div>`;
  });
  return squaresHtml;
}

function restartGame() {
  // state = { ...getDefaultState(), xWins: state.xWins, yWins: state.yWins };
  state = { ...state, ...getDefaultState() };

  render();
}
function getHeaderMessage() {
  const { winner, players_turn } = state;
  if (winner) {
    return `
    <p>${players_turn} won</p>
    <p onclick='restartGame()'>restart</p>
`;
  } else {
    return `
     <p>it is ${players_turn} turn</p>
    `;
  }
}

function render() {
  let htmlStr = `
    <div>
      <h1>Tic Tac Toe</h1>
      ${getHeaderMessage()}
      <div class="board">
      ${renderSquares()}
      <p>y has won ${state.yWins}</p>
      <p>x has won ${state.xWins}</p>
      </div>
    </div>
  
  `;
  document.getElementById("app").innerHTML = htmlStr;
}

render();
