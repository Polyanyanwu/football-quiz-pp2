import {
    MIN_USER_LENGTH as userLength
} from "./config.js";
import {
    TOTAL_PROF_QUUESTIONS as totProfQuestions
} from "./config.js";
import {
    TOTAL_AMATEUR_QUESTIONS as totAmateurQuestions
} from "./config.js";
import {
    TOTAL_ANSWER_OPTIONS as totOptions
} from "./config.js";
import {
    QUIZ_TIMEOUT_SEC as quizTimeout
} from "./config.js";
import {
    PLAY_INSTRUCTION as playInstruction
} from "./config.js";



import {
    professionalData
} from "./model.js";
import {
    amateurData
} from "./model.js";

// Define the variables for DOM elements
const quizLevel = document.querySelectorAll(".quiz-btn");
const answerOptionsBox = document.querySelectorAll(".option");
const question = document.getElementById("question");
const answerSignBox = document.querySelectorAll(".answer-sign");
const restartQuiz = document.querySelector("#restart-btn");
const nextQuiz = document.querySelector("#next-quix-btn");
const correctAnswerEl = document.querySelector("#corret-answer");
const wrongAnswerEl = document.querySelector("#wrong-answer");
const answerBtnEl = document.getElementById('submit-answer-btn');
const timerEl = document.getElementById('remaining-time');
const explanationModalEl = document.getElementById("explanation-modal");
const explanationBtnEl = document.getElementById('explanation-btn');
const explanationQuestionEl = document.getElementById('explanation-question');
const answerExplanationEl = document.getElementById('answer-explanation');
const closeExplainBtnEl = document.querySelectorAll(".close-explanation-button");
const detailedInstructionEl = document.querySelector("#detailed-instructions");
const explanationContentEl = document.querySelector("#explanation-content");


const displayUsernameModal = function () {
    //display the initial question from the amateur level
    getAndDisplayQuiz();
    answerOptionListener();
    checkAnswer();
    getNextQuestion();
    // const quizItem = getQuestionToDisplay();
    // console.log(quizItem);
    // displayQuestion(quizItem[0],quizItem[1]);
    const player = document.getElementById("player");
    const modal = document.getElementById("userNameModal");
    if (player.textContent === '?') {
        // call function to display modal and request player name
        modal.style.display = "block";
    }
}
document.addEventListener("DOMContentLoaded", displayUsernameModal);



const validateAndSaveUser = function () {
    let username = document.getElementById("username").value;
    const modal = document.getElementById("userNameModal");
    username = username.length > 0 ? username.trim() : username;
    const player = document.getElementById("player");
    if (username.length === 0) {
        if (confirm("Confirm exiting without a username, in this case your name will be 'Guest'")) {
            player.textContent = "Guest";
            modal.style.display = 'none';
            startQuizTimer(); // start timing the quiz
        };
    } else if (username.length < userLength) {
        alert(`Your username must be ${userLength} characters and longer`);
    } else {
        modal.style.display = 'none';
        player.textContent = username;
        startQuizTimer(); // start timing the quiz
    }
}
const usernameCloseBtn = document.querySelector(".username-close");
const usernameCreateBtn = document.querySelector("#create-user-button");

usernameCloseBtn.addEventListener('click', validateAndSaveUser);
usernameCreateBtn.addEventListener('click', validateAndSaveUser);

/**
 * Event listener for selection of the quiz level. Loop through the buttons for the quiz level, remove the class for the active button
 * on all buttons and insert the class on the clicked quiz level
 */
const changeQuizLevel = function (event) {
    //  arrow function ideas and forEach obtained from my JavaScript lessons at Udemy.com
    quizLevel.forEach(btn => btn.classList.remove('active-quiz-level'));
    event.target.classList.add('active-quiz-level');
    getAndDisplayQuiz();
};
quizLevel.forEach(btn => btn.addEventListener('click', changeQuizLevel));

/**
 * 
 * @param {the level of the quiz} quizLevel 
 * @param {the question index to display} questionId 
 * function that takes a question and its options and displays to the DOM
 */
const displayQuestion = function (quizLevel, questionId) {
    //question ID is the index of the question in the array of questions

    const quiz = quizLevel === "professional" ? professionalData[questionId] : amateurData[questionId];
    question.textContent = quiz.question;
    for (let i = 1; i <= totOptions; i++) {
        document.getElementById(`option${i}`).textContent = quiz[`option${i}`];
    }
    question.dataset.quizId = questionId;
    question.dataset.quizLevel = quizLevel;
    removeSelectionFromOptions();
    removeAnswerMarks();
    // updateMasterDatabase(quizLevel, questionId);
    console.log(amateurData);

}

/**
 * Function checks which level the player is engaged in, picks a random question among the ones that have used property false
 * function returns the id of the question and the quiz level
 */
const getQuestionToDisplay = function () {
    // check the quiz level (that is which of the quiz level has the active-quiz-level class set)
    let levelSelected;
    for (let quizlevel of quizLevel) {
        if (quizlevel.classList.contains('active-quiz-level')) {
            levelSelected = quizlevel.dataset.type;
        }
    }
    const unusedQuiz = levelSelected === "professional" ? professionalData.filter(data => !data.used) : amateurData.filter(data => !data.used);
    const quizId = Math.floor(Math.random() * unusedQuiz.length);
    return [levelSelected, unusedQuiz[quizId].id];
}

/**
 * A function to get and display a quiz item
 */
const getAndDisplayQuiz = function () {
    const quizItem = getQuestionToDisplay();
    displayQuestion(quizItem[0], quizItem[1]);
    // enable submit answer button after loading new question
    answerBtnEl.style.pointerEvents = 'auto';
}

const removeSelectionFromOptions = function () {
    answerOptionsBox.forEach(option => option.classList.remove('option-selected'));
}
const removeAnswerMarks = function () {
    for (let i = 1; i <= totOptions; i++) {

        document.getElementById(`option${i}-sign-no`).classList.remove('answer-sign-selected');
        document.getElementById(`option${i}-sign-no`).classList.remove('answer-sign-x');
        document.getElementById(`option${i}-sign-no`).classList.add('answer-sign-none');

        document.getElementById(`option${i}-sign-ok`).classList.remove('answer-sign-selected');
        document.getElementById(`option${i}-sign-ok`).classList.remove('answer-sign-x');
        document.getElementById(`option${i}-sign-ok`).classList.add('answer-sign-none');
    }
}

const markAllOptionsX = function () {
    for (let i = 1; i <= totOptions; i++) {
        document.getElementById(`option${i}-sign-no`).classList.add('answer-sign-x');
    }
}
const answerOptionListener = function () {
    answerOptionsBox.forEach(option => option.addEventListener('click', function (event) {
        removeSelectionFromOptions();
        // if user clicks the span, highlight the parent div instaed of only the span by adding the class option-selected
        event.target.localName === "span" ? event.target.parentNode.classList.add('option-selected') : event.target.classList.add('option-selected');
    }));
}

const getClickedOption = function () {
    let optionClicked = false;
    let answer = "";
    let optionSelected;
    for (let option of answerOptionsBox) {
        optionClicked = option.classList.contains('option-selected');
        if (optionClicked) {
            answer = option.dataset.option;
            optionSelected = option;
            break;
        }
    };
    if (!optionClicked) {
        alert('Please chose an answer before clicking submit answer');
    } else {
        const questionId = Number(question.dataset.quizId);
        const quizLevel = question.dataset.quizLevel;
        let correctAnswer = false;
        if (quizLevel === "amateur") {
            correctAnswer = amateurData[questionId].answer === answer;
        } else {
            correctAnswer = professionalData[questionId].answer === answer;
        }
        //     correctAnswer = quizLevel === "professional"? professionalData[questionId].answer === answer: amateurData[questionId].answer === answer;
        console.log("correct answer===" + correctAnswer);
        removeAnswerMarks();
        if (correctAnswer) {
            // correct answer
            console.log(optionSelected.dataset.option);
            // mark all as x 
            markAllOptionsX();
            document.getElementById(`${optionSelected.dataset.option}-sign-ok`).classList.add('answer-sign-selected');
            document.getElementById(`${optionSelected.dataset.option}-sign-no`).classList.remove('answer-sign-x');
            totalAnswers(true);
            playSound(true);
        } else {
            markAllOptionsX();
            if (quizLevel === "professional") {
                document.getElementById(`${professionalData[questionId].answer}-sign-ok`).classList.add('answer-sign-selected');
                document.getElementById(`${professionalData[questionId].answer}-sign-ok`).style.color = '#008000';
                document.getElementById(`${professionalData[questionId].answer}-sign-no`).classList.remove('answer-sign-x');
            } else {
                document.getElementById(`${amateurData[questionId].answer}-sign-ok`).classList.add('answer-sign-selected');
                document.getElementById(`${amateurData[questionId].answer}-sign-ok`).style.color = '#008000';
                document.getElementById(`${amateurData[questionId].answer}-sign-no`).classList.remove('answer-sign-x');
            }
            totalAnswers(false);
            playSound(false);
        }
        updateMasterDatabase(quizLevel, questionId);
    }
}

const checkAnswer = function () {
    answerBtnEl.addEventListener('click', getClickedOption);
}

const markAnswer = function () {
    const questionId = question.dataset.quizId;
    const quizLevel = question.dataset.quizLevel;
    const correct = quizLevel === "professional" ? professionalData[questionId].answer === getClickedOption() : amateurData[questionId].answer === getClickedOption();

}

const updateMasterDatabase = function (quizLevel, id) {
    quizLevel === "professional" ? professionalData[id].used = true : amateurData[id].used = true;
}

const getNextQuestion = function () {
    nextQuiz.addEventListener('click', function () {
        getAndDisplayQuiz();
    })
}
/**
 * Function to tally the correct and wrong answers and display to the user
 * @param {Boolean value if true then correct answer tally else wrong answer tally} correct 
 */
const totalAnswers = function (correct) {
    if (correct) {
        let ans = Number(correctAnswerEl.textContent);
        console.log(ans);
        if (isNaN(ans)) ans = 0;
        correctAnswerEl.textContent = ++ans;
    } else {
        let ans = Number(wrongAnswerEl.textContent);
        console.log(ans);
        if (isNaN(ans)) ans = 0;
        wrongAnswerEl.textContent = ++ans;
    }
    // disable answer button to prevent submitting more than once
    answerBtnEl.style.pointerEvents = 'none';
}
/**
 * Function to display the time remaining for the quiz. The total seconds is read from the config.js
 * Ideas and code snippets from Jonas Schmedtmann @ Udemy Javascript class
 * @returns 
 */
const startQuizTimer = function () {
    const tick = function () {
        const min = String(Math.trunc(time / 60)).padStart(2, 0);
        const sec = String(time % 60).padStart(2, 0);

        // In each call, print the remaining time to UI
        timerEl.textContent = `${min}:${sec}`;

        // When 0 seconds, stop timer and display performance
        if (time === 0) {
            alert("time up");
            clearInterval(timer);
            // labelWelcome.textContent = 'Log in to get started';
            // containerApp.style.opacity = 0;
        }
        // Decrease 1s
        time--;
    };

    // set the total time read from the config file 
    let time = quizTimeout;
    // Call the timer every second
    tick();
    const timer = setInterval(tick, 1000);
    return timer;
};
/**
 * Explanation of answers event listener
 */
const closeExplanationModal = function () {
    closeExplainBtnEl.forEach(btn => btn.addEventListener('click', function () {
        explanationModalEl.style.display = 'none';
    }))
}

explanationBtnEl.addEventListener('click', function () {
    explanationModalEl.style.display = 'block';
    // display the question
    const questionId = Number(question.dataset.quizId);
    const quizLevel = question.dataset.quizLevel;
    explanationQuestionEl.textContent = quizLevel === "professional" ? professionalData[questionId].question : amateurData[questionId].question;
    answerExplanationEl.textContent = quizLevel === "professional" ? professionalData[questionId].explan : amateurData[questionId].explan;
})
closeExplanationModal();;


detailedInstructionEl.addEventListener('click', function () {
    explanationModalEl.style.display = 'block';
    explanationQuestionEl.textContent = "Detailed Instructions";
    answerExplanationEl.textContent = playInstruction;
    closeExplanationModal();
    explanationContentEl.style.width = '60%';
    explanationContentEl.style.height = '50%'
});

const playSound = function (correctAnswer) {
    let audio = correctAnswer ? new Audio('../assets/media/SFXProducer.mp3') : new Audio('../assets/media/SFXProducerError.mp3');
    audio.play();
}

/**
 * Event function for restarting the quiz. Clears all questions ready to be selected by marking used property false;
 * Restarts the totalling of correct and wrong answer
 * displays a new question
 * restarts the quiz timer
 */
restartQuiz.addEventListener('click', function () {
    console.log("before restart", amateurData);
    if (confirm("Confirm restarting the Quiz, your scores would be reset to zero and timer will restart?")) {
        professionalData.filter(data => data.used).forEach(el => el.used = false);
        amateurData.filter(data => data.used).forEach(el => el.used = false);

        //restart numbering
        correctAnswerEl.textContent = 0;
        wrongAnswerEl.textContent = 0;
        // display new question
        getAndDisplayQuiz();
         // restart timer
        startQuizTimer();
        alert('Quiz has restarted');
    };

})