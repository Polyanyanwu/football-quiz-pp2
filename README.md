# Name of the Project <a id="name-of-project"></a>
## **The Football Guru** 
## Live Site <a id="live-site"></a>
[Hosted Live Here](https://polyanyanwu.github.io/football-quiz-pp2/)
## Repository

[View Repository Here](https://github.com/Polyanyanwu/football-quiz-pp2)

***

## Table of Contents

- [Name of the Project](#name-of-project)
- [Live Site](#live-site)
- [Introduction](#introduction)
    - [Objectives](#objective)
    - [Goals of the Project](#goals)
    - [Target Audience](#target-audience)
- [User Experience Design](#user-experience)
    - [User Stories](#user-stories)
    - [Wireframe](#wireframe)
    - [Color Scheme](#color-scheme)
    - [Flowchart](#flowchart)
- [Technologies Used](#technologies-used)
    - [HTML & CSS](#html-css)
    - [Google fonts & Font awesome](#fonts)
    - [jQuery](#jquery)
- [Features of the Site](#features-of-the-site)
    - [The Header](#the-header)
    - [The Question & Answer Area](#question-answer)
    - [The Footer Section](#footer)
    - [Features Left to Implement](#features-left)
- [Testing](#testing)
    - [Validity of the HTML](#html-validity)
    - [Validity of the CSS](#css-validity)
    - [Validity of the JavaScript](#javascript-validity)
    - [Accessibility & Performance Testing](#performance-testing)
    - [Browser Compatibility](#browser-compatibility)
    - [Accessibility with Different Device Widths](#accessibility)
    - [Functionality Test](docs/Testing.md)
    - [Bugs](#bugs)
- [Deployment](#deployment)
- [Credits](#credits)
    - [Content](#content)
    - [Media](#media)
    - [Acknowledgements](#acknowledgements)

## **Introduction** <a id = "introduction"></a>
### **Objectives** <a id = "objective"></a>
The application intends to present an interactive football quiz application to test the knowledge of the user on football facts. The application shall present a question and four clickable options of answers. There shall be a button to click for Instructions; once clicked the instructions will pop up as a modal window, after reading the user closes it. There will be a button to reveal the answer after the user has guessed and it is scored. The revealed answer will provide explanations of the answer to educate the user. The user wins if he obtains a mark of 70 and above. The user is timed and if the time elapses the quiz is stopped, marked and the percentage score revealed to the user automatically. The quiz has two levels - Professional and Amateur. Each professional question is awarded 10 marks while each amateur question is 7.5 marks. To pass the quiz its more efficient to answer the professional questions. The user may pass by answering all 8 Amateur questions correctly. After the 8th question, the user is switched automatically to the professional level. A mockup of the application is displayed below.

![Site Image Mockup of Different Screens](/docs/guru_display.png)

### Goals of the Project <a id = "goals"></a>
- Test the user's knowledge of soccer/football.
- Educate the user on details of answers to questions to enhance learning.
- Celebrate the user if a pass is attained.
- Give the user options to earn higher marks by playing at professional level.
- Provide feedbacks to guide the user experience.

### Target Audience <a id = "terget-audience"></a>
I intend the application to be useful to any lover of football or anyone desirous of learning football. A novice in football would be able to guess the answers and after that obtain explanation of the answers to the question and be educated. 

<div id="user-experience"></div>

## **User Experience Design** 
<div id="user-stories"></div>

### **User Stories** 
* As a person desirous to know football and its facts I want an interactive application so that I could test my knowledge of football and be guided when I don’t know the answer.
* As a user of the application, I want to be given the option to interact as an amateur or a professional so that I could test my knowledge as desired.
* As a user of the application, I want to be notified by sound and words when I guess the correct or incorrect answer.
* As a user, I want to know my overall score at the end of the quiz.

<div id="wireframe"></div>

### **Wireframe - Design of the Site**
The application is a one-page website with modal window pop ups that provide feedbacks and other necessary information like the explanation of answers, entry of username and detailed instructions for the quiz.  The Wireframe for the site is shown below.
![Design of Wireframe](/docs/football_quiz_wireframe.png)

In the course of the application development few other features not shown on the wireframe were added - the button to enable the user allow or disallow the sound effects, display of the number of questions from each level and a button to view result again after the initial display of the result. 

<div id= "color-scheme"></div>

### **Colour Scheme**
I chose an off white patterned background image for the entire page from [Toptal](https://www.toptal.com/designers/subtlepatterns/) and then used [Coolors](https://coolors.co/) to generate a colour scheme for the site.

![Colour Scheme](/docs/color-scheme.png)

The navigation bar that has the quiz levels and sound on/off button used three of the colors in the scheme to form a gradient background image that was also used at the footer.

<div id="flowchart"></div>

### **Logic Flowchart**

I created a flowchart that guided the coding of the logic in the JavaScript. The flowchart is given below:
![Logic Flowchart](/docs/flowchart.png)

The flowchart represents about 90% of the application logic. Some issues that came up in the course of testing led to addition of few other logic:
- the switching to professional level if user has answered 8 amateur questions;
- the button to enable the user use sound effect;
- the disabling of command buttons to force the user to act as desired in all circumstances.

A screenshot of the full page opened in a laptop computer is as follows:

![Full Screen](/docs/main_page.png)

<a id = "technologies-used"></a>

## **Technologies Used**
- HTML & CSS :  <a id = "html-css"></a>
The visual aspects of the site was done with the HTML and CSS.

- JavaScript : <a id = "javascript"></a>
    The interactivity was achieved using JavaScript. 
    The JavaScript was organized into three different files:
    1. The Config.js contains the constants that drive the limits used for the site; e.g. Total Number of Questions per session; time duration for the quiz; total answer options, etc. These configuration variables enable the change of these variables that determine the overall actions on the site from a central point.
    2. The model.js contains the database of the questions modeled with an array of football question and answer objects. There are two arrays; one for the amateur and another for the professional options. It would have been good to build our model through an Application Programming Interface (API) call. However, within the time limit, I could not find an API that has questions on soccer with explanation of the answers that fits my model, hence I had to create my data model in the application.
    3. The controller.js is where the application logic is implemented; it imports data from the config.js and the model.js.

 - Font Images : <a id = "fonts"></a>
 The font images were from Font Awesome. The fonts used in the text were imported from Google Fonts.

- jQuery : <a id = "jquery"></a>
While testing the application and its appeal I got dissatisfied with the default Confirm and Alert windows provided by the JavaScript. This led to the use of jQuery library 3.6.0 <code>cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js</code> to display customized confirmation modal and alert windows.

## **Features of the Site** <a id="features-of-the-site"></a>

The application requires a Username from the user. The username is made of between 3 and 15 characters and is required. However, if a user chose not to provide a username, Guest is assigned after confirmation from the user. The Username login modal window is as follows:

![Username Login](/docs/login-screen.png)

The Site is presented in three areas:

### **1. The Header** <a id="the-header"></a>
![Header Area of the Application](/docs/header-area.png)

The Header contains a football logo, title of the page and the user that logged in. It also contains the two buttons to enable selection of the Professional or Amateur level of the quiz. A third button enables the user to switch on/off the sound played at the submission of the answers.

### **2. The Question & Answer Area** <a id="question-answer"></a>
This is the main area of the page having a question displayed, the instruction to select only one answer; the link to the Detailed Instructions; the answer options and the command buttons to enable Submit Answer, Next Question, Explanation of Answer and Restart Quiz. It also has the feedback on the total questions answered correctly or wrongly.

![The Question & Answer Area](/docs/question_area.png)

When an answer option is clicked, the background and foreground color changes to give visual effect of the selected option. Clicking on the Submit Answer button will check correctness of the answer;  make a sound to alert the user and display the incremented total correct or wrong answers accordingly. If a user clicks Submit Answer button without fist selecting an option, the Guru will respond with an alert <em> Please chose an answer before clicking submit answer</em>.

A user may opt to click on <em>Click for Detailed Instructions</em> at any time to read the detailed instructions for the quiz.

![Detailed Instructions](/docs/detailed_instruction.png)

After submitting the answer, the user could click on View Explanation of Answer button to get a detailed explanation of the answer. The user must have submitted the answer first if not an alert is displayed requesting the user to <em>Please submit your answer before checking the explanation</em>

![The Answer Explanation](/docs/answer_explanation.png)

The user clicks on the Next Question button to navigate to the next random question from the system. The question is picked randomly from the quiz level database that the user currently selected. If a user clicks on the Next Question without submitting answer for the currently displayed question, a Confirmation message is displayed to ensure the user really want to navigate to another question. If the user clicks Ok, the next question is displayed, if not no action is taken.

The quiz is switched to professional level automatically if a user has answered 8 amateur questions. 

The Restart the Quiz button enables the user to restart the quiz at any time deemed necessary. A confirmation window is displayed requesting <em>Confirm restarting the Quiz, your scores would be reset to zero and timer will restart?</em> If the user clicks Yes, the quiz is restarted if No is clicked user returns to continue the quiz without restarting. If the Yes confirmation was clicked, an alert is displayed informing the user that the quiz has restarted.
![The Restart Quiz Confirmation](/docs/confirmation.png)
![The Restart Quiz Confirmation Alert](/docs/alert.png)

The score of the quiz is computed automatically after the user submits the 10th answer or when the time for the quiz has elapsed. A pop up window gives the computed scores as given below:

![Quiz score](/docs/quiz-result.png)

### **3. The Footer Section** <a id="footer"></a>
The footer has the Contact us icons that links the user to the social network of the site designer.

### **Features Left to Implement** <a id="features-left"></a>
The application is usable as it is but has limited set of questions. An API could be developed to enable interested persons contribute questions to the database. This would then require a proper database and not an array of structures as is the case here.

## **Testing** <a id="testing"></a>

* ### Validity of the HTML <a id="html-validity"></a>

    The HTML text was validated using [W3C Markup Validation Service](https://validator.w3.org/). The validator warned about a section element not having any h1 to h6 header at the Audio and Footer elements. These were changed to div elements and the resultant html had no further warnings nor errors as shown below:

    ![HTML Validation Result](/docs/html_validation.png)

* ### Validity of the CSS <a id="css-validity"></a>

    The CSS text was validated using [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/validator). The CSS had no errors and one warning. The warning was due to the validator unable to check the Google fonts that were imported into the css.
    ![CSS Validation Result](/docs/css_validation.png)

* ### Validity of the JavaScript <a id="javascript-validity"></a>
    The three JavaScript files in the application were validated using the JSHINT.
    ####    <b>1. The controller.js </b>
    The controller was tested using [JSHINT](https://jshint.com/). To eliminate known warnings with the JSHINT I added the following 

    - /*jshint esversion: 6 */ for the ES6 to accept const and other ES6 features used
    - /*jshint -W030 */ //ignore warnings due to use of ternary operator
    - /*globals $:false */ // accept $ as global variable while testing with jshint

    I ended up with the following jshint output:

    ![JSHINT Validation Result for controller.js](/docs/controller_jshint.png)
    #### <b>2. The model.js</b>
    The model.js had only one warning about the use of Strict Mode.
    ![JSHINT Validation Result for model.js](/docs/model_jshint.png)

    #### <b>3. The config.js</b>
    The config.js also had only the warning about the use of Strict Mode.
    ![JSHINT Validation Result for config.js](/docs/config_jshint.png)

* ### **Accessibility & Performance Testing** <a id="performance-testing"></a>

    Performance test was carried out using Lighthouse tool provided by the Chrome Development tool.  The logo image was converted to .webp using  [cloud convert](https://cloudconvert.com/) and then  [tiny png](https://tinypng.com/) was used to compress the image further. Cache Control was added to the header with properties content="max-age=31536000" and content="public" to enhance performance. The Lighthouse produced the result below:
    ![Performance Result](/docs/lighthouse.png)


* ### **Browser Compatibility**  <a id="browser-compatibility"></a>

    The website was tested with the major browsers available and found to work as expected: Chrome, Firefox, Safari, and Microsoft Edge.

* ### **Accessibility with Different Device Widths** <a id="accessibility"></a>

    Using the Chrome Development tools, the responsiveness of the site to various screen sizes was simulated. In addition I used all the smart phones in my family to test the responsiveness - iPhone 12, Samsung Fold3 (small and big screen), Samsung A3 and iPad. This led to the adjustment of the CSS until the site supports numerous device widths from the smallest hand held devices to full computer monitor screens.

* ### **Functionality Test** <a id="functionality-test"></a>

    Guided by the User Story and application design, extensive tests of the functionality was carried out. The detailed test script for the user story and result is available at [Functionality Test](docs/Testing.md). The test was continuous and led to the finding and fixing of several bugs detailed in the Bugs section below.

* ### **Bugs** <a id="bugs"></a>
    As expected for projects of this nature several bugs were identified in the cause of the implementation and fixed accordingly.

    1. Submit Answer had two issues. The first one was it tried to process the submission even when an answer had not been selected. This was resolved by first checking that one of the Options has the "option-selected" class before processing the submission, if not an alert message is displayed for the user to first select and answer before submitting. The second issue was submitting the same answer more than once. The solution was disabling click on the div was being used as the Submit Answer and re-enabling it when a new question is loaded.
                
    2. The timer for tracking the elapsed time for the quiz kept running even after getting to 0 seconds left. It was resolved by calling the function clearInterval().

    3. It was challenging to get the Font Awesome to be displayed for the marking of the correct answer with a √ and wrong answer with an x. To resolve this I had to setup two divs' having the two Font Awesome for each answer option and used CSS class to control the display from JavaScript.

    4. It was observed that the user could still click on answer options after the submission of the answer. This was not desirable and was removed by adding a function to disable clicks on the divs containing the answer options after a user had submitted. The divs are enabled when a new question is loaded.
    5. Modal content was not scrolling when desired on small screens, the scroll ability was added by setting overflow-y property on the modal and modal content.
    6. When a user clicks the View Result button, the previous result displayed was not cleared resulting into multiple display of the result. The fix was to remove the div element I was inserting for the result, if it exists, before inserting a new div.
    7. The audio alert was done with new audio() statement in the JavaScript. This didn't work in the Chrome browser, it was fixed by creating audio elements in the html and playing from the JavaScript.
    8. After restarting the quiz the timer runs both the old and new timer displaying confusing numbers; fixed by creating a global duration time variable  and resetting it to 0 during quiz resets.
    9. Number of professional and amateur questions not resetting to 0 after resetting the quiz; resolved by assigning the variables holding the count to zero and displaying them on the DOM element after a restart of the quiz. 
    10. The placement of the footer at the bottom of the screen was challenging but finally resolved in the CSS by making the top of the footer 100vh.
    11. The user was able to click on the quiz level buttons after quiz had ended and continue playing. it was not desired as user should restart quiz to continue. The bug was fixed by disabling the quiz level buttons when quiz has ended and enabling them after quiz restarts.
    12. User was unable to view the last explanation of the answer after quiz has ended because the button was disabled along with other buttons. It was resolved by enabling the View Explanation Button after displaying quiz result.
    13. A user could change the displayed correct answer total from the Chrome development tool and affect the displayed total correct/wrong answer. Fixed by maitaining an internal count, which is used to overwrite the totals displayed on the DOM elements.

## **Deployment** <a id="deployment"></a>
The site was deployed to GitHub pages. The following steps were used to effect the deployment:
1. In the GitHub click on repositories, and select football-quiz-pp2
2. Click on the Settings tab
3. From the settings page, click on Pages
4. In the source section drop-down menu, select the Main Branch
5. Once the Main branch has been selected, the page will be refreshed with a detailed ribbon display to indicate the successful deployment.
6. The live site can be found at [The Football Guru](https://polyanyanwu.github.io/football-quiz-pp2/).

## **Credits** <a id="credits"></a>

### **i. Content** <a id="content"></a>
The code for the customized confirmation window was adapted from [Tutorials Point](https://www.tutorialspoint.com/How-to-create-a-dialog-with-yes-and-no-options-in-JavaScript). The CSS code for the Modal windows was adapted from [w3schools](https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal2). 

Some of the questions were copied from [Football Facts](https://www.myfootballfacts.com/question_of_the_day/best-120-football-quiz-questions-trivia-and-answers/#PL-Quiz-1), [Laws of the Game](https://drive.google.com/file/d/12czUEG7kdGvNh_vJ6MM-kas9qjsvRLqP/view), [Statista](https://www.statista.com/statistics/266464/number-of-world-cup-titles-won-by-country-since-1930/), [History](https://www.history.com/this-day-in-history/first-world-cup) and [888 Sport](https://www.888sport.com/blog/most-successful-football-club-in-england).

The background image for the entire page was downloaded from [Toptal](https://www.toptal.com/designers/subtlepatterns/).

The football logo was downloaded from [PikPng](https://www.pikpng.com/pngvi/Timbmx_soccer-ball-logo-clipart-world-cup-flag-ball/) and resized online using [online Image Resizer](https://online-image-resizer.com/).  
   
### **ii. Media** <a id="media"></a>

The icons in the footer were copied from the Font Awesome. The sounds for the correct and wrong answers were downloaded from [Epidemic Sound](https://www.epidemicsound.com/sound-effects/user-interface/). The clap sound when a user wins was downloaded from [mixkit](https://mixkit.co/free-sound-effects/clap/). 

### **iii. Acknowledgements**  <a id="acknowledgements"></a>

Credit to Code Institute for organizing two Hackathons that I attended between October and December 2021 where I learnt a lot from team members that also impacted this project. I learnt the use of Grid and color schemes from the December Hackathon event and it led to my redesign of the color scheme for this application and change of some layout using Grid.

I am grateful to my friend Dave Horrocks who took time to criticize and test the application, which led to refinement of the color theme and finding of the last two bugs.