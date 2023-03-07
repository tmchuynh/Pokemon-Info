$.getJSON("https://pokeapi.co/api/v2/pokemon?limit=2", function(data) {
    console.log(data);
    for (var i = 0; i < data.results.length; i++) {
        $.getJSON(data.results[i].url, function(results) {
            console.log(results);
        })
    }
});

var main_image = document.querySelector(".main-image");
var progress_container = document.querySelector(".progress-container");
var type_pills = document.querySelector(".type-pills");
var move_pills = document.querySelector(".move-pills");
var chained_evolution = document.querySelector(".chained-evolution");

function createProgressBar(valuenow) {
    var progress_bar = document.createElement("div");
    progress_bar.classList.add("progress-bar");
    progress_bar.setAttribute("role", "progressbar");
    progress_bar.setAttribute("aria-valuenow", valuenow);
    progress_bar.setAttribute("aria-valuemin", "0");
    progress_bar.setAttribute("aria-valuemax", "100");
}

function createBadgeElement(badge_text) {
    var badge = document.createElement("span");
    badge.classList.add("badge");
    badge.textContent = badge_text;
}

function addEvolvedPokemon(name, url) {
    var evolved = document.createElement("div");
    evolved.classList.add("evolution");
    var p = document.createElement("p");
    p.innerHTML = name;
    evolved.appendChild(p);
    var img = document.createElement("img");
    img.src = url;
    evolved.appendChild(img);
}