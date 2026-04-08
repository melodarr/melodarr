import PropTypes from 'prop-types';
import React, { Component, createRef } from 'react';
import { Virtuoso } from 'react-virtuoso';

import Measure from 'Components/Measure';
import Scroller from 'Components/Scroller/Scroller';
import { scrollDirections } from 'Helpers/Props';
import styles from './VirtualTable.module.css';

const ROW_HEIGHT = 38;

class VirtualTable extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      width: 0,
      scrollRestored: false
    };

    this._virtuoso = createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      scrollIndex,
      scrollTop
    } = this.props;

    const {
      scrollRestored
    } = this.state;

    if (this._virtuoso.current && scrollTop !== undefined && scrollTop !== 0 && !scrollRestored) {
      this.setState({ scrollRestored: true });
      this._virtuoso.current.scrollTo({ top: scrollTop });
    }

    if (scrollIndex != null && scrollIndex !== prevProps.scrollIndex && this._virtuoso.current) {
      this._virtuoso.current.scrollToIndex({
        index: scrollIndex,
        align: 'start'
      });
    }
  }

  //
  // Listeners

  onMeasure = ({ width }) => {
    this.setState({
      width
    });
  };

  //
  // Render

  render() {
    const {
      isSmallScreen,
      className,
      items,
      scroller,
      header,
      rowRenderer,
      rowHeight,
      overscanRowCount,
      ...otherProps
    } = this.props;

    const {
      width
    } = this.state;

    // Default overscan to roughly 2 items worth of height or standard if not provided
    const overscan = (overscanRowCount || 2) * rowHeight;

    return (
      <Measure
        whitelist={['width']}
        onMeasure={this.onMeasure}
      >
        <Scroller
          className={className}
          scrollDirection={scrollDirections.HORIZONTAL}
        >
          {header}
          <div style={{ width: width || '100%' }}>
            <Virtuoso
              {...otherProps}
              ref={this._virtuoso}
              useWindowScroll={isSmallScreen || !scroller}
              customScrollParent={isSmallScreen ? undefined : scroller}
              data={items}
              overscan={overscan}
              itemContent={(index, item) => rowRenderer({ rowIndex: index, key: item.id || index, style: {} })}
              className={styles.tableBodyContainer}
            />
          </div>
        </Scroller>
      </Measure>
    );
  }
}

VirtualTable.propTypes = {
  isSmallScreen: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  scrollIndex: PropTypes.number,
  scrollTop: PropTypes.number,
  scroller: PropTypes.instanceOf(Element).isRequired,
  header: PropTypes.node.isRequired,
  headerHeight: PropTypes.number.isRequired,
  rowRenderer: PropTypes.func.isRequired,
  rowHeight: PropTypes.number.isRequired,
  overscanRowCount: PropTypes.number
};

VirtualTable.defaultProps = {
  className: styles.tableContainer,
  headerHeight: 38,
  rowHeight: ROW_HEIGHT
};

export default VirtualTable;
