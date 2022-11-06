import React, { useEffect, useState, useRef } from "react"
import Moment from "react-moment"
import { Chart, registerables, plugins, defaults } from "chart.js"
import "react-slideshow-image/dist/styles.css"
Chart.register(...registerables)
Chart.register(defaults.color)
Chart.defaults.color = "#bfb7ee"
Chart.defaults.font = {
  family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
  size: 15,
  style: "normal",
  lineHeight: 1,
  weight: null,
  color: "#3e0f75",
}

const Home = () => {
  const [fetchFinnished, setFinnished] = useState(false)
  const [totalData, setData] = useState()
  const [labels, setLabels] = useState([
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
  ])
  const [statsConfigCassualties, setStatsConfigCassualties] = useState()
  const [statsConfigConfirmed, setStatsConfigConfirmed] = useState()
  const [statsConfigrecovered, setStatsConfigRecovered] = useState()
  const [cassualties, setCassualties] = useState()
  const [confirmed, setConfirmed] = useState()
  const [recovered, setRecovered] = useState()
  const [casData, setCasData] = useState({})
  const [confData, setConfData] = useState({})
  const [recoveredData, setRecoveredData] = useState({})
  const [chart0InUse, setChart0InUse] = useState()
  const [chart1InUse, setChart1InUse] = useState()
  const [chart2InUse, setChart2InUse] = useState()
  const [categoriesLoaded, setCategoriesLoaded] = useState(false)
  const [selectedDiagram, setSelectedDiagram] = useState(0)
  const [statsYears, setYear] = useState([2020, 2021, 2022])

  useEffect(() => {
    setStatsConfigCassualties({
      type: "radar",
      data: casData,
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
        maintainAspectRatio: true,
        responsive: false,
        plugins: {
          title: {
            display: true,
            text: "Covid-19 global stats",
            color: "#b2abeb",
          },
          legend: {
            labels: { color: "#b2abeb" },
          },
        },
      },
    })
    setStatsConfigConfirmed({
      type: "radar",
      data: confData,
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
        maintainAspectRatio: false,
        responsive: false,
        plugins: {
          title: {
            display: true,
            text: "Covid-19 global stats",
            color: "#b2abeb",
          },
          legend: { labels: { color: "#b2abeb" } },
        },
      },
    })
    setStatsConfigRecovered({
      type: "radar",
      data: recoveredData,
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
        maintainAspectRatio: true,
        responsive: false,
        plugins: {
          title: {
            display: true,
            text: "Covid-19 global stats",
            color: "#b2abeb",
          },
          legend: { labels: { color: "#b2abeb" } },
        },
      },
    })
  }, [recoveredData, confData, casData])

  useEffect(() => {
    const allCharts = [chart0InUse, chart1InUse, chart2InUse]
    if (allCharts.length > 0) {
      allCharts.map((somechart, i) => {
        if (somechart !== undefined) {
          somechart.destroy()
        }
      })
    }
    let indexes = [0, 1, 2]

    indexes.map(i => {
      let chart = new Chart(
        document.getElementById(`myChart${i}`),
        i == 0
          ? statsConfigCassualties
          : i == 1
          ? statsConfigConfirmed
          : statsConfigrecovered
      )
      if (i == 0) {
        setChart0InUse(chart)
      } else if (i == 1) {
        setChart1InUse(chart)
      } else {
        setChart2InUse(chart)
      }
    })
    resizeCanvas()
  }, [statsConfigCassualties, statsConfigConfirmed, statsConfigrecovered])

  useEffect(() => {
    setCasData({
      labels: labels,
      datasets: [
        {
          fill: true,
          label: "Cassualties",
          data: cassualties,
          borderColor: "#3f3c57",
          backgroundColor: "#3f3c57e4",
        },
      ],
    })
    setConfData({
      labels: labels,
      datasets: [
        {
          fill: true,
          label: "Cases",
          data: confirmed,
          borderColor: "#3f3c57",
          backgroundColor: "#3f3c57e4",
        },
      ],
    })
    setRecoveredData({
      labels: labels,
      datasets: [
        {
          fill: true,
          label: "Recovered",
          data: recovered,
          borderColor: "#3f3c57",
          backgroundColor: "#3f3c57e4",
        },
      ],
    })
  }, [categoriesLoaded])

  const resizeCanvas = () => {
    let allCanvas = document.getElementsByClassName("chart")
    allCanvas = [...allCanvas]
    allCanvas.map(canvas => {
      canvas.style.height =
        window.innerWidth <= 400
          ? "45vh"
          : window.innerWidth <= 600
          ? "40vh"
          : window.innerWidth <= 1100
          ? "40vh"
          : "50vh"
      canvas.style.width =
        window.innerWidth <= 400
          ? "80vw"
          : window.innerWidth <= 600
          ? "90vw"
          : window.innerWidth <= 1100
          ? "50vw"
          : "35vw"
    })
  }

  useEffect(() => {
    window.addEventListener("resize", () => {
      resizeCanvas()
    })
  })

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
    setTimeout(() => {
      setCategoriesLoaded(true)
    }, 2000)
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
    let day = today.getDate()

    if (month < 10) {
      month = "0" + month.toString()
    }
    if (day[0] !== 1 && day[0] !== 2) {
      day = "0" + day.toString()
    }

    labels.map((label, i) => {
      if (i < month) {
        let ind = i + 1
        if (ind < 10) {
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
    selectDiagram("init")
  }, [])

  useEffect(() => {
    if (fetchFinnished === true) {
      sortData(totalData)
    }
  }, [fetchFinnished])

  const selectDiagram = arg => {
    if (arg == "init") {
      setSelectedDiagram(0)
    } else if (arg == "next") {
      if (selectedDiagram == 2) {
        return
      }
      setSelectedDiagram(prev => prev + 1)
    } else {
      if (selectedDiagram == 0) {
        return
      }
      setSelectedDiagram(prev => prev - 1)
    }
  }

  return (
    <div id="stats-container">
      <select id="years-labels">
        {statsYears.map(year => {
          return <option className="statsYear">{year}</option>
        })}
      </select>
      <div id="home-charts">
        <button
          className="diagram-but prev"
          onClick={() => selectDiagram("prev")}
        >
          {"<"}
        </button>
        <canvas
          id="myChart0"
          className={selectedDiagram == 0 ? "selected chart" : "chart"}
          // width={window.innerWidth < 1000 ? "500" : "900"}
          // height="500"
        ></canvas>
        <canvas
          id="myChart1"
          className={selectedDiagram == 1 ? "selected chart" : "chart"}
          // width={window.innerWidth < 1000 ? "500" : "900"}
          // height="500"
        ></canvas>
        <canvas
          id="myChart2"
          className={selectedDiagram == 2 ? "selected chart" : "chart"}
          // width={window.innerWidth < 1000 ? "600" : "900"}
          // height="500"
        ></canvas>
        <button
          className="diagram-but next"
          onClick={() => selectDiagram("next")}
        >
          {">"}
        </button>
      </div>
    </div>
  )
}

export default Home
