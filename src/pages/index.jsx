import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  const { pokemons } = props;

  if (pokemons != []) {
    return (
      <div className="h-screen w-screen overflow-x-hidden">
        <header className="flex justify-center items-center h-12 p-4 bg-sky-700">
          <h1 className="text-lg font-bold text-white">
            pokedex - filipe f. guilardi
          </h1>
        </header>

        <ul>
          {pokemons.map((pokemon) => {
            return(
              <li key={pokemon.entry_number} className="text-black">{pokemon.pokemon_species.name}</li>
            )
          }
          )}
        </ul>
      </div>
    );
  }
}

export async function getStaticProps(context) {
  const pokemons = await fetch("https://pokeapi.co/api/v2/pokedex/2/")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((res) => {
      return res.pokemon_entries
    });

  return {
    props: {
      pokemons,
    },
  };
}
