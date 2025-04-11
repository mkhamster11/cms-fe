// src/pages/HomePage.tsx
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchHomeContent } from '../features/auth/homeSlice';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { content } = useAppSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchHomeContent());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{content?.hero?.title || 'Welcome to our Company'}</h1>
      <p className="mt-2 text-lg">{content?.hero?.subtitle || 'We provide great solutions.'}</p>
      <p>{content?.hero?.image && (<img src={content.hero.image} alt="Hero" className="mb-4 max-h-80 object-cover" />)}</p>
      

    </div>
  );
}
