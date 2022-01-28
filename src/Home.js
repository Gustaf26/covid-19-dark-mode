import React, { useState } from "react";
import Navbar from "./Navbar";
import Moment from "react-moment";

const Home = () => {
  return (
    <div>
      <hr></hr>
      <Navbar />
      {warning && (
        <div id="warn">
          {text ? text : null}
          <h5>
            ATTENTION: Please check the time update for the data delivered
          </h5>
          <p>
            The disease spreads progressively and we only have access to{" "}
            <span id="underline">daily updates</span>
          </p>
          <p id="countdown-outbreak">
            The outbreak was first reported to World Health Organisation{" "}
            <Moment date="2019-12-31T12:59-0500" durationFromNow></Moment> ago
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
