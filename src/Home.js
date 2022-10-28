import React, { useEffect, useState } from "react"
import Moment from "react-moment"
import { Chart, registerables } from "chart.js"
Chart.register(...registerables)

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

const data = {
  labels: labels,
  datasets: [
    {
      fill: true,
      label: "Cassualties",
      data: [65, 59, 90, 81, 56, 55, 40, 381, 381, 381, 381, 381],
      borderColor: "#8783a2",
      backgroundColor: "#8783a2e4",
    },
    {
      fill: true,
      label: "Cases",
      data: [65, 529, 930, 81, 563, 55, 40, 381, 381, 781, 481, 681],
      borderColor: "#3f3c57",
      backgroundColor: "#3f3c57e4",
    },
    {
      fill: true,
      label: "Recovered",
      data: [65, 45, 920, 381, 556, 55, 40, 381, 381, 381, 381, 381],
      borderColor: "#b2abeb",
      backgroundColor: "#b2abebe4",
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
  const [fetchFinnished, setFinnished] = useState(false)
  const [totalData, setData] = useState()
  const [statsConfig, setStatsConfig] = useState(config)
  const [cassualties, setCassualties] = useState()
  const [confirmed, setConfirmed] = useState()
  const [recovered, setRecovered] = useState()

  const sortData = totalData => {
    let sortedData = totalData.sort((a, b) => {
      return new Date(a[0].data.date) - new Date(b[0].data.date)
    })
    sortedData.map(monthData => {
      setCassualties(prev => {
        if (prev !== undefined) {
          return [...prev, monthData[0].data.deaths]
        } else {
          return [monthData[0].data.deaths]
        }
      })
      setRecovered(prev => {
        if (prev !== undefined) {
          return [...prev, monthData[0].data.recovered]
        } else {
          return [monthData[0].data.recovered]
        }
      })
      setConfirmed(prev => {
        if (prev !== undefined) {
          return [...prev, monthData[0].data.confirmed]
        } else {
          return [monthData[0].data.confirmed]
        }
      })
    })
  }

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": `${process.env.REACT_APP_API_KEY}`,
        "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
      },
    }

    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth()
    let day = today.getDay()
    if (month[0] !== 1) {
      month = "0" + month.toString()
    }
    if (day[0] !== 1 && day[0] !== 2 && day !== 2 && day !== 1) {
      day = "0" + day.toString()
    }

    labels.map((label, i) => {
      if (i < month) {
        let ind = i + 1
        if (ind[0] !== 1) {
          ind = "0" + ind.toString()
        }

        fetch(
          `https://covid-19-statistics.p.rapidapi.com/reports/total?date=${year}-${ind}-${day}`,
          options
        )
          .then(response => response.json())
          .then(response => {
            let monthData = []
            monthData.push(response)
            setData(prev => {
              if (prev !== undefined) {
                return [...prev, monthData]
              } else {
                return [monthData]
              }
            })
            if (Number(i + 1) == Number(month)) {
              setTimeout(() => {
                setFinnished(true)
                return
              }, 1000)
            }
          })
          .catch(err => console.error(err))
      }
    })

    let chart = new Chart(document.getElementById("myChart"), statsConfig)
  }, [])

  useEffect(() => {
    if (fetchFinnished === true) {
      sortData(totalData)
    }
  }, [fetchFinnished])

  return (
    <div id="home-charts">
      <canvas
        id="myChart"
        width={window.innerWidth < 1000 ? "400" : "500"}
        height="200"
      ></canvas>
    </div>
  )
}

export default Home
