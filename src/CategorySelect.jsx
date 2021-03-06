import React from "react";
import PropTypes from "prop-types";
import { connect } from "redux-zero/react";
import { actions } from "./store/store";

import { Select } from "evergreen-ui";

class CategorySelect extends React.PureComponent {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string),
    selectedCategory: PropTypes.string,
    selectCategory: PropTypes.func,
  };

  selectCategory = (e) => {
    this.props.selectCategory(e.target.value);
  }

  render = () => {
    const categoryOptions = this.props.categories.map((category) => (
      <option key={ category } value={ category }>{ category }</option>
    ));
    categoryOptions.unshift(<option key="invalid" value="" disabled>Select a category</option>);

    return (
      <div className="CategorySelect">
        <Select
          value={ this.props.selectedCategory }
          onChange={ this.selectCategory }
          width="100%"
        >
          { categoryOptions }
        </Select>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  selectedCategory: state.selectedCategory,
});

export default connect(mapStateToProps, actions)(CategorySelect);
