import { createRoute } from '@tanstack/react-router';
import { Root } from './root';
import { Container } from '@/components/layout';

const NotFound = () => {
  return (
    <Container fog>
      <h1 className="text-9xl font-bold text-white font-display tracking-widest text-shadow-strong">
        404
      </h1>
      <p className="text-white/70 text-lg font-ponomar">
        Ти заблукав у нетрях Полісся... Тут лише мох, жаби і відлуння.
      </p>

      <a
        href="/home"
        className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full shadow-md transition-all hover:scale-105 font-semibold"
      >
        🧭 Повернутись на головну
      </a>
    </Container>
  );
};

export const notFoundRoute = createRoute({
  getParentRoute: () => Root,
  path: '*',
  component: NotFound,
});
