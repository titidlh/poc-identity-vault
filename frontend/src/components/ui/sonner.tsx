import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export { toast };
export function Toaster() {
  return <ToastContainer position="top-right" />;
}
