"use strict"
//Игроки
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
//Счет игроков
const score0Element = document.getElementById('score--0');

const score1Element = document.getElementById('score--1');
//Текущие очки
const currentElement0 = document.getElementById('current--0');
const currentElement1 = document.getElementById('current--1');
// Кубик
const diceElement = document.querySelector('.dice');

//Кнопки

const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
//--------------

btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
btnNewGame.addEventListener('click', initGame);

let isPlaying, totalScore, currentScore, activePlayer;
initGame();
function initGame() {
    
    isPlaying = true; //Переменная состояния
    totalScore = [0, 0];
    currentScore = 0;
    activePlayer = 0;

    score0Element.textContent = 0;
    score1Element.textContent = 0;
    
    currentElement0.textContent = 0;
    currentElement1.textContent = 0;
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.remove('player--active');
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
    diceElement.classList.add('hidden');
    
}

function rollDice() {
    if(isPlaying) {
        const rundomNum = Math.trunc(Math.random() * 6) + 1;
        console.log(rundomNum);
        diceElement.classList.remove('hidden');
        diceElement.src = `./img/dice${rundomNum}.png`;
        numbers(rundomNum);
    }
   
}

function switchActivePlayer() {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

function numbers (number) {
    if(number !== 1){
        currentScore += number;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        
    } else {
        switchActivePlayer();
    }
}

function holdScore() {
    if(isPlaying) {
        totalScore[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = totalScore[activePlayer];
    
        if(totalScore[activePlayer] >= 20){
            isPlaying = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceElement.classList.add('hidden');
        }
        switchActivePlayer();
    }
}

/*При нажатии btnHold счет игрока должен сохраняться 
в массив totalScore, потом вывести этот счет игроку, 
который нажал кнопку */

