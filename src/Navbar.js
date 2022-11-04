import React, { useEffect, useState, useContext } from "react"
import { NavLink } from "react-router-dom"
import MenuContext from "./hooks/MenuContext"

import Breadcrumbs from "./Breadcrumbs"
// import Moment from "react-moment"

let outbreakMsg =
  "The outbreak was first reported to World Health Organisation on Dec 31st 2019. The origin of the virus seems to be traceable to a market in China. The number of victims corresponds to the same as other pandemics in history. Some countries are still running considerable restrictions. Check your countries authorities for guidance"

const Navbar = props => {
  const menuOptions = useContext(MenuContext)
  const [isPending, startTrans] = useState()
  const [bread, setBread] = useState([])
  const [outbreak, setOutbreakMsgs] = useState()

  const nollstall = () => {
    setBread([])
    props.reopenadvice()
  }

  const getHamburger = () => {
    if (window.innerWidth < 1100) {
      menuOptions.toggleMenu(false)
    }
  }

  const showOutBreakMsg = () => {
    setOutbreakMsgs("")

    setTimeout(() => {
      startTrans(() => {
        setOutbreakMsgs(outbreakMsg)
      })
    }, 5000)
  }

  useEffect(() => {
    getHamburger()
    showOutBreakMsg()
  }, [])

  return (
    <div className="routcont2">
      <p id="countdown-outbreak">
        <span className={!outbreak ? "not_animated" : ""}>
          {!outbreak ? "PANDEMIC STILL GOING ON!" : outbreak}
        </span>
      </p>

      {menuOptions.menuShowing === true ? (
        <ul id="initiallist">
          <li>
            <NavLink
              id="logo"
              to={"/"}
              onClick={() => {
                getHamburger()
                showOutBreakMsg()
              }}
            ></NavLink>
          </li>
          <li label="Most Infected Countries">
            <NavLink
              onClick={() => {
                getHamburger()
                showOutBreakMsg()
              }}
              to={"/contagionlist"}
            >
              Infected Countries
            </NavLink>
          </li>
          <li label="Search By Country">
            <NavLink
              onClick={() => {
                getHamburger()
                showOutBreakMsg()
              }}
              to={"/countrysearch"}
            >
              Search By Country
            </NavLink>
          </li>
          <li label="U.S.">
            {" "}
            <NavLink
              onClick={() => {
                getHamburger()
                showOutBreakMsg()
              }}
              to={"/us"}
            >
              US
            </NavLink>
          </li>
          <li label="World Map">
            {" "}
            <NavLink
              onClick={() => {
                getHamburger()
                showOutBreakMsg()
              }}
              to={"/world"}
            >
              World map
            </NavLink>
          </li>
        </ul>
      ) : (
        <button
          type="submit"
          className="openbtn"
          onClick={() => menuOptions.toggleMenu(true)}
        >
          ☰
        </button>
      )}

      {bread.length ? (
        <Breadcrumbs update={() => nollstall()} actualbread={bread} />
      ) : null}
    </div>
  )
}

export default Navbar
