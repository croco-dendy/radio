import { useCallback, useEffect, useRef, useState } from 'react';
import { useWidgetConfigStore } from '../store/widget-config-store';
import { WIDGET_COLOR_OPTIONS } from '../utils/widget-colors';

type WidgetEditControlsProps = {
  widgetId: string;
  radius: number;
};

// ─── Inline SVG Icons ────────────────────────────────────────────────────────

const SizeIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-3.5 h-3.5"
    aria-hidden="true"
  >
    <path d="M8 2v12M2 8h12" />
    <path d="M6 4L8 2l2 2M6 12l2 2 2-2M4 6L2 8l2 2M12 6l2 2-2 2" />
  </svg>
);

const RotateIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-3.5 h-3.5"
    aria-hidden="true"
  >
    <path d="M3 8a5 5 0 1 0 5-5" />
    <path d="M8 1L6 3l2 2" />
  </svg>
);

// ─── Color Picker Popup ───────────────────────────────────────────────────────

type ColorPickerPopupProps = {
  currentColor?: string;
  onSelect: (color: string) => void;
  onClose: () => void;
  anchorX: number;
  anchorY: number;
};

const ColorPickerPopup = ({
  currentColor,
  onSelect,
  onClose,
  anchorX,
  anchorY,
}: ColorPickerPopupProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute z-50 bg-coal-deep/95 backdrop-blur-md border border-white/20 rounded-2xl p-2.5 shadow-2xl"
      style={{ left: anchorX, top: anchorY, minWidth: 148 }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="text-[10px] uppercase tracking-widest text-paper-calm mb-2 px-1">
        Color
      </div>

      {/* Default option */}
      <button
        type="button"
        className="flex items-center gap-2 w-full px-2 py-1 rounded-lg hover:bg-white/10 transition-colors text-left"
        onClick={() => {
          onSelect('');
          onClose();
        }}
      >
        <span
          className="w-4 h-4 rounded-full border border-white/30 flex-shrink-0"
          style={{ background: '#ff9f1c' }}
        />
        <span
          className={`text-[11px] ${!currentColor ? 'text-sun font-semibold' : 'text-paper-fog'}`}
        >
          Default
        </span>
        {!currentColor && (
          <span className="ml-auto text-sun text-[10px]">✓</span>
        )}
      </button>

      {/* Color options */}
      {WIDGET_COLOR_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className="flex items-center gap-2 w-full px-2 py-1 rounded-lg hover:bg-white/10 transition-colors text-left"
          onClick={() => {
            onSelect(opt.value);
            onClose();
          }}
        >
          <span
            className="w-4 h-4 rounded-full flex-shrink-0 border border-white/20"
            style={{ background: opt.value }}
          />
          <span
            className={`text-[11px] ${currentColor === opt.value ? 'font-semibold' : 'text-paper-fog'}`}
            style={{
              color: currentColor === opt.value ? opt.value : undefined,
            }}
          >
            {opt.name}
          </span>
          {currentColor === opt.value && (
            <span className="ml-auto text-[10px]" style={{ color: opt.value }}>
              ✓
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

// ─── Widget Edit Controls ─────────────────────────────────────────────────────

export const WidgetEditControls = ({
  widgetId,
  radius,
}: WidgetEditControlsProps) => {
  const widget = useWidgetConfigStore((state) =>
    state.widgets.find((w) => w.id === widgetId),
  );
  const updateWidget = useWidgetConfigStore((state) => state.updateWidget);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [activeDrag, setActiveDrag] = useState<'size' | 'rotation' | null>(
    null,
  );

  const BUTTON_SIZE = 26;
  const center = radius;
  // Buttons orbit just outside the circle, clustered near the title (top area)
  const outerRadius = radius + 22;

  // Angles from top (0°=top, clockwise +): spread 3 buttons at top-left area
  const buttonAngles = [-50, -15, 20]; // degrees

  const getButtonPos = (angleDeg: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    const x = center + outerRadius * Math.sin(rad) - BUTTON_SIZE / 2;
    const y = center - outerRadius * Math.cos(rad) - BUTTON_SIZE / 2;
    return { x, y };
  };

  const [sizePos, colorPos, rotPos] = buttonAngles.map(getButtonPos);

  // ── Drag: Radius ─────────────────────────────────────────────────────────
  const handleSizeDragStart = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (!widget) return;

      const startY = e.clientY;
      const startRadius = widget.radius ?? 112;
      setActiveDrag('size');

      const onMove = (me: MouseEvent) => {
        const dy = startY - me.clientY; // drag up = bigger
        const newRadius = Math.round(
          Math.max(40, Math.min(160, startRadius + dy)),
        );
        updateWidget(widgetId, { radius: newRadius });
      };
      const onUp = () => {
        setActiveDrag(null);
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },
    [widget, widgetId, updateWidget],
  );

  // ── Drag: Rotation ───────────────────────────────────────────────────────
  const handleRotationDragStart = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (!widget) return;

      const startX = e.clientX;
      const startRotation = widget.position.rotation ?? 0;
      setActiveDrag('rotation');

      const onMove = (me: MouseEvent) => {
        const dx = me.clientX - startX;
        const newRotation = Math.round(
          Math.max(-180, Math.min(180, startRotation + dx * 0.4)),
        );
        updateWidget(widgetId, {
          position: { ...widget.position, rotation: newRotation },
        });
      };
      const onUp = () => {
        setActiveDrag(null);
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },
    [widget, widgetId, updateWidget],
  );

  const handleColorSelect = useCallback(
    (color: string) => {
      updateWidget(widgetId, { color: color || undefined });
    },
    [widgetId, updateWidget],
  );

  if (!widget) return null;

  const accentColor = widget.color ?? '#ff9f1c';

  const btnBase =
    'absolute pointer-events-auto flex items-center justify-center rounded-full border transition-all duration-150 select-none';

  const btnStyle = (active: boolean): React.CSSProperties => ({
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    background: active ? accentColor : 'rgba(20,20,20,0.85)',
    borderColor: active ? accentColor : 'rgba(255,255,255,0.25)',
    color: active ? '#111' : accentColor,
    boxShadow: `0 2px 8px rgba(0,0,0,0.5), 0 0 0 1px ${accentColor}40`,
    backdropFilter: 'blur(8px)',
  });

  return (
    /* Overlay that matches the widget's bounding box, overflows visually */
    <div
      className="absolute inset-0 pointer-events-none overflow-visible"
      style={{ width: radius * 2, height: radius * 2, zIndex: 40 }}
    >
      {/* ── Size Button – drag up/down to resize ── */}
      <button
        type="button"
        title="Drag up/down to resize"
        className={`${btnBase} cursor-ns-resize`}
        style={{
          ...btnStyle(activeDrag === 'size'),
          left: sizePos.x,
          top: sizePos.y,
        }}
        onMouseDown={handleSizeDragStart}
        onClick={(e) => e.stopPropagation()}
      >
        <SizeIcon />
      </button>

      {/* ── Color Button – click for picker ── */}
      <div
        className="absolute pointer-events-auto"
        style={{ left: colorPos.x, top: colorPos.y }}
      >
        <button
          type="button"
          title="Pick color"
          className={`${btnBase} cursor-pointer`}
          style={{
            ...btnStyle(colorPickerOpen),
            position: 'relative',
            left: 0,
            top: 0,
          }}
          onClick={(e) => {
            e.stopPropagation();
            setColorPickerOpen((v) => !v);
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <span
            className="w-3 h-3 rounded-full border border-white/30"
            style={{ background: accentColor }}
          />
        </button>

        {colorPickerOpen && (
          <ColorPickerPopup
            currentColor={widget.color}
            onSelect={handleColorSelect}
            onClose={() => setColorPickerOpen(false)}
            anchorX={BUTTON_SIZE + 4}
            anchorY={-8}
          />
        )}
      </div>

      {/* ── Rotation Button – drag left/right to rotate ── */}
      <button
        type="button"
        title="Drag left/right to rotate"
        className={`${btnBase} cursor-ew-resize`}
        style={{
          ...btnStyle(activeDrag === 'rotation'),
          left: rotPos.x,
          top: rotPos.y,
        }}
        onMouseDown={handleRotationDragStart}
        onClick={(e) => e.stopPropagation()}
      >
        <RotateIcon />
      </button>

      {/* ── Live value tooltips while dragging ── */}
      {activeDrag === 'size' && (
        <div
          className="absolute pointer-events-none text-[10px] font-mono text-sun bg-coal-deep/90 border border-white/20 rounded-md px-1.5 py-0.5 shadow-lg"
          style={{
            left: sizePos.x + BUTTON_SIZE + 4,
            top: sizePos.y + BUTTON_SIZE / 2 - 10,
            whiteSpace: 'nowrap',
          }}
        >
          r: {widget.radius ?? 112}px
        </div>
      )}
      {activeDrag === 'rotation' && (
        <div
          className="absolute pointer-events-none text-[10px] font-mono text-sun bg-coal-deep/90 border border-white/20 rounded-md px-1.5 py-0.5 shadow-lg"
          style={{
            left: rotPos.x + BUTTON_SIZE + 4,
            top: rotPos.y + BUTTON_SIZE / 2 - 10,
            whiteSpace: 'nowrap',
          }}
        >
          {widget.position.rotation}°
        </div>
      )}
    </div>
  );
};
