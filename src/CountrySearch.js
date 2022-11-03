import React, { useState, useEffect } from "react"
import Moment from "react-moment"
import "./App.css"

const CountrySearch = () => {
  const [data, setData] = useState([])
  const [country, setCountry] = useState("")
  const [showsearch, setSearch] = useState("")
  const [errormsg, setError] = useState(false)
  const [countryData, setCountryData] = useState("")

  useEffect(() => {
    setSearch(true)
  }, [])

  const getFromApi = e => {
    e.preventDefault()

    setSearch(false)

    if (country === "") {
      setError(true)

      return
    }

    fetch(
      `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=${country}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
          "x-rapidapi-key": `${process.env.REACT_APP_API_KEY}`,
        },
      }
    )
      .then(response => response.json())
      .then(data => outputting(data))
      .catch(err => {
        alert(
          "You might have misspelled the name of the country. Please, try again"
        )
      })
  }

  const changeCountry = e => {
    setCountry(e.target.value)
    setData([])
  }

  const outputting = dat => {
    if (!dat.data.covid19Stats.length < 218 && country) {
      let dataarr = [...data]

      if (
        !dat.data.covid19Stats ||
        dat.data.covid19Stats[0].country === "US" ||
        dat.data.covid19Stats[0].country !== country
      ) {
        setError(true)
        return
      }

      console.log(dat.data)

      dataarr = dat.data.covid19Stats.map(region => {
        return {
          region: region,
          province: region.province,
          confirmed: region.confirmed,
          recovered: region.recovered,
          deaths: region.deaths,
          timestamp: region.lastUpdate,
        }
      })

      // let travelInfoArr;
      // travelInfoArr = [];

      // rawData.map((country) => {
      //   if (country.location === dat.data.covid19Stats[0].country) {
      //     travelInfoArr.push(country.data);
      //   }
      //   setTravelData(travelInfoArr);
      // });

      setData(dataarr)
    }
  }

  const newSearch = () => {
    setCountry("")
    setSearch(true)
    setError(false)
  }
  // const showRecommendations = () => {
  //   setRecs(!showRecs);
  // };

  useEffect(() => {
    setCountryData(
      data.map((cas, index) => (
        <tr key={index}>
          {" "}
          <td> {cas.province} </td> <td> {cas.confirmed} </td>{" "}
          <td> {cas.deaths} </td>{" "}
          <td>
            {" "}
            {cas.timestamp !== undefined ? (
              <Moment utc={false} parse="YYYY-DD-MM" format={"MMMM Do YYYY"}>
                {" "}
                {cas.timestamp.slice(0, 10)}
              </Moment>
            ) : (
              <span>No recent update</span>
            )}
          </td>{" "}
        </tr>
      ))
    )
  }, [data])

  return (
    <div>
      {showsearch === true ? (
        <div className="country_search">
          <h6>ENTER COUNTRY NAME (Excepting China and the US)</h6>
          <form className="forma" onSubmit={getFromApi}>
            <input
              id="countryinput"
              type="text"
              onChange={e => changeCountry(e)}
            />
            <button id="countrysearchbtn" type="submit">
              Search
            </button>
          </form>
        </div>
      ) : showsearch === false && errormsg === false ? (
        <div className="countryinfo">
          <h6 className="country_title">{country.toUpperCase()}</h6>
          <table>
            <thead>
              <tr>
                {" "}
                <th> PROVINCE </th>
                <th> CONFIRMED </th> <th> CASUALTIES </th>
                <th> UPDATE (mm:dd:yy) </th>{" "}
              </tr>{" "}
            </thead>{" "}
            <tbody> {countryData} </tbody>{" "}
          </table>{" "}
          <button className="backToTop" onClick={newSearch}>
            New Search
          </button>
          {/* <p id="recommendations_link" onClick={() => showRecommendations()}>
            TRAVEL RECOMMENDATIONS
          </p> */}
        </div>
      ) : errormsg === true && showsearch === false ? (
        <div className="notvalidcountry">
          You need to enter a valid country name
          <div>
            <button
              className="backToTop"
              style={{ marginBottom: "2rem" }}
              onClick={newSearch}
            >
              New Search
            </button>
          </div>
        </div>
      ) : null}

      {/* {showRecs && (
        <Travelrec travelData={travelData} closeRecs={showRecommendations} />
      )} */}
    </div>
  )
}

export default CountrySearch
