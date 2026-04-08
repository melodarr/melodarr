import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

function Portal(props) {
  const { children, target } = props;
  const actualTarget = target || document.getElementById('portal-root');
  return ReactDOM.createPortal(children, actualTarget);
}


Portal.propTypes = {
  children: PropTypes.node.isRequired,
  target: PropTypes.object.isRequired
};

Portal.defaultProps = {};

export default Portal;
