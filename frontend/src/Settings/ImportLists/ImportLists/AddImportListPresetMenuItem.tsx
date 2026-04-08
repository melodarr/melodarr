// @ts-nocheck -- Converted from JSX. Pending type annotations.
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MenuItem from 'Components/Menu/MenuItem';

class AddImportListPresetMenuItem extends Component {
  //
  // Listeners

  onPress = () => {
    const { name, implementation, implementationName, minRefreshInterval } =
      this.props;

    this.props.onPress({
      name,
      implementation,
      implementationName,
      minRefreshInterval,
    });
  };

  //
  // Render

  render() {
    const {
      name: _name,
      implementation: _implementation,
      implementationName: _implementationName,
      minRefreshInterval: _minRefreshInterval,
      ...otherProps
    } = this.props;

    return (
      <MenuItem {...otherProps} onPress={this.onPress}>
        {name}
      </MenuItem>
    );
  }
}

AddImportListPresetMenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  implementation: PropTypes.string.isRequired,
  implementationName: PropTypes.string.isRequired,
  minRefreshInterval: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default AddImportListPresetMenuItem;
