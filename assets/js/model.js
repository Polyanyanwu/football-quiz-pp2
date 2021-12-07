/*jshint esversion: 6 */
//The model.js has the database of the professional and amateur level questions. Each level is made up of
// an array of objects (ojbects we can call question object). The structure of both the professionalData and the amateurData are the same
// the difference is that we put more difficult questions in the professional data and a user earns more marks by answering from the professional level
// Each level has a total of 12 questions and the quiz is limited to 10 questions
"use strict";
export const professionalData = [{
        id: 0, // uniquely identify this question in the professional data
        used: false, // already displayed will be true and used to filter and ensure questions are not repeated
        question: "In which country was football invented?", //the question
        option1: "England", //answer option 1
        option2: "Brazil", //answer option 2
        option3: "China", //answer option 3
        option4: "Germany", // answer option 4
        answer: "option3", //The correct answer option
        explan: "Football was invented in 476 BC in China. It was first called Cuju and was played with two teams who played the match with a ball made from an animal bladder. The aim was to use your feet to get the ball through an opening and into a net and was a form of training for the military.",
                //the explanation of the answer
    },
    {
        id: 1,
        used: false,
        question: "The quickest hat-trick in a football game was scored by:",
        option1: "Cristiano Ronaldo",
        option2: "Sadio Mane",
        option3: "Mohamed Salah",
        option4: "Leo Messi",
        answer: "option2",
        explan: "The quickest hat-trick in a football game was scored by Sadio Mane in a Southampton vs Aston Villa game in 2015, he scored all 3 goals  in 2 minutes 56 seconds.",
    },
    {
        id: 2,
        used: false,
        question: "Who holds the record for the Top African Premier League Goalscorers",
        option1: "Sadio Mané",
        option2: "Mohamed Salah",
        option3: "Didier Drogba",
        option4: "Emmanuel Adebayor",
        answer: "option3",
        explan: "Didier Drogba (Ivory Coast 104), Emmanuel Adebayor (Togo 97), Yakubu (Nigeria 95), Sadio Mané (Senegal 80), Mohamed Salah (Egypt 72) and Yaya Touré (Ivory Coast 62). (updated 26-Jul-2020)",
    },
    {
        id: 3,
        used: false,
        question: "Which footballer has won the FIFA Player of the Year 6 times",
        option1: "Leo Messi",
        option2: "Cristiano Ronaldo",
        option3: "Marta Vieira da Silva",
        option4: "Alan Shearer",
        answer: "option3",
        explan: "Marta Vieira da Silva has won the FIFA World Player of the Year six times.",
    },
    {
        id: 4,
        used: false,
        question: "Who is the Premier League all time goal scorer",
        option1: "Ryan Giggs",
        option2: "Sergio Aguero",
        option3: "Wayne Rooney",
        option4: "Alan Shearer",
        answer: "option4",
        explan: "Alan Shearer holds the record at 26option1 goals followed by Wayne Rooney",
    },
    {
        id: 5,
        used: false,
        question: "Who is the Premier League all time assist",
        option1: "Ryan Giggs",
        option2: "Sergio Aguero",
        option3: "Wayne Rooney",
        option4: "Alan Shearer",
        answer: "option1",
        explan: "Ryan Giggs holds the record at 162 assists followed by Cesc Fabregas with 111 assists ",
    },
    {
        id: 6,
        used: false,
        question: "Which footballer has scored a goal for every minute of the game",
        option1: "Leo Messi",
        option2: "Cristiano Ronaldo",
        option3: "Marta Vieira da Silva",
        option4: "Alan Shearer",
        answer: "option2",
        explan: "Cristiano Ronaldo has scored a goal for every minute of a football game. He has scored most frequently in the 23rd minute of games.",
    },
    {
        // https://www.myfootballfacts.com/question_of_the_day/best-120-football-quiz-questions-trivia-and-answers/#PL-Quiz-1
        id: 7,
        used: false,
        question: "Which two teams competed in the first all-English major European Cup Final?",
        option1: "Manchester City and Manchester UNited",
        option2: "Tottenham Hotspur and Wolverhampton Wanderers",
        option3: "Wolverhampton Wanderers and Chelsea",
        option4: "Tottenham Hotspur and Manchester City",
        answer: "option2",
        explan: "Tottenham Hotspur and Wolverhampton Wanderers, 1972 UEFA Cup Final (played over two legs).",
    },
    {
        id: 8,
        used: false,
        question: "Two lines are drawn at right angles to the goal line, 16.5 m (18 yds) from the inside of each goalpost. These lines extend into the field of play for 16.5 m (18 yds) and are joined by a line drawn parallel with the goal line. What is this area called?",
        option1: "The Flagposts",
        option2: "The Corner Area",
        option3: "The Penalty Area",
        option4: "The Technical Area",
        answer: "option3",
        explan: "Two lines are drawn at right angles to the goal line, 16.5 m (18 yds) from the inside of each goalpost. These lines extend into the field of play for 16.5 m (18 yds) and are joined by a line drawn parallel with the goal line. The area bounded by these lines and the goal line is the penalty area.",
    },
    {
        //https://drive.google.com/file/d/12czUEG7kdGvNh_vJ6MM-kas9qjsvRLqP/view
        id: 9,
        used: false,
        question: "The centre mark is at the midpoint of the halfway line. What is the radius of the circle that is marked around it",
        option1: "10.15 meters",
        option2: "12.5 meters",
        option3: "9.15 meters (10 yards)",
        option4: "12 yards",
        answer: "option3",
        explan: "The centre mark is at the midpoint of the halfway line. A circle with a radius of 9.15 m (10 yds) is marked around it.",
    },
    {
        id: 10,
        used: false,
        // https://www.statista.com/statistics/266464/number-of-world-cup-titles-won-by-country-since-1930/
        question: "What is temporary dismissal during a football match",
        option1: "A player is punished by explusion from his team",
        option2: "A player commits a cautionable (YC) offence and is punished by an immediate ‘suspension’ from participating in the next part of that match.",
        option3: "A player is cautioned by his Manager and warned to be of good behaviour",
        option4: "A player is cautioned by the Refree and is disallowed from playing matches in future",
        answer: "option2",
        explan: `A temporary dismissal is when a player commits a cautionable (YC) offence and 
        is punished by an immediate ‘suspension’ from participating in the next part of
        that match. The philosophy is that an ‘instant punishment’ can have a
        significant and immediate positive influence on the behaviour of the offending
        player and, potentially, the player’s team.(Laws of football 2021)`
    },
    {
        id: 11,
        used: false,
        question: "Who is the only African player to win FIFAs World Player of the Year Award?",
        option1: "JJ Okocha",
        option2: "Mohammed Salah",
        option3: "George Weah",
        option4: "Sadio Mane",
        answer: "option3",
        explan: "George Weah of AC Milan & Liberia in 1994-95.",
    },
    
];

export const amateurData = [{
        id: 0,
        used: false,
        question: "In which country was football invented?",
        option1: "England",
        option2: "Brazil",
        option3: "China",
        option4: "Germany",
        answer: "option3",
        explan: "Football was invented in 476 BC in China. It was first called Cuju and was played with two teams who played the match with a ball made from an animal bladder. The aim was to use your feet to get the ball through an opening and into a net and was a form of training for the military.",
    },
    {
        id: 1,
        used: false,
        question: "The player that guards the post is called?",
        option1: "Defender",
        option2: "Goal Keeper",
        option3: "Mid Fielder",
        option4: "Forward",
        answer: "option2",
        explan: "The Goal Keeper is usually around the post area preventing the opposite team from scoring",
    },
    {
        id: 2,
        used: false,
        question: "How many players make up a foothball team?",
        option1: "11",
        option2: "9",
        option3: "7",
        option4: "12",
        answer: "option1",
        explan: "11 players make up a foothball team",
    },
    {
        id: 3,
        used: false,
        question: "What is the frequency of the world cup football turnament",
        option1: "Every 2 years",
        option2: "Every 3 years",
        option3: "Every 4 years",
        option4: "Every 5 years",
        answer: "option3",
        explan: "The world cup turnament is held every 4 years",
    },
    {
        id: 4,
        used: false,
        // https://www.history.com/this-day-in-history/first-world-cup
        question: "Which country won the first ever World Cup in 1930?",
        option1: "Brazil",
        option2: "Germany",
        option3: "Uruguay",
        option4: "France",
        answer: "option3",
        explan: "In the first World Cup final, held on July 30, 1930, 93,000 spectators looked on as Uruguay defeated Argentina 4–2 in a rematch of the 1928 Olympic gold medal game. Uruguay went on to win its second World Cup in 1950 with a 2-1 win over Brazil in Rio de Janeiro.",
    },
    {
        id: 5,
        used: false,
        // https://www.statista.com/statistics/266464/number-of-world-cup-titles-won-by-country-since-1930/
        question: "Which country has won the most World Cups?",
        option1: "Germany",
        option2: "France",
        option3: "Spain",
        option4: "Brazil",
        answer: "option4",
        explan: " The national team of Brazil has won the most soccer World Cup titles of all time with five, winning the tournament in 1958, 1962, 1970, 1994 and, most recently, in 2002.",
    },
    {
        // https://drive.google.com/file/d/12czUEG7kdGvNh_vJ6MM-kas9qjsvRLqP/view
        id: 6,
        used: false,
        question: "If artificial surfaces are permitted in a football field, what colour must it be?",
        option1: "Yellow",
        option2: "Blue",
        option3: "Violet",
        option4: "Green",
        answer: "option4",
        explan: `The field of play must be a wholly natural or, if competition rules permit,
        a wholly artificial playing surface except where competition rules permit an
        integrated combination of artificial and natural materials (hybrid system).
        The colour of artificial surfaces must be green.`
    },
    {
        id: 7,
        used: false,
        question: "What is the purpose of the Goal Line Technology (GLT) in football games?",
        option1: "Replace the Refree as it is a faultless technology",
        option2: "Ensure that the Managers do not protest Refree's decisions",
        option3: "Verify whether a goal has been scored to support Refree's decision",
        option4: "Verify that ever goal has been scored correctly after the match",
        answer: "option3",
        explan: "GLT systems may be used to verify whether a goal has been scored to support the referee’s decision.",
    },
    {
        id: 8,
        used: false,
        question: "What is the full meaning of VAR?",
        option1: "Vehicle Assistant Reference",
        option2: "Video Assessment Referee",
        option3: "Video Assigned Refree",
        option4: "Video Assistant Referee",
        answer: "option4",
        explan: " VAR means Video Assistant Refree. In matches using VARs there must be a video operation room (VOR) and at least one referee review area (RRA).",
    },
    {
        // https://www.888sport.com/blog/most-successful-football-club-in-england
        id: 9,
        used: false,
        question: "Who are the TWO most successful English clubs with the most Trophies",
        option1: "Manchester City & Chelsea",
        option2: "Chelsea & Manchester United",
        option3: "Liverpool & Arsenal",
        option4: "Manchester United & Liverpool",
        answer: "option4",
        explan: "English Clubs With Most Trophies:Manchester United - 66 trophies Liverpool - 65 trophies, Arsenal - 48 trophies, Chelsea - 32 trophies, Manchester City - 28 trophies",
    },
    {
        id: 10,
        used: false,
        question: "Who is the all-time Champions League top scorer as at September, 2021 ",
        option1: "Leo Messi",
        option2: "Cristiano Ronaldo",
        option3: "Ryan Giggs",
        option4: "Alan Shearer",
        answer: "option2",
        explan: "Cristiano Ronaldo is the all-time Champions League top scorer with 134 goals in the competition",
    },
    {
        id: 11,
        used: false,
        question: "Who is the Manchester City Manager as at year 2020 ",
        option1: "Manuel Pellegrini",
        option2: "Roberto Mancini",
        option3: "Pep Guardiola",
        option4: "Alan Shearer",
        answer: "option3",
        explan: "Josep 'Pep' Guardiola Sala, (born 18 January 1971) is Manchester City Manager from 2016–17 season till date (2021)",
    },
    
];