import react from "react";

const getAdvices = () => {
  return (
    <div className="adv">
      <span className="advice-highlights">Wash your hands frequently</span>

      <p>
        {" "}
        Regularly and thoroughly clean your hands with an alcohol-based hand rub
        or wash them with soap and water.
      </p>

      <p>
        {" "}
        <span className="advice-highlights">Why?</span> Washing your hands with
        soap and water or using alcohol-based hand rub kills viruses that may be
        on your hands. Maintain social distancing
      </p>

      <span className="advice-highlights">
        {" "}
        Maintain at least 1 metre (3 feet) distance between yourself and anyone
        who is coughing or sneezing.
      </span>

      <p>
        <span className="advice-highlights">Why?</span> When someone coughs or
        sneezes they spray small liquid droplets from their nose or mouth which
        may contain virus.
      </p>
      <p>
        If you are too close, you can breathe in the droplets, including the
        COVID-19 virus if the person coughing has the disease.
      </p>
      <p>SOURCE: World Health Organisation</p>
    </div>
  );
};

export default getAdvices;
