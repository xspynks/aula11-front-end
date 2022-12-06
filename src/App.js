import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Prediction from "./components/Prediction/Prediction";

function App() {
  // 'X-RapidAPI-Key': '2f9b1f8323mshf4e8f95890c9c3cp1c231djsneb813e49eb0e',
  // 'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'

  const [data, setData] = useState("waiting for the useEffect to run!");
  const [predictions, setPredictions] = useState(() => []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // use axios instead of fetch
        const res = await axios.get("http://localhost:8080/api/test");
        console.log(`Message from the server: ${res.data}`);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getPredictions = () => {
      axios
        .get(
          "http://football-prediction-api.p.rapidapi.com/api/v2/predictions?league=eng.1&season=2020-2021",
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "2f9b1f8323mshf4e8f95890c9c3cp1c231djsneb813e49eb0e",
              "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
            },
          }
        )
        .then((res) => res.json())
        .then((json) => {
          console.log(json.data);
          setPredictions(json.data);
        });
    };

    fetchData();
    getPredictions();
  }, []);

  const predictionsEl = predictions?.map((pred) => (
    <Prediction
      key={pred.id}
      homeTeam={pred.homeTeam}
      awayTeam={pred.awayTeam}
      result={pred.result}
    />
  ));

  return (
    <div className="App">
      <h1>Task3 Frontend class</h1>
      <h2>Part 1</h2>
      <h3>Backend route "/api/test"</h3>
      <span>Fetched message: </span>
      <span>{data}</span>

      <h2>Part 2</h2>
      <h3>Predictions API</h3>
      <div className="predictions">
        {predictions && predictionsEl.slice(0, 10)}
      </div>
    </div>
  );
}

export default App;
