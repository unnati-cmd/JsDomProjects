let boxes = document.querySelectorAll('.box');
let resetbtn = document.querySelector('#reset');
let winnerSymbol = document.querySelector('#msg');

let turn0 = true;

// Pre-defined Win Patterns
const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
];

// Marking X and O and disabling marked tile
boxes.forEach((box) => {
    box.addEventListener('click', function(dets){
        console.log(dets);
        if(turn0){
            box.innerHTML = 'O';
            turn0 = false;
        }
        else{
            box.innerHTML = "X";
            turn0 = true;
        }
        box.disabled = true; 

        checkWinner();
    })
})

const checkWinner = () => {
    for(let patterns of winPatterns) {
        let pos1Val = boxes[patterns[0]].innerText;
        let pos2Val = boxes[patterns[1]].innerText;
        let pos3Val = boxes[patterns[2]].innerText;

        // Winner condition check. See if it matches the positions in the array defined previously.
        if(pos1Val !="" && pos2Val !="" && pos3Val !=""){
            // See if same symbol at every position
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                // Disable other buttons once winner found
                for(let b of boxes){
                    b.disabled = true;
                }
                console.log("Winner", pos1Val);
                winnerSymbol.textContent = `Winner: ${pos1Val}`;
                winnerSymbol.style.display = 'block';
            }
        }
    }
}

//Reset Button
const resetGame = () => {
    turn0 = true;
    for(let b of boxes){
        b.disabled = false;
        b.innerText = "";
    }
    winnerSymbol.style.display = 'none';
}

resetbtn.addEventListener('click',resetGame);