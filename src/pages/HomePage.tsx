import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchHomeContent } from '../features/auth/homeSlice';


// export default function HomePage() {
//   const dispatch = useAppDispatch();
//   const { content } = useAppSelector((state) => state.home);

//   useEffect(() => {
//     dispatch(fetchHomeContent());
//   }, [dispatch]);

//   const heroSection = content?.sections?.find((s) => s.section_type === 'hero');
//   const heroContent = heroSection?.content;

//   return (
//     <div className="p-4">
//       <h1 className="text-3xl font-bold">{heroContent?.heading || 'Welcome to our Company'}</h1>
//       <p className="mt-2 text-lg">{heroContent?.subheading || 'We provide great solutions.'}</p>
//       {heroContent?.image && (
//         <img
//           src={heroContent.image}
//           alt="Hero"
//           className="mb-4 max-h-80 object-cover"
//         />
//       )}
//     </div>
//   );
// }




export default function HomePage() {
  const dispatch = useAppDispatch();
  const { content, status } = useAppSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchHomeContent());
  }, [dispatch]);

  if (status === 'loading') {
    return <div className="p-4 text-lg">Loading...</div>;
  }

  if (!content) {
    return <div className="p-4 text-red-500">No content available</div>;
  }

  const heroSection = content.sections.find((s) => s.section_type === 'hero');
  const heroContent = heroSection?.content;

  return (
    <div className="p-4 space-y-6">
      {/* Hero Section */}
      {heroContent && (
        <section className="mb-8">
          <h1 className="text-3xl font-bold">
            {heroContent.heading || 'Welcome to our Company'}
          </h1>
          <p className="mt-2 text-lg">
            {heroContent.subheading || 'We provide great solutions.'}
          </p>
          {heroContent.image && (
            <img
              src={heroContent.image}
              alt="Hero"
              className="mt-4 mb-4 max-h-80 w-full object-cover rounded-xl shadow"
            />
          )}
        </section>
      )}

      {/* FAQ Section (optional example) */}
      {content.sections
        .filter((s) => s.section_type === 'faq')
        .map((faqSection) => (
          <section key={faqSection.id}>
            <h2 className="text-2xl font-semibold mb-2">FAQs</h2>
            <ul className="space-y-2">
              {faqSection.content?.questions?.map((q: any, idx: number) => (
                <li key={idx}>
                  <p className="font-medium">{q.question}</p>
                  <p className="text-gray-600">{q.answer}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
    </div>
  );
}
