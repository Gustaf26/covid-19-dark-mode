import React from "react"
import Moment from "react-moment"

class ContagionList extends React.Component {
  state = {
    data: [],
    selected: [],
    index: 0,
  }

  componentDidMount = () => {
    fetch(
      `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=us`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
          "x-rapidapi-key": `${process.env.REACT_APP_API_KEY}`,
        },
      }
    )
      .then(response => response.json())
      .then(data => this.listoutput(data))
      .catch(err => {
        console.log(err)
      })
  }

  listoutput = dat => {
    // let dataarr = [...this.state.data];

    let usarr = []

    let j

    for (j = 0; j < dat.data.covid19Stats.length; j++) {
      usarr.push({
        country: dat.data.covid19Stats[j].country,
        city: dat.data.covid19Stats[j].city,
        province: dat.data.covid19Stats[j].province,
        confirmed: dat.data.covid19Stats[j].confirmed,
        recovered: dat.data.covid19Stats[j].recovered,
        deaths: dat.data.covid19Stats[j].deaths,
        timestamp: dat.data.covid19Stats[j].lastUpdate,
      })
    }

    //let doubleselectarr = selectarr.filter(cit=>cit.city =="")
    //console.log(globalarr)
    let sortedarr = usarr.filter(pers => pers.deaths > 3000)
    this.setState({
      data: sortedarr,
    })
    this.setState({
      selected: sortedarr.slice(0, 11),
    })
    this.setState({
      index: 10,
    })
  }

  selectEntries = arg => {
    if (arg == "next") {
      if (
        this.state.selected.length < this.state.data.length &&
        this.state.index < this.state.data.length
      ) {
        this.setState({
          selected: this.state.data.slice(
            this.state.index,
            this.state.index + 10
          ),
        })
        this.setState({
          index: this.state.index + 10,
        })
      }
    } else {
      if (this.state.index == 10) {
        return
      }
      this.setState({
        selected: this.state.data.slice(
          this.state.index - 20,
          this.state.index - 10
        ),
      })
      this.setState({
        index: this.state.index - 10,
      })
    }
  }

  render() {
    const list = this.state.selected.map((cas, i) => {
      return (
        <tr key={i}>
          {" "}
          {/* <td>{cas.city}</td> */} <td> {cas.province} </td>{" "}
          <td> {cas.confirmed} </td> <td> {cas.deaths} </td>{" "}
          <td>
            {" "}
            <Moment durationFromNow> {cas.timestamp} </Moment> from now{" "}
          </td>{" "}
        </tr>
      )
    })

    return (
      <div className="countryinfo">
        <table>
          <thead>
            <tr>
              {" "}
              {/* <th>CITY</th> */} <th> PROVINCE </th> <th> CONFIRMED </th>{" "}
              <th> CASUALTIES </th> <th> UPDATE(hh: mm: ss) </th>{" "}
            </tr>{" "}
          </thead>{" "}
          <tbody> {list} </tbody>{" "}
        </table>{" "}
        <div>
          <button
            className="backToTop"
            onClick={() => this.selectEntries("prev")}
          >
            Prev{" "}
          </button>{" "}
          <button
            className="backToTop"
            onClick={() => this.selectEntries("next")}
          >
            Next{" "}
          </button>{" "}
        </div>{" "}
      </div>
    )
  }
}

export default ContagionList
