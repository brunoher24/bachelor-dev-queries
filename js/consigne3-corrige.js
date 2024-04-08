/*
CONSIGNE 3 : ajouter un bloc 'try catch' de façon à gérer les erreurs éventuelles d'appel à l'API
lien utile: https://dev.to/dionarodrigues/fetch-api-do-you-really-know-how-to-handle-errors-2gj0
*/
export default () => {
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

  callPokeApi().then(result => {
    console.log(result);
  });
};