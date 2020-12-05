var container = document.getElementById("container");
var currentQuestion = 0;

displayLanding();

function displayLanding() {
    clearContainer(); // Remove the currently displayed elements

    var title = document.createElement("h1");
    title.innerText = "Coding Quiz Challenge";
    title.setAttribute("class", "text-center");
    container.append(title);

    var description = document.createElement("p");
    description.innerText = "This is some stock text that represents instructions on how to complete the quiz banana pudding apples oranges the inside of a potato is kinda mushy if you leave it in the cupboard for too long and once they go rotten the smell is unbearable.";
    description.setAttribute("class", "text-center");
    container.append(description);

    var button = document.createElement("button");
    button.innerText = "Start Quiz";
    button.setAttribute("class", "btn-center");
    button.addEventListener("click", startQuiz);
    container.append(button);
}

function clearContainer() {
    container.innerHTML = "";
}

function renderNextQuestion() {
    clearContainer(); // Clear the currently displayed elements
    
    var question = questions[currentQuestion];

    console.log(question.choices.length);

    // Question
    var questionText = document.createElement("h1");
    questionText.innerText = question.title;
    container.append(questionText);

    // Button for each answer
    for (var i = 0; i < question.choices.length; i++) {
        var button = document.createElement("button");
        button.innerText = (i + 1) + ". " + question.choices[i];
        button.setAttribute("class", "btn-left");
        button.setAttribute("data-answer", question.choices[i]);
        button.setAttribute("onclick", "submitAnswer(this)");
        container.append(button);
    }
}

function submitAnswer(div) {
    var submittedAnswer = div.getAttribute("data-answer");
    
    if (submittedAnswer === questions[currentQuestion].answer) {
        // Correct answer next question
        currentQuestion ++;
        renderNextQuestion();
    } else {
        console.log("False, moron");
    }

    displayAnswerResponse();
}

function displayAnswerResponse(message) {
    var responseWindow = document.getElementById("response");

    if (responseWindow === null) {
        responseWindow = document.createElement("div");
        responseWindow.setAttribute("id", "response");
        responseWindow.style.display = "none";
        container.append(responseWindow);
    }

    responseWindow.style.display = "block"; // Here 
}

function startQuiz() {
    currentQuestion = 0; // Start at the first question

    renderNextQuestion();
}