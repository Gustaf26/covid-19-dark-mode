import React, { useState } from "react";
import Navbar from "./Navbar";
import Moment from "react-moment";

const Home = () => {
  const [text, setAdtext] = useState("");
  const [warning, setWarning] = useState(true);

  const closeWarning = () => {
    setWarning(false);
  };
  const openwarning = () => {
    setWarning(true);
  };

  const closeadtext = () => {
    setAdtext("");
  };

  return (
    <div>
      <hr></hr>
      <Navbar />
      {warning && (
        <div id="warn">
          {text ? text : null}
          <h3>
            ATTENTION: Please check the time update for the data delivered
          </h3>
          <p>
            The disease spreads progressively and we only have access to{" "}
            <span id="underline">daily updates</span>
          </p>
        </div>
      )}
      <div>
        <p id="countdown-outbreak">
          The outbreak was first reported to World Health Organisation{" "}
          <Moment date="2019-12-31T12:59-0500" durationFromNow></Moment> ago
        </p>
      </div>
    </div>
  );
};

export default Home;
