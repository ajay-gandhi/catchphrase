import React from "react";
import PropTypes from "prop-types";
import { connect } from "redux-zero/react";
import { actions } from "./store/store";

import Timer from "./Timer";

class Game extends React.Component {
  static propTypes = {
    score: PropTypes.shape({
      red: PropTypes.number,
      blue: PropTypes.number,
    }),
    redTurn: PropTypes.bool,
    word: PropTypes.string,
    nextWord: PropTypes.func,
  };

  render = () => {
    return (
      <div className="Game">
        <div className="Game__RedScore">{ this.props.score.red }{ this.props.redTurn && "*" }</div>
        <div className="Game__BlueScore">{ this.props.score.blue }{ !this.props.redTurn && "*" }</div>
        <Timer />
        <h2>{ this.props.word }</h2>
        <button onClick={ this.props.nextWord }>Got it!</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.score,
  redTurn: state.redTurn,
  word: state.word,
});

export default connect(mapStateToProps, actions)(Game);
