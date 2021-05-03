import React from "react";
import PropTypes from "prop-types";
import { connect } from "redux-zero/react";
import { actions } from "./store/store";

import { Button, Heading } from "evergreen-ui";
import CategorySelect from "./CategorySelect";

class Splash extends React.PureComponent {
  static propTypes = {
    selectedCategory: PropTypes.string,
    startPlaying: PropTypes.func,
  };

  render = () => (
    <div className="Splash">
      <Heading size={ 800 }>Catchphrase</Heading>
      <CategorySelect />
      <Button
        onClick={ this.props.startPlaying }
        disabled={ this.props.selectedCategory === "" }
      >
        Start
      </Button>
    </div>
  );
}

export default connect(
  ({ selectedCategory }) => ({ selectedCategory }),
  actions
)(Splash);
