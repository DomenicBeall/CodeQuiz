var container = document.getElementById("container");
var content = document.getElementById("content");
var currentQuestion = 0;
var timer = 50;
var quizOver = false;

displayLanding();

function displayLanding() {
    clearContent(); // Remove the currently displayed elements

    var title = document.createElement("h1");
    title.innerText = "Coding Quiz Challenge";
    title.setAttribute("class", "text-center");
    content.append(title);

    var description = document.createElement("p");
    description.innerText = "This is some stock text that represents instructions on how to complete the quiz banana pudding apples oranges the inside of a potato is kinda mushy if you leave it in the cupboard for too long and once they go rotten the smell is unbearable.";
    description.setAttribute("class", "text-center");
    content.append(description);

    var button = document.createElement("button");
    button.innerText = "Start Quiz";
    button.setAttribute("class", "btn-center");
    button.addEventListener("click", startQuiz);
    content.append(button);
}

function clearContent() {
    content.innerHTML = "";
}

function renderNextQuestion() {
    clearContent(); // Clear the currently displayed elements
    
    currentQuestion ++;

    if (currentQuestion !== questions.length) {
        var question = questions[currentQuestion];

        // Question
        var questionText = document.createElement("h1");
        questionText.setAttribute("class", "text-center");
        questionText.innerText = question.title;
        content.append(questionText);

        // Button for each answer
        for (var i = 0; i < question.choices.length; i++) {
            var button = document.createElement("button");
            button.innerText = (i + 1) + ". " + question.choices[i];
            button.setAttribute("class", "btn-left");
            button.setAttribute("data-answer", question.choices[i]);
            button.setAttribute("onclick", "submitAnswer(this)");
            content.append(button);
        }
    } else {
        showFinishedScreen();
    }
}

function submitAnswer(div) {
    var submittedAnswer = div.getAttribute("data-answer");
    
    if (submittedAnswer === questions[currentQuestion].answer) {
        displayAnswerResponse("Correct!");
    } else {
        displayAnswerResponse("Wrong!");
        timer -= 10;
    }

    renderNextQuestion();
}

function displayAnswerResponse(message) {
    var responseWindow = document.getElementById("response");

    if (responseWindow === null) {
        responseWindow = document.createElement("div");
        responseWindow.setAttribute("id", "response");
        responseWindow.setAttribute("class", "text-center");
        responseWindow.style.display = "none";
        container.append(responseWindow);       
    }

    responseWindow.textContent = message;
    responseWindow.style.display = "block";

    var thisInterval = setInterval(function() {
        responseWindow.style.display = "none";
        clearInterval(thisInterval);
    }, 1000);
}

function showFinishedScreen() {
    quizOver = true;

    clearContent(); // Get rid of whatever is currently displayed
    
    var title = document.createElement("h1");
    title.innerText = "All done!";
    content.append(title);

    var title = document.createElement("p");
    title.innerText = "Your final score was: " + timer;
    content.append(title);    

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
    });
    form.append(button);

    content.append(form);
}

function startQuiz() {
    currentQuestion = -1; // Start at the first question
    timer = 50;

    var thisInterval = setInterval(function() {
        timer--;

        if (timer < 0)  
            timer = 0;

        document.getElementById("timer").innerText = "Timer: " + timer;

        if (timer === 0 || quizOver) {
            clearInterval(thisInterval);
            showFinishedScreen();
        }
    }, 1000);

    renderNextQuestion();
}