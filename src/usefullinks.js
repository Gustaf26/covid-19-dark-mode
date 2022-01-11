import React from "react";

const Usefullinks = () => {
  return (
    <div className="usefulLinks">
      <img
        className="useful_image"
        src="https://media.istockphoto.com/vectors/virus-bacteria-vector-background-cells-disease-outbreak-coronavirus-vector-id1211544068?k=6&m=1211544068&s=612x612&w=0&h=IvZo-HIL4o6qhUaTno8SKcnPmBf6niW1YEBjBzDABHk="
      />
      <h3>USEFUL LINKS</h3>
      <ul className="linksList">
        <li>
          <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019">
            {" "}
            World Health Organization
          </a>
        </li>
        <li>
          <a href="https://www.folkhalsomyndigheten.se/the-public-health-agency-of-sweden/communicable-disease-control/covid-19/">
            {" "}
            Pubilc Health Agency of Sweden
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Usefullinks;
