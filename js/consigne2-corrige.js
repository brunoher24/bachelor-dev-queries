// fetch('https://pokeapi.co/api/v2/ability/?offset=40&limit=20')
//   .then(response => {
//     response.json().then(result => {
//       console.log(result);
//     })
//   });


/*
CONSIGNE 2 : refondre les instructions ci-dessus en "async await"
lien utile : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/async_function
*/

export default () => {
  const callPokeApi = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`)
    const result = await response.json();
    console.log(result);
  };
  callPokeApi();
};