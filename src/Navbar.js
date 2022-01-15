import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";

import { withStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

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

const Mytab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(window.innerWidth > 600 ? 15 : 14),
    marginRight: theme.spacing(1),
    "&:selected": { color: "rgb(88, 87, 87)" },
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
  const [showmenu, setMenu] = useState(true);
  const [bread, setBread] = useState([]);
  const [value, setValue] = useState(0);
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

  return (
    <div id="overmenurow">
      {showmenu === false ? (
        <button type="submit" className="openbtn" onClick={(e) => openmenu(e)}>
          ☰ Menu
        </button>
      ) : null}

      {showmenu === true ? (
        <div id="navbar_div">
          <Box sx={{ width: "100%" }}>
            <Tabs
              orientation={direction ? direction : null}
              className="initiallist"
              style={{ backgroundColor: "#ffffff" }}
              value={value}
              aria-label="nav tabs example"
            >
              <Mytab label="Home" href="/" />
              <Mytab label="Advices" href="/advices" />
              <Mytab label="Most Infected Countries" href="/contagionlist" />
              <Mytab label="Search By Country" href="/countrysearch" />
              <Mytab label="U.S." href="/us" />
              <Mytab label="World Map" href="/world" />
            </Tabs>
          </Box>
        </div>
      ) : null}

      {bread.length ? (
        <Breadcrumbs update={() => nollstall()} actualbread={bread} />
      ) : null}
    </div>
  );
};

export default Navbar;
