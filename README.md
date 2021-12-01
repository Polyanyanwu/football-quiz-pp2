
# The Football Guru Website 
[Hosted Live Here](https://polyanyanwu.github.io/football-quiz-pp2/)

The application intends to present an interactive football quiz application to test the knowledge of the user on football facts. The application shall present a question and four clickable options of answers. There shall be a button to click for Instructions; once clicked the instructions will pop up as a modal window, after reading the user closes it. There will be a button to reveal the answer after the user has guessed and it is scored. The revealed answer will provide explanations of the answer to educate the user. The user wins if he answers up to 70% of the questions correctly. The user is timed and if the time elapses the quiz is stopped, marked and the percentage score revealed to the user.


![Site Image on Different Screens](/docs/pp1_image.png)
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

## Features of the Site
The Site is is presented in three sections:
### 1. The Header


### 3. The Question & Answer Area


### 4. The Footer Area

### 5. Pop Up Modal Windows Used
    


### 6. The Footer Section
The footer has the links to take the user back to any of the three main sections of the site. In addition, the Contact us part of the footer has the icons that links the user to the social network of the site designer.



### Features Left to Implement


## Testing
* ### Image and Information Rendering

    I noticed that the banner image was not displaying when I deployed to Github pages. The issues was traced to a broken URL due to change of the banner display from background image to use of img element without adjusting the source accordingly. The source was adjusted to the correct URL and the image started displaying.

* ### Validity of the HTML

    The HTML text was validated using [W3C Markup Validation Service](https://validator.w3.org/). It was realized that the HTML had few errors, which were identified and fixed as shown below:

    ![HTML Validation Result](/docs/html_validation.png)

    The errors due to few missing tags in the cause of rearrangement of elements were identified and corrected. After that the html validated without any errors.

* ### Validity of the CSS

    The CSS text was validated using [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/validator). It was realized that the CSS had two errors, which were identified and fixed as shown below: The first error 0.5% 1% 0.5 1% for padding was resolved by using the shorthand 0.5% 1% and the second error was resolved by deleting the 0.

    ![CSS Validation Result](/docs/css_validation.png)

* ### Accessibility & Performance Testing

    Performance test was carried out using Lighthouse tool provided by the Chrome Development tool. Initial performance result pointed to deficiencies in the size and type of images on the site - most were .jpg and .png. The images were converted to .webp using  [cloud convert](https://cloudconvert.com/) and then  [tiny png](https://tinypng.com/) was used to compress the images further. Issue of non-caching of static images was also observed. Cache Control was added to the header with properties content="max-age=31536000" and content="public". After these changes to the images and caching, the Lighthouse produced the result below:
    ![Performance Result](/docs/performance_test.png)


* ### Browser Compatibility 

    The website was tested with the major browsers available and found to work as expected: Chrome, Firefox, Safari, and Microsoft Edge. It was while testing on Safari on the Iphone that I noticed that the .mp4 videos were not playing. To resolve this I had to specify the type="video/mp4", gave it an autoplay and mute attribute in order to have the video show a picture instead of being blank. However, the mute attribute ensures the voice is not out until the user chooses to hear it. Apart from the iPhone, Android phones had no issues with playing the videos.

* ### Accessibility with Different Device Widths

    Using the Chrome Development tools, the responsiveness of the site to various screen sizes was simulated. This led to the adjustment of the CSS until the site supports numerous device widths from the smallest hand held devices to full computer monitor screens.
    ![Responsive Screens](/docs/various_screen_sizes.png)
    The first image above shows a full screen of two image columns and two video columns dsiplayed on a laptop computer screen. The images below the laptop screen are simulations on the ipad - portrait (with single image column) and small screen of Moto G4 and Iphone X displaying single column for both video and images.

* ### Bugs
As expected for projects of this nature several bugs were identified in the cause of the impleentation and fixed accordingly.

## Deployment
The site was deployed to GitHub pages. The following steps were used to effect the deployment:
1. In the GitHub click on repositories, and select yam-festival-pp1
2. Click on the Settings tab
3. From the settings page, click on Pages
4. In the source section drop-down menu, select the Main Branch
5. Once the Main branch has been selected, the page will be refreshed with a detailed ribbon display to indicate the successful deployment.
6. The live site can be found at [New Yam Festival] (https://polyanyanwu.github.io/yam-festival-pp1/)

## Credits
### i. Design


### ii. Content

    
The icons in the footer were copied from the Font Awesome.
### iii. Media


    
    Thanks to God and my family for their support and understanding while I stayed hours on the Laptop.
