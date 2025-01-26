document.addEventListener("DOMContentLoaded", () => {
  let boxes = document.querySelectorAll(".box");
  let resetBtn = document.querySelector("#reset-btn");
  let newGameBtn = document.querySelector("#new-btn");
  let msgContainer = document.querySelector(".msg-container");
  let msg = document.querySelector("#msg");

  let turnO = true; //playerX, playerO
  let moveCount = 0; //counter for moves
  const winPatterens = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  // Reset game
  const resetGame = () => {
    turnO = true;
    moveCount = 0; //reset move count
    enableBoxes();
    msgContainer.classList.add("hide");
    msgContainer.classList.remove("winner", "draw"); // remove any previous winner or draw class
  };

  boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
      if (box.innerText === "") {
        //Prevent overwriting a box
        if (turnO) {
          //playerO
          box.innerText = "O";
          turnO = false;
        } else {
          //playerX
          box.innerText = "X";
          turnO = true;
        }
        box.classList.add("disabled");
        moveCount++; // increment the move count

        checkWinner();
        if (moveCount === 9 && !gameOver) {
          showDraw(); // if no winner, it's a draw
 
        //Check for draw if all boxes are clicked and no winner
        // if (moveCount === 9 && !msgContainer.classList.contains("hide")) {
        //   if (!msgContainer.classList.contains("winner")) {
        //     showDraw(); //here a colon
          
        }
      }
    });
  });

  //disabling boxes after the game ends
  const disableBoxes = () => {
    boxes.forEach((box) => {
      box.classList.add("disabled");
    });
    // enable all boxes when reseting
  };
  const enableBoxes = () => {
    boxes.forEach((box) => {
      box.classList.remove("disabled");
      box.innerText = ""; //clear text
    });
  };

  const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    msgContainer.classList.add("winner");
    disableBoxes();
    gameOver = true; // set game to over
  };

  //show draw message
  const showDraw = () => {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    msgContainer.classList.add("draw"); //Mark it's a draw
    disableBoxes();
    gameOver = true; // set game to over
  };

  const checkWinner = () => {
    for (let pattern of winPatterens) {
      let pos1Val = boxes[pattern[0]].innerText;
      let pos2Val = boxes[pattern[1]].innerText;
      let pos3Val = boxes[pattern[2]].innerText;

      if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
        if (pos1Val === pos2Val && pos2Val === pos3Val) {
          showWinner(pos1Val);
          return;
        }
      }
    }
  };

  newGameBtn.addEventListener("click", resetGame);
  resetBtn.addEventListener("click", resetGame);
});
