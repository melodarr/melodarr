// @ts-nocheck -- Converted from JSX. Pending type annotations.
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DOWNLOAD_PROTOCOL_ITEM } from 'Helpers/dragTypes';
import DownloadProtocolItem from './DownloadProtocolItem';
import styles from './DownloadProtocolItemDragSource.module.css';

export default function DownloadProtocolItemDragSource(props) {
  const {
    protocol,
    name,
    allowed,
    delay,
    index,
    isDraggingUp,
    isDraggingDown,
    onDownloadProtocolItemFieldChange,
    onDownloadProtocolItemDragMove,
    onDownloadProtocolItemDragEnd,
  } = props;

  const nodeRef = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: DOWNLOAD_PROTOCOL_ITEM,
    item: () => ({ index, protocol, name, allowed, delay }),
    end: (item, monitor) => {
      onDownloadProtocolItemDragEnd(monitor.didDrop());
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOverCurrent }, drop] = useDrop({
    accept: DOWNLOAD_PROTOCOL_ITEM,
    hover: (item, monitor) => {
      if (!nodeRef.current) return;
      const dropIndex = index;
      const dragIndex = item.index;

      const childNodeIndex = isOverCurrent && isDraggingUp ? 1 : 0;
      const componentDOMNode =
        nodeRef.current.children[childNodeIndex] || nodeRef.current;
      const hoverBoundingRect = componentDOMNode.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (!monitor.isOver({ shallow: true })) return;
      if (dragIndex === dropIndex) return;

      let dropPosition = null;
      if (hoverClientY > hoverMiddleY) {
        dropPosition = 'below';
      } else if (hoverClientY < hoverMiddleY) {
        dropPosition = 'above';
      } else {
        return;
      }

      onDownloadProtocolItemDragMove({ dragIndex, dropIndex, dropPosition });
    },
    collect: (monitor) => ({
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  drag(drop(nodeRef));

  const isBefore = !isDragging && isDraggingUp && isOverCurrent;
  const isAfter = !isDragging && isDraggingDown && isOverCurrent;

  return (
    <div
      ref={nodeRef}
      className={classNames(
        styles.downloadProtocolItemDragSource,
        isBefore && styles.isDraggingUp,
        isAfter && styles.isDraggingDown
      )}
    >
      {isBefore && (
        <div
          className={classNames(
            styles.downloadProtocolItemPlaceholder,
            styles.downloadProtocolItemPlaceholderBefore
          )}
        />
      )}

      <DownloadProtocolItem
        protocol={protocol}
        name={name}
        allowed={allowed}
        delay={delay}
        index={index}
        isDragging={isDragging}
        isOverCurrent={isOverCurrent}
        connectDragSource={(node) => node}
        onDownloadProtocolItemFieldChange={onDownloadProtocolItemFieldChange}
      />

      {isAfter && (
        <div
          className={classNames(
            styles.downloadProtocolItemPlaceholder,
            styles.downloadProtocolItemPlaceholderAfter
          )}
        />
      )}
    </div>
  );
}

DownloadProtocolItemDragSource.propTypes = {
  protocol: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  allowed: PropTypes.bool.isRequired,
  delay: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  isDraggingUp: PropTypes.bool,
  isDraggingDown: PropTypes.bool,
  onDownloadProtocolItemFieldChange: PropTypes.func.isRequired,
  onDownloadProtocolItemDragMove: PropTypes.func.isRequired,
  onDownloadProtocolItemDragEnd: PropTypes.func.isRequired,
};
