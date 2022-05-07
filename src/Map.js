import React, { useRef, useState, useEffect } from "react"
import axios from "axios"
import WorldMap from "react-world-map"

function Map() {
  const [selected, onSelect] = useState(null)
  const [allData, setAllData] = useState("")
  const [toolTip, setTooltip] = useState("")
  const [animating, setAnimating] = useState(false)
  const selectionIndex = useRef(0)

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://covid-19-coronavirus-statistics2.p.rapidapi.com/continentData",
      headers: {
        "x-rapidapi-key": `${process.env.REACT_APP_API_KEY}`,
        "x-rapidapi-host": "covid-19-coronavirus-statistics2.p.rapidapi.com",
      },
    }
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data)
        setAllData(response.data.result)
      })
      .catch(function (error) {
        console.error(error)
      })
  }, [])

  const setTooltipCoords = e => {
    const popup = document.getElementById("displayText")

    if (selected) {
      popup.style.position = "absolute"
      popup.classList.add("animated")
    }
  }

  const getMyToolTipFunction = cont => {
    onSelect(cont)
    setAnimating(true)
    selectionIndex.current += 1

    const popup = document.getElementById("displayText")
    popup.classList.remove("animated")

    if (selectionIndex.current >= 0) {
      popup.style.visibility = "visible"
      popup.style.position = "absolute"
      popup.classList.add("animated")
      popup.style.top = (window.innerHeight / 2).toString() + "px"
      popup.style.left = "35%"
    }
    if (!cont) {
      popup.toggleAttribute("hidden")
      setTooltip(false)
      selectionIndex.current = 0
      return
    }

    setTooltip(true)

    let continents = {
      "North America": "na",
      "South America": "sa",
      Asia: "as",
      Oceania: "oc",
      Europe: "eu",
      Africa: "af",
    }

    let keys = Object.keys(continents)
    console.log(keys)
    if (allData.length) {
      allData.map(region => {
        keys.map(key => {
          if (region.continent === key && cont === continents[key]) {
            popup.innerHTML = `<p>New cases: ${region.newCases}</p>
                              <p> Total cases: ${region.totalCases}</p>
                              <p> Total deaths: ${region.totalDeaths}</p>`
          }
        })
      })
    }
  }

  useEffect(() => {
    if (toolTip) {
      document.getElementById("heading-reg-data").style.visibility = "hidden"
    } else {
      document.getElementById("heading-reg-data").style.visibility = "visible"
    }
  }, [toolTip])

  return (
    <>
      <h5 id="heading-reg-data" className="pb-2 my-3">
        See stats (click) on each continent
      </h5>
      <div
        className="class"
        onClick={!animating ? e => setTooltipCoords(e) : null}
      >
        <WorldMap
          selected={selected}
          onSelect={cont => getMyToolTipFunction(cont)}
        />
        <span className="displayText w-100" id="displayText"></span>
      </div>
    </>
  )
}

export default Map
