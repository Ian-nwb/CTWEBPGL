import Button from '../../components/Button';

import main from '../../assets/images/main.png';
import image1 from '../../assets/images/image1.png';
import image2 from '../../assets/images/image2.png';
import image3 from '../../assets/images/image3.png';
import image4 from '../../assets/images/image4.png';

const AboutPage = () => {
  const visualImages = [image1, image2, image3, image4];

  const featureCards = [
    {
      image: image1,
      title: "Appointment Scheduler",
      description: "Effortlessly manage client bookings with an intelligent scheduling system that keeps your calendar organized and operations running smoothly."
    },
    {
      image: image2,
      title: "Recruitment Portal",
      description: "Streamline your hiring process with a centralized recruitment system for applications, candidate profiles, and evaluation tools."
    },
    {
      image: image3,
      title: "Inventory Management",
      description: "Track stock levels in real time with a smart inventory system that ensures accuracy and prevents stockouts."
    },
    {
      image: image4,
      title: "Task Management",
      description: "Organize team workflows with a powerful task system designed to simplify planning, assignment, and progress tracking."
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Hero Section */}
      <section className="border-b-2 border-zinc-900 bg-white px-5 py-12 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Image Card */}
            <div className="group relative overflow-hidden rounded-3xl border-2 border-zinc-900 bg-zinc-100 shadow-xl">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={main}
                  alt="Centaim Platform"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.125em] text-zinc-500">
                  ABOUT CENTAIM
                </p>
                <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
                  Business tools that actually work together
                </h1>
              </div>

              <p className="max-w-lg text-lg leading-relaxed text-zinc-600">
                Centaim is an all-in-one platform that combines scheduling, recruitment, inventory, and task management — built for small and growing businesses who want simplicity without sacrificing power.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button to="/" variant="primary" size="lg">
                  Get Started Free
                </Button>
                <Button to="/articles" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b-2 border-zinc-900 bg-zinc-50 px-5 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.125em] text-zinc-500">AT A GLANCE</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
              Trusted by growing teams
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: 'Active Users', value: '5' },
              { label: 'Businesses', value: '2+' },
              { label: 'Countries', value: '1' },
              { label: 'Avg. Time Saved', value: '0h' },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-3xl border-2 border-zinc-900 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <p className="text-5xl font-bold text-zinc-900">{stat.value}</p>
                <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-zinc-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features + Visual Grid */}
      <section className="px-5 py-12 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.125em] text-zinc-500">EVERYTHING YOU NEED</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
              Powerful Tools, One Platform
            </h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-12">
            {/* Features List */}
            <div className="lg:col-span-7">
              <div className="space-y-5">
                {featureCards.map((card, index) => (
                  <article
                    key={index}
                    className="group rounded-3xl border-2 border-zinc-900 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex gap-6">
                      <div className="hidden h-14 w-14 flex-shrink-0 overflow-hidden rounded-2xl border border-zinc-200 sm:block">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-zinc-900 group-hover:text-black">
                          {card.title}
                        </h3>
                        <p className="mt-3 text-[15px] leading-relaxed text-zinc-600">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Visual Grid Sidebar */}
            <div className="lg:col-span-5">
              <div className="sticky top-8 rounded-3xl border-2 border-zinc-900 bg-white p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.125em] text-zinc-500">
                  PLATFORM VISUALS
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-zinc-900">Clean. Intuitive. Powerful.</h3>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {visualImages.map((img, index) => (
                    <div
                      key={index}
                      className="aspect-square overflow-hidden rounded-2xl border-2 border-zinc-900 shadow-sm transition-transform hover:scale-[1.02]"
                    >
                      <img
                        src={img}
                        alt={`Centaim feature ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                <Button className="mt-8 w-full" size="lg">
                  See the Full Platform
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;