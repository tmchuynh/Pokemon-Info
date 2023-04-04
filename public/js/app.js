const mainImage = document.querySelector(".main-image");
const progressContainer = document.querySelector(".progress-container");
const typePills = document.querySelector(".type-pills");
const movePills = document.querySelector(".move-pills");
const abilityPills = document.querySelector(".ability-pills");
const pokeName = document.querySelector("#name");
const order = document.querySelector("#order");
const sprites = document.querySelector(".sprites");

let id = 1;
let results;

const leftArrow = document.querySelectorAll(".bi-arrow-left-square-fill");
const rightArrow = document.querySelectorAll(".bi-arrow-right-square-fill");

const searchbar = document.querySelector("#search_bar");
searchbar.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        id = searchbar.value;
        searchbar.value = "";
        getData();
    }
});

leftArrow.forEach(arrow => {
    arrow.addEventListener("click", () => {
        console.log(id);
        if (id === 1) {
            id = 999;
        }
        id--;
        getData();
    });
});

rightArrow.forEach(arrow => {
    arrow.addEventListener("click", () => {
        console.log(id);
        id++;
        getData();
    });
});

$(document).ready(function () {
    getData();
});

function getData() {
    $.getJSON(`https://pokeapi.co/api/v2/pokemon/${id}`, (data) => {
        console.log(data);
        pokeName.innerHTML = data.name.toUpperCase();
        order.innerHTML = `#${data.id}`;

        if (data.sprites.other.dream_world.front_default != null) {
            mainImage.src = data.sprites.other.dream_world.front_default;
        } else if (data.sprites.front_default != null) {
            mainImage.src = data.sprites.front_default;
        } else {
            mainImage.src = "https://imgs.search.brave.com/muGneTUNuFHdN8m6nvgTEdnD0geVMEu_VrxTdvEjtXI/rs:fit:300:300:1/g:ce/aHR0cHM6Ly9vcGVu/Y2xpcGFydC5vcmcv/aW1hZ2UvMzAwcHgv/c3ZnX3RvX3BuZy8x/OTQwNzcvUGxhY2Vo/b2xkZXIucG5n"
        }

        removeChildren(movePills);
        data.moves.forEach(move => createBadgeElement(movePills, move.move.name, "text-bg-secondary"));

        removeChildren(typePills);
        data.types.forEach(type => createBadgeElement(typePills, type.type.name, "text-bg-success"));

        removeChildren(abilityPills);
        data.abilities.forEach(ability => createBadgeElement(abilityPills, ability.ability.name, "text-bg-warning"));

        removeChildren(progressContainer);
        data.stats.forEach(stat => createProgressBar(stat.base_stat, stat.stat.name));

        removeChildren(sprites);
        for (let index in data.sprites) {
            if (index.includes("front") && data.sprites[index] != null) {
                displaySprite(index, data.sprites[index]);
            }
        }
    });
}


/**
 * Remove all the children of a parent element.
 * @param parent - The parent element that you want to remove all children from.
 */
function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/**
 * It creates a progress bar with the given value and name
 * @param valuenow - The current value of the progress bar.
 * @param name - The name of the progress bar.
 */
function createProgressBar(valuenow, name) {
    const p = document.createElement("p");
    p.textContent = name;
    progressContainer.appendChild(p);
  
    const progress = document.createElement("div");
    progress.classList.add("progress");
    progress.setAttribute("role", "progressbar");
    progress.setAttribute("aria-label", name);
    progress.setAttribute("aria-valuenow", valuenow);
    progress.setAttribute("aria-valuemin", 0);
    progress.setAttribute("aria-valuemax", 100);
  
    const progress_bar = document.createElement("div");
    progress_bar.classList.add("progress-bar", "progress-bar-striped", "progress-bar-animated");
    progress_bar.style.width = `${valuenow}%`;
    progress_bar.textContent = valuenow;
  
    progress.appendChild(progress_bar);
    progressContainer.appendChild(progress);
  }


/**
 * It creates a span element with the class "badge rounded-pill text-bg-primary" and the color class
 * passed in as a parameter, and then sets the innerHTML of the span to the badge_text parameter.
 * @param container - The element that the badge will be appended to.
 * @param badge_text - The text that will be displayed on the badge.
 * @param color - The color of the badge.
 */
function createBadgeElement(container, badge_text, color) {
    var badge = document.createElement("span");
    badge.classList.add("badge");
    badge.classList.add("rounded-pill");
    badge.classList.add("text-white");
    badge.classList.add(color);
    badge.innerHTML = badge_text;
    container.appendChild(badge);
}


/**
 * It creates an image element, sets its class, sets its source, sets its alt text, and then appends it
 * to the sprites div
 * @param name - The name of the Pokémon.
 * @param spriteURL - The URL of the sprite image.
 */
function displaySprite(name, spriteURL) {
    const img = document.createElement("img");
    img.classList.add("img-fluid", "sprite-image");
    img.src = spriteURL;
    img.alt = name;
    sprites.appendChild(img);
}