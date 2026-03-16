import { useStats } from '@/services/api/hooks/use-stats';
import { ParticlesBackground } from './components/particles-background';
import { RecordWidgets } from './components/record-widgets';
import { useCollectionData } from '@/features/collection/hooks';
import { useWidgetConfigStore } from './store/widget-config-store';
import { Input, Popup, PopupItem, Button } from '@radio/mojo-ui';
import { WIDGET_COLOR_OPTIONS } from './utils/widget-colors';

export const MainPage = () => {
  const { data: stats, isLoading } = useStats();
  const { albumStats } = useCollectionData();
  const isEditMode = useWidgetConfigStore((state) => state.isEditMode);
  const selectedWidgetId = useWidgetConfigStore(
    (state) => state.selectedWidgetId,
  );
  const widgets = useWidgetConfigStore((state) => state.widgets);
  const updateWidget = useWidgetConfigStore((state) => state.updateWidget);
  const toggleEditMode = useWidgetConfigStore((state) => state.toggleEditMode);

  const activeWidget =
    (selectedWidgetId &&
      widgets.find((widget) => widget.id === selectedWidgetId)) ||
    widgets[0];

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (!activeWidget) return;
    updateWidget(activeWidget.id, { title: event.target.value });
  };

  const handleRadiusChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (!activeWidget) return;
    const radius = Number.parseInt(event.target.value || '0', 10);
    updateWidget(activeWidget.id, {
      radius: Number.isNaN(radius) ? undefined : radius,
    });
  };

  const handleRotationChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (!activeWidget) return;
    const rotation = Number.parseInt(event.target.value || '0', 10);
    updateWidget(activeWidget.id, {
      position: {
        ...activeWidget.position,
        rotation: Number.isNaN(rotation)
          ? activeWidget.position.rotation
          : rotation,
      },
    });
  };

  const handleTitleRotationChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    if (!activeWidget) return;
    const value = Number.parseInt(event.target.value || '0', 10);
    updateWidget(activeWidget.id, {
      titleRotation: Number.isNaN(value) ? 0 : value,
    });
  };

  const handleColorChange = (color: string) => {
    if (!activeWidget) return;
    updateWidget(activeWidget.id, { color: color || undefined });
  };

  const selectedColorOption = (activeWidget &&
    WIDGET_COLOR_OPTIONS.find((opt) => opt.value === activeWidget.color)) || {
    name: 'Default (Sun)',
    value: '',
  };

  return (
    <div className={styles.container.join(' ')}>
      <ParticlesBackground />

      <div className={styles.contentArea.join(' ')}>
        {/* Central Welcome Card */}
        <div className={styles.welcomeCardWrapper.join(' ')}>
          <div className={styles.content.join(' ')}>
            {!isEditMode && (
              <>
                <h1 className={styles.title.join(' ')}>Радіо Пан</h1>
                <p className={styles.subtitle.join(' ')}>
                  Привіт! Це адмін панель для Вінілового Радіо. Тут можна
                  редагувати музику, відео, новини та багато іншого. Щоб
                  редагувати, авторизуйся.
                </p>
              </>
            )}

            {isEditMode && activeWidget && (
              <div className="flex flex-col gap-4 items-stretch text-left">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h2 className="text-xl font-semibold text-sun">
                    Edit widget: {activeWidget.title}
                  </h2>
                  <Button
                    variant="yellow"
                    size="small"
                    title="Exit layout edit"
                    onClick={() => toggleEditMode()}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Title"
                    type="text"
                    value={activeWidget.title}
                    onChange={handleTitleChange}
                    size="small"
                  />

                  <Input
                    label="Radius (px)"
                    type="number"
                    min={40}
                    max={160}
                    value={activeWidget.radius ?? 112}
                    onChange={handleRadiusChange}
                    size="small"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Widget rotation (deg)"
                    type="number"
                    min={-180}
                    max={180}
                    value={activeWidget.position.rotation}
                    onChange={handleRotationChange}
                    size="small"
                  />

                  <Input
                    label="Title rotation (deg)"
                    type="number"
                    min={0}
                    max={360}
                    value={activeWidget.titleRotation ?? 0}
                    onChange={handleTitleRotationChange}
                    size="small"
                  />
                </div>

                <div>
                  <span className="mb-1 block text-xs uppercase tracking-wide text-paper-calm">
                    Color
                  </span>
                  <Popup
                    label={selectedColorOption.name}
                    size="small"
                    variant="dark"
                    rounded="half"
                    align="center"
                  >
                    <PopupItem
                      selected={!activeWidget.color}
                      onClick={() => handleColorChange('')}
                    >
                      Default (Sun)
                    </PopupItem>
                    {WIDGET_COLOR_OPTIONS.map((option) => (
                      <PopupItem
                        key={option.name}
                        selected={activeWidget.color === option.value}
                        onClick={() => handleColorChange(option.value)}
                      >
                        {option.name}
                      </PopupItem>
                    ))}
                  </Popup>
                </div>
              </div>
            )}
          </div>
        </div>

        <RecordWidgets
          stats={stats}
          overallCompleteness={albumStats.overallCompleteness}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

const styles = {
  container: [
    'w-full h-full text-paper-fog',
    'py-12 px-4 relative',
    'flex items-center justify-center',
  ],
  contentArea: [
    'relative w-full max-w-7xl mx-auto',
    'h-full min-h-[600px] py-8',
    'flex items-center justify-center',
  ],
  welcomeCardWrapper: ['relative z-30', 'flex justify-center items-center'],
  content: [
    'text-center bg-coal-deep/30 backdrop-blur-md rounded-full p-12 border border-white/20',
    'shadow-2xl transition-all duration-500',
    'relative z-30',
    'w-[600px] h-[500px]',
    'flex flex-col justify-center items-center',
  ],
  title: ['mb-8 font-serif text-6xl font-bold text-sun'],
  subtitle: ['mb-8 font-serif text-xl text-paper-calm max-w-xl'],
} as const;
