import Router from './routes/Router';
import Toast from './components/Toast';
import { ToastProvider } from './context/ToastContext';

export default function App() {
  return (
    <ToastProvider>
      <Router />
      <Toast />
    </ToastProvider>
  );
}
