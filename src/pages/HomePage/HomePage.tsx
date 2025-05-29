// import { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '../hooks/hooks';
// import { fetchHomeContent } from '../features/auth/homeSlice';


// // export default function HomePage() {
// //   const dispatch = useAppDispatch();
// //   const { content } = useAppSelector((state) => state.home);

// //   useEffect(() => {
// //     dispatch(fetchHomeContent());
// //   }, [dispatch]);

// //   const heroSection = content?.sections?.find((s) => s.section_type === 'hero');
// //   const heroContent = heroSection?.content;

// //   return (
// //     <div className="p-4">
// //       <h1 className="text-3xl font-bold">{heroContent?.heading || 'Welcome to our Company'}</h1>
// //       <p className="mt-2 text-lg">{heroContent?.subheading || 'We provide great solutions.'}</p>
// //       {heroContent?.image && (
// //         <img
// //           src={heroContent.image}
// //           alt="Hero"
// //           className="mb-4 max-h-80 object-cover"
// //         />
// //       )}
// //     </div>
// //   );
// // }




// export default function HomePage() {
//   const dispatch = useAppDispatch();
//   const { content, status } = useAppSelector((state) => state.home);

//   useEffect(() => {
//     dispatch(fetchHomeContent());
//   }, [dispatch]);

//   if (status === 'loading') {
//     return <div className="p-4 text-lg">Loading...</div>;
//   }

//   if (!content) {
//     return <div className="p-4 text-red-500">No content available</div>;
//   }

//   const heroSection = content.sections.find((s) => s.section_type === 'hero');
//   const heroContent = heroSection?.content;

//   return (
//     <div className="p-4 space-y-6">
//       {/* Hero Section */}
//       {heroContent && (
//         <section className="mb-8">
//           <h1 className="text-3xl font-bold">
//             {heroContent.heading || 'Welcome to our Company'}
//           </h1>
//           <p className="mt-2 text-lg">
//             {heroContent.subheading || 'We provide great solutions.'}
//           </p>
//           {heroContent.image && (
//             <img
//               src={heroContent.image}
//               alt="Hero"
//               className="mt-4 mb-4 max-h-80 w-full object-cover rounded-xl shadow"
//             />
//           )}
//         </section>
//       )}

//       {/* FAQ Section (optional example) */}
//       {content.sections
//         .filter((s) => s.section_type === 'faq')
//         .map((faqSection) => (
//           <section key={faqSection.id}>
//             <h2 className="text-2xl font-semibold mb-2">FAQs</h2>
//             <ul className="space-y-2">
//               {faqSection.content?.questions?.map((q: any, idx: number) => (
//                 <li key={idx}>
//                   <p className="font-medium">{q.question}</p>
//                   <p className="text-gray-600">{q.answer}</p>
//                 </li>
//               ))}
//             </ul>
//           </section>
//         ))}
//     </div>
//   );
// }


import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchHomeContent } from '../../features/auth/homeSlice';
import Header from './header'
import Footer from './footer'
import Services from './services'; // ✅ Import Services
import HeroSection from './Hero';
export default function HomePage() {
  const dispatch = useAppDispatch();
  const { content, status } = useAppSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchHomeContent());
  }, [dispatch]);

  if (status === 'loading') return <div className="p-6 text-lg">Loading...</div>;
  if (!content) return <div></div>;

  const orderedSections = [...content.sections].sort((a, b) => a.order - b.order);

  return (
    <div className="p-6 space-y-20 max-w-7xl mx-auto">
      <Header />

      {orderedSections.map((section) => {
        const { section_type, content } = section;
        
        switch (section_type) {
          case 'hero':
            return <HeroSection/>

          case 'services':
            return <Services key={section_type} section_type={section_type} content={content} />;
            // return (
            //   <section key={section_type}>
            //     <h2 className="text-3xl font-semibold mb-6 text-center">Our Services</h2>
            //     <div className="grid gap-6 md:grid-cols-3">
            //       {content.items?.map((item: any, i: number) => (
            //         <div key={i} className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition">
            //           <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            //           <p className="text-gray-600">{item.description}</p>
            //           <button className="">Learn more</button>

            //         </div>
            //       ))}
            //     </div>
            //   </section>
            // );

          case 'testimonials':
            return (
              <section key={section_type} className="bg-gray-50 p-6 rounded-xl shadow-inner">
                <h2 className="text-3xl font-semibold mb-6 text-center">What Our Clients Say</h2>
                <div className="space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
                  {content.quotes?.map((quote: any, i: number) => (
                    <div key={i} className="p-4 border-l-4 border-blue-500 bg-white rounded shadow">
                      <p className="italic">"{quote.text}"</p>
                      <p className="mt-2 text-sm font-medium text-blue-600">— {quote.author}</p>
                    </div>
                  ))}
                </div>
              </section>
            );

          case 'faq':
            return (
              <section key={section_type}>
                <h2 className="text-3xl font-semibold mb-6 text-center">FAQs</h2>
                <div className="space-y-4">
                  {content.questions?.map((faq: any, i: number) => (
                    <div key={i} className="p-4 border rounded-lg shadow-sm bg-white">
                      <p className="font-semibold">{faq.question}</p>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            );

          default:
            return null;
        }
      })}
      <Footer/>

    </div>
  );
}
