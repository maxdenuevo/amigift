import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { router } from './router';
import './utils/i18n';
import './styles/index.css';

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
