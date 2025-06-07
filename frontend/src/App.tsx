// frontend/src/App.tsx

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ImportCredential from './pages/ImportCredential';
import ShareCredential from './pages/ShareCredential';

function App() {
  const isAuthed = localStorage.getItem('pin') !== null;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={isAuthed ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/import" element={isAuthed ? <ImportCredential /> : <Navigate to="/" />} />
        <Route path="/share/:id" element={isAuthed ? <ShareCredential /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

