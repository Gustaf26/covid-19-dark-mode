import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import WorldMap from "react-world-map";
import Key from "./keys";

function Map() {
  const [selected, onSelect] = useState(null);
  const [allData, setAllData] = useState("");
  const [toolTip, setTooltip] = useState("");
  const selectionIndex = useRef(0);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://covid-19-coronavirus-statistics2.p.rapidapi.com/continentData",
      headers: {
        "x-rapidapi-key": `${Key.RegionKey}`,
        "x-rapidapi-host": "covid-19-coronavirus-statistics2.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setAllData(response.data.result);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const setTooltipCoords = (e) => {
    const popup = document.getElementById("displayText");
    console.log(popup);
    popup.style.position = "absolute";
    popup.style.top = (e.clientY - 130).toString() + "px";
    popup.style.left = (e.clientX - 110).toString() + "px";
  };

  const getMyToolTipFunction = (cont) => {
    onSelect(cont);
    selectionIndex.current += 1;
    const popup = document.getElementById("displayText");
    if (selectionIndex.current === 1) {
      popup.toggleAttribute("hidden");
    }
    if (!cont) {
      popup.toggleAttribute("hidden");
      setTooltip(false);
      selectionIndex.current = 0;
      return;
    }

    setTooltip(true);

    let continents = {
      "North America": "na",
      "South America": "sa",
      Asia: "as",
      Oceania: "oc",
      Europe: "eu",
      Africa: "af",
    };

    let keys = Object.keys(continents);
    console.log(keys);
    if (allData.length) {
      allData.map((region) => {
        keys.map((key) => {
          if (region.continent === key && cont === continents[key]) {
            popup.innerHTML = `<p>New cases: ${region.newCases}</p>
                              <p> Total cases: ${region.totalCases}</p>
                              <p> Total deaths: ${region.totalDeaths}</p>`;
          }
        });
      });
    }
  };

  useEffect(() => {
    if (toolTip) {
      document.getElementById("heading-reg-data").style.visibility = "hidden";
    } else {
      document.getElementById("heading-reg-data").style.visibility = "visible";
    }
  }, [toolTip]);

  return (
    <>
      <h5 id="heading-reg-data" className="pb-2 my-3">
        See stats (click) on each continent
      </h5>
      <div className="class" onClick={(e) => setTooltipCoords(e)}>
        <WorldMap
          selected={selected}
          onSelect={(cont) => getMyToolTipFunction(cont)}
        />
        <span hidden className="displayText w-100" id="displayText">
          Please double click again
        </span>
      </div>
    </>
  );
}

export default Map;
