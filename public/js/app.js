
var main_image = document.querySelector(".main-image");
var progress_container = document.querySelector(".progress-container");
var type_pills = document.querySelector(".type-pills");
var move_pills = document.querySelector(".move-pills");
var ability_pills = document.querySelector(".ability-pills");
var poke_name = document.querySelector("#name");
var order = document.querySelector("#order");
var sprites = document.querySelector(".sprites");

var id_ = 1;
var results_;

var left_arrow = document.querySelectorAll(".bi-arrow-left-square-fill");
var right_arrow = document.querySelectorAll(".bi-arrow-right-square-fill");

left_arrow.forEach(arrow => {
    arrow.addEventListener("click", () => {
        console.log(id_);
        if (id_ == 1) {
            id_ = 999;
        }
        id_--;
        getData();
    });
});
right_arrow.forEach(arrow => {
    arrow.addEventListener("click", () => {
        console.log(id_);
        id_++;
        getData();
    });
});

$(document).ready(function () {
    getData();
});

function getData() {

    $.getJSON("https://pokeapi.co/api/v2/pokemon/" + id_, function (data) {
        console.log(data);
        poke_name.innerHTML = data.name.toUpperCase();
        order.innerHTML = "#" + data.order;
        if (data.sprites.other.dream_world.front_default != null) {
            main_image.src = data.sprites.other.dream_world.front_default;

        }
        else if (data.sprites.front_default != null) {
            main_image.src = data.sprites.front_default;
        }
        else {
            main_image.src = "https://imgs.search.brave.com/muGneTUNuFHdN8m6nvgTEdnD0geVMEu_VrxTdvEjtXI/rs:fit:300:300:1/g:ce/aHR0cHM6Ly9vcGVu/Y2xpcGFydC5vcmcv/aW1hZ2UvMzAwcHgv/c3ZnX3RvX3BuZy8x/OTQwNzcvUGxhY2Vo/b2xkZXIucG5n"

        }
        removeChildren(move_pills);
        for (var i = 0; i < data.moves.length; i++) {
            createBadgeElement(move_pills, data.moves[i].move.name, "text-bg-secondary")
        }
        removeChildren(type_pills);
        for (var i = 0; i < data.types.length; i++) {
            createBadgeElement(type_pills, data.types[i].type.name, "text-bg-success")
        }
        removeChildren(ability_pills);
        for (var i = 0; i < data.abilities.length; i++) {
            createBadgeElement(ability_pills, data.abilities[i].ability.name, "text-bg-warning")
        }
        removeChildren(progress_container);
        for (var i = 0; i < data.stats.length; i++) {
            createProgressBar(data.stats[i].base_stat, data.stats[i].stat.name)
        }
        removeChildren(sprites);
        for (var index in data.sprites) {
            if (index.includes("front") && data.sprites[index] != null) {
                displaySprite(index, data.sprites[index]);
            }
        }
    });
}


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
    progress.classList.add("progress");
    progress.setAttribute("role", "progressbar");
    progress.setAttribute("aria-label", name);
    progress.setAttribute("aria-valuenow", valuenow);
    progress.setAttribute("aria-valuemin", 0);
    progress.setAttribute("aria-valuemax", 100);
    var progress_bar = document.createElement("div");
    progress_bar.classList.add("progress-bar");
    progress_bar.classList.add("progress-bar-striped");
    progress_bar.classList.add("progress-bar-animated");
    progress_bar.style.width = valuenow + "%";
    progress_bar.innerHTML = valuenow;
    progress.appendChild(progress_bar);
    progress_container.appendChild(progress);
}

function createBadgeElement(container, badge_text, color) {
    var badge = document.createElement("span");
    badge.classList.add("badge");
    badge.classList.add("rounded-pill");
    badge.classList.add("text-bg-primary");
    badge.classList.add(color);
    badge.innerHTML = badge_text;
    container.appendChild(badge);
}

function displaySprite(name, spriteURL) {
    var img = document.createElement("img");
    img.classList.add("img-fluid");
    img.classList.add("sprite-image");
    img.src = spriteURL;
    img.alt = name;
    sprites.appendChild(img);
}