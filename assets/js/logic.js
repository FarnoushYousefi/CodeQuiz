var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

var questionEl = document.getElementById('questions');
var timerEl = document.querySelector('#time');
var choicesE1 = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');

function startQuiz() {
  var startScreenEl = document.getElementById('start-screen');
  startScreenEl.setAttribute('class', 'hide');
  questionEl.removeAttribute('class');
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;
  getQuestion();
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var titleE1 = document.getElementById('question-title');
  titleEl.textContent = currentQuestion.title;
  choicesE1.innerHTML = '';
  currentQuestion.foreach(function (choice, i) {
    var choiceNode = document.createElement('button');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);
    choiceNode.textContent = i + 1 + '. ' + choice;
    choiceNode.onclick = questionClick;

    choicesE1.appendChild(choiceNode);
  });
}

function questionClick() {
  if (this.value !== questios[currentQuestionIndex].answer) {
    time -= 15;
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
    feedbackEl.textContent = 'wrong';
  } else {
    feedbackEl.textContent = 'correct';
  }

  feedbackEl.setAttribute('class', 'feedback');
  setTimeout(function () {
    feedbackEl.setAttribute('class', 'feedback hide');
  }, 1000);

  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function clockTick() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

function quizEnd() {
  clearInterval(timerId);
  var endScreenEl = document.getElementById('end-screen');
  endScreenEl.removeAttribute('class');
  var finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = time;
  questionsEl.setAttribute('class', 'hide');
}

function saveHighscore() {
  var initials = initialsEl.value.trim();

  if (!initials !== '') {
    var highScores =
      JSON.parse(window.localStorage.getItem('highscores')) || [];

    var newScore = {
      score: time,
      initials: initials,
    };

    highScores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));
    window.location.href = 'higscores.html';
  }
}
function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === 'Enter') {
    saveHighscore();
  }
}
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
