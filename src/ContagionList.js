import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import Key from "./keys";

const ContagionList = () => {
  const [data, setData] = useState([]);

  const processData = (dat) => {
    let globalarr = [];

    let j;

    for (j = 0; j < dat.data.covid19Stats.length; j++) {
      globalarr.push({
        country: dat.data.covid19Stats[j].country,
        city: dat.data.covid19Stats[j].city,
        confirmed: dat.data.covid19Stats[j].confirmed,
        recovered: dat.data.covid19Stats[j].recovered,
        deaths: dat.data.covid19Stats[j].deaths,
        timestamp: dat.data.covid19Stats[j].lastUpdate,
      });
    }

    let selectarr = globalarr.filter(
      (cou) => cou.country !== "US" && cou.country !== "China"
    );

    //let doubleselectarr = selectarr.filter(cit=>cit.city =="")
    //console.log(globalarr)
    let sortedarr = selectarr.filter((pers) => pers.deaths > 20000);

    setData({ data: sortedarr });
    console.log(data);
  };

  useEffect(() => {
    fetch(
      `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
          "x-rapidapi-key": `${Key.Key}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => processData(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="countryinfo">
        <table>
          <thead>
            <tr>
              <th>
                COUNTRY<span id="star">(*)</span>
              </th>
              <th>CONFIRMED</th>
              {/* <th>RECOVERED</th> */}
              <th>CASUALTIES</th>
              <th>UPDATE (hh:mm:ss)</th>
            </tr>
          </thead>
          <tbody>
            {data.data &&
              data.data.length > 0 &&
              data.data.map((cas, i) => {
                return (
                  <tr key={i}>
                    <td>{cas.country}</td>
                    <td>{cas.confirmed}</td>
                    {/* <td>{cas.recovered}</td> */}
                    <td>{cas.deaths}</td>
                    <td>
                      <Moment durationFromNow>{cas.timestamp}</Moment> from now
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <p id="commentbelow">
          (*) List of countries excepting the US and China
        </p>
      </div>
    </div>
  );
};

export default ContagionList;
