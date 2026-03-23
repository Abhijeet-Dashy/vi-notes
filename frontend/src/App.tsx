import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<div className="min-h-screen flex items-center justify-center p-4 bg-vibe-bg text-vibe-text"><div className="bg-vibe-card border border-vibe-border rounded-2xl p-8 shadow-2xl"><h2 className="text-2xl font-bold text-white">Dashboard Placeholder</h2></div></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;