import React, { useEffect, useState } from "react";
import { NavLink, Routes, Route } from "react-router-dom";

import Breadcrumbs from "./Breadcrumbs";
import ContagionList from "./ContagionList";
import CountrySearch from "./CountrySearch";
import Map from "./Map";
import Advices from "./Advices";
import US from "./US";

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
    props.closeadvice();
    props.closetext();
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
    var current = document.getElementsByClassName("active");
    if (current.length) {
      if (e.target.id != "home") {
        document.getElementById("home").className.replace(" active", "");
      } else {
        current[0].className = current[0].className.replace(" active", "");
        e.target.className += " active";
      }
    }
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
                <NavLink
                  id="home"
                  to={"/"}
                  onClick={(e) => {
                    activeLink(e), setMenu(!showmenu);
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li label="Advices">
                {" "}
                <NavLink to={"/advices"}></NavLink>
              </li>
              <li label="Most Infected Countries">
                <NavLink to={"/contagionlist"}>Most Infected Countries</NavLink>
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
      <Routes>
        <Route path="/advices" element={<Advices />} />
        <Route path="/countrysearch" element={<CountrySearch />} />
        <Route path="/contagionlist" element={<ContagionList />} />
        <Route path="/us" element={<US />} />
        <Route path="/world" element={<Map />} />
      </Routes>
    </div>
  );
};

export default Navbar;
