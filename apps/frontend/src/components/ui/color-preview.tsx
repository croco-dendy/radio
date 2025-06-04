import clsx from 'clsx';

export const ColorPreview = () => (
  <div className={clsx(styles.container)}>
    <h1 className={clsx(styles.title)}>
      Color Scheme
    </h1>
    {Object.entries(palette).map(([groupName, colors]) => (
      <div key={groupName}>
        <h2 className={clsx(styles.groupTitle)}>{groupName}</h2>
        <div className={clsx(styles.grid)}>
          {colors.map((color) => (
            <div key={color.name} className={clsx(styles.colorItem)}>
              <div
                className={clsx(styles.colorBox, color.className)}
              />
              <p className={clsx(styles.colorLabel)}>
                {groupName}.{color.name !== 'DEFAULT' ? color.name : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const styles = {
  container: ['space-y-4 font-display text-left'],
  title: ['text-4xl font-bold capitalize text-bark-warm'],
  groupTitle: ['text-2xl font-bold mb-4 capitalize'],
  grid: ['max-w-md grid grid-cols-2 md:grid-cols-5 gap-4'],
  colorItem: ['space-y-1'],
  colorBox: ['h-[80px] w-[100px] shadow-inner'],
  colorLabel: ['text-md text-glow-ghost'],
};

const palette = {
  moss: [
    { name: 'fog', className: 'bg-moss-fog' },
    { name: 'calm', className: 'bg-moss-calm' },
    { name: 'DEFAULT', className: 'bg-moss' },
    { name: 'deep', className: 'bg-moss-deep' },
    { name: 'relic', className: 'bg-moss-relic' },
  ],
  bark: [
    { name: 'fog', className: 'bg-bark-fog' },
    { name: 'calm', className: 'bg-bark-calm' },
    { name: 'DEFAULT', className: 'bg-bark' },
    { name: 'deep', className: 'bg-bark-deep' },
    { name: 'relic', className: 'bg-bark-relic' },
  ],
  clay: [
    { name: 'fog', className: 'bg-clay-fog' },
    { name: 'calm', className: 'bg-clay-calm' },
    { name: 'DEFAULT', className: 'bg-clay' },
    { name: 'deep', className: 'bg-clay-deep' },
    { name: 'relic', className: 'bg-clay-relic' },
  ],
  river: [
    { name: 'fog', className: 'bg-river-fog' },
    { name: 'calm', className: 'bg-river-calm' },
    { name: 'DEFAULT', className: 'bg-river' },
    { name: 'deep', className: 'bg-river-deep' },
    { name: 'relic', className: 'bg-river-relic' },
  ],
  paper: [
    { name: 'fog', className: 'bg-paper-fog' },
    { name: 'calm', className: 'bg-paper-calm' },
    { name: 'DEFAULT', className: 'bg-paper' },
    { name: 'deep', className: 'bg-paper-deep' },
    { name: 'relic', className: 'bg-paper-relic' },
  ],
  sun: [
    { name: 'fog', className: 'bg-sun-fog' },
    { name: 'calm', className: 'bg-sun-calm' },
    { name: 'DEFAULT', className: 'bg-sun' },
    { name: 'deep', className: 'bg-sun-deep' },
    { name: 'relic', className: 'bg-sun-relic' },
  ],
  coal: [
    { name: 'fog', className: 'bg-coal-fog' },
    { name: 'calm', className: 'bg-coal-calm' },
    { name: 'DEFAULT', className: 'bg-coal' },
    { name: 'deep', className: 'bg-coal-deep' },
    { name: 'relic', className: 'bg-coal-relic' },
  ],
  ember: [
    { name: 'fog', className: 'bg-ember-fog' },
    { name: 'calm', className: 'bg-ember-calm' },
    { name: 'DEFAULT', className: 'bg-ember' },
    { name: 'deep', className: 'bg-ember-deep' },
    { name: 'relic', className: 'bg-ember-relic' },
  ],
};
