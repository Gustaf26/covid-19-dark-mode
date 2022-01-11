import React from "react";
import { Link } from "react-router-dom";

class Breadcrumbs extends React.Component {
  state = {
    bread: "",
  };
  componentDidMount = () => {
    const thisbread = this.props.actualbread.pop();
    this.setState({ bread: thisbread });
  };

  render() {
    return (
      <div id="breadbrumbs">
        <Link className="nav-link" onClick={() => this.props.update()} to="/">
          Home{" "}
        </Link>
        <span>
          {" "}
          {">"} {this.state.bread}
        </span>
      </div>
    );
  }
}

export default Breadcrumbs;
