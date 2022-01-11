import React from "react";
import Moment from "react-moment";
import Key from "./keys";

class ContagionList extends React.Component {
  state = {
    data: [],
  };

  componentDidMount = () => {
    fetch(
      `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=us`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
          "x-rapidapi-key": `${Key.Key}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => this.listoutput(data))
      .catch((err) => {
        console.log(err);
      });
  };

  listoutput = (dat) => {
    // let dataarr = [...this.state.data];

    let usarr = [];

    let j;

    for (j = 0; j < dat.data.covid19Stats.length; j++) {
      usarr.push({
        country: dat.data.covid19Stats[j].country,
        city: dat.data.covid19Stats[j].city,
        province: dat.data.covid19Stats[j].province,
        confirmed: dat.data.covid19Stats[j].confirmed,
        recovered: dat.data.covid19Stats[j].recovered,
        deaths: dat.data.covid19Stats[j].deaths,
        timestamp: dat.data.covid19Stats[j].lastUpdate,
      });
    }

    //let doubleselectarr = selectarr.filter(cit=>cit.city =="")
    //console.log(globalarr)
    let sortedarr = usarr.filter((pers) => pers.deaths > 3000);

    this.setState({ data: sortedarr });
  };

  render() {
    const list = this.state.data.map((cas, i) => {
      return (
        <tr key={i}>
          <td>{cas.city}</td>
          <td>{cas.province}</td>
          <td>{cas.confirmed}</td>
          <td>{cas.deaths}</td>
          <td>
            <Moment durationFromNow>{cas.timestamp}</Moment> from now
          </td>
        </tr>
      );
    });

    return (
      <div className="countryinfo">
        <table>
          <thead>
            <tr>
              <th>CITY</th>
              <th>PROVINCE</th>
              <th>CONFIRMED</th>
              <th>CASUALTIES</th>
              <th>UPDATE (hh:mm:ss)</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
      </div>
    );
  }
}

export default ContagionList;
