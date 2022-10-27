import Chart from 'chart.js/auto';
import {useEffect, useMemo, useState} from "react";
import {IPokemon} from "types";


interface IProps {
  pokemons: IPokemon[]
}

function generateRandomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
}

export default function TypesChart({pokemons}: IProps) {
  const [chartObject, setChartObject] = useState<Chart | null>(null)

  const stats = useMemo(() => {
    const types = pokemons.flatMap(p => p.types)
    const map = new Map();
    types.forEach((item) => {
      const collection = map.get(item.name);
      if (!collection) {
        map.set(item.name, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }, [pokemons])

  useEffect(() => {
    if (!chartObject) {
      return
    }
    const data = Array.from(stats.values())
    chartObject.data.labels = Array.from(stats.keys());
    chartObject.data.datasets = [{
      label: 'Pokemon types',
      data: data.map(v => v.length),
      backgroundColor: data.map(() => generateRandomColor()),
      borderWidth: 1
    }];
    chartObject.update();
  }, [chartObject, stats])

  useEffect(() => {
    const ctx = document.getElementById('chart') as HTMLCanvasElement;
    if (!Chart.getChart(ctx)) {
      const data = Array.from(stats.values())
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Array.from(stats.keys()),
          datasets: [{
            label: 'Pokemon types',
            data: data.map(v => v.length),
            backgroundColor: data.map(() => generateRandomColor()),
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      setChartObject(chart)
    }
  }, [stats])
  return (
    <div className="chart-container">
      <canvas id="chart" width="400" height="100" aria-label="Hello ARIA World" role="img"/>
    </div>

  )
}
