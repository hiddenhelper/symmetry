import {ISpecies} from "types";

interface IProps {
  possibleSpecies: ISpecies[]
  value: number | null
  onChange: (id: number) => void
}

export default function SpeciesFilter({value, possibleSpecies, onChange}: IProps) {
  return (
    <div>
      <select
        name="species"
        id="species"
        value={value ?? ''}
        onChange={e => onChange(Number(e.target.value))}
        aria-label="Species"
      >
        <option value=""></option>
        {possibleSpecies.map(sp => <option key={sp.id} value={sp.id}>{sp.name}</option>)}
      </select>
    </div>
  )
}
