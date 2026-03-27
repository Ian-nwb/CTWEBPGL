import Button from '../components/Button';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Hero Section
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Welcome to Wireframe Studio Layout
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              Discover the art of wireframing with a simple layout system for hero content, key numbers, and feature cards.
            </p>
            <div className="mt-6">
              <Button to="/about" variant="primary">Learn More</Button>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-6">
            <div className="flex min-h-64 items-center justify-center rounded-[1.25rem] bg-zinc-200">
              <div className="h-20 w-20 rounded-full border-2 border-zinc-300 bg-zinc-100" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            KPI Section
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Quick overview blocks</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Projects', value: '12' },
            { label: 'Sections', value: '08' },
            { label: 'Screens', value: '24' },
            { label: 'Layouts', value: '04' },
          ].map((kpi, i) => (
            <div key={i} className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
              <p className="text-2xl font-bold text-zinc-900">{kpi.value}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                {kpi.label}
              </p>
            </div>
          ))}
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
          {[1, 2, 3].map((card) => (
            <article key={card} className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
              <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
                <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-zinc-900">Feature Card {card}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                A clean placeholder for title, short text, and action.
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