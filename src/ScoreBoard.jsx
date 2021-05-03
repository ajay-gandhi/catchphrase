import React from "react";
import PropTypes from "prop-types";
import { connect } from "redux-zero/react";
import { actions } from "./store/store";

import { Button, Paragraph } from "evergreen-ui";
import CategorySelect from "./CategorySelect";

class ScoreBoard extends React.PureComponent {
  static propTypes = {
    redTurn: PropTypes.bool,
    score: PropTypes.shape({
      red: PropTypes.number,
      blue: PropTypes.number,
    }),
  };

  selectCategory = (e) => {
    this.props.selectCategory(e.target.value);
  }

  render = () => {
    return (
      <div className="ScoreBoard">
        <h1>Score</h1>
        <Paragraph>
          <div className="ScoreBoard__winnerText">
            { this.props.redTurn ? "Blue" : "Red" } wins this round!
          </div>
          <div className="Game__RedScore">Red score: { this.props.score.red }</div>
          <div className="Game__BlueScore">Blue score: { this.props.score.blue }</div>
        </Paragraph>
        <CategorySelect />
        <Button onClick={ this.props.startPlaying }>Next round</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  redTurn: state.redTurn,
  score: state.score,
});

export default connect(mapStateToProps, actions)(ScoreBoard);
