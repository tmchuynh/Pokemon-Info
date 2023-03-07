
var main_image = document.querySelector(".main-image");
var progress_container = document.querySelector(".progress-container");
var type_pills = document.querySelector(".type-pills");
var move_pills = document.querySelector(".move-pills");
var chained_evolution = document.querySelector(".chained-evolution");

$.getJSON("https://pokeapi.co/api/v2/pokemon?limit=2", function(data) {
    console.log(data);
    for (var i = 0; i < data.results.length; i++) {
        $.getJSON(data.results[i].url, function(results) {
            console.log(results);
            removeChildren(type_pills);
            removeChildren(move_pills);
            removeChildren(progress_container);
            for (var j = 0; j < results.types.length; j++) {
                createBadgeElement(type_pills, results.types[j].type.name);
            }
            for (var j = 0; j < results.moves.length; j++) {
                createBadgeElement(move_pills, results.moves[j].move.name);
            }
            for (var j = 0; j <results.stats.length; j++) {
                createProgressBar(results.stats[j].base_stat, results.stats[j].stat.name);
            }
        })
    }
});


function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function createProgressBar(valuenow, name) {
    var p = document.createElement("p");
    p.innerHTML = name;
    progress_container.appendChild(p);
    var progress = document.createElement("div");
    progress.setAttribute("role", "progressbar");
    progress.setAttribute("aria-label", name);
    progress.setAttribute("aria-valuenow", valuenow);
    progress.setAttribute("aria-valuemin", 0);
    progress.setAttribute("aria-valuemax", 100);
    progress_container.appendChild(progress);
    var progress_bar = document.createElement("div");
    progress_bar.classList.add("progress-bar");
    progress_bar.classList.add("progress-bar-striped");
    progress_bar.classList.add("progress-bar-animated");
    progress_bar.style.width = valuenow + "%";
    progress_bar.innerHTML = valuenow + "%";
    progress.appendChild(progress_bar);


}

function createBadgeElement(container, badge_text) {
    var badge = document.createElement("span");
    badge.classList.add("badge");
    badge.classList.add("rounded-pill");
    badge.classList.add("text-bg-primary");
    badge.innerHTML = badge_text;
    container.appendChild(badge);
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