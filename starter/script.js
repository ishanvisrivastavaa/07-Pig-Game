'use strict';

//select elements 
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, actvivePlayer, playing;

//starting position
const init = function(){
    scores = [0,0];
    currentScore = 0;
    actvivePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

init();

const switchPlayer = function(){
    document.getElementById(`current--${actvivePlayer}`).textContent = 0;
    actvivePlayer = actvivePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

//rolling dice funtionality 
btnRoll.addEventListener('click', function(){
    if(playing){
        //1.genrationg a random dice roll
    const dice = Math.trunc(Math.random()*6)+1;
    console.log(dice);

    //2.display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3.check for rolled 1: if true, switch to next player
    if(dice!==1){
      //add the dice to the current score
       currentScore += dice;
       document.getElementById(`current--${actvivePlayer}`).textContent = currentScore;

    } else {
        //switch to next player
        switchPlayer();
    }
    }
});
 
 btnHold.addEventListener('click', function(){
     if(playing){
        //1.add currentscore to active player
     scores[actvivePlayer] += currentScore;
     console.log(scores[actvivePlayer]);
    // scores[1] = scores[1]+currentScore;
    document.getElementById(`score--${actvivePlayer}`).textContent = scores[actvivePlayer];

    //2.check if the player score is >=100
    if(scores[actvivePlayer]>=10){
        playing = false;
       //finish the game
       diceEl.classList.add('hidden');
       document.querySelector(`.player--${actvivePlayer}`).classList.add('player--winner');
       document.querySelector(`.player--${actvivePlayer}`).classList.remove('player--active');
    } else {
    //switch to the next player
    switchPlayer();
  }
     }

});

btnNew.addEventListener('click', init);


