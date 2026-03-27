import Button from '../components/Button';

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Featured articles in a simple card grid
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          A clean wireframe section for article thumbnails, titles, short descriptions, and one clear action per card.
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
          {[1, 2, 3, 4].map((item) => (
            <article key={item} className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
              <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
                <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                Article #0{item}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-zinc-900">Wireframe Layout Basics</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                A simple placeholder for a featured article with image, title, and short copy.
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