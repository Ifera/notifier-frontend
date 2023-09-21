import { createBrowserRouter } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import Dashboard from '../pages/Dashboard';
import ErrorPage from '../pages/ErrorPage';
import Layout from '../pages/Layout';
import NotificationPage from '../pages/NotificationPage';
import TestPage from '../pages/TestPage';
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
  { path: 'login', element: <AuthPage authType='login' /> },
  { path: 'register', element: <AuthPage authType='register' /> },
  { path: 'test', element: <TestPage /> },
]);

export default router;
