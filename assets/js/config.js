/*jshint esversion: 6 */
"use strict";
// The Config.js contains all static variables required for smooth functioning of the site. 
// It also contains the detailed instruction to be displayed when the user desires to do so
export const QUIZ_TIMEOUT_SEC = 480;
export const TOTAL_QUESTIONS_PER_SESSION = 10;
export const PROFESSIONAL_MARK_PER_QUESTION = 10;
export const AMATEUR_MARK_PER_QUESTION = 6.5;
export const MIN_USER_LENGTH = 3;
export const TOTAL_ANSWER_OPTIONS = 4;
export const PASS_CUTOFF_MARK = 60;
export const MAX_AMATEUR_QUIZ = 8;  //If user answers 8 amateur questions force user to professional
export const PLAY_INSTRUCTION = `<p>The Quiz is composed of two levels, the Amateur and the Professional. 
The difference between the two is that the professional has more difficult to guess questions. Each Amateur question is 6.5 marks
while each professional question is 10 marks. To pass the quiz you must answer at least 2 professional question correctly.
Click on the desired level of play and a question will be loaded automatically.<br><br>
Click on your answer choice and the Submit Answer button to get the Guru to mark your submission.<br></p><p>
If your answer is correct, the total correct answer is incresed by 1 and if wrong, the wrong answers is increased by 1.
You can click on the view answer explanation button to see full details of the answer. 
However, this is only possible after you have submitted your own answer.</p><br> <p>
The quix is timed. The remaining time is displayed to give you an idea of how you are coping with time. When the given time has elapsed, the quiz will end 
and a percentage score is displayed. A sound is made at each correct or wrong answer submitted. If you attain the pass mark, a pleasing clap soud will be played. 
</p><br>You are permitted to move to next question without attempting the current question if you desire, however 
the Guru will request a confirmation that you wish to proceed to the next question. <p>If you answer 8 Amateur questions, the Guru will switch you over to Professional level.
</p><p>You may click on the football image to see it animated.</p>` ; 
