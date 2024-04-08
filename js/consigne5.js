/*
CONSIGNE 5 : Ajouter à chaque pokemon générer dans la liste un bouton 'voir details'
Ajouter une fonction de callback à ce bouton déclenchée lors de l'événement 'click'
Lors du click, afficher dans la console l'id du pokemon correspondant
liens utiles: 
https://ian-marshall.medium.com/innerhtml-vs-append-with-event-listeners-b13cba10cdf8
https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/dataset
https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/
*/
export default () => {
  const pokemonsList = document.querySelector("#pokemons-list");

  const callPokeApi = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon`)
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
    // A COMPLETER
    pokemonsList.innerHTML = "";
    const imgUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    for (const pokemon of pokemons) {
      const pokemonId = pokemon.url.split("/").slice(-2)[0];
      pokemonsList.innerHTML += `
    <li>
      <p>Nom : ${pokemon.name}</p>
      <img src="${imgUrl}${pokemonId}.png" alt="">
    </li>
    `;
    }
  };

  callPokeApi().then(data => {
    displayPokemons(data.results);
  });
};