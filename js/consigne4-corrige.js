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
    pokemonsList.innerHTML = "";
    const imgUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    for (const pokemon of pokemons) {
      pokemonsList.innerHTML += `
    <li>
      <p>Nom : ${pokemon.name}</p>
      <img src="${imgUrl}${pokemon.url.split("/").slice(-2)[0]}.png" alt="">
    </li>
    `;
      /* METHODE ALTERNATIVE EST (BEAUCOUP) PLUS LONGUE !!*/
      // const li = document.createElement("li");
      // pokemonsList.appendChild(li);
      // const p = document.createElement("p");
      // const txtNode = document.createTextNode(`Nom : ${pokemon.name}`);
      // li.appendChild(p);
      // p.appendChild(txtNode);
      // const img = document.createElement("img");
      // const urlParts = pokemon.url.split("/");
      // const pokemonId = urlParts[urlParts.length - 2];
      // img.setAttribute("src", `${imgUrl}${pokemonId}.png`);
      // li.appendChild(img);
    }
  };

  callPokeApi().then(data => {
    console.log(data);
    displayPokemons(data.results);
  });
};