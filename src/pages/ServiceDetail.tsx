import { useParams } from "react-router-dom";

export default function ServiceDetail() {
  const { slug } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Service: {slug?.replace("-", " ")}</h1>
      <p className="mt-2">Detailed description for {slug} service.</p>
    </div>
  );
}
