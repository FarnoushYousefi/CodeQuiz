var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

var questionEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
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
  titleE1.textContent = currentQuestion.title;
  choicesE1.innerHTML = '';
  // loop over choices
  currentQuestion.choices.forEach(function (choice, i) {
    // create new button for each choice
    var choiceNode = document.createElement('button');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);

    choiceNode.textContent = i + 1 + '. ' + choice;

    // attach click event listener to each choice
    choiceNode.onclick = questionClick;

    // display on the page
    choicesE1.appendChild(choiceNode);
  });
}

function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
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
  questionEl.setAttribute('class', 'hide');
}

function saveHighscore() {
  var initials = initialsEl.value.trim();

  if (!initials !== '') {
    var highscores =
      JSON.parse(window.localStorage.getItem('highscores')) || [];

    var newScore = {
      score: time,
      initials: initials,
    };

    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));
    window.location.href = 'highscores.html';
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
