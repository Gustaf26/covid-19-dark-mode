// import axios from "axios";
import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Moment from "react-moment";
import Key from "./keys";
import "./App.css";

// import Travelrec from "./Travelrec";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    padding: window.innerWidth > 700 ? "0.5em" : "0.2em",
    fontSize: window.innerWidth > 600 ? 14 : 12,
  },
  body: {
    fontSize: window.innerWidth > 600 ? 14 : 12,
    padding: window.innerWidth > 700 ? "0.5em" : "0.2em",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

const CountrySearch = () => {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState("");
  const [showsearch, setSearch] = useState("");
  const [errormsg, setError] = useState(false);
  // const [rawData, setRawData] = useState([]);
  // const [showRecs, setRecs] = useState(false);
  // const [travelData, setTravelData] = useState([]);
  const classes = useStyles();
  const [countryData, setCountryData] = useState("");

  useEffect(() => {
    setSearch(true);

    //   axios
    //     .get("https://www.trackcorona.live/api/travel", {
    //       method: "GET",
    //       headers: {
    //         "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
    //         "x-rapidapi-key": `${Key.Key}`,
    //         "Access-Control-Allow-Origin": "*",
    //       },
    //     })
    //     .then((res) => setData(res.data.data))
    //     .catch((err) => console.log(err));
  }, []);

  const getFromApi = (e) => {
    e.preventDefault();

    setSearch(false);

    if (country === "") {
      setError(true);

      return;
    }

    fetch(
      `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=${country}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
          "x-rapidapi-key": `${Key.Key}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => outputting(data))
      .catch((err) => {
        alert(
          "You might have misspelled the name of the country. Please, try again"
        );
      });
  };

  const changeCountry = (e) => {
    setCountry(e.target.value);
    setData([]);
  };

  const outputting = (dat) => {
    if (!dat.data.covid19Stats.length < 218 && country) {
      let dataarr = [...data];

      if (
        !dat.data.covid19Stats ||
        dat.data.covid19Stats[0].country === "US" ||
        dat.data.covid19Stats[0].country !== country
      ) {
        setError(true);
        return;
      }

      console.log(dat.data);

      dataarr = dat.data.covid19Stats.map((region) => {
        return {
          region: region,
          province: region.province,
          confirmed: region.confirmed,
          recovered: region.recovered,
          deaths: region.deaths,
          timestamp: region.lastUpdate,
        };
      });

      // let travelInfoArr;
      // travelInfoArr = [];

      // rawData.map((country) => {
      //   if (country.location === dat.data.covid19Stats[0].country) {
      //     travelInfoArr.push(country.data);
      //   }
      //   setTravelData(travelInfoArr);
      // });

      setData(dataarr);
    }
  };

  const newSearch = () => {
    setCountry("");
    setSearch(true);
    setError(false);
  };
  // const showRecommendations = () => {
  //   setRecs(!showRecs);
  // };

  useEffect(() => {
    setCountryData(
      data.map((cas, index) => (
        <TableBody key={index}>
          <StyledTableRow key={index}>
            <StyledTableCell align="center">{cas.province}</StyledTableCell>
            <StyledTableCell align="center">{cas.confirmed}</StyledTableCell>
            <StyledTableCell align="center">{cas.deaths}</StyledTableCell>
            {/* <StyledTableCell align="center">{cas.recovered}</StyledTableCell> */}
            <StyledTableCell align="center">
              <Moment durationFromNow>{cas.timestamp}</Moment> from now
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      ))
    );
  }, [data]);

  return (
    <div>
      {showsearch === true ? (
        <div className="country_search">
          <h6>ENTER COUNTRY NAME (Excepting China and the US)</h6>
          <form className="forma" onSubmit={getFromApi}>
            <input
              id="countryruta"
              type="text"
              onChange={(e) => changeCountry(e)}
            />
            <button id="countrysearchbtn" type="submit">
              Search
            </button>
          </form>
        </div>
      ) : showsearch === false && errormsg === false ? (
        <div className="countryinfo">
          <h6 className="country_title">{country.toUpperCase()}</h6>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">PROVINCE</StyledTableCell>
                  <StyledTableCell align="center">CONFIRMED</StyledTableCell>
                  <StyledTableCell align="center">CASUALTIES</StyledTableCell>
                  {/* <StyledTableCell align="center">RECOVERED</StyledTableCell> */}
                  <StyledTableCell align="center">
                    UPDATED (hh:mm:ss)
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              {countryData}
            </Table>
          </TableContainer>
          <button className="backToTop" onClick={newSearch}>
            New Search
          </button>
          {/* <p id="recommendations_link" onClick={() => showRecommendations()}>
            TRAVEL RECOMMENDATIONS
          </p> */}
        </div>
      ) : errormsg === true && showsearch === false ? (
        <div className="notvalidcountry">
          You need to enter a valid country name
          <div>
            <button
              className="backToTop"
              style={{ marginBottom: "2rem" }}
              onClick={newSearch}
            >
              New Search
            </button>
          </div>
        </div>
      ) : null}

      {/* {showRecs && (
        <Travelrec travelData={travelData} closeRecs={showRecommendations} />
      )} */}
    </div>
  );
};

export default CountrySearch;
