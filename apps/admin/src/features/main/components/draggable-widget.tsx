import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import type { DraggableEvent, DraggableData } from 'react-draggable';

type DraggableWidgetProps = {
  id: string;
  isEditMode: boolean;
  positionStyle: React.CSSProperties;
  className?: string;
  isSelected?: boolean;
  onPositionChange: (
    id: string,
    position: { top?: number; left?: number; right?: number; bottom?: number },
  ) => void;
  onSelect?: (id: string) => void;
  children: React.ReactNode;
};

export const DraggableWidget = ({
  id,
  isEditMode,
  positionStyle,
  className,
  isSelected = false,
  onPositionChange,
  onSelect,
  children,
}: DraggableWidgetProps) => {
  // Extract position from style
  const getPositionFromStyle = () => {
    const top = positionStyle.top
      ? Number.parseFloat(String(positionStyle.top).replace('px', ''))
      : undefined;
    const left = positionStyle.left
      ? Number.parseFloat(String(positionStyle.left).replace('px', ''))
      : undefined;
    return { x: left ?? 0, y: top ?? 0 };
  };

  const [draggablePosition, setDraggablePosition] = useState(() =>
    getPositionFromStyle(),
  );

  // Update draggable position when positionStyle changes
  useEffect(() => {
    const top = positionStyle.top
      ? Number.parseFloat(String(positionStyle.top).replace('px', ''))
      : undefined;
    const left = positionStyle.left
      ? Number.parseFloat(String(positionStyle.left).replace('px', ''))
      : undefined;
    setDraggablePosition({ x: left ?? 0, y: top ?? 0 });
  }, [positionStyle.top, positionStyle.left]);

  // Extract rotation transform from positionStyle
  const rotationTransform = positionStyle.transform || '';

  // In view mode, render a simple positioned wrapper
  if (!isEditMode) {
    return (
      <button
        type="button"
        className={className}
        style={{ ...positionStyle, background: 'transparent', border: 'none', padding: 0 }}
        onClick={() => onSelect?.(id)}
      >
        {children}
      </button>
    );
  }

  // In edit mode, allow dragging via react-draggable
  const handleStop = (_e: DraggableEvent, data: DraggableData) => {
    const parent = (data.node.parentElement ||
      data.node.offsetParent) as HTMLElement | null;

    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const nodeRect = data.node.getBoundingClientRect();

    // Calculate position in pixels relative to parent
    const topPx = nodeRect.top - parentRect.top;
    const leftPx = nodeRect.left - parentRect.left;

    const newPosition = {
      top: Math.round(topPx),
      left: Math.round(leftPx),
      right: undefined,
      bottom: undefined,
    };

    onPositionChange(id, newPosition);
    setDraggablePosition({ x: leftPx, y: topPx });
  };

  return (
    <Draggable
      disabled={!isEditMode}
      onStop={handleStop}
      handle=".draggable-widget-handle"
      position={draggablePosition}
    >
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: Draggable element, primary interaction is drag not click */}
      <div
        className={`${className ?? ''} draggable-widget-handle cursor-move`}
        style={{
          position: 'absolute',
        }}
        onClick={() => onSelect?.(id)}
      >
        {/* Selection outline wrapper - only shown when selected */}
        <div
          className={isSelected ? 'rounded-full' : ''}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: isSelected ? '50%' : 'inherit',
            outline: isSelected ? '2px solid #ff9f1c' : 'none',
            outlineOffset: isSelected ? '4px' : '0',
            boxShadow: isSelected
              ? '0 0 20px rgba(255,159,28,0.4)'
              : 'none',
          }}
        >
          {/* Inner wrapper to apply rotation transform */}
          <div
            style={{
              transform: rotationTransform,
              width: '100%',
              height: '100%',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </Draggable>
  );
};

