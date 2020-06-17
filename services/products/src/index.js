const express = require("express");
require('isomorphic-fetch');

const app = express();
const port = 7000;

app.use(require("body-parser").json());
app.use(require("cors")());
app.use("/images", express.static("public"));

const getPokemons = async () => {
  const endpoint = 'https://graphql-pokemon.now.sh'
  const query = `
    {
      pokemons(first: 151) {
        id
        types
        number
        name
        image
      }
    }
  `
  try {
    const { data: { pokemons } } = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })
      .then(res => res.json());

    return pokemons;
  } catch (error) {
    console.error(error);
    
    return [];
  }
}

app.get("/api/getById", async (req, res) => {
  const qId = parseInt(req.query.id);
  const pokemons = await getPokemons();
  res.send(pokemons.find(({ number }) => number === qId) || null);
});

app.get("/api/search", async (req, res) => {
  const q = (req.query.q || "").toLowerCase();  
  const pokemons = await getPokemons();
  
  res.send(
    pokemons
      .filter(({ name }) => name.toLowerCase().includes(q))
      .map((pokemon) => ({
        ...pokemon,
      }))
      .slice(0, 20)
  );
});

app.listen(port, () =>
  console.log(`Product service listening at http://localhost:${port}`)
);
