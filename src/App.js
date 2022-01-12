import React, { useState } from "react";
import ContagionList from "./ContagionList";
import CountrySearch from "./CountrySearch";
import GlobalSearch from "./GlobalSearch";
// import Usefullinks from "./usefullinks";
import Map from "./Map";
import Moment from "react-moment";
import Navbar from "./Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import US from "./US";

import "./App.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
  },
});

function App() {
  const [advices, setAdvices] = useState(true);
  const [text, setAdtext] = useState("");
  const [warning, setWarning] = useState(true);

  const closead = () => {
    setAdvices(false);
  };

  const showad = () => {
    setAdvices(true);
  };

  const closeWarning = () => {
    setWarning(false);
  };
  const openwarning = () => {
    setWarning(true);
  };

  const getAdvices = () => {
    if (text === "") {
      setAdtext(
        <div className="adv">
          <span className="advice-highlights">Wash your hands frequently</span>

          <p>
            {" "}
            Regularly and thoroughly clean your hands with an alcohol-based hand
            rub or wash them with soap and water.
          </p>

          <p>
            {" "}
            <span className="advice-highlights">Why?</span> Washing your hands
            with soap and water or using alcohol-based hand rub kills viruses
            that may be on your hands. Maintain social distancing
          </p>

          <span className="advice-highlights">
            {" "}
            Maintain at least 1 metre (3 feet) distance between yourself and
            anyone who is coughing or sneezing.
          </span>

          <p>
            <span className="advice-highlights">Why?</span> When someone coughs
            or sneezes they spray small liquid droplets from their nose or mouth
            which may contain virus.
          </p>
          <p>
            If you are too close, you can breathe in the droplets, including the
            COVID-19 virus if the person coughing has the disease.
          </p>
          <p>SOURCE: World Health Organisation</p>
        </div>
      );
    } else {
      setAdtext("");
    }
  };

  const closeadtext = () => {
    setAdtext("");
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <h1>COVID-19 UPDATES</h1>
          <p>Get updates on the virus from all over the world</p>
        </header>
        <div className="container">
          <div className="routcont">
            <BrowserRouter>
              <div id="overmenurow">
                <Navbar
                  className="main-nav"
                  activeClassName="main-nav-active"
                  closeadvice={() => closead()}
                  reopenadvice={() => showad()}
                  closetext={() => closeadtext()}
                  closeWarning={() => closeWarning()}
                  openwarning={() => openwarning()}
                />

                {advices ? (
                  <div>
                    <p id="advices" onClick={() => getAdvices()}>
                      Advices for prevention
                    </p>
                  </div>
                ) : null}
              </div>

              <hr></hr>

              {warning && (
                <div id="warn">
                  {text ? text : null}
                  <h3>
                    ATTENTION: Please check the time update for the data
                    delivered
                  </h3>
                  <p>
                    The disease spreads progressively and we only have access to{" "}
                    <span id="underline">daily updates</span>
                  </p>
                </div>
              )}
              <div>
                {advices ? (
                  <p id="countdown-outbreak">
                    The outbreak was first reported to World Health Organisation{" "}
                    <Moment
                      date="2019-12-31T12:59-0500"
                      durationFromNow
                    ></Moment>{" "}
                    ago
                  </p>
                ) : null}
              </div>

              <Routes>
                <Route path="/GlobalSearch" component={GlobalSearch} />
                <Route path="/CountrySearch" component={CountrySearch} />
                <Route path="/ContagionList" component={ContagionList} />
                <Route path="/Us" component={US} />
                <Route path="/world" component={Map} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
