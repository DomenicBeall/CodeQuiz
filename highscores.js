var container = document.getElementById("scorecontainer"); // Stores the div that holds the highscore list

refreshscorelist(); // Display the score list on init

// Gets the saved highscores and displays them in a table
function refreshscorelist() {
    // Get saved scores
    var highscores = JSON.parse(localStorage.getItem("highscores"));

    // If there are scores display them else display a message
    if (highscores) {
        var table = document.createElement("table");
        table.setAttribute("class", "center");

        var headrow = document.createElement("tr");
        
        var th = document.createElement("th");
        th.innerText = "Name"
        headrow.append(th);

        var th = document.createElement("th");
        th.innerText = "Score"
        headrow.append(th);

        table.append(headrow);

        highscores.forEach(hs => {
            var tr = document.createElement("tr");

            var th = document.createElement("td");
            th.innerText = hs.Name;
            tr.append(th);

            var th = document.createElement("td");
            th.innerText = hs.Score;
            tr.append(th);
            
            table.append(tr);
        });

        container.append(table);
    } else {
        var p = document.createElement("p");
        p.setAttribute("class", "text-center");
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