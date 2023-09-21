import { RouterProvider } from 'react-router-dom';
import router from './routes';

function App() {
  return (
    <div style={{ backgroundColor: '#F3F7FD' }}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
