import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";

import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    color: "black",
    "& > span": {
      maxWidth: 40,
      width: "100%",
      backgroundColor: "black",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(window.innerWidth > 600 ? 15 : 14),
    marginRight: theme.spacing(1),
    "&:focus": {
      opacity: 1,
      color: "#000000",
    },
    "&:hover": {
      backgroundColor: "rgb(88, 87, 87)",
      color: "#ffffff",
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const Navbar = (props) => {
  const [showmenu, setMenu] = useState(false);
  const [bread, setBread] = useState([]);
  const [value, setValue] = useState(0);
  const [newRoute, setRoute] = useState("");
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

  const handleChange = (e, newValue) => {
    props.closeWarning();
    setValue(newValue);
    if (newValue === 0) {
      setRoute("/");
      setMenu(false);
      props.openwarning();
    } else if (newValue === 1) {
      setRoute("/world");
    } else if (newValue === 2) {
      setRoute("/GlobalSearch");
    } else if (newValue === 3) {
      setRoute("/ContagionList");
    } else if (newValue === 4) {
      setRoute("/CountrySearch");
    } else if (newValue === 5) {
      setRoute("/Us");
    }
  };

  useEffect(() => {
    if (window.innerWidth > 1000) {
      setDirection("horizontal");
    } else {
      setDirection("vertical");
    }
  }, []);

  return (
    <div>
      {newRoute ? <Redirect to={newRoute} /> : null}

      {showmenu === false ? (
        <button type="submit" className="openbtn" onClick={(e) => openmenu(e)}>
          ☰ Menu
        </button>
      ) : null}

      {showmenu === true ? (
        <div id="navbar_div">
          <StyledTabs
            orientation={direction ? direction : null}
            className="initiallist"
            style={{ backgroundColor: "#ffffff" }}
            value={value}
            aria-label="styled tabs example"
          >
            <StyledTab label="Home" onClick={(e) => handleChange(e, 0)} />
            <StyledTab onClick={(e) => handleChange(e, 1)} label="World Map" />
            <StyledTab
              onClick={(e) => handleChange(e, 2)}
              label="Global Statistics"
            />
            <StyledTab
              onClick={(e) => handleChange(e, 3)}
              label="Most Infected Countries"
            />
            <StyledTab
              onClick={(e) => handleChange(e, 4)}
              label="Search By Country"
            />
            <StyledTab onClick={(e) => handleChange(e, 5)} label="U.S." />
          </StyledTabs>
        </div>
      ) : null}

      {bread.length ? (
        <Breadcrumbs update={() => nollstall()} actualbread={bread} />
      ) : null}
    </div>
  );
};

export default Navbar;
