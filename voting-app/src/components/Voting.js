import React, { Component } from "react";
import * as Ably from "ably";
import "./voting.css";
import Dashboard from "./Dashboard";

let realTime = null;
let myVotingChannel = null;
class Voting extends Component {
  state = {
    cards: [
      { id: 1, name: "1", value: "one" },
      { id: 2, name: "2", value: "two" },
      { id: 3, name: "3", value: "three" },
      { id: 4, name: "5", value: "five" }
    ],
    flipped: null
  };

  componentDidMount() {
    realTime = new Ably.Realtime({ authUrl: "/publish" });
    realTime.connection.once("connected", () => {
      // create the channel object
      myVotingChannel = realTime.channels.get("Voting-App");
    });
  }
  clickHandler = (card) => {
    if (this.state.flipped) {
      return;
    }

    myVotingChannel.publish("vote", card.value, (err) => {
      console.log("err", err);
    });

    this.setState({
      flipped: card
    });
  };
  componentWillUnmount() {
    realTime.connection.off();
  }
  render() {
    const hasVoted = !!this.state.flipped;
    return (
      <React.Fragment>
        <h1 className="voting-heading">Select a score!</h1>
        <div className="voting-main">
          {this.state.cards.map((card) => {
            return (
              <section key={card.id} className="card-container">
                <div
                  className={`card ${
                    this.state.flipped === card ? "flipped" : ""
                  } ${hasVoted ? "remove-mouse-pointer" : "pointer"}`}
                  onClick={() => this.clickHandler(card)}
                >
                  <div className="front">{card.name}</div>
                  <div className="back">Score Recorded</div>
                </div>
              </section>
            );
          })}
        </div>
        <button
          className="refresh-btn"
          onClick={() => this.setState({ flipped: null })}
        >
          Vote Again
        </button>

        <Dashboard />
      </React.Fragment>
    );
  }
}

export default Voting;
