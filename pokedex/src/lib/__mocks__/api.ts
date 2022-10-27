import {POKEMONS_MOCKS, SPECIES_MOCKS, TYPES_MOCKS} from "mocks";
import {IPokemon, IStatistic} from "types";

export async function getListOfPokemons(): Promise<IPokemon[]> {
  return Promise.resolve(POKEMONS_MOCKS)
}

export async function getStatistic(): Promise<IStatistic> {
  return Promise.resolve({species: SPECIES_MOCKS, types: TYPES_MOCKS, unique_pokemons: POKEMONS_MOCKS.length})
}
