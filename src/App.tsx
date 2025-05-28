// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Login';
import AdminLayout from './pages/admin/AdminLayout';
import HomepageEditor from './pages/admin/HomepageEditor';
import { useAppSelector } from './hooks/hooks';
import ServiceDetail from './pages/ServiceDetail';

function PrivateRoute({ children }: { children: React.ReactElement }) {
  const token = useAppSelector((state) => state.auth.access);
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services/:slug" element={<ServiceDetail/>} />

      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<HomepageEditor />} />
      </Route>
    </Routes>
  );
}