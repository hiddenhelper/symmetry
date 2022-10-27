import styles from './Statistic.module.css';

interface IProps {
  pokemons: number
  species: number
  types: number
}

export default function Statistic({pokemons, species, types}: IProps) {
  return (
    <div className={styles.container}>
      <span>
        Pokemons: {pokemons}
      </span>
      <span>
        Types: {types}
      </span>
      <span>
        Species: {species}
      </span>
    </div>
  )
}
