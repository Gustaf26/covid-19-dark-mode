import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import CountrySearch from "./CountrySearch";
import ContagionList from "./ContagionList";
import Map from "./Map";
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
  const [text, setAdtext] = useState("");
  const [warning, setWarning] = useState(true);

  const closeWarning = () => {
    setWarning(false);
  };
  const openwarning = () => {
    setWarning(true);
  };

  useEffect(() => {
    if (window.innerWidth > 1000) {
      openwarning();
    } else {
      closeWarning();
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <div>
              <h1>COVID-19 UPDATES</h1>
            </div>
            <Navbar closeWarn={closeWarning} openWarn={openwarning} />
          </header>
          <div className="container">
            <div className="routcont">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/countrysearch" element={<CountrySearch />} />
                <Route path="/contagionlist" element={<ContagionList />} />
                <Route path="/us" element={<US />} />
                <Route path="/world" element={<Map />} />
              </Routes>
            </div>
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
              </div>
            )}
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
