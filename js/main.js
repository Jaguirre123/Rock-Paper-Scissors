/*----- constants -----*/
const lookupRPS = ['r', 'p', 's'];

const rps = {
    r:{
        beats: 's',
        imgUrl: 'https://png.icons8.com/metro/800/rock.png',
        // altUrl: 'https://imgur.com/HjnRXAx'
    },
    p:{
        beats: 'r',
        imgUrl: 'https://png.icons8.com/metro/800/paper.png'
    },
    s:{
        beats: 'p',
        imgUrl: 'https://png.icons8.com/metro/800/scissors.png'
    } 
    // e: {
    //     altUrl: 'https://imgur.com/HjnRXAx'
    // }
};

/*----- app's state (variables) -----*/
var scores, results, winner;

/*----- cached element references -----*/
var pScoreEl = document.querySelector('#player h2');
var cScoreEl = document.querySelector('#computer h2');
var tScoreEl = document.querySelector('#middle h2');

var pResultEl = document.querySelector('#player div');
var cResultEl = document.querySelector('#computer div');
var countdownEl = document.querySelector('#middle p');

/*----- event listeners -----*/
document.querySelector('button').addEventListener('click', playHand);


/*----- functions -----*/
function playHand() {
    doCountDown(shoot);
}

function doCountDown(cb) {
    var count = 3;
    countdownEl.textContent = count;
    var timerId = setInterval(function() {
        count--;
        if (count) {
            countdownEl.textContent = count;
        } else {
            clearInterval(timerId);
            countdownEl.textContent = '';
            cb();
        }
    }, 1000);
}

function shoot() {
    results.p = lookupRPS[getRandomBetween(0, 2)];
    results.c = lookupRPS[getRandomBetween(0, 2)];
    winner = getWinner();
    scores[winner]++;
    render();
}

function getWinner() {
    return results.p === results.c ?
     't'
    :
     rps[results.p].beats === results.c ? 'p' : 'c';
}

function render() {
    pScoreEl.textContent = scores.p;
    cScoreEl.textContent = scores.c;
    tScoreEl.textContent = scores.t;
    pResultEl.style.backgroundImage = `url(${rps[results.p].imgUrl})`;
    cResultEl.style.backgroundImage = `url(${rps[results.c].imgUrl})`;
    // pResultEl.style.backgroundImage = `url(${rps[results.p].altUrl})`;
    // cResultEl.textContent = results.c;
    pResultEl.style.border = winner === 'p' ? '10px solid darkgrey' :'10px solid white';
    cResultEl.style.border = winner === 'c' ? '10px solid darkgrey' :'10px solid white';
}

function init() {
    scores = {
        p: 0,
        c: 0,
        t: 0
    };
    results = {
        p: null,
        c: null
    };
    winner = null;
    render();
}

function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

init();