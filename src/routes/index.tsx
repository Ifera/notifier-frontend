import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Layout from '../pages/Layout';
import LoginPage from '../pages/LoginPage';
import NotificationPreview from '../pages/NotificationPreview';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'notification-preview', element: <NotificationPreview /> },
    ],
  },
  { path: 'login', element: <LoginPage /> },
]);

export default router;
