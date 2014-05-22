var TABLE_SIZE = 12;

var startDate, op1, op2, ans;

var testFormEl      = document.getElementById('test-form');
var op1El           = document.getElementById('op1');
var op2El           = document.getElementById('op2');
var answerEl        = document.getElementById('answer');
var isCorrectEl     = document.getElementById('is-correct');
var correctEl       = document.getElementById('correct');
var incorrectEl     = document.getElementById('incorrect');
var correctAnswerEl = document.getElementById('correct-answer');
var submitEl        = document.getElementById('submit');
var timerEl         = document.getElementById('timer');
var timeEl          = document.getElementById('time');

function setUp()
{
    op1 = Math.round(Math.random() * (TABLE_SIZE-1) + 1);
    op2 = Math.round(Math.random() * (TABLE_SIZE-1) + 1);
    ans = op1 * op2;

    op1El.innerHTML           = op1;
    op2El.innerHTML           = op2;
    answerEl.value            = '';
    correctAnswerEl.innerHTML = ans;
    testFormEl.onsubmit       = checkAnswer;

    submitEl.innerHTML        = 'Check';
    timerEl.style.display     = 'none';
    correctEl.style.display   = 'none';
    incorrectEl.style.display = 'none';

    answerEl.focus();

    startDate = new Date();
}

function checkAnswer() {
    var endDate = new Date();
    timeEl.innerHTML = ((endDate - startDate)/1000).toFixed(1);
    timerEl.style.display = 'block';

    if (answerEl.value == ans) {
        correctEl.style.display   = 'inline';
        incorrectEl.style.display = 'none';
    } else {
        incorrectEl.style.display = 'inline';
        correctEl.style.display   = 'none';
    }

    testFormEl.onsubmit = refresh;
    submitEl.innerHTML  = 'Try another';
    answerEl.focus();

    return false;
}

function refresh() {
    setUp();

    return false;
}

setUp();
