import React, { useEffect, useState } from "react"
import Moment from "react-moment"

const ContagionList = () => {
  const [data, setData] = useState([])
  const [selected, setSelected] = useState([])
  const [index, setIndex] = useState(0)

  const processData = dat => {
    let globalarr = []

    let j

    for (j = 0; j < dat.data.covid19Stats.length; j++) {
      globalarr.push({
        country: dat.data.covid19Stats[j].country,
        city: dat.data.covid19Stats[j].city,
        confirmed: dat.data.covid19Stats[j].confirmed,
        recovered: dat.data.covid19Stats[j].recovered,
        deaths: dat.data.covid19Stats[j].deaths,
        timestamp: dat.data.covid19Stats[j].lastUpdate,
      })
    }

    let selectarr = globalarr.filter(
      cou => cou.country !== "US" && cou.country !== "China"
    )

    //let doubleselectarr = selectarr.filter(cit=>cit.city =="")
    //console.log(globalarr)
    let sortedarr = selectarr.filter(pers => pers.deaths > 20000)

    setData({ data: sortedarr })
    setSelected({ data: sortedarr.slice(0, 11) })
    setIndex(10)
  }

  useEffect(() => {
    fetch(
      `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
          "x-rapidapi-key": `${process.env.REACT_APP_API_KEY}`,
        },
      }
    )
      .then(response => response.json())
      .then(data => processData(data))
      .catch(err => {
        console.log(err)
      })
  }, [])

  const selectEntries = arg => {
    if (arg === "next") {
      if (selected.data.length < data.data.length && index < data.data.length) {
        setSelected({ data: data.data.slice(index, index + 10) })
        setIndex(index + 10)
      }
    } else {
      if (index === 10) {
        return
      }
      setSelected({ data: data.data.slice(index - 20, index - 10) })
      setIndex(index - 10)
    }
  }

  return (
    <div>
      <div className="countryinfo">
        <table>
          <thead>
            <tr>
              <th>
                COUNTRY<span id="star">(*)</span>
              </th>
              <th>CONFIRMED</th>
              {/* <th>RECOVERED</th> */}
              <th>CASUALTIES</th>
              <th>UPDATE (mm:dd:yy)</th>
            </tr>
          </thead>
          <tbody>
            {selected.data &&
              selected.data.length > 0 &&
              selected.data.map((cas, i) => {
                return (
                  <tr key={i}>
                    <td>{cas.country}</td>
                    <td>{cas.confirmed}</td>
                    {/* <td>{cas.recovered}</td> */}
                    <td>{cas.deaths}</td>
                    <td>
                      <Moment parse="YYYY-DD-MM" format={"MMMM Do YYYY"}>
                        {cas.timestamp}
                      </Moment>{" "}
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
        <div>
          <button className="backToTop" onClick={() => selectEntries("prev")}>
            Prev
          </button>
          <button className="backToTop" onClick={() => selectEntries("next")}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContagionList
