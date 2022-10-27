import {useMemo, useState} from "react";
import ReactPaginate from "react-paginate";
import {IPokemon} from "types";
import styles from './PokemonList.module.css';

interface IProps {
  pokemons: IPokemon[]
}

const ITEMS_PER_PAGE = 10

export default function PokemonList({pokemons}: IProps) {
  const [itemOffset, setItemOffset] = useState(0);
  const [sorting, setSorting] = useState<string | null>(null)

  const currentItems = useMemo(() => {
    const endOffset = itemOffset + ITEMS_PER_PAGE;
    let res = pokemons
    if (sorting) {
      res = res.sort((a, b) => {
        let reversed = false
        let key = sorting
        if (key[0] === '-') {
          reversed = true
          key = sorting.slice(1)
        }
        const aStat = a.stats.find(s => s.name === key)
        const bStat = b.stats.find(s => s.name === key)
        if (!aStat) {
          return 1
        }
        if (!bStat) {
          return -1
        }
        if (reversed) {
          return bStat.base_stat - aStat.base_stat
        } else {
          return aStat.base_stat - bStat.base_stat
        }
      })
    } else {
      res = res.sort((a, b) => a.name.localeCompare(b.name))
    }
    return res.slice(itemOffset, endOffset)
  }, [itemOffset, pokemons, sorting])

  const pageCount = useMemo(() => {
    return Math.ceil(pokemons.length / ITEMS_PER_PAGE)
  }, [pokemons.length])

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * ITEMS_PER_PAGE) % pokemons.length;
    setItemOffset(newOffset);
    window.scrollTo({top: 0, behavior: 'smooth'})
  };

  const statsList = useMemo(() => {
    const allStats = pokemons.flatMap(p => p.stats)
    return Array.from(new Map(allStats.map(item => [item.name, item])).values())
  }, [pokemons])

  const toggleSorting = (name: string) => {
    setSorting(prev => {
      if (!prev) {
        return name
      }
      if (prev[0] !== '-') {
        return `-${name}`
      }
      return null
    })
  }

  return <div className={styles.container}>
    <table className={styles.table}>
      <thead>
      <tr>
        <th>Name</th>
        <th>Image</th>
        <th>Types</th>
        {statsList.map(s => <th
          key={s.id}
          onClick={() => toggleSorting(s.name)}
          className={styles.selectableColumn}
        >
          {s.name} {sorting === s.name ? '▼' : sorting === `-${s.name}` ? '▲' : ' '}
        </th>)}
      </tr>
      </thead>
      <tbody>
      {currentItems && currentItems.map(pokemon => (
        <tr key={pokemon.id}>
          <td>
            {pokemon.name}
          </td>
          <td>
            {pokemon.image && <img src={pokemon.image} alt={pokemon.name}/>}
          </td>
          <td>
            {pokemon.types.map(t => t.name).join(', ')}
          </td>
          {statsList.map(s => <td key={s.id}>{pokemon.stats.find(stat => stat.name === s.name)?.base_stat}</td>)}
        </tr>
      ))}
      </tbody>
    </table>

    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      previousLabel="< previous"
      containerClassName={styles.pagination}
      disabledLinkClassName={styles.disabled}
      activeClassName={styles.active}
      pageClassName={styles.page}
      nextClassName={styles.page}
      previousClassName={styles.page}
    />
  </div>
}
