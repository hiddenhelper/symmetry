import {request, gql} from 'graphql-request'
import {IPokemon, IStatistic} from "types";

const BASE_URL = 'https://beta.pokeapi.co/graphql/v1beta'

export async function getListOfPokemons(): Promise<IPokemon[]> {
  const data = await request(BASE_URL, gql`
  {
    pokemon_v2_pokemon {
      id
      name
      pokemon_v2_pokemonstats {
        id
        base_stat
        pokemon_v2_stat {
          name
        }
      }
      pokemon_v2_pokemontypes {
        type_id
        pokemon_v2_type {
          name
        }
      }
      pokemon_species_id
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
  `)
  return data.pokemon_v2_pokemon.map((p: any) => ({
    id: p.id,
    name: p.name,
    species: p.pokemon_species_id,
    image: JSON.parse(p.pokemon_v2_pokemonsprites[0].sprites)?.front_default,
    types: p.pokemon_v2_pokemontypes.map((t: any) => ({
      id: t.type_id,
      name: t.pokemon_v2_type.name
    })),
    stats: p.pokemon_v2_pokemonstats.map((s: any) => ({
      id: s.id,
      base_stat: s.base_stat,
      name: s.pokemon_v2_stat.name
    }))
  }))
}

export async function getStatistic(): Promise<IStatistic> {
  const data = await request(BASE_URL, gql`
  {
    pokemon_v2_pokemonspecies {
      id
      name
    }
    pokemon_v2_type {
      name
      id
    }
    pokemon_v2_pokemon_aggregate {
      aggregate {
        count
      }
    }
  }
  `)
  return {
    species: data.pokemon_v2_pokemonspecies,
    types: data.pokemon_v2_type,
    unique_pokemons: data.pokemon_v2_pokemon_aggregate.aggregate.count
  }
}
