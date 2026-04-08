// @ts-nocheck -- Converted from JSX. Pending type annotations.
import React from 'react';
import { useDragLayer } from 'react-dnd';
import DragPreviewLayer from 'Components/DragPreviewLayer';
import { DOWNLOAD_PROTOCOL_ITEM } from 'Helpers/dragTypes';
import dimensions from 'Styles/Variables/dimensions';
import DownloadProtocolItem from './DownloadProtocolItem';
import styles from './DownloadProtocolItemDragPreview.module.css';

const formGroupSmallWidth = parseInt(dimensions.formGroupSmallWidth);
const formLabelSmallWidth = parseInt(dimensions.formLabelSmallWidth);
const formLabelRightMarginWidth = parseInt(
  dimensions.formLabelRightMarginWidth
);
const dragHandleWidth = parseInt(dimensions.dragHandleWidth);

export default function DownloadProtocolItemDragPreview(_props) {
  const { item, itemType, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!currentOffset || itemType !== DOWNLOAD_PROTOCOL_ITEM) {
    return null;
  }

  const { x, y } = currentOffset;
  const handleOffset =
    formGroupSmallWidth -
    formLabelSmallWidth -
    formLabelRightMarginWidth -
    dragHandleWidth;
  const transform = `translate3d(${x - handleOffset}px, ${y}px, 0)`;

  const style = {
    position: 'absolute',
    WebkitTransform: transform,
    msTransform: transform,
    transform,
  };

  const { id, name, allowed, delay } = item;

  return (
    <DragPreviewLayer>
      <div className={styles.dragPreview} style={style}>
        <DownloadProtocolItem
          isPreview={true}
          id={id}
          name={name}
          allowed={allowed}
          delay={delay}
          isDragging={false}
        />
      </div>
    </DragPreviewLayer>
  );
}
