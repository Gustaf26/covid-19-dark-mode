import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

import Breadcrumbs from "./Breadcrumbs"
import Moment from "react-moment"

const Navbar = props => {
  const [showmenu, setMenu] = useState(true)
  const [bread, setBread] = useState([])
  const [outbreak, setOutbreakMsgs] = useState([])

  const nollstall = () => {
    setBread([])
    props.reopenadvice()
  }

  const openmenu = e => {
    e.preventDefault()
    setMenu(true)
    setBread([])
  }

  const getHamburger = () => {
    if (window.innerWidth < 600) {
      setMenu(!showmenu)
    }
  }

  useEffect(() => {
    getHamburger()
    let outBreakIndex = 0
    setOutbreakMsgs(
      "The outbreak was first reported to World Health Organisation on Dec 31st 2019"
    )
    let otherOutbreakMsgs = [
      "The outbreak was first reported to World Health Organisation on Dec 31st 2019",
      "The origin of the virus seems to be traceable to a market in China",
      "The number of victims corresponds to the same as other pandemics in history",
      "Different mutations have been spreading, but vaccines have developed as well",
    ]
    setInterval(() => {
      outBreakIndex += 1
      if (outBreakIndex == otherOutbreakMsgs.length) {
        outBreakIndex = 0
      }
      setOutbreakMsgs(otherOutbreakMsgs[outBreakIndex])
    }, 10000)
  }, [])

  return (
    <div className="routcont2">
      <p id="countdown-outbreak">{outbreak}</p>
      {showmenu === false ? (
        <button type="submit" className="openbtn" onClick={e => openmenu(e)}>
          ☰
        </button>
      ) : null}

      {showmenu === true ? (
        <ul id="initiallist">
          <li>
            <NavLink
              id="logo"
              to={"/"}
              onClick={() => getHamburger()}
            ></NavLink>
          </li>
          <li label="Most Infected Countries">
            <NavLink onClick={() => getHamburger()} to={"/contagionlist"}>
              Infected Countries
            </NavLink>
          </li>
          <li label="Search By Country">
            <NavLink onClick={() => getHamburger()} to={"/countrysearch"}>
              Search By Country
            </NavLink>
          </li>
          <li label="U.S.">
            {" "}
            <NavLink onClick={() => getHamburger()} to={"/us"}>
              US
            </NavLink>
          </li>
          <li label="World Map">
            {" "}
            <NavLink onClick={() => getHamburger()} to={"/world"}>
              World map
            </NavLink>
          </li>
        </ul>
      ) : null}

      {bread.length ? (
        <Breadcrumbs update={() => nollstall()} actualbread={bread} />
      ) : null}
    </div>
  )
}

export default Navbar
