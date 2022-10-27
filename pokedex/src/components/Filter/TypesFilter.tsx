import {IType} from "types";
import styles from './TypesFilter.module.css';

interface IProps {
  possibleTypes: IType[]
  value: number[]
  onChange: (ids: number[]) => void
}

export default function TypesFilter({value, possibleTypes, onChange}: IProps) {
  const toggleSelectedType = (id: number) => {
    const arrayCopy = [...value]
    const index = arrayCopy.indexOf(id);
    if (index === -1) {
      arrayCopy.push(id);
    } else {
      arrayCopy.splice(index, 1);
    }
    onChange(arrayCopy)
  }

  return (
    <div className={styles.container}>
      {possibleTypes.map(type => (
        <div key={type.id}>
          <label htmlFor={`type-${type.id}`}>{type.name}
            <input
              type="checkbox"
              name="type"
              id={`type-${type.id}`}
              value={type.id}
              checked={value.includes(type.id)}
              onChange={e => toggleSelectedType(Number(e.target.value))}
            />
          </label>
        </div>
      ))}
    </div>
  )
}
