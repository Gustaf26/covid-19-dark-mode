import React, { useState, useEffect } from "react"
import Navbar from "./Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Home"
import CountrySearch from "./CountrySearch"
import ContagionList from "./ContagionList"
import Map from "./Map"
import US from "./US"
import "./App.css"
import MenuContext from "./hooks/MenuContext"

function App() {
  const [text, setAdtext] = useState("")
  const [warning, setWarning] = useState(true)
  const [showmenu, setMenu] = useState(true)

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (showmenu === true) {
        setMenu(false)
      }
      document.getElementById("container").addEventListener("click", () => {
        if (showmenu === true) {
          setMenu(false)
        }
      })
    })
  })

  return (
    <MenuContext.Provider
      value={{
        menuShowing: showmenu,
        toggleMenu: val => setMenu(val),
      }}
    >
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Navbar />
          </header>
          <div
            className="container"
            id="container"
            onClick={
              window.innerWidth < 1100
                ? () => (showmenu === true ? setMenu(false) : null)
                : null
            }
          >
            <div className="dummy-container"></div>
            <div className="routcont">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/countrysearch" element={<CountrySearch />} />
                <Route path="/contagionlist" element={<ContagionList />} />
                <Route path="/us" element={<US />} />
                <Route path="/world" element={<Map />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </MenuContext.Provider>
  )
}

export default App
