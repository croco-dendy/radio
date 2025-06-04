import useDebugRender from 'tilg';
import { Outlet } from '@tanstack/react-router';
import { Layout } from '@/components/layout';

import '@fontsource/tiny5';
import '@fontsource/ponomar';

const App = () => {
  useDebugRender();

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default App;
