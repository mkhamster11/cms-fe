// src/pages/Login.tsx
import { useState } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(login({ username, password }));
    if (login.fulfilled.match(result)) navigate('/admin');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20">
      <input
        className="border p-2 w-full mb-4"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-4"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 w-full" type="submit">Login</button>
    </form>
  );
}
