import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo } from 'react';
import useMeasure from 'react-use-measure';

export default function Measure(props) {
  const [ref, bounds] = useMeasure();
  const { onMeasure } = props;

  const debouncedMeasure = useMemo(() => {
    return _.debounce((payload) => {
      onMeasure(payload);
    }, 250, { leading: true, trailing: false });
  }, [onMeasure]);

  useEffect(() => {
    debouncedMeasure(bounds);
  }, [bounds, debouncedMeasure]);

  useEffect(() => {
    return () => {
      debouncedMeasure.cancel();
    };
  }, [debouncedMeasure]);

  return (
    <div ref={ref} style={{ width: '100%', height: '100%' }}>
      {props.children}
    </div>
  );
}

Measure.propTypes = {
  onMeasure: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};
