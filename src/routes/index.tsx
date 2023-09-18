import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import ErrorPage from '../pages/ErrorPage';
import Layout from '../pages/Layout';
import LoginPage from '../pages/LoginPage';
import NotificationPage from '../pages/NotificationPage';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: 'add-notification/:id',
        element: <NotificationPage operation='Add' />,
      },
      {
        path: 'edit-notification/:id',
        element: <NotificationPage operation='Edit' />,
      },
    ],
  },
  { path: 'login', element: <LoginPage /> },
]);

export default router;
