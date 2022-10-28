import React, { useEffect, useState } from "react"
import Moment from "react-moment"
import { Chart, registerables } from "chart.js"
Chart.register(...registerables)

// const DATA_COUNT = 12
// const NUMBER_CFG = {
//   count: DATA_COUNT,
//   min: 0,
//   max: 10000000,
//   continuity: 10000000,
// }

// let cassualties = [29387, 879317, 39872]

// function numbers(config) {
//   var cfg = config
//   var min = cfg.min || 0
//   var max = cfg.max || 10000000
//   var from = cfg.from || []
//   var count = 3
//   // var decimals = cfg.decimals || 8
//   var continuity = cfg.continuity
//   var dfactor = Math.pow(10, 8)
//   var data = []
//   var i, value

//   for (i = 0; i < count; ++i) {
//     value = cassualties
//     if (value <= continuity) {
//       data.push(Math.round(dfactor * value) / dfactor)
//     } else {
//       data.push(null)
//     }
//   }

//   return data
// }

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
// const dataFirstSkip = numbers(NUMBER_CFG)
// const dataMiddleSkip = numbers(NUMBER_CFG)
// const dataLastSkip = numbers(NUMBER_CFG)

// dataFirstSkip[0] = null
// dataMiddleSkip[Number.parseInt(dataMiddleSkip.length / 2, 10)] = null
// dataLastSkip[dataLastSkip.length - 1] = null

const data = {
  labels: labels,
  datasets: [
    {
      fill: true,
      label: "Cassualties",
      data: [65, 59, 90, 81, 56, 55, 40],
      borderColor: "#8783a2",
      backgroundColor: "#8783a2",
    },
    {
      fill: true,
      label: "Cases",
      data: [65, 529, 930, 81, 563, 55, 40],
      borderColor: "#3f3c57",
      backgroundColor: "#3f3c57",
    },
    {
      fill: true,
      label: "Recovered",
      data: [65, 45, 920, 381, 556, 55, 40],
      borderColor: "#b2abeb",
      backgroundColor: "#b2abeb",
    },
  ],
}

const config = {
  type: "radar",
  data: data,
  options: {
    animations: {
      tension: {
        duration: 3000,
        easing: "linear",
        from: 1,
        to: 0,
        loop: true,
      },
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Covid-19 global stats",
        color: "#b2abeb",
      },
      legend: { labels: { color: "#b2abeb" } },
    },
  },
}

const Home = () => {
  const [totalData, setData] = useState()
  const [statsConfig, setStatsConfig] = useState(config)

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": `${process.env.REACT_APP_API_KEY}`,
        "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
      },
    }

    fetch(
      "https://covid-19-statistics.p.rapidapi.com/reports/total?date=2020-04-07",
      options
    )
      .then(response => response.json())
      .then(response => {
        setData(response)
        console.log(response)
      })
      .catch(err => console.error(err))

    let chart = new Chart(document.getElementById("myChart"), statsConfig)
  }, [])

  return (
    <div id="home-charts">
      <canvas id="myChart" width="600" height="300"></canvas>
    </div>
  )
}

export default Home
