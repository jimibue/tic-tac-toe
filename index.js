let state = {
  players_turn: "x",
  board: ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  winner: false,
};

function renderSquares() {
  let squaresHtml = "";
  state.board.forEach(function (square) {
    squaresHtml += `<div class='square'>${square}</div>`;
  });
  return squaresHtml;
}
function getHeaderMessage() {
  const { winner, players_turn } = state;
  if (winner) {
    return `
    <p>${players_turn} won</p>
    <p>restart</p>
`;
  } else {
    return `
     <p>it is ${players_turn} turn</p>
    `;
  }
}

function render() {
  console.log("render called");
  let htmlStr = `
    <div>
      <h1>Tic Tac Toe</h1>
      ${getHeaderMessage()}
      <div class="board">
      ${renderSquares()}
      </div>
    </div>
  
  `;
  document.getElementById("app").innerHTML = htmlStr;
}
console.log("before render");
render();
