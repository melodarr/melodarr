// @ts-nocheck -- Converted from JSX. Pending type annotations.
import PropTypes from 'prop-types';
import React from 'react';
import styles from './TableRow.module.css';

function TableRow(props) {
  const {
    className,
    children,
    overlayContent: _overlayContent,
    ...otherProps
  } = props;

  return (
    <tr className={className} {...otherProps}>
      {children}
    </tr>
  );
}

TableRow.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node,
  overlayContent: PropTypes.bool,
};

TableRow.defaultProps = {
  className: styles.row,
};

export default TableRow;
