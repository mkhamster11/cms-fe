import { Link } from "react-router-dom";

interface ServiceItem {
  title: string;
  description: string;
  slug: string; // this will define the URL (e.g. "/services/gravel-roads")
}

interface ServicesProps {
  section_type: string;
  content: {
    items: ServiceItem[];
  };
}

export default function Services({ section_type, content }: ServicesProps) {
  return (
    <section key={section_type} className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center">Our Services</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {content.items?.map((item, i) => (
          console.log(item),
          <div
            key={i}
            className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition"
          >

            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <Link
              to={`/services/${item.slug}`}
              className="bg-gray-800 text-white text-sm px-4 py-2 rounded hover:bg-gray-700 transition inline-block"
            >
              Learn more
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
