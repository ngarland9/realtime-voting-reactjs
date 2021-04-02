import React from "react";
import { Link } from "react-router-dom";

const Main = () => (
  <div className="main-container">
    <h1 className="main-heading">PVB Dev Ticket Scoring App</h1>
    <div className="main-btn-section">
      <Link to="/voting" className="show-stats-btn">
        Start Scoring
      </Link>
    </div>
  </div>
);

export default Main;
