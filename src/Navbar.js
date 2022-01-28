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
    if (window.innerWidth > 1000) {
      setDirection("horizontal");
    } else {
      setDirection("vertical");
    }
  }, []);

  const activeLink = (e) => {
    e.preventDefault();
    let currentTag = document.getElementsByClassName("active");
    if (currentTag.length) {
      currentTag.className.replace(" active", "");
    }
    e.target.className += "active";
  };

  return (
    <div className="routcont">
      <div id="overmenurow">
        {showmenu === false ? (
          <button
            type="submit"
            className="openbtn"
            onClick={(e) => openmenu(e)}
          >
            ☰ Menu
          </button>
        ) : null}

        {showmenu === true ? (
          <div id="navbar_div">
            <ul className="initiallist">
              <li label="Home">
                <NavLink to={"/"} onClick={() => getHamburger()}>
                  Home
                </NavLink>
              </li>
              <li label="Advices">
                {" "}
                <NavLink to={"/advices"}></NavLink>
              </li>
              <li label="Most Infected Countries">
                <NavLink
                  onClick={() => {
                    props.closeWarn();
                    activeLink(e);
                  }}
                  to={"/contagionlist"}
                >
                  Most Infected Countries
                </NavLink>
              </li>
              <li label="Search By Country">
                <NavLink to={"/countrysearch"}>Search By Country</NavLink>
              </li>
              <li label="U.S.">
                {" "}
                <NavLink to={"/us"}>US</NavLink>
              </li>
              <li label="World Map">
                {" "}
                <NavLink to={"/world"}>World map</NavLink>
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
