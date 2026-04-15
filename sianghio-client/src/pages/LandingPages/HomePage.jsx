import Button from '../../components/Button';

import main from '../../assets/images/main.png';
import image1 from '../../assets/images/image1.png';
import image2 from '../../assets/images/image2.png';
import image3 from '../../assets/images/image3.png';

const HomePage = () => {
  const featureCards = [
    {
      image: image1,
      title: "Appointment Scheduler",
      description: "Effortlessly manage client bookings with an intelligent scheduling system that keeps your calendar organized and operations smooth."
    },
    {
      image: image2,
      title: "Recruitment Portal",
      description: "Streamline your hiring process with a centralized platform for applications, candidate profiles, and smart evaluation tools."
    },
    {
      image: image3,
      title: "Inventory Management",
      description: "Track stock levels in real-time with a powerful inventory system that ensures accuracy and prevents shortages."
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Hero Section */}
      <section className="border-b-2 border-zinc-900 bg-white px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.125em] text-zinc-500">
                  CENTAIM
                </p>
                <h1 className="mt-4 text-5xl font-bold leading-tight tracking-tighter text-zinc-900 sm:text-6xl lg:text-7xl">
                  All-in-one tools for<br />growing businesses
                </h1>
              </div>

              <p className="max-w-lg text-lg leading-relaxed text-zinc-600">
                Centaim combines appointment scheduling, recruitment, inventory, and task management into one clean, powerful platform. 
                Built for small teams who want to work smarter — not harder.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button to="/about" variant="primary" size="lg">
                  Learn More About Centaim
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="group relative overflow-hidden rounded-3xl border-2 border-zinc-900 bg-zinc-100 shadow-2xl">
              <div className="aspect-video overflow-hidden">
                <img
                  src={main}
                  alt="Centaim Dashboard"
                  className="h-full w-full object-cover transition-transform duration-700 "
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.125em] text-zinc-500">
              POWERFUL TOOLS
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900">
              Everything your business needs in one place
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {featureCards.map((card, index) => (
              <article
                key={index}
                className="group rounded-3xl border-2 border-zinc-900 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-4/3 overflow-hidden rounded-2xl border border-zinc-200">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-zinc-900">
                  {card.title}
                </h3>
                
                <p className="mt-4 text-[15px] leading-relaxed text-zinc-600">
                  {card.description}
                </p>

                <Button className="mt-8 w-full" variant="primary">
                  Learn More
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;