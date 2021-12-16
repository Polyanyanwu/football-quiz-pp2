/*jshint esversion: 6 */
/*jshint -W030 */ //ignore warnings due to use of tenary operator
/*globals $:false */ // accept $ as global variable while testing with jshint
"use strict";

import {
    MIN_USER_LENGTH as userLength
} from "./config.js";

import {
    TOTAL_QUESTIONS_PER_SESSION as totQuizPerSession
} from "./config.js";
import {
    PASS_CUTOFF_MARK as passCutOffMark
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
    PROFESSIONAL_MARK_PER_QUESTION as profMarkPerQuiz
} from "./config.js";
import {
    AMATEUR_MARK_PER_QUESTION as amateurMarkPerQuiz
} from "./config.js";

import {
    professionalData
} from "./model.js";
import {
    amateurData
} from "./model.js";

// Define the variables for DOM elements
const quizLevel = document.querySelectorAll(".quiz-btn");
const player = document.getElementById("player");
const modal = document.getElementById("userNameModal");
const answerOptionsBox = document.querySelectorAll(".option");
const question = document.getElementById("question");
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
const viewResultBtnEl = document.querySelector("#view-result-btn");
const correctAudioEl = document.querySelector("#correct-audio");
const wrongAudioEl = document.querySelector("#wrong-audio");
const winAudioEl = document.querySelector("#win-audio");
const quizCountEl = document.querySelector("#quiz-count");
const usernameCloseBtn = document.querySelector(".username-close");
const usernameCreateBtn = document.querySelector("#create-user-button");
const totProfQuizEl = document.querySelector("#total-prof-question");
const totAmateurQuizEl = document.querySelector("#total-amateur-question");
const logoImg = document.querySelector(".logo-image");
const soundSwitch = document.querySelector(".sound-switch");
const soundSwitchValue =  document.getElementById("sound-switch-value"); 


// Global variable very necessary for correct functioning of the site
let quizCount = 0; //tracking of how many questions already presented
let time = quizTimeout; //the timeout duration for the quiz
let totAmateurCorrect = 0; //total amateur correct answers used in computing the final score
let totProfCorrect = 0; // total professional correct answers used in computing the final score
let totProfQuiz = 0; //total professional questions answered, helps the user be conscious of progress
let totAmateurQuiz = 0; //total amateur questions answered, helps the user be conscious of progress

const init = function () {
    displayUsernameModal(); //display modal and get username
    usernameCloseBtn.addEventListener('click', validateAndSaveUser); //event listener for username close button
    usernameCreateBtn.addEventListener('click', validateAndSaveUser); //event listener for Create Username button
    getAndDisplayQuiz(); //display the initial question from the amateur level
    answerOptionListener(); //start the answer option listener after displaying questions
    checkAnswer(); //start the event listener that processes the submitted answer
    getNextQuestion(); // start event listener for getting the next question

};

//after document has loaded, call the init function
document.addEventListener("DOMContentLoaded", init);

/**
 * function to display modal and request player name
 */
const displayUsernameModal = () => {
    if (player.textContent === '?') { //player text content was set to ? at the DOM
        modal.style.display = "block";
    }
};

/**
 * When user clicks Create Username or the x (close button) on the username creation modal
 * Confirm that the username is at least 3 characters;
 * If the name is blank request confirmation from user to proceed as Guest
 */
const validateAndSaveUser = function () {
    let username = document.getElementById("username").value;
    username = username.length > 0 ? username.trim() : username;
    const player = document.getElementById("player");
    if (username.length === 0) {
        functionConfirm("Confirm exiting without a username, in this case your name will be 'Guest'",
            function yes() {
                player.textContent = "Guest";
                modal.style.display = 'none';
                startQuizTimer(); // start timing the quiz
            },
            function no() {});

    } else if (username.length < userLength) {
        alertMe(`Your username must be ${userLength} characters and longer`),
            function yes() {};
    } else {
        modal.style.display = 'none';
        player.textContent = username;
        startQuizTimer(); // start timing the quiz
    }
};

/**
 * Event listener for selection of the quiz level. Loop through the buttons for the quiz level, remove the class for the active button
 * on all buttons and insert the class on the clicked quiz level
 */
const changeQuizLevel = function (event) {
    //  arrow function ideas and forEach obtained from my JavaScript lessons at Udemy.com
    quizLevel.forEach(btn => btn.classList.remove('active-quiz-level'));
    event.target.classList.add('active-quiz-level');

    // display the existing total questions per quiz level before changing
    totProfQuizEl.textContent = totProfQuiz;
    totAmateurQuizEl.textContent = totAmateurQuiz;
    // get a new question and display
    getAndDisplayQuiz();
};
quizLevel.forEach(btn => btn.addEventListener('click', changeQuizLevel));

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
};

/**
 * @param {the level of the quiz} quizLevel 
 * @param {the question index to display} questionId 
 * function that takes a question and its options and displays to the DOM
 */
const displayQuestion = function (quizLevel, questionId) {
    //question ID is a unique ID number of the question in the array of questions
    const quiz = quizLevel === "professional" ? professionalData[questionId] : amateurData[questionId];
    question.textContent = quiz.question;
    for (let i = 1; i <= totOptions; i++) {
        document.getElementById(`option${i}`).textContent = quiz[`option${i}`];
    }
    question.dataset.quizId = questionId; //store the question ID in the DOM
    question.dataset.quizLevel = quizLevel;
    removeSelectionFromOptions(); //clear the existing selected option, if any
    removeAnswerMarks(); //clear the right/wrong answer indicator on the options
};

/**
 * A function to get and display a quiz item
 */
const getAndDisplayQuiz = function () {

    const quizItem = getQuestionToDisplay();
    displayQuestion(quizItem[0], quizItem[1]);
    // enable submit answer button after loading new question
    enableAnswerOptionsAndSubmit();
    //  remove View Result from DOM until Time out
    viewResultBtnEl.style.display = "none";
    // enable the command buttons for next question and display result
    enableCommandBtns();
    // display question count
    quizCountEl.textContent = `${quizCount+1} of ${totQuizPerSession}`;
    quizItem[0] === 'professional' ? totProfQuizEl.textContent = totProfQuiz + 1 : totAmateurQuizEl.textContent = totAmateurQuiz + 1;

};

/**
 * Clear the 'option-selected' class from the options when new question is loaded
 */
const removeSelectionFromOptions = function () {
    answerOptionsBox.forEach(option => option.classList.remove('option-selected'));
};

/**
 * Clear the correct/wrong answer indicator marks from the options when new question is loaded
 */
const removeAnswerMarks = function () {
    for (let i = 1; i <= totOptions; i++) {

        document.getElementById(`option${i}-sign-no`).classList.remove('answer-sign-selected');
        document.getElementById(`option${i}-sign-no`).classList.remove('answer-sign-x');
        document.getElementById(`option${i}-sign-no`).classList.add('answer-sign-none');

        document.getElementById(`option${i}-sign-ok`).classList.remove('answer-sign-selected');
        document.getElementById(`option${i}-sign-ok`).classList.remove('answer-sign-x');
        document.getElementById(`option${i}-sign-ok`).classList.add('answer-sign-none');
    }
};

/**
 * Mark all the answer options with the x, before the correct answer is marked with a √
 */
const markAllOptionsX = function () {
    for (let i = 1; i <= totOptions; i++) {
        document.getElementById(`option${i}-sign-no`).classList.add('answer-sign-x');
    }
};

/**
 * Event listener for the selection of an answer option when user clicks
 */
const answerOptionListener = function () {
    answerOptionsBox.forEach(option => option.addEventListener('click', function (event) {
        removeSelectionFromOptions();
        // if user clicks the span, highlight the parent div instead of only the span by adding the class option-selected
        event.target.localName === "span" ? event.target.parentNode.classList.add('option-selected') : event.target.classList.add('option-selected');
    }));
};

/**
 * Function that checks that a user has clicked an answer option before submitting the answer
 * @returns the answer option that was clicked or undefined if the user has not clicked an option
 * before clicking submit answer
 */
const getOptionClicked = () => {
    for (let option of answerOptionsBox) {
        const optionClicked = option.classList.contains('option-selected');
        if (optionClicked) {
            return option.dataset.option;
        }
    }
    return undefined;
};

/**
 * Function accepts the Option the user clicked and returns boolean of correctness of the answer
 * plus the quiz level and question ID being answered
 * @param {*} optionClicked 
 * @returns 
 */
const checkCorrectAnswer = (optionClicked) => {
    const questionId = Number(question.dataset.quizId);
    const quizLevel = question.dataset.quizLevel;
    let correctAnswer = false;
    if (quizLevel === "amateur") {
        correctAnswer = amateurData[questionId].answer === optionClicked;
        totAmateurQuiz++;
    } else {
        correctAnswer = professionalData[questionId].answer === optionClicked;
        totProfQuiz++;
    }
    return [correctAnswer, quizLevel, questionId];
};

/**
 * Function to mark the question. It calls getOptionClicked() to get the option the user selected, 
 * calls checkCorrectAnswer() to check the correctness of the answer and obtain the question ID and Quiz level
 * calls removeAnswerMarks() to clear the x and √ that indicates the correct/worng answer
 * calls the markAllOptionsX to mark all options with x before then marking the correct answer with √.
 * It plays the sound indicating the corect/wrong answer
 * calls updateMasterDatabase to update the database and indicate that the question has been used for this session
 */
const markQuestion = function () {
    const optionClicked = getOptionClicked();
    if (!optionClicked) {
        alertMe("Please chose an answer before clicking submit answer"),
            function yes() {};
    } else {
        removeAnswerMarks();
        markAllOptionsX();
        const [correctAnswer, quizLevel, questionId] = checkCorrectAnswer(optionClicked);
        if (correctAnswer) {
            // correct answer
            // mark all as x 
            document.getElementById(`${optionClicked}-sign-ok`).classList.add('answer-sign-selected');
            document.getElementById(`${optionClicked}-sign-ok`).style.color = '#fff';
            document.getElementById(`${optionClicked}-sign-no`).classList.remove('answer-sign-x');
            // aggregate correct answers
            quizLevel === "amateur" ? ++totAmateurCorrect : ++totProfCorrect;
            totalAnswers(true);
            playSound('correct');
        } else {
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
            playSound('wrong');
        }
        updateMasterDatabase(quizLevel, questionId);
        quizCount++;
        if (quizCount >= totQuizPerSession) displayQuizResult();
    }
};

const checkAnswer = function () {
    answerBtnEl.addEventListener('click', markQuestion);
};

/**
 * Function takes the quiz level and question ID and updates their used attribute to true. This prevents the question from being selecetd again.
 * @param {*} quizLevel 
 * @param {*} id 
 */
const updateMasterDatabase = function (quizLevel, id) {
    quizLevel === "professional" ? professionalData[id].used = true : amateurData[id].used = true;
};

/**
 * 
 * @returns Check if user has already submitted answer, this is by checking if the Submit Answer Button has pointer disabled
 */
const checkAlreadySubmitted = () => {
    return answerBtnEl.style.pointerEvents === 'none' ? true : false;
};

/**
 * Function to check if user has submitted answer, if so display next question
 */
const getNextQuestion = function () {
    nextQuiz.addEventListener('click', function () {
        // check if user has answered the question before clicking next or user just desires to leave that question unanswered.
        // The app will permit the user to go next question after confirmation.
        if (!checkAlreadySubmitted()) {
            functionConfirm("You clicked Next Question without answering this current question. Are you sure you want to skip this question?",
                function yes() {
                    getAndDisplayQuiz();
                },
                function no() {
                    return;
                });
        } else {
            getAndDisplayQuiz();
        }

    });
};

/**
 * function to return the total correct and total wrong answers. This is just a demo of ability to do this. The actual final
 * result is obtained from our global variables of totAmateurCorrect and totProfCorrect which the user cannot change in the browser.
 * @returns an array of the correct and wrong answer totals
 */
const getTotalfromEl = () => {
    let correctAns = Number(correctAnswerEl.textContent);
    if (isNaN(correctAns)) correctAns = 0;
    let wrongAns = Number(wrongAnswerEl.textContent);
    if (isNaN(wrongAns)) wrongAns = 0;
    return [correctAns, wrongAns];
};

/**
 * Function to aggregate the correct and wrong answers and display to the user
 * @param {Boolean value if true then correct answer tally else wrong answer tally} correct 
 */
const totalAnswers = function (correct) {
    // destructure the array and get the individual items
    let [correctAns, wrongAns] = getTotalfromEl();
    correct ? correctAnswerEl.textContent = ++correctAns : wrongAnswerEl.textContent = ++wrongAns;
    // disable answer button to prevent submitting more than once
    disableAnswerOptionsAndSubmit();
};

/**
 * Disable user from clicking an answer option and submit answer button after submission
 */
const disableAnswerOptionsAndSubmit = () => {
    answerOptionsBox.forEach(option => option.style.pointerEvents = 'none');
    disableAButton(answerBtnEl);
};

/**
 * Enable user to click an answer option and submit answer button after display of question
 */
const enableAnswerOptionsAndSubmit = () => {
    answerOptionsBox.forEach(option => option.style.pointerEvents = 'auto');
    enableCommandBtn(answerBtnEl);
};

/**
 * Function to display the time remaining for the quiz. The total seconds is read from the config.js
 * Ideas and code snippets from Jonas Schmedtmann @ Udemy Javascript class. If the timer was running before, reset it before 
 * starting a new timing (e.g when the quiz is restarted)
 * @returns 
 */
const startQuizTimer = function () {
    const tick = function () {
        const hour = String(Math.trunc(time / 3600)).padStart(2, 0);
        const min = String(Math.trunc((time % 3600) / 60)).padStart(2, 0);
        // const min = String(Math.trunc(time / 60)).padStart(2, 0);
        const sec = String(time % 60).padStart(2, 0);
        // In each call, print the remaining time to UI, include hour if it is greater than 0
        hour > 0 ? timerEl.textContent = `${hour}:${min}:${sec}` :
            timerEl.textContent = `${min}:${sec}`;

        // When 0 seconds, stop timer and display performance
        if (time === 0) {
            displayQuizResult();
            clearInterval(timer);
        }
        // Decrease 1s
        time--;
    };
    // Call the timer every second
    tick();
    const timer = setInterval(tick, 1000);
    return timer;
};
/**
 * Event listenere to close modal window. 
 */
const closeExplanationModal = function () {
    closeExplainBtnEl.forEach(btn => btn.addEventListener('click', function () {
        explanationModalEl.style.display = 'none';
    }));
};
closeExplanationModal();

/**
 * Event listener for the View Explanation of Answer button.
 * Checks if answer is submitted before displaying the explanation
 */
explanationBtnEl.addEventListener('click', function () {
    // Check if user has submitted answer before permitting view of explanation
    if (!checkAlreadySubmitted()) {
        alertMe("Please submit your answer before checking the explanation"),
            function yes() {
                return;
            };
        return;
    }
    explanationModalEl.style.display = 'block';
    // display the question and answer
    const questionId = Number(question.dataset.quizId);
    const quizLevel = question.dataset.quizLevel;
    explanationQuestionEl.textContent = quizLevel === "professional" ? professionalData[questionId].question : amateurData[questionId].question;
    answerExplanationEl.textContent = quizLevel === "professional" ? professionalData[questionId].explan : amateurData[questionId].explan;
});

/**
 * Event listener for the display of Detailed Instruction. It reuses the modal window for the Explanation of answer.
 */
detailedInstructionEl.addEventListener('click', function () {
    explanationModalEl.style.display = 'block';
    explanationQuestionEl.textContent = "Detailed Instructions";

    answerExplanationEl.textContent = "";
    // Check if a result div has already exists and remove it
    const explainDiv = document.createElement('div');
    const divExists = answerExplanationEl.firstChild;
    if (divExists) {
        if (answerExplanationEl.firstChild.localName === 'div') {
            answerExplanationEl.firstChild.remove();
        }
    }
    explainDiv.innerHTML = playInstruction;
    explainDiv.textAlign = 'center';
    answerExplanationEl.insertAdjacentElement('afterbegin', explainDiv);
    closeExplanationModal();
});

/**
 * Function to play the alert sounds in the application
 * @param {*} type determines the sound to play for correct, wrong or win.
 */
const playSound = function (type) {
    if(soundSwitchValue.textContent==="ON"){
        switch (type) {
            case 'correct': {
                correctAudioEl.play();
                break;
            }
            case 'wrong': {
                wrongAudioEl.play();
                break;
            }
            case 'win': {
                winAudioEl.play();
            }
        }
    }
};

/**
 * Event function for restarting the quiz. Makes all questions eligible to be selected by marking used property as false in the model;
 * Restarts the totalling of correct and wrong answer
 * displays a new question
 * restarts the quiz timer
 */
restartQuiz.addEventListener('click', function () {
    functionConfirm("Confirm restarting the Quiz, your scores would be reset to zero and timer will restart?",
        function yes() {
            professionalData.filter(data => data.used).forEach(el => el.used = false);
            amateurData.filter(data => data.used).forEach(el => el.used = false);
            //restart numbering
            correctAnswerEl.textContent = 0;
            wrongAnswerEl.textContent = 0;
            // display new question
            quizCount = 0;
            // restart correct answer counts
            totProfCorrect = 0;
            totAmateurCorrect = 0;
            // restart the quiz number of questions count
            totProfQuiz = 0;
            totAmateurQuiz = 0;
            totProfQuizEl.textContent = 0;
            totAmateurQuizEl.textContent = 0;
            quizLevel.forEach(btn => btn.style.pointerEvents = 'auto');
            getAndDisplayQuiz();
            // restart timer
            alertMe("Quiz has restarted"),
                function yes() {};
            // restart the quiz timer to timout value
            if (time <= 0) {
                // means time ran out the last session and clearInterval was called, need to invoke the startQuizTimer() again
                time = quizTimeout;
                startQuizTimer();
            } else {
                time = quizTimeout;
            }
            return true;
        },
        function no() {});
});

/**
 * Function to compute and display the quiz result in a modal window. I'm reusing the modal window for explanation of answer 
 */
const displayQuizResult = function () {
    const resultDiv = document.createElement('div');
    const [correctAns, wrongAns] = getTotalfromEl();
    let result = `
    <p>Total questions answered correctly: <span class="red-text">${correctAns}</span></p>
    <p>Total wrong answers: <span class="red-text">${wrongAns}</span></p>
    <p>Total Professional Questions answered correctly: <span class="red-text"> ${totProfCorrect}</span></p>
    <p>Total Amateur Questions answered correctly: <span class="red-text">${totAmateurCorrect}</span></p>
    <p>Total questions in quiz: <span class="red-text">${totQuizPerSession}</span></p>
    <p>Percent obtained: <span class="red-text">${totAmateurCorrect* amateurMarkPerQuiz + totProfCorrect* profMarkPerQuiz}%</span></p>
    <p>Pass Cut Off Percentage: <span class="red-text">${passCutOffMark}%</span></p>`;

    if ((totAmateurCorrect * amateurMarkPerQuiz + totProfCorrect * profMarkPerQuiz) >= passCutOffMark) {
        result += ` <p>Final Grade: <span class="green-text"><em>PASS</em></span></p>`;
        playSound('win');
    } else {
        result += ` <p>Final Grade: <span class="red-text"><em>FAIL</em></span></p>`;
    }
    resultDiv.innerHTML = result;
    resultDiv.style.textAlign = 'center';
    explanationModalEl.style.display = 'block';
    explanationQuestionEl.textContent = "Quiz Result";
    // clear any existing content on the div
    answerExplanationEl.textContent = "";
    // Check if a result div has already exists and remove it
    const divExists = answerExplanationEl.firstChild;
    if (divExists) {
        if (answerExplanationEl.firstChild.localName === 'div') {
            answerExplanationEl.firstChild.remove();
        }
    }
    answerExplanationEl.insertAdjacentElement('afterbegin', resultDiv);
    closeExplanationModal();
    viewResultBtnEl.style.display = "inline";
    //disable next question and view answer buttons
    disablebCommandBtns();
    disableAnswerOptionsAndSubmit();
};

viewResultBtnEl.addEventListener('click', () => {
    displayQuizResult();
});

/**
 * Disable all buttons after displaying result except the explanation, restart quiz and view result button
 */
const disablebCommandBtns = () => {
    disableAButton(nextQuiz);
    disableAButton(explanationBtnEl);
    disableAButton(answerBtnEl);
    // disable the change of quiz level until a restart
    quizLevel.forEach(btn => btn.style.pointerEvents = 'none');
};

const disableAButton = (button) => {
    button.style.pointerEvents = 'none';
    button.style.border = '3px solid #0f0b49';
};

/**
 * Enable command buttons after starting to display questions
 */
const enableCommandBtns = () => {
    enableCommandBtn(nextQuiz);
    enableCommandBtn(explanationBtnEl);
    enableCommandBtn(answerBtnEl);
};

const enableCommandBtn = (button) => {
    button.style.pointerEvents = 'auto';
    button.style.border = '2px solid rgb(202, 110, 182)';
};

/**
 * Confirmation window using jQuery 3.6
 * @param {*} msg Message to be displayed
 * @param {*} myYes the function to excute if user clicks the Yes button
 * @param {*} myNo the function to execute if user clicks the No button
 */
// https://www.tutorialspoint.com/How-to-create-a-dialog-with-yes-and-no-options-in-JavaScript
const functionConfirm = function (msg, myYes, myNo) {
    let confirmBox = $("#confirm");
    confirmBox.find(".confirm-message").text(msg);
    confirmBox
        .find(".confirm-yes,.confirm-no")
        .unbind()
        .click(function () {
            confirmBox.hide();
        });
    confirmBox.find(".confirm-yes").click(myYes);
    confirmBox.find(".confirm-no").click(myNo);
    confirmBox.show();
};

/**
 * Alert window using jQuery 6.0
 * @param {} msg he message to alert the user
 * @param {*} myYes the function to execute after user clicks Ok
 */
const alertMe = (msg, myYes) => {
    const alertBox = $("#alert");
    alertBox.find(".confirm-message").text(msg);
    alertBox
        .find(".confirm-ok")
        .unbind()
        .click(function () {
            alertBox.hide();
        });
    alertBox.find(".confirm-ok").click(myYes);
    alertBox.show();
};

//when the image is clicked, toggle the animatation of the football image
logoImg.addEventListener('click', function () {
    logoImg.classList.toggle("animate");
});

// toggle play of sound ON / OFF as user clicks the Sound: button
soundSwitch.addEventListener('click', function (e) {
    if (soundSwitchValue.textContent === "OFF") {
        soundSwitchValue.textContent = "ON";
        playSound('correct');
    } else {
        soundSwitchValue.textContent = "OFF";
    }
});