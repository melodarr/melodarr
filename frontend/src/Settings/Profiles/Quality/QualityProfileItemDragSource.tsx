// @ts-nocheck -- Converted from JSX. Pending type annotations.
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { QUALITY_PROFILE_ITEM } from 'Helpers/dragTypes';
import QualityProfileItem from './QualityProfileItem';
import QualityProfileItemGroup from './QualityProfileItemGroup';
import styles from './QualityProfileItemDragSource.module.css';

export default function QualityProfileItemDragSource(props) {
  const {
    editGroups,
    groupId,
    qualityId,
    name,
    allowed,
    items,
    qualityIndex,
    isDraggingUp,
    isDraggingDown,
    onCreateGroupPress,
    onDeleteGroupPress,
    onQualityProfileItemAllowedChange,
    onItemGroupAllowedChange,
    onItemGroupNameChange,
    onQualityProfileItemDragMove,
    onQualityProfileItemDragEnd,
  } = props;

  const nodeRef = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: QUALITY_PROFILE_ITEM,
    item: () => ({
      editGroups,
      qualityIndex,
      groupId,
      qualityId,
      isGroup: !qualityId,
      name,
      allowed,
    }),
    end: (item, monitor) => {
      onQualityProfileItemDragEnd(monitor.didDrop());
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOverCurrent }, drop] = useDrop({
    accept: QUALITY_PROFILE_ITEM,
    hover: (item, monitor) => {
      if (!nodeRef.current) return;
      const { qualityIndex: dragQualityIndex, isGroup: isDragGroup } = item;
      const dropQualityIndex = props.qualityIndex;
      const isDropGroupItem = !!(qualityId && groupId);

      // If we're hovering over a child don't trigger on the parent
      if (!monitor.isOver({ shallow: true })) return;

      if (dragQualityIndex === dropQualityIndex) return;

      if (isDragGroup && isDropGroupItem) return;

      const childNodeIndex = isOverCurrent && isDraggingUp ? 1 : 0;
      const componentDOMNode =
        nodeRef.current.children[childNodeIndex] || nodeRef.current;
      const hoverBoundingRect = componentDOMNode.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      let dropPosition = null;
      if (hoverClientY > hoverMiddleY) {
        dropPosition = 'below';
      } else if (hoverClientY < hoverMiddleY) {
        dropPosition = 'above';
      } else {
        return;
      }

      onQualityProfileItemDragMove({
        dragQualityIndex,
        dropQualityIndex,
        dropPosition,
      });
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
        styles.qualityProfileItemDragSource,
        isBefore && styles.isDraggingUp,
        isAfter && styles.isDraggingDown
      )}
    >
      {isBefore && (
        <div
          className={classNames(
            styles.qualityProfileItemPlaceholder,
            styles.qualityProfileItemPlaceholderBefore
          )}
        />
      )}

      {!!groupId && qualityId == null && (
        <QualityProfileItemGroup
          editGroups={editGroups}
          groupId={groupId}
          name={name}
          allowed={allowed}
          items={items}
          qualityIndex={qualityIndex}
          isDragging={isDragging}
          isDraggingUp={isDraggingUp}
          isDraggingDown={isDraggingDown}
          connectDragSource={(node) => node}
          onDeleteGroupPress={onDeleteGroupPress}
          onQualityProfileItemAllowedChange={onQualityProfileItemAllowedChange}
          onItemGroupAllowedChange={onItemGroupAllowedChange}
          onItemGroupNameChange={onItemGroupNameChange}
          onQualityProfileItemDragMove={onQualityProfileItemDragMove}
          onQualityProfileItemDragEnd={onQualityProfileItemDragEnd}
        />
      )}

      {qualityId != null && (
        <QualityProfileItem
          editGroups={editGroups}
          groupId={groupId}
          qualityId={qualityId}
          name={name}
          allowed={allowed}
          qualityIndex={qualityIndex}
          isDragging={isDragging}
          isOverCurrent={isOverCurrent}
          connectDragSource={(node) => node}
          onCreateGroupPress={onCreateGroupPress}
          onQualityProfileItemAllowedChange={onQualityProfileItemAllowedChange}
        />
      )}

      {isAfter && (
        <div
          className={classNames(
            styles.qualityProfileItemPlaceholder,
            styles.qualityProfileItemPlaceholderAfter
          )}
        />
      )}
    </div>
  );
}

QualityProfileItemDragSource.propTypes = {
  editGroups: PropTypes.bool.isRequired,
  groupId: PropTypes.number,
  qualityId: PropTypes.number,
  name: PropTypes.string.isRequired,
  allowed: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  qualityIndex: PropTypes.string.isRequired,
  isDraggingUp: PropTypes.bool,
  isDraggingDown: PropTypes.bool,
  onCreateGroupPress: PropTypes.func,
  onDeleteGroupPress: PropTypes.func,
  onQualityProfileItemAllowedChange: PropTypes.func.isRequired,
  onItemGroupAllowedChange: PropTypes.func,
  onItemGroupNameChange: PropTypes.func,
  onQualityProfileItemDragMove: PropTypes.func.isRequired,
  onQualityProfileItemDragEnd: PropTypes.func.isRequired,
};
