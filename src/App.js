import React from "react";
import PropTypes from "prop-types";
import { Provider, connect } from "redux-zero/react";
import { store, actions } from "./store/store";

import Splash from "./Splash";
import Game from "./Game";
import ScoreBoard from "./ScoreBoard";
// import Splash from "./Splash";

// import "./App.css";

class App extends React.PureComponent {
  static propTypes = {
    isPlaying: PropTypes.bool,
    gameOver: PropTypes.bool,
  };

  render = () => {
    return (
      <div className="App">
        { !this.props.isPlaying && !this.props.gameOver && <Splash /> }
        { this.props.isPlaying && <Game /> }
        { !this.props.isPlaying && this.props.gameOver && <ScoreBoard /> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isPlaying: state.isPlaying,
  gameOver: state.gameOver,
});
const ConnectedApp = connect(mapStateToProps, actions)(App);

export default () => (
  <Provider store={ store }>
    <ConnectedApp />
  </Provider>
);
