
// src/pages/admin/HomepageEditor.tsx
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { updateSection } from '../../features/auth/homeSlice';
import { useState } from 'react';



export default function HomepageEditor() {
  const { content } = useAppSelector((state) => state.home);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(content?.hero?.title || '');
  const [subtitle, setSubtitle] = useState(content?.hero?.subtitle || '');
  const [image, setImage] = useState<File | null>(null);
  const handleSave = () => {
    dispatch(updateSection({ section: 'hero', data: { title, subtitle, image } }));
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Homepage Hero Section</h1>
      <input
        className="border p-2 w-full mb-4"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        className="border p-2 w-full mb-4"
        type="text"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        placeholder="Subtitle"
      />
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setImage(e.target.files[0]);
          }
        }}
        className="mb-4"
      />
      {content?.hero?.image && (
        <img src={content.hero.image} alt="Hero" className="mb-4 max-h-60 object-contain" />
      )}

      <button className="bg-green-600 text-white px-4 py-2" onClick={handleSave}>Save</button>
    </div>
  );
}
