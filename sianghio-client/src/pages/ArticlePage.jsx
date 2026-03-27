import Button from '../components/Button';

import image4 from '../assets/images/image4.png';
import image1 from '../assets/images/image1.png';
import image2 from '../assets/images/image2.png';
import image3 from '../assets/images/image3.png';

const ArticlePage = () => {
 
  const articles = [
    {
      image: image4,
      category: "Article #01",
       title: "Task Management",
      description: "Organize workflows with a task system designed to simplify planning, assignment, and progress tracking."
    },
    {
      image: image1,
      category: "Article #02",
      title: "Recruitment Portal",
      description: "Streamline hiring with a recruitment system that centralizes application, candidate profiles, and evaluation tools."
    },
    {
      image: image2,
      category: "Article #03",
      title: "Inventory Management",
      description: "Track stock levels in real time with a smart inventory system that helps maintain accuracy and avoid shortages."
    },
    {
      image: image3,
      category: "Article #04",
      title: "Appointment Scheduler",
      description: "Effortlessly manage client bookings with a scheduling system that keeps your calendar organized and your operations running smoothly."
    }
  ];

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
         Empowering Startups with Digital Infrastructure
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
        To turn a vision into a market-leading reality, businesses need more than just hard work—they need a tactical advantage in how they handle data and operations.

At Centaim, we bridge the gap between where your business is and where it needs to be. We don’t just provide tools; we provide the architectural blueprints for long-term digital success.
        </p>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Article card grid</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {articles.map((article, index) => (
            <article 
              key={index} 
              className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4"
            >
              <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                {article.category}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-zinc-900">{article.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {article.description}
              </p>
              <Button className="mt-4">Read More</Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;