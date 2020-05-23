const container: HTMLElement | any = document.getElementById("root");
const pokemons: number = 100;

interface IPokemon {
  id: number;
  name: string;
  image: string;
  type: string;
}

const fetchData = (): void => {
  for (let i = 1; i <= pokemons; i++) {
    getPokemon(i);
  }
}

const getPokemon = async (id: number): Promise<void> => {
  const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon: any = await data.json();
  const pokemonType: string = pokemon.types.map((pokemon: any) => pokemon.type.name).join(", ");

  const fetchedPokemon = {
    id: pokemon.id,
    name: pokemon.name,
    image: `${pokemon.sprites.front_default}`,
    type: pokemonType
  }
  
  showPokemon(fetchedPokemon);
}

const showPokemon = (pokemon : IPokemon): void => {
  let output: string = `
    <div class="card">
      <div class="id">${pokemon.id}.</div>
      <img src="${pokemon.image}" />
      <h2>${pokemon.name}</h2>
      <div>${pokemon.type}</div>
    </div>
  `;
  container.innerHTML += output;
}

fetchData();