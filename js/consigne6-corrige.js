/*
CONSIGNE 6 : Au click sur le bouton de chaque pokemon, ouvir une modale qui affiche 
son nom, son image, son poids et sa taille: 
La modale doit s'afficher par dessus le reste des éléments dans la page
La modale doit posséder un bouton de fermeture
*/

export default () => {
  const pokemonsList = document.querySelector("#pokemons-list");

  const callPokeApi = async param => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/` + param)
      if (!response.ok) {
        throw new Error(JSON.stringify({ message: "erreur inconnue :(" }));
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Une erreur est survenue !", JSON.parse(error.message));
    }
  };

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

  callPokeApi('pokemon').then(data => {
    displayPokemons(data.results);
  });
};
