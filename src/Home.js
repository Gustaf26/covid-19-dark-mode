import React, { useEffect, useState } from "react"
import Moment from "react-moment"
import { Chart, registerables } from "chart.js"
Chart.register(...registerables)

const DATA_COUNT = 7
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 }

function numbers(config) {
  var cfg = config || {}
  var min = cfg.min || 0
  var max = cfg.max || 100
  var from = cfg.from || []
  var count = cfg.count || 8
  var decimals = cfg.decimals || 8
  var continuity = cfg.continuity || 1
  var dfactor = Math.pow(10, decimals) || 0
  var data = []
  var i, value

  for (i = 0; i < count; ++i) {
    value = (from[i] || 0) + Math.random(min, max)
    if (Math.random() <= continuity) {
      data.push(Math.round(dfactor * value) / dfactor)
    } else {
      data.push(null)
    }
  }

  return data
}

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
const dataFirstSkip = numbers(NUMBER_CFG)
const dataMiddleSkip = numbers(NUMBER_CFG)
const dataLastSkip = numbers(NUMBER_CFG)

dataFirstSkip[0] = null
dataMiddleSkip[Number.parseInt(dataMiddleSkip.length / 2, 10)] = null
dataLastSkip[dataLastSkip.length - 1] = null

const data = {
  labels: labels,
  datasets: [
    {
      label: "Skip first dataset",
      data: dataFirstSkip,
      borderColor: "rgba(120, 98, 235, 0.8);",
      backgroundColor: "rgba(120, 98, 235, 0.5);",
    },
    {
      label: "Skip mid dataset",
      data: dataMiddleSkip,
      borderColor: "rgba(192, 183, 239, 0.8);",
      backgroundColor: "rgba(192, 183, 239, 0.5);",
    },
    {
      label: "Skip last dataset",
      data: dataLastSkip,
      borderColor: "rgba(144, 135, 197, 0.8)",
      backgroundColor: "rgba(144, 135, 197, 0.5)",
    },
  ],
}

const config = {
  type: "radar",
  data: data,
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Covid-19 global stats",
      },
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
