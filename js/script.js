"use strict";

const searchInput = document.querySelector("#search-input");
const ideaForm = document.querySelector("#idea-form");
const ideaInput = document.querySelector("#idea-input");
const list = document.querySelector("#ideas-list");
const count = document.querySelector("#favorite-count");
const status = document.querySelector("#board-status");

function updateCount() {
  count.textContent = list.querySelectorAll(".fav-button.is-favorite").length;
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  const cards = list.querySelectorAll(".idea-card");

  cards.forEach((card) => {
    const title = (card.dataset.title || "").toLowerCase();

    if (title.includes(query)) {
      card.classList.remove("is-hidden");
    } else {
      card.classList.add("is-hidden");
    }
  });
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("input"));
  }
});

ideaForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = ideaInput.value.trim();
  if (!text) return; 
  const li = document.createElement("li");
  li.classList.add("idea-card");
  li.dataset.title = text; 

  const span = document.createElement("span");
  span.textContent = text;

  const button = document.createElement("button");
  button.classList.add("fav-button");
  button.textContent = "☆";
  button.setAttribute("aria-pressed", "false");

  li.append(span, button);
  list.append(li);
  ideaInput.value = "";

  searchInput.dispatchEvent(new Event("input"));
});

list.addEventListener("click", (event) => {
  const favButton = event.target.closest(".fav-button");

  if (favButton) {
    const isFavorite = favButton.classList.toggle("is-favorite");

    if (isFavorite) {
      favButton.textContent = "★";
      favButton.setAttribute("aria-pressed", "true");
    } else {
      favButton.textContent = "☆";
      favButton.setAttribute("aria-pressed", "false");
    }

    updateCount();
  }
});
