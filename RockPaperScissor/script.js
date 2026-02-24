let userScore = 0;
let compScore = 0;

let u = document.querySelector('#user-score');
let u1 = document.querySelector('#comp-score');

let user = document.querySelector('#usermsg');
let comp = document.querySelector('#compmsg');

const choices = document.querySelectorAll('.choice');
let msg = document.querySelector('#msg');

//Generate Computer Response
const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    return options[Math.floor(Math.random()*3)];
}

//Show Winner 
showWinner = (userWin) => {
    if(userWin === true){
        msg.textContent = 'You Win';
        userScore++;
        u.textContent = userScore;
    } 
    else {
        msg.textContent = 'You Lose';
        compScore++;
        u1.textContent = compScore;
    }
}

//Game Moves
const playGame = (userChoice) => {
    console.log('userChoice = ', userChoice);
    comp.textContent = `You: ${userChoice}`;

    //Generate Computer Choice
    let compChoice = genCompChoice();
    console.log('CompChoice = ', compChoice);
    user.textContent = `Comp: ${compChoice}`;

    if(userChoice === compChoice) {
        msg.textContent = 'Match Draw';
    }
    else{
        let userWin = true;
        if(userChoice === 'rock'){
            //Scissors, Paper
            userWin = (compChoice === 'paper')? false : true;
        } 
        else if (userChoice === 'scissors') {
            //Rock, Paper
            userWin = (compChoice === 'paper')? true : false;
        }
        else{
            //Scissors, Rock
            userWin = (compChoice === 'scissors')? false : true;
        }
        showWinner(userWin);
    }
}

choices.forEach((choice) => {
    choice.addEventListener("click", (dets) => {
        let userChoice = dets.target.parentNode.id;
        playGame(userChoice);
    })
})

let rest = document.querySelector('#resetbtn');

//Reset button
rest.addEventListener('click', function(){
    userScore = 0;
    compScore = 0;
    msg.textContent = 'Begin!';

    u.textContent = userScore;
    u1.textContent = compScore;

    user.textContent = 'Your Move';
    comp.textContent = 'Comp Move';
})