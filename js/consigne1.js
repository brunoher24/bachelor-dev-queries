fetch('https://pokeapi.co/api/v2/ability/?offset=40&limit=20')
  .then(response => {
    response.json().then(result => {
      console.log(result);
    })
  });

/* 
CONSIGNE 1 : refondre les instructions ci-dessus en .then() "chaînés"
lien utile : https://javascript.info/promise-chaining
*/

export default () => {
  // VOTRE CODE
};

