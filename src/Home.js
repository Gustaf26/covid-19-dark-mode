import React, { useEffect, useState } from "react"
import Moment from "react-moment"

const Home = () => {
  const [totalData, setData] = useState()

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
  }, [])

  return (
    <div id="home-mess">
      <h3>Get updates on the virus from all over the world</h3>
      <p id="countdown-outbreak">
        The outbreak was first reported to World Health Organisation{" "}
        <Moment date="2019-12-31T12:59-0500" durationFromNow></Moment> ago
      </p>
    </div>
  )
}

export default Home
