import React from "react"
import Moment from "react-moment"

const Home = () => {
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
