import { useLayoutEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import type { WidgetPosition } from '../store/widget-config-store';
import { WidgetEditControls } from './widget-edit-controls';

type DraggableWidgetProps = {
  id: string;
  radius: number;
  isEditMode: boolean;
  positionStyle: React.CSSProperties;
  className?: string;
  isSelected?: boolean;
  onPositionChange: (id: string, position: Partial<WidgetPosition>) => void;
  onSelect?: (id: string) => void;
  children: React.ReactNode;
};

export const DraggableWidget = ({
  id,
  radius,
  isEditMode,
  positionStyle,
  className,
  isSelected = false,
  onPositionChange,
  onSelect,
  children,
}: DraggableWidgetProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  const [draggablePosition, setDraggablePosition] = useState(() => {
    const left = positionStyle.left
      ? Number.parseFloat(String(positionStyle.left).replace('px', ''))
      : 0;
    const top = positionStyle.top
      ? Number.parseFloat(String(positionStyle.top).replace('px', ''))
      : 0;
    return { x: left, y: top };
  });

  // Sync when positionStyle changes (e.g. container resize/zoom)
  useLayoutEffect(() => {
    const left = positionStyle.left
      ? Number.parseFloat(String(positionStyle.left).replace('px', ''))
      : 0;
    const top = positionStyle.top
      ? Number.parseFloat(String(positionStyle.top).replace('px', ''))
      : 0;
    setDraggablePosition({ x: left, y: top });
  }, [positionStyle.top, positionStyle.left]);

  const rotationTransform = positionStyle.transform || '';

  if (!isEditMode) {
    return (
      <button
        type="button"
        className={className}
        style={{
          ...positionStyle,
          background: 'transparent',
          border: 'none',
          padding: 0,
        }}
        onClick={() => onSelect?.(id)}
      >
        {children}
      </button>
    );
  }

  const handleStop = (_e: DraggableEvent, data: DraggableData) => {
    const parent = (data.node.parentElement ||
      data.node.offsetParent) as HTMLElement | null;

    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const nodeRect = data.node.getBoundingClientRect();

    const topPx = nodeRect.top - parentRect.top;
    const leftPx = nodeRect.left - parentRect.left;

    const topPercent = (topPx / parentRect.height) * 100;
    const leftPercent = (leftPx / parentRect.width) * 100;

    onPositionChange(id, {
      topPercent,
      leftPercent,
      bottomPercent: undefined,
      rightPercent: undefined,
    });
    setDraggablePosition({ x: leftPx, y: topPx });
  };

  return (
    <Draggable
      disabled={!isEditMode}
      onStop={handleStop}
      handle=".draggable-widget-handle"
      position={draggablePosition}
      nodeRef={nodeRef}
    >
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: Draggable element, primary interaction is drag not click */}
      <div
        ref={nodeRef}
        className={`${className ?? ''} draggable-widget-handle cursor-move`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        onClick={() => onSelect?.(id)}
      >
        {/* Selection outline wrapper */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: isSelected ? '50%' : 'inherit',
            outline: isSelected ? '2px solid #ff9f1c' : 'none',
            outlineOffset: isSelected ? '4px' : '0',
            boxShadow: isSelected ? '0 0 20px rgba(255,159,28,0.4)' : 'none',
            position: 'relative',
          }}
        >
          {/* Inner wrapper for rotation transform */}
          <div
            style={{
              transform: rotationTransform,
              width: '100%',
              height: '100%',
            }}
          >
            {children}
          </div>

          {/* Edit controls – 3 circular buttons near the title corner */}
          {isSelected && <WidgetEditControls widgetId={id} radius={radius} />}
        </div>
      </div>
    </Draggable>
  );
};
