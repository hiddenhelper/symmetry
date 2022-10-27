import {IPokemon, ISpecies, IType} from "types";

export const POKEMONS_MOCKS: IPokemon[] = [
  {
    id: 1,
    name: 'pikachu',
    species: 179,
    types: [{
      id: 1,
      name: 'normal'
    }],
    image: 'https://example.com/pikachu.png',
    stats: [
      {
        id: 1,
        name: 'hp',
        base_stat: 10
      },
      {
        id: 2,
        name: 'attack',
        base_stat: 20
      }
    ]
  },
  {
    id: 2,
    name: 'bulbasaur',
    species: 179,
    types: [{
      id: 2,
      name: 'flying'
    }],
    image: 'https://example.com/bulbasaur.png',
    stats: [
      {
        id: 1,
        name: 'hp',
        base_stat: 30
      },
      {
        id: 2,
        name: 'attack',
        base_stat: 40
      }
    ]
  }
]

export const SPECIES_MOCKS: ISpecies[] = [
  {
    id: 179,
    name: 'mareep'
  },
  {
    id: 331,
    name: 'cacnea'
  },
]

export const TYPES_MOCKS: IType[] = [
  {
    id: 1,
    name: 'normal'
  },
  {
    id: 2,
    name: 'flying'
  },
]
