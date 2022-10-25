import React, { useEffect, useState, useTransition } from "react"
import { NavLink } from "react-router-dom"

import Breadcrumbs from "./Breadcrumbs"
// import Moment from "react-moment"

let outbreakMsg =
  "The outbreak was first reported to World Health Organisation on Dec 31st 2019. The origin of the virus seems to be traceable to a market in China. The number of victims corresponds to the same as other pandemics in history"

const Navbar = props => {
  const [showmenu, setMenu] = useState(true)
  const [isPending, startTransition] = useTransition()
  const [bread, setBread] = useState([])
  const [outbreak, setOutbreakMsgs] = useState(outbreakMsg)
  const [outbreakhovered, setOutbreakHovered] = useState(false)

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
    startTransition(() => {
      setOutbreakHovered(true)
    })
  }, [])

  return (
    <div className="routcont2">
      <p
        id="countdown-outbreak"
        // onMouseOver={() => setOutbreakHovered(true)}
        // onMouseOut={() => setOutbreakHovered(false)}
      >
        <span className={outbreakhovered == false ? "" : "not_animated"}>
          {outbreak}
        </span>
      </p>
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
