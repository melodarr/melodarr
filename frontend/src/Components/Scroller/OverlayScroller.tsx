// @ts-nocheck -- Converted from JSX. Pending type annotations.
import PropTypes from 'prop-types';
import React, { Component, createRef } from 'react';
import { scrollDirections } from 'Helpers/Props';
import styles from './OverlayScroller.module.css';

class OverlayScroller extends Component {
  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);
    this.viewRef = createRef();
    this._isScrolling = false;
  }

  componentDidMount() {
    this.props.registerScroller(this.viewRef.current);
  }

  componentDidUpdate(prevProps) {
    const { scrollTop } = this.props;

    if (
      !this._isScrolling &&
      scrollTop != null &&
      scrollTop !== prevProps.scrollTop &&
      this.viewRef.current
    ) {
      this.viewRef.current.scrollTop = scrollTop;
    }
  }

  //
  // Listeners

  onScrollStart = () => {
    this._isScrolling = true;
  };

  onScrollStop = () => {
    this._isScrolling = false;
  };

  onScroll = (event) => {
    const { scrollTop, scrollLeft } = event.currentTarget;

    this._isScrolling = true;
    const onScroll = this.props.onScroll;

    if (onScroll) {
      onScroll({ scrollTop, scrollLeft });
    }

    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(this.onScrollStop, 150);
  };

  //
  // Render

  render() {
    const { className, children } = this.props;

    return (
      <div
        className={className}
        ref={this.viewRef}
        onScroll={this.onScroll}
        style={{ overflow: 'auto', height: '100%', width: '100%' }}
      >
        {children}
      </div>
    );
  }
}

OverlayScroller.propTypes = {
  className: PropTypes.string,
  trackClassName: PropTypes.string,
  scrollTop: PropTypes.number,
  scrollDirection: PropTypes.oneOf([
    scrollDirections.NONE,
    scrollDirections.HORIZONTAL,
    scrollDirections.VERTICAL,
  ]).isRequired,
  autoHide: PropTypes.bool.isRequired,
  autoScroll: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onScroll: PropTypes.func,
  registerScroller: PropTypes.func,
};

OverlayScroller.defaultProps = {
  className: styles.scroller,
  trackClassName: styles.thumb,
  scrollDirection: scrollDirections.VERTICAL,
  autoHide: false,
  autoScroll: true,
  registerScroller: () => {
    /* no-op */
  },
};

export default OverlayScroller;
