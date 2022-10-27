import SpeciesFilter from "components/Filter/SpeciesFilter";
import TypesFilter from "components/Filter/TypesFilter";
import PokemonList from "components/PokemonList/PokemonList";
import Spinner from "components/Spinner/Spinner";
import Statistic from "components/Statistic/Statistic";
import TypesChart from "components/TypesChart/TypesChart";
import {getListOfPokemons, getStatistic} from "lib/api";
import React, {useEffect, useMemo, useState} from 'react';
import styles from './App.module.css';
import {IPokemon, IStatistic} from "types";

function App() {
  
  const [pokemons, setPokemons] = useState<IPokemon[]>([])
  const [search, setSearch] = useState('')
  const [statistic, setStatistic] = useState<IStatistic | null>(null)
  const [selectedSpecies, setSelectedSpecies] = useState<number | null>(null)
  const [selectedTypes, setSelectedTypes] = useState<number[]>([])

  useEffect(() => {
    // fetch pokemons, statistics when initial loading
    getListOfPokemons().then(res => setPokemons(res))
    getStatistic().then(res => setStatistic(res))
  }, [])


  // filter pokemons by search text, selected types, selected species
  const filteredPokemonList = useMemo(() => {
    let result = pokemons
    if (search) {
      result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (selectedTypes.length > 0) {
      result = result.filter(p => p.types.some(t => selectedTypes.includes(t.id)))
    }
    if (selectedSpecies) {
      result = result.filter(p => p.species === selectedSpecies)
    }
    return result
  }, [pokemons, search, selectedSpecies, selectedTypes])

  // render
  return (
    <div className={styles.container}>
      <h1>Pokedex by Craig Black</h1>

      {pokemons.length === 0 && <Spinner/>}
      {pokemons.length > 0 && <TypesChart pokemons={pokemons}/>}

      {!statistic && <Spinner/>}
      {statistic && (
        <>
          <Statistic
            pokemons={statistic.unique_pokemons}
            species={statistic.species.length}
            types={statistic.types.length}
          />
          <TypesFilter
            possibleTypes={statistic.types}
            value={selectedTypes}
            onChange={ids => setSelectedTypes(ids)}
          />
          <div className={styles.filter}>
            <div>
              <input
                id="search"
                type="text"
                name="search"
                value={search}
                placeholder="Type pokemon name here"
                onChange={e => setSearch(e.target.value)}
                aria-label="Input pokemon name"
              />
            </div>
            <SpeciesFilter
              possibleSpecies={statistic.species}
              value={selectedSpecies}
              onChange={id => setSelectedSpecies(id)}
            />
          </div>
        </>
      )}
      {pokemons.length === 0 && <Spinner/>}
      {pokemons.length > 0 && <PokemonList pokemons={filteredPokemonList}/>}
    </div>
  );
}

export default App;
