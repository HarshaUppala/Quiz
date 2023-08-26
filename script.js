const question = document.getElementById('question');
const choice = Array.from(document.getElementsByClassName('choice-text'));
const remainingQuestionsTxt = document.getElementById('remainingQuestionsTxt');
const scoreTxt = document.getElementById('scoreTxt');
const questionNo = document.getElementById('questionNo');
const progressBar = document.getElementById('progressBar');

let currentQuestion = {};
let acceptingAwnsers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch(
    'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple'
)
    .then((res) => {
        console.log('res.json()');
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
            console.log(formattedQuestion)
        });
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign('./quizends.html');
    }
    questionCounter++;

    questionNo.innerText = questionCounter + '. ';
    console.log((questionCounter / MAX_QUESTIONS) * 100);
    
    progressBar.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    remainingQuestionsTxt.innerText = '0' + (MAX_QUESTIONS - questionCounter);

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion?.question;

    choice.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAwnsers = true;
};

choice.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAwnsers) return;

        acceptingAwnsers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classApplies = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classApplies === 'correct') {
            incrementScore(CORRECT_BONUS);
        }
        if (score != 0) {
            scoreTxt.innerText = score;
        }

        selectedChoice.classList.add(classApplies);

        setTimeout(() => {
            selectedChoice.classList.remove(classApplies);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreTxt.innerText =score;
};

game = () => {
    window.location.assign('./game.html');
}

home = () => {
    window.location.assign('./index.html');
}

leaderboard = () => {
    window.location.assign('./leaderboard.html');
}



