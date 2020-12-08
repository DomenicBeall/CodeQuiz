var container = document.getElementById("scorecontainer"); // Stores the div that holds the highscore list

refreshscorelist(); // Display the score list on init

// Gets the saved highscores and displays them in a list
function refreshscorelist() {
    // Get saved scores
    var highscores = JSON.parse(localStorage.getItem("highscores"));

    // If there are scores display them else display a message
    if (highscores) {
        var list = document.createElement("ul");

        highscores.forEach(hs => {
            var listel = document.createElement("li");
            listel.innerText = hs.Name + ": " + hs.Score;
            list.append(listel);
        });

        container.append(list);
    } else {
        var p = document.createElement("p");
        p.innerText = "There are currently no highscores";
        container.append(p);
    }
}

// Takes the user back to the quiz page
function returnToQuiz() {
    location.replace("index.html");
}

// Removes all saved highscores
function resetHighscores() {
    localStorage.removeItem("highscores");
    container.innerText = "";
    refreshscorelist();
}