var content = document.getElementById("content"); // This div stores the dynamic content
var currentQuestion = 0; // Stores the current question the user is answering
var timer = 50; // Stores the time the user has left
var quizOver = false; // Keeps track of if the user has finished the quiz

displayLanding();

// Removes everything that is currently being displayed in the content div
function clearContent() {
    content.innerHTML = "";
}

// Displays the landing page shown before the quiz starts
function displayLanding() {
    clearContent();

    // Create and append a header
    var title = document.createElement("h1");
    title.innerText = "Coding Quiz Challenge";
    title.setAttribute("class", "text-center");
    content.append(title);

    // Create and append a description of the quiz
    var description = document.createElement("p");
    description.innerText = "This is a quiz to test your basic javascript knowledge! You have 50 seconds and will be penalised for incorrect answers. Check out your top scores by clicking the link the top left.";
    description.setAttribute("class", "text-center");
    content.append(description);

    // Create and append a button to start the quiz
    var button = document.createElement("button");
    button.innerText = "Start Quiz";
    button.setAttribute("class", "btn-center");
    button.addEventListener("click", startQuiz);
    content.append(button);
}

// Displays the current question
function renderQuestion() {
    clearContent(); // Clear whatever is currently displayed
    
    // Check if all questions have been answered
    if (currentQuestion < questions.length) {
        var question = questions[currentQuestion];

        // Display the question in a header
        var questionText = document.createElement("h1");
        questionText.setAttribute("class", "text-center");
        questionText.innerText = question.title;
        content.append(questionText);

        // Create a button for each answer
        for (var i = 0; i < question.choices.length; i++) {
            var button = document.createElement("button");
            button.innerText = (i + 1) + ". " + question.choices[i];
            button.setAttribute("class", "btn-block");
            button.setAttribute("data-answer", question.choices[i]);
            button.setAttribute("onclick", "submitAnswer(this)");
            content.append(button);
        }
    } else {
        showFinishedScreen(); // Display the end screen
    }

}

// Function called when the user clicks a button to submit their answer
function submitAnswer(div) {
    // Get their answer
    var submittedAnswer = div.getAttribute("data-answer");
    
    // Check if the answer is correct
    if (submittedAnswer === questions[currentQuestion].answer) {
        displayAnswerResponse("Correct!");
    } else {
        displayAnswerResponse("Wrong!");
        updateTimer(timer -= 10);
    }

    currentQuestion ++; // Update which question is next

    renderQuestion(); // Display that question
}

// Displays a popup briefly to tell the user if they were correct or incorrect
function displayAnswerResponse(message) {
    var responseWindow = document.getElementById("response");

    responseWindow.innerHTML = "<hr>" + message;
    responseWindow.style.display = "block";

    // Hides the popup after 1 second
    var popupInterval = setInterval(function() {
        responseWindow.style.display = "none";
        clearInterval(popupInterval);
    }, 1000);
}

// Displays a screen where users can see their score and submit a highscore
function showFinishedScreen() {
    quizOver = true; // Set a flag to tell the timer to stop decrementing

    clearContent();
    
    // Display a header
    var title = document.createElement("h1");
    title.innerText = "All done!";
    content.append(title);

    // Display a paragraph showing final score
    var paragraph = document.createElement("p");
    paragraph.innerText = "Your final score was: " + timer;
    content.append(paragraph);    

    // Create a form with a button to submit high scores
    var form = document.createElement("form");

    var label = document.createElement("label");
    label.setAttribute("for", "initials");
    label.innerText = "Enter initials: ";
    form.append(label);

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "initial");
    input.setAttribute("name", "initials");
    form.append(input);
    
    var button = document.createElement("button");
    button.innerText = "Submit High Score";
    // Append an event listener that saves the highscore locally
    button.addEventListener("click", function(event) {
        event.preventDefault();

        var highscores = JSON.parse(localStorage.getItem("highscores"));

        if (!highscores) {
            highscores = [];
        }

        var name = document.getElementById("initial").value;
        var highscoreEntry = { Name: name, Score: timer }

        highscores = [...highscores, highscoreEntry];

        localStorage.setItem("highscores", JSON.stringify(highscores));

        location.replace("highscores.html");
    });

    form.append(button);

    content.append(form);
}

// Updates the timer to val and also updates the display of the timer
function updateTimer(val) {
    timer = val;

    if (timer < 0) {
        timer = 0;
        showFinishedScreen();
    }

    document.getElementById("timer").innerText = "Timer: " + timer;
}

// Starts the timer and displays the first question
function startQuiz() {
    currentQuestion = 0; // Start at the first question
    timer = 50; // Set the timer to its starting value of 50

    // Create an interval that fires every second
    var timerInterval = setInterval(function() {
        // Decrement the timer
        updateTimer(timer - 1);

        // Checks if the quiz is over and stops updating the timer if it is
        if (quizOver) {
            clearInterval(timerInterval);
        }
    }, 1000);

    // Display the first question
    renderQuestion();
}