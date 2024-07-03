import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import Papa, { ParseResult } from "papaparse"

ChartJS.register(
  Colors,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
)

export const options = {
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
    colors: {
      scheme: "brewer.Paired12",
    },
  },
}

type Data = {
  name: string
  timestamp: number
  duration: number
}

type Values = {
  data: Data[]
}

export default () => {
  const [values, setValues] = React.useState<Values | undefined>()

  const getCSV = () => {
    Papa.parse("/logs.csv", {
      header: true,
      download: true,
      skipEmptyLines: true,
      delimiter: ",",
      complete: (results: ParseResult<Data>) => {
        setValues(results)
      },
    })
  }

  React.useEffect(() => {
    getCSV()
  }, [])

  console.log(values)
  if (!values) return <div>Loading...</div>

  const logs = values.data
  const dates = new Set(logs.map(({ timestamp }) => timestamp).sort())
  const labels = [...dates].filter(
    ({ timestamp }) => timestamp !== "2024-06-16",
  )

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(timestamp =>
          logs
            .filter(log => log.timestamp === timestamp)
            .reduce((acc, { duration }) => acc + duration, 0),
        ),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  }

  return (
    <>
      <div id="logs">
        <h1>logs.csv</h1>
        <Bar options={options} data={data} />
      </div>
    </>
  )
}

/*
 *  function App() {
 *    const [count, setCount] = useState(0)
 *    // Effect<void>
 *    const task = useMemo(
 * -    () => Effect.sync(() => setCount((current) => current + 1)),
 * -    [setCount]
 * +    () => Effect.sync(() => setCount(current => current + 1)),
 * +    [setCount],
 *    )
 *    const increment = useCallback(() => Effect.runSync(task), [task])
 *
 * -  const casts = [
 * -    "metagenda-2024.06.04.15",
 * -    "metagenda-2024.06.04.16",
 * -    "metagenda-2024.06.04.19",
 * -    "metagenda-2024.06.05.22",
 * -    "metagenda-2024.06.06.00",
 * -    "metagenda-2024.06.06.08",
 * -    "metagenda-2024.06.06.09",
 * -    "metagenda-2024.06.06.13",
 * -    "metagenda-2024.06.07.07",
 * -    "metagenda-2024.06.07.08",
 * -  ];
 * +  return (<Doughnut data={...} />)
 *
 * -  window.play(casts[0]);
 * -
 * -  return (
 * -    <>
 * -      <div>
 * -        <a href="https://vitejs.dev" target="_blank">
 * -          <img src={viteLogo} className="logo" alt="Vite logo" />
 * -        </a>
 * -        <a href="https://react.dev" target="_blank">
 * -          <img src={reactLogo} className="logo react" alt="React logo" />
 * -        </a>
 * -      </div>
 * -      <h1>Vite + React</h1>
 * -      <div className="card">
 * -        <button onClick={increment}>count is {count}</button>
 * -        <p>
 * -          Edit <code>src/App.tsx</code> and save to test HMR
 * -        </p>
 * -      </div>
 * -      <p className="read-the-docs">
 * -        Click on the Vite and React logos to learn more
 * -      </p>
 * -    </>
 * +* ) */
