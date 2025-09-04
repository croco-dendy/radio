import { createRoute } from '@tanstack/react-router';
import { Root } from './root';
import { CollectionPage } from '../features';

export const collectionRoute = createRoute({
  getParentRoute: () => Root,
  path: '/collection',
  component: CollectionPage,
});
