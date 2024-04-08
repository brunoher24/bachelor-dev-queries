/*
CONSIGNE 7 : Mettre en place une pagination
En bas de la liste des 20 pokemons : afficher une liste de nombre représentant les pages 
cliquables de la liste complète.
Exemple : si la liste complète des pokemons existants est de 1200 et que l’on en affiche 20 par page, 
il y aura 1200/20 = 60 pages cliquables à afficher
lien utile: https://webdesign.tutsplus.com/pagination-with-vanilla-javascript--cms-41896t
*/

export default () => {
  const POKEMONS_PER_PAGE = 20;
  const pokemonsList = document.querySelector("#pokemons-list");

  const displayPokemons = pokemons => {
    pokemonsList.innerHTML = "";
    const imgUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    for (const pokemon of pokemons) {
      const pokemonId = pokemon.url.split("/").slice(-2)[0];
      pokemonsList.innerHTML += `
    <li>
      <p>Nom : ${pokemon.name}</p>
      <img src="${imgUrl}${pokemonId}.png" alt="">
      <button data-id="${pokemonId}">
      	Voir détails
      </button>
    </li>
    `;
    }
    pokemonsList.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", e => {
        displayPokemonDetails(button.dataset.id);
      });
    });
  };

  const displayPokemonDetails = pokemonId => {
    callPokeApi('pokemon/' + pokemonId).then(data => {
      console.log(data);
      const { height, weight, name, sprites } = data;
      displayPopup(name, sprites, height, weight);
    });
  };

  const displayPopup = (name, imgs, height, weight) => {
    const popupCtnr = document.querySelector("#popup-ctnr");
    popupCtnr.style.display = "flex";
    popupCtnr.innerHTML = `
    <div id="pokemon-card-details">
      <button><i class="fa fa-close"></i></button>
      <h2>${name}</h2>
      <div id="popup-details-imgs-ctnr">
        <img src="${imgs.back_default}" alt="" />
        <img src="${imgs.back_shiny}" alt="" />
        <img src="${imgs.front_default}" alt="" />
        <img src="${imgs.front_shiny}" alt="" />
      </div>
      <p>Taille : ${height}</p>
      <p>Poids : ${weight}</p>
    </div>
    `;
    popupCtnr.querySelector("button").addEventListener("click", () => {
      popupCtnr.innerHTML = "";
      popupCtnr.style.display = "none";
    })
  };

  const callPokeApi = async (urlSuffix, shouldPaginate = true, offset = 0, limit = POKEMONS_PER_PAGE) => {
    const urlPagination = shouldPaginate ? `/?offset=${offset}&limit=${limit}` : "";
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/${urlSuffix}${urlPagination}`)
      if (!response.ok) {
        throw new Error(JSON.stringify({ message: "erreur inconnue :(" }));
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Une erreur est survenue !", JSON.parse(error.message));
    }
  };

  const setUpPagination = pokemonsTotalNumber => {
    const pokemonsPagination = document.querySelector("#pokemons-pagination");
    pokemonsPagination.innerHTML = "";
    const pagesNumber = Math.ceil(pokemonsTotalNumber / POKEMONS_PER_PAGE);
    for (let i = 1; i <= pagesNumber; i++) {
      pokemonsPagination.innerHTML += "<button data-offset='" + ((i - 1) * POKEMONS_PER_PAGE) + "'>" + i + "</button>"
    }
    pokemonsPagination.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", e => {
        const offset = e.target.dataset.offset;
        callPokeApi('pokemon', true, offset).then(data => {
          displayPokemons(data.results);
        });
      });
    });
  };

  callPokeApi('pokemon').then(data => {
    displayPokemons(data.results);
    const pokemonsTotalNumber = data.count;
    setUpPagination(pokemonsTotalNumber);
  });
};