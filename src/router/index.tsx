import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { routes } from './routes';

const router = createBrowserRouter(routes);

export const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};