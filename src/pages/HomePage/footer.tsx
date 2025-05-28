
export default function Footer() {
  return (
    <footer className="bg-white py-6 mt-6 text-center">
      <p className="mb-2">Title</p>
      <div className="flex justify-center space-x-4 text-gray-500">
        <span className="cursor-pointer" role="img" aria-label="Settings">
          ⚙️
        </span>
        <span className="cursor-pointer" role="img" aria-label="Camera">
          📷
        </span>
        <span className="cursor-pointer" role="img" aria-label="Email">
          📧
        </span>
        <span className="cursor-pointer" role="img" aria-label="Link">
          🔗
        </span>
      </div>
    </footer>
  );
}
