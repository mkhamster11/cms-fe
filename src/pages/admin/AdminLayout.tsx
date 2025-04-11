

// src/pages/admin/AdminLayout.tsx
import { Outlet, Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { logout } from '../../features/auth/authSlice';

export default function AdminLayout() {
  const dispatch = useAppDispatch();
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Admin</h2>
        <Link className="block py-2" to="/admin">Homepage Editor</Link>
        <button className="mt-4 text-sm" onClick={() => dispatch(logout())}>Logout</button>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
