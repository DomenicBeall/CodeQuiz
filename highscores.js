var container = document.getElementById("scorecontainer");

refreshscorelist();

function refreshscorelist() {
    var highscores = JSON.parse(localStorage.getItem("highscores"));

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

function returntoquiz() {
    location.replace("index.html");
}

function resetHighscores() {
    localStorage.removeItem("highscores");
    container.innerText = "";
    refreshscorelist();
}