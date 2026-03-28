import Button from '../components/Button';

import main from '../assets/images/main.png';
import image1 from '../assets/images/image1.png';
import image2 from '../assets/images/image2.png';
import image3 from '../assets/images/image3.png';
import image4 from '../assets/images/image4.png';

const AboutPage = () => {
  const visualImages = [image1, image2, image3, image4];

  const featureCards = [
    {
      image: image1,
      title: "Appointment Scheduler",
      description: "Effortlessly manage client bookings with a scheduling system that keeps your calendar organized and your operations running smoothly."
    },
    {
      image: image2,
      title: "Recruitment Portal",
      description: "Streamline hiring with a recruitment system that centralizes application, candidate profiles, and evaluation tools."
    },
    {
      image: image3,
      title: "Inventory Management",
      description: "Track stock levels in real time with a smart inventory system that helps maintain accuracy and avoid shortages."
    },

    {
      image: image4,
      title: "Task Management",
      description: "Organize workflows with a task system designed to simplify planning, assignment, and progress tracking."
    }
  ];

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          
          <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-6">
            <div className="flex min-h-72 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
              <img
                src={main}
                alt="main"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              About Section
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              A profile wireframe focused on layout, spacing, and content grouping.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              This page follows the same low-fidelity system as the homepage with a simple hero, overview blocks, and supporting sections for profile details.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/articles">Open Articles</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Profile Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Quick summary blocks</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Years', value: '01' },
            { label: 'Projects', value: '4' },
            { label: 'Clients', value: '3' },
            { label: 'Focus Areas', value: 'wala' },
          ].map((stat, i) => (
            <div key={i} className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
              <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Section Flow
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Core Features</h2>
            <div className="mt-6 space-y-4">
              {featureCards.map((card, index) => (
                <article key={index} className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                  <h3 className="text-lg font-semibold text-zinc-900">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    {card.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Visual Grid
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[1, 2, 3, 4].map((item, index) => (
                <div 
                  key={item} 
                  className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden"
                >
                  <img
                    src={visualImages[index]}
                    alt={`Visual ${item}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <Button className="mt-5">View Section</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;