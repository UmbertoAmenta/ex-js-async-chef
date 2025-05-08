// In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id). Questa funzione accetta un id di una ricetta e deve:
//      Recuperare la ricetta da https://dummyjson.com/recipes/{id}
//      Estrarre la proprietà userId dalla ricetta
//      Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
//      Restituire la data di nascita dello chef

// Note del docente
//      Scrivi la funzione getChefBirthday(id), che deve:
//      Essere asincrona (async).
//      Utilizzare await per chiamare le API.
//      Restituire una Promise con la data di nascita dello chef.
//      Gestire gli errori con try/catch

//   🎯 Bonus 1
// Attualmente, se la prima richiesta non trova una ricetta, la seconda richiesta potrebbe comunque essere eseguita causando errori a cascata.
// Modifica getChefBirthday(id) per intercettare eventuali errori prima di fare la seconda richiesta.

// 🎯 Bonus 2
// Utilizza la libreria dayjs per formattare la data di nascita nel formato giorno/mese/anno.

async function getChefBirthday(id) {
  try {
    const getRecipe = await fetch(`https://dummyjson.com/recipes/${id}`);
    if (!getRecipe.ok) throw new Error("Ricetta non trovata"); // Bonus 1
    const post = await getRecipe.json();

    const getchef = await fetch(`https://dummyjson.com/users/${post.userId}`);
    if (!getchef.ok) throw new Error("Chef non trovato");
    const user = await getchef.json();

    return dayjs(user.birthDate).format("DD/MM/YYYY"); // Bonus 2
  } catch (error) {
    console.error("Errore:", error.message);
    throw error;
  }
}

// getChefBirthday(1)
//   .then((birthDate) => console.log("Data di nascita dello chef:", birthDate))
//   .catch((error) => console.error("Errore:", error.message));
// console.log("Programma eseguito"); // così non è funzionale (non viene eseguito al momento desiderato), meglio la IIFE

// (async () => {
//   try {
//     const birthDate = await getChefBirthday(1);
//     console.log("Data di nascita dello chef:", birthDate);
//   } catch {
//     (error) => console.error("Errore:", error.message);
//   }
//   console.log("Programma eseguito");
// })();

//   Soluzione ufficiale
async function getChefBirthDate(id) {
  let post;
  try {
    const getRecipe = await fetch(`https://dummyjson.com/recipes/${id}`);
    post = await getRecipe.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Ricetta id ${id} non trovata`); // Bonus 1
  }
  if (post.message) {
    throw new Error(post.message);
  }
  let user;
  try {
    const getchef = await fetch(`https://dummyjson.com/users/${post.userId}`);
    user = await getchef.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Chef id ${id} non trovato`); // Bonus 1
  }
  if (user.message) {
    throw new Error(user.message);
  }

  return dayjs(user.birthDate).format("DD/MM/YYYY"); // Bonus 2
}

(async () => {
  try {
    const birthDate = await getChefBirthDate(2);
    console.log("Data di nascita dello chef:", birthDate);
  } catch (error) {
    console.error("Errore:", error.message);
  }
  console.log("Programma eseguito");
})();
