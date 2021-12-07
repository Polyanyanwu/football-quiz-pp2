
# The Football Guru Website 
[Hosted Live Here](https://polyanyanwu.github.io/football-quiz-pp2/)

The application intends to present an interactive football quiz application to test the knowledge of the user on football facts. The application shall present a question and four clickable options of answers. There shall be a button to click for Instructions; once clicked the instructions will pop up as a modal window, after reading the user closes it. There will be a button to reveal the answer after the user has guessed and it is scored. The revealed answer will provide explanations of the answer to educate the user. The user wins if he scores up to 70% of the questions correctly. The user is timed and if the time elapses the quiz is stopped, marked and the percentage score revealed to the user automatically. The quiz has two levels - Professional and Amateur. Each professional question has a score of 10 marks while ecah amateur question has a score of 6.5 marks. To pass the quiz its more efficient to answer the professional questions. The user must answer at least two professional questions correctly in order to pass the quiz. A mockup of the application is displayed below.


![Site Image Mockup of Different Screens](/docs/guru_display.png)
## User Stories
* As a person desirous to know football and its facts I want an interactive application so that I could test my knowledge of football and be guided when I don’t know the answer.
* As a user of the application, I want to be given the option to interact as an amateur or a professional so that I could test my knowledge as desired.
* As a user of the application, I want to be notified by sound and words when I guess the correct or incorrect answer.
* As a user, I want to know my overall percentage score at the end of the quiz.

## Design of the Site
I intended to have a one-page website with modal window pop ups that provide feedbacks and other necessary information like the explanation of answers, entry of username and detailed instructions for the quiz.  The Wireframe for the site is shown below.
![Design of Wireframe](/docs/football_quiz_wireframe.png)

## Technologies Used
The visual aspectes of the site was done with the HTML and CSS while the interactivity was achieved using JavaScript. The font images were from Font Awesome. The JavaScript was organised into three different files:
1. The Config.js contains the constants that drive the limits used for the site; e.g. Total Number of Qustions per session; time duration for the quiz; total answer options, etc. These config variables enable the change of these variables that determine the overal actions on the site from a central point.
2. The model.js contains the database of the questions modeled with an array of footbal question and answer objects. There are two arrays; one for the amateur and another for the professional options.
3. The controller.js is where the application logic is implemented; it importas data from the config.js and the model.js.

While testing the application and its appeal I got dissatisfied with the default Confirm and Alert windows provided by the JavaScript. This led to the use of jQuery library 3.6.0 <code>cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js</code> to display customised confirmation modal and alert windows.

## Features of the Site
The Site is is presented in three areas:
### 1. The Header
![Header Area of the Application](/docs/header-area.png)

The Header contains a football logo, title of the page and the user that logged in. It also contains the two buttons to enable selection of the Professional or Amateur level of the quiz. 


### 3. The Question & Answer Area
This is the main area of the page having a question displayed, the instruction to select only one answer; the link to the Detailed Instructions; the answer options and the command buttons to enable Submit Answer, Next Question, Explanation of Answer and Restart Quiz. It also has the feedback on the total questions answered correctly or wrongly.

![The Question & Answer Area](/docs/question_area.png)

When an answer option is clicked, the background and foreground color changes to give visual effect of the selected option. Clicking on the Submit Answer button will check correctness of the answer;  make a sound to alert the user and display the incremented total correct or wrong answers accordingly. If a user clicks Submit Answer button without fist selecting an option, the Guru will respond with an alert <em> Please chose an answer before clicking submit answer</em>.

After submitting the answer, the user could click on View Explanation of Answer button to get a detailed explanation of the answer. The user must have submitted the answer first if not an alert is displayed requesting the user to <em>Please submit your answer before checking the explanation</em>

![The Answer Explanation](/docs/answer_explanation.png)

The user clicks on the Next Question button to navigate to the next random question from the system. The question is picked randomly from the quiz level database that the user currently selected. If a user clicks on the Next Question without submitting answer for the currently displayed question, a Confirmation message is displayed to ensure the user really want to navigate to another question. If the user clicks Ok, the next question is displayed, if not no action is taken.

The Restart the Quiz button enables the user to restart the quix at any time deemed necessary. A confirmation window is displayed requesting <em>Confirm restarting the Quiz, your scores would be reset to zero and timer will restart?</em> If the user clicks Yes, the quiz is restarted if No is clicked user returns to continue the quiz without restarting. If the Yes confirmation was clicked, an alert is displayed informing the user that the quiz has restarted.
![The Restart Quiz Confirmation Alert](/docs/alert.png)

### 6. The Footer Section
The footer has the Contact us icons that links the user to the social network of the site designer.

### Features Left to Implement
The application is usable as it is but has limited set of questions. An API could be developed to enable interested persons contribute questions to the database. This would then require a proper database and not an array of structures as is the case here.

## Testing

* ### Validity of the HTML

    The HTML text was validated using [W3C Markup Validation Service](https://validator.w3.org/). The validator warned about a section element not having any h1 to h6 header at the Audio and Footer elements. These were changed to div elements and the resultant html had no further warnings nor errors as shown below:

    ![HTML Validation Result](/docs/html_validation.png)

* ### Validity of the CSS

    The CSS text was validated using [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/validator). The CSS had no errors and one warning. The warning was due to the validator unable to check the Google fonts that were imported into the css.
    ![CSS Validation Result](/docs/css_validation.png)

* ### Validity of the JavaScript
    The three JavaScript files in the application were validated using the JSHINT.
    ####    <b>1. The controller.js </b>
        The controller was tested using [JSHINT](https://jshint.com/). To elminate known warnings with the JSHINT I added the following 
        /*jshint esversion: 6 */ for the EMS6 to accept const and other EMS6 features used
        /*jshint -W030 */ //ignore warnings due to use of tenary operator
        /*globals $:false */ // accept $ as global variable while testing with jshint
        I ended up with the following jshint output:
    ![JSHINT Validation Result for controller.js](/docs/controller_jshint.png)
    #### <b>2. The model.js and config.js</b>
        Both the model.js had only the warning about the use of Strict Mode.
    ![JSHINT Validation Result for model.js](/docs/model_jshint.png)

    #### <b>3. The model.js and config.js</b>
      The config.js also only had the warning about the use of Strict Mode.
    ![JSHINT Validation Result for config.js](/docs/config_jshint.png)

* ### Accessibility & Performance Testing

    Performance test was carried out using Lighthouse tool provided by the Chrome Development tool.  The background and logo images were converted to .webp using  [cloud convert](https://cloudconvert.com/) and then  [tiny png](https://tinypng.com/) was used to compress the images further. Cache Control was added to the header with properties content="max-age=31536000" and content="public" to enhance performance. The Lighthouse produced the result below:
    ![Performance Result](/docs/lighthouse.png)


* ### Browser Compatibility 

    The website was tested with the major browsers available and found to work as expected: Chrome, Firefox, Safari, and Microsoft Edge.

* ### Accessibility with Different Device Widths

    Using the Chrome Development tools, the responsiveness of the site to various screen sizes was simulated. This led to the adjustment of the CSS until the site supports numerous device widths from the smallest hand held devices to full computer monitor screens.

* ### Functionality Test

    Guided by the User Story and application design, extensive tests of the functionality was carried out. The detailed test script and result is available at  [Functionality Test](docs/Testing.md)

* ### Bugs
    As expected for projects of this nature several bugs were identified in the cause of the impleentation and fixed accordingly.
    1. Submit Answer had two issues. The first one was it tried to process the submission even when an answer had not been selected. This was resolved by first checking that one of the Options has the "option-selected" class before processing the submission, if not an alert message is displayed for the user to first select and answer before submitting. The second issue was submitting the same answer more than once. The solution was disabling click on the div was being used as the Submit Answer and re-enabling it when a new question is loaded.
                
    2. The timer for tracking the elapsed time for the quiz kept running even after getting to 0 secods left. It was resolved by calling the function clearInterval().

    3. It was challenging to get the Font Awesome to be displayed for the marking of the correct answer with a √ and wrong answer with an x. To resolve this I had to setup two divs' having the two Font Awesome for each answer option and used CSS class to control the display from JavaScript.

    4. It was observed that the user could still click on answer options after the submission of the answer. This was not desirable and was removed by adding a function to disable clicks on the divs containing the answer options after a user had submitted. The divs are enabled when a new question is loaded.
    5. Modal content was not scrolling when desired on small screens, the scroll ability was added by setting overflow-y property on the modal and modal content.
    6. When a user clicks the View Result button, the previous result displayed was not cleared resulting into multiple display of the result. The fix was to remove the div element I was inserting for the result, if it exists, before inserting a new div.
    7. The audio alert was done with new audio() statement in the JavaScript. This didn't work in the Chrome browser, it was fixed by creating audio elements in the html and playing from the JavaScript.
    8. After restarting the quiz the timer runs both the old and new timer displaying confusing numbers; fixed by creating a global duration time variable  and reseting it to 0 during quiz resets.
    9. Number of professional and amature questions not reseting to 0 after resetting the quiz; resolved by assigning the variables holding the count to zero and displaying them on the DOM element after a restart of the quiz. 

## Deployment
The site was deployed to GitHub pages. The following steps were used to effect the deployment:
1. In the GitHub click on repositories, and select yam-festival-pp1
2. Click on the Settings tab
3. From the settings page, click on Pages
4. In the source section drop-down menu, select the Main Branch
5. Once the Main branch has been selected, the page will be refreshed with a detailed ribbon display to indicate the successful deployment.
6. The live site can be found at [New Yam Festival] (https://polyanyanwu.github.io/football-quiz-pp2/)

## Credits
### i. Design


### ii. Content

    
The icons in the footer were copied from the Font Awesome.
### iii. Media


    
    Thanks to God and my family for their support and understanding while I stayed hours on the Laptop.
