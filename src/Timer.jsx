import React from "react";
import PropTypes from "prop-types";
import { connect } from "redux-zero/react";
import { actions } from "./store/store";

const TOTAL_TIME = 10; // in s
const INTERVAL = 500; // every 500 ms

class Timer extends React.PureComponent {
  static propTypes = {
    endGame: PropTypes.func,
  };
  state = {
    startTime: 0,
    timeRemaining: TOTAL_TIME,
  };

  componentDidMount = () => {
    this.setState({
      startTime: (new Date()).getTime(),
      timeout: setTimeout(this.nextFrame, INTERVAL),
    });
  }
  nextFrame = () => {
    const timeRemaining = TOTAL_TIME - Math.floor(((new Date()).getTime() - this.state.startTime) / 1000);
    if (timeRemaining === 0) {
      this.props.endGame();
    } else {
      this.setState({
        timeRemaining,
        timeout: setTimeout(this.nextFrame, INTERVAL),
      });
    }
  }

  render = () => {
    return (
      <div className="Timer">
        <h3>{ this.state.timeRemaining }</h3>
      </div>
    );
  }
}

export default connect(() => {}, actions)(Timer);
