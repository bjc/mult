var TABLE_SIZE = 12;

var startDate;
var answerHistory = [];

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
var historyEl       = document.getElementById('history-list')
var averageEl       = document.getElementById('history-average')

function question() {
    this.op1 = Math.round(Math.random() * (TABLE_SIZE-1) + 1);
    this.op2 = Math.round(Math.random() * (TABLE_SIZE-1) + 1);
    this.ans = this.op1 * this.op2;
}

function setUp()
{
    q = new question();

    op1El.innerHTML     = q.op1;
    op2El.innerHTML     = q.op2;
    answerEl.value      = '';
    testFormEl.onsubmit = function () { checkAnswer(q); return false; };

    answerEl.focus();

    startDate = new Date();
}

function checkAnswer(q) {
    var endDate = new Date();
    q.elapsed = (endDate - startDate)/1000
    time = q.elapsed.toFixed(1)
    timeEl.innerHTML = time;
    timerEl.style.display = 'block';

    correctAnswerEl.innerHTML = q.ans;
    if (answerEl.value == q.ans) {
        correctEl.style.display   = 'inline';
        incorrectEl.style.display = 'none';
    } else {
        incorrectEl.style.display = 'inline';
        correctEl.style.display   = 'none';
    }

    addToHistory(time)
    answerHistory.push(q)
    averageEl.innerHTML = (answerHistory.reduce(function (acc, val) { return acc + val.elapsed }, 0) / answerHistory.length).toFixed(1)

    setUp();
}

function addToHistory(time) {
    var children = historyEl.childNodes;
    for (i = children.length; i > 4; i--) {
        historyEl.removeChild(children[children.length - i]);
    }

    var item = document.createElement('li');
    item.appendChild(document.createTextNode(time));
    historyEl.appendChild(item);
}

function refresh() {
    setUp();

    return false;
}

setUp();
