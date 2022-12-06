import "./Prediction.css";

const Prediction = ({ awayTeam, homeTeam, result }) => {
  return (
    <div className="prediction-card">
      <h5>Teams:</h5>
      <div className="teams">
        <div>{awayTeam}</div>
        <div>{homeTeam}</div>
      </div>
      <div className="score">Score: </div>
      <div>{result}</div>
    </div>
  );
};

export default Prediction;
