/* 
CONSIGNE 4 : afficher sous la forme d'une liste dans la page les pokemons avec leur nom et leur image
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
    // VOTRE CODE
  };

  callPokeApi().then(data => {
    console.log(data);
    displayPokemons(data.results);
  });
};