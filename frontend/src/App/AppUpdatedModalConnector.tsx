import { connect } from 'react-redux';
import AppUpdatedModal from './AppUpdatedModal';

function createMapDispatchToProps(_dispatch, _props) {
  return {
    onModalClose() {
      location.reload();
    },
  };
}

export default connect(null, createMapDispatchToProps)(AppUpdatedModal);
