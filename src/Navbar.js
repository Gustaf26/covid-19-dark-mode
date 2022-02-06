import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Breadcrumbs from "./Breadcrumbs";

const Navbar = (props) => {
  const [showmenu, setMenu] = useState(true);
  const [bread, setBread] = useState([]);
  const [direction, setDirection] = useState("horizontal");

  const nollstall = () => {
    setBread([]);
    props.reopenadvice();
  };

  const openmenu = (e) => {
    e.preventDefault();
    setMenu(true);
    setBread([]);
  };

  const getHamburger = () => {
    if (window.innerWidth < 600) {
      setMenu(!showmenu);
    }
  };

  useEffect(() => {
    getHamburger();
  }, []);

  return (
    <div className="routcont2">
      <div id="overmenurow">
        {showmenu === false ? (
          <button
            type="submit"
            className="openbtn"
            onClick={(e) => openmenu(e)}
          >
            ☰
          </button>
        ) : null}

        {showmenu === true ? (
          <div id="navbar_div">
            <NavLink
              id="logo"
              to={"/"}
              onClick={() => getHamburger()}
            ></NavLink>
            <ul id="initiallist">
              {/* <li label="Advices">
                {" "}
                <NavLink to={"/advices"}></NavLink>
              </li> */}
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
          </div>
        ) : null}

        {bread.length ? (
          <Breadcrumbs update={() => nollstall()} actualbread={bread} />
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
