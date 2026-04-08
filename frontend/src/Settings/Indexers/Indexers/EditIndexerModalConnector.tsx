// @ts-nocheck -- Converted from JSX. Pending type annotations.
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearPendingChanges } from 'Store/Actions/baseActions';
import {
  cancelSaveIndexer,
  cancelTestIndexer,
} from 'Store/Actions/settingsActions';
import EditIndexerModal from './EditIndexerModal';

function createMapDispatchToProps(dispatch, _props) {
  const section = 'settings.indexers';

  return {
    dispatchClearPendingChanges() {
      dispatch(clearPendingChanges({ section }));
    },

    dispatchCancelTestIndexer() {
      dispatch(cancelTestIndexer({ section }));
    },

    dispatchCancelSaveIndexer() {
      dispatch(cancelSaveIndexer({ section }));
    },
  };
}

class EditIndexerModalConnector extends Component {
  //
  // Listeners

  onModalClose = () => {
    this.props.dispatchClearPendingChanges();
    this.props.dispatchCancelTestIndexer();
    this.props.dispatchCancelSaveIndexer();
    this.props.onModalClose();
  };

  //
  // Render

  render() {
    const {
      _dispatchClearPendingChanges,
      _dispatchCancelTestIndexer,
      _dispatchCancelSaveIndexer,
      ...otherProps
    } = this.props;

    return (
      <EditIndexerModal {...otherProps} onModalClose={this.onModalClose} />
    );
  }
}

EditIndexerModalConnector.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  dispatchClearPendingChanges: PropTypes.func.isRequired,
  dispatchCancelTestIndexer: PropTypes.func.isRequired,
  dispatchCancelSaveIndexer: PropTypes.func.isRequired,
};

export default connect(
  null,
  createMapDispatchToProps
)(EditIndexerModalConnector);
