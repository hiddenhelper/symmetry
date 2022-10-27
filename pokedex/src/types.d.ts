export interface IStat {
  id: number
  name: string
  base_stat: number
}

export interface IPokemon {
  id: number
  name: string
  stats: IStat[]
  types: IType[]
  species: number
  image: string
}

export interface IType {
  id: number
  name: string
}

export interface ISpecies {
  id: number
  name: string
}

export interface IStatistic {
  species: ISpecies[]
  types: IType[]
  unique_pokemons: number
}
