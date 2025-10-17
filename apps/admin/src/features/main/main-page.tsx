import clsx from 'clsx';

export const MainPage = () => {
  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.content)}>
        <h1 className={clsx(styles.title)}>Радіо Пан</h1>
        <p className={clsx(styles.subtitle)}>
          Привіт! Це адмін панель для Вінілового Радіо. Тут можна редагувати
          музику, відео, новини та багато іншого. Щоб редагувати, авторизуйся.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: [
    'w-full h-full flex flex-col justify-center items-center text-paper-fog',
    'py-12 px-4',
  ],
  content: [
    'text-center bg-coal-deep/30 backdrop-blur-md rounded-full p-12 border border-white/20',
    'shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-coal-deep/40',
    'mb-12',
  ],
  title: ['mb-8 font-serif text-6xl font-bold text-sun'],
  subtitle: ['mb-8 font-serif text-xl text-paper-calm max-w-xl'],
  actions: ['space-y-4'],
  testPanel: ['w-full max-w-none'],
} as const;
