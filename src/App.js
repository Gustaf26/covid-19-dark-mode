import React, { useState } from "react";
import ContagionList from "./ContagionList";
import CountrySearch from "./CountrySearch";
import Advices from "./Advices";
import Navbar from "./Navbar";
// import Usefullinks from "./usefullinks";
import Map from "./Map";
import Home from "./Home";
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
  // const getAdvices = () => {
  //   if (text === "") {
  //     setAdtext(
  //       <div className="adv">
  //         <span className="advice-highlights">Wash your hands frequently</span>

  //         <p>
  //           {" "}
  //           Regularly and thoroughly clean your hands with an alcohol-based hand
  //           rub or wash them with soap and water.
  //         </p>

  //         <p>
  //           {" "}
  //           <span className="advice-highlights">Why?</span> Washing your hands
  //           with soap and water or using alcohol-based hand rub kills viruses
  //           that may be on your hands. Maintain social distancing
  //         </p>

  //         <span className="advice-highlights">
  //           {" "}
  //           Maintain at least 1 metre (3 feet) distance between yourself and
  //           anyone who is coughing or sneezing.
  //         </span>

  //         <p>
  //           <span className="advice-highlights">Why?</span> When someone coughs
  //           or sneezes they spray small liquid droplets from their nose or mouth
  //           which may contain virus.
  //         </p>
  //         <p>
  //           If you are too close, you can breathe in the droplets, including the
  //           COVID-19 virus if the person coughing has the disease.
  //         </p>
  //         <p>SOURCE: World Health Organisation</p>
  //       </div>
  //     );
  //   } else {
  //     setAdtext("");
  //   }
  // };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <h1>COVID-19 UPDATES</h1>
          <p>Get updates on the virus from all over the world</p>
        </header>
        <div className="container">
          <div className="routcont">
            <Navbar />
            <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/advices" element={<Advices />} />
                <Route path="/countrysearch" element={<CountrySearch />} />
                <Route path="/contagionlist" element={ContagionList} />
                <Route path="/us" element={<US />} />
                <Route path="/world" element={<Map />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
