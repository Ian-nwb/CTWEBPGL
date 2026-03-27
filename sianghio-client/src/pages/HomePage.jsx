import Button from '../components/Button';


import main from '../assets/images/main.png';
import image1 from '../assets/images/image1.png';
import image2 from '../assets/images/image2.png';
import image3 from '../assets/images/image3.png';

const HomePage = () => {
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
    }
  ];

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Centaim
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Welcome to Centaim
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              From clicks to conversion, we help you measure success at every step of your growth journey.
            </p>
            <div className="mt-6">
              <Button to="/about" variant="primary">Learn More</Button>
            </div>
          </div>

    
          <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-6">
            <div className="flex min-h-64 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
              <img
                src={main}
                alt="main"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Feature Cards
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Simple wireframe cards</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {featureCards.map((card, index) => (
            <article 
              key={index} 
              className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4"
            >
              <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-zinc-900">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {card.description}
              </p>
              <Button className="mt-4" variant="primary">View More</Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;