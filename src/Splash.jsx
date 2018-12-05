import React from "react";
import PropTypes from "prop-types";
import { connect } from "redux-zero/react";
import { actions } from "./store/store";

import CategorySelect from "./CategorySelect";

class Splash extends React.PureComponent {
  static propTypes = {
    selectedCategory: PropTypes.string,
    startPlaying: PropTypes.func,
  };

  render = () => (
    <div className="Splash">
      <h1>Catchphrase</h1>
      <CategorySelect />
      <button
        onClick={ this.props.startPlaying }
        disabled={ this.props.selectedCategory === "" }
      >
        Start
      </button>
    </div>
  );
}

export default connect(
  ({ selectedCategory }) => ({ selectedCategory }),
  actions
)(Splash);
