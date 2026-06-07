import Link from "next/link";

import { LoopPreview } from "@/components/home/LoopPreview";
import { Navbar } from "@/components/navigation/Navbar";
import { MediaRenderer } from "@/components/projects/MediaRenderer";
import { productionProjects } from "@/data/projects";

type ProductionPageProps = {
  params: Promise<{ slug: string }>;
};

type SectionVideo = {
  youtube?: unknown;
};

type ProductionSection = {
  title: string;
  slug: string;
  label: string;
  description: string;
  mediaLoop?: string;
  loop?: string;
  youtube?: unknown;
  videos?: SectionVideo[];
};

function getYoutubeUrl(section: ProductionSection) {
  if (typeof section.youtube === "string") {
    return section.youtube;
  }

  const firstVideo = section.videos?.find(
    (video) => typeof video.youtube === "string",
  );

  return typeof firstVideo?.youtube === "string" ? firstVideo.youtube : undefined;
}

function getSectionLoop(section: ProductionSection) {
  return section.loop ?? section.mediaLoop;
}

export default async function ProductionPage(props: ProductionPageProps) {
  const params = await props.params;
  const production = productionProjects.find((item) => item.slug === params.slug);

  if (!production) {
    return (
      <main className="min-h-screen bg-black px-6 py-24 text-white">
        <h1 className="text-4xl font-bold">Production not found</h1>

        <Link
          href="/"
          className="mt-6 inline-block text-zinc-400 hover:text-white"
        >
          ← Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="relative overflow-hidden border-b border-zinc-900 px-6 py-28">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          src={production.heroVideo}
          poster={production.heroImage}
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.14),transparent_34%)]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <Link
            href="/#productions"
            className="text-sm text-zinc-500 hover:text-white"
          >
            ← Back to Selected Productions
          </Link>

          <p className="mt-16 text-sm uppercase tracking-[0.3em] text-teal-300/70">
            {production.category}
          </p>

          <h1 className="mt-4 max-w-5xl text-5xl font-black md:text-8xl">
            {production.title}
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-300">
            {production.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {production.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-700 bg-black/40 px-3 py-1 text-xs text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-20 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Overview
          </p>

          <h2 className="mt-4 text-4xl font-bold">Technical Contribution</h2>
        </div>

        <div className="space-y-8">
          <p className="text-lg leading-relaxed text-zinc-300">
            {production.overview}
          </p>

          <div className="grid gap-5 md:grid-cols-2">
            <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
              <h3 className="text-lg font-semibold">Responsibilities</h3>

              <ul className="mt-4 space-y-3 text-zinc-400">
                {production.responsibilities.map((responsibility) => (
                  <li key={responsibility}>✓ {responsibility}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
              <h3 className="text-lg font-semibold">Tools Used</h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {production.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-400"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      <section
        id="section-index"
        className="border-y border-zinc-900 bg-zinc-950/50 px-6 py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                Project Sections
              </p>

              <h2 className="mt-4 text-4xl font-bold">
                Explore the breakdown
              </h2>
            </div>

            {production.sections.length > 0 && (
              <a
                href={`#${production.sections[0].slug}`}
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-105 hover:bg-zinc-200"
              >
                Start Review
              </a>
            )}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {production.sections.map((section, index) => (
              <a
                key={section.slug}
                href={`#${section.slug}`}
                className="group rounded-3xl border border-zinc-800 bg-black p-6 transition hover:-translate-y-1 hover:border-teal-300/70"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
                  Section {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-4 text-xl font-bold group-hover:text-teal-200">
                  {section.title}
                </h3>

                <p className="mt-2 text-sm text-teal-300/70">{section.label}</p>

                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  {section.description}
                </p>

                <p className="mt-6 text-sm font-medium text-white">
                  View Section →
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-20 px-6 py-24">
        {production.sections.map((section, index) => {
          const previousSection = production.sections[index - 1];
          const nextSection = production.sections[index + 1];

          return (
            <article
              id={section.slug}
              key={section.slug}
              className="scroll-mt-24 rounded-[2rem] border border-zinc-800 bg-zinc-950/80 p-6 md:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
                  Section {String(index + 1).padStart(2, "0")}
                </p>

                <a
                  href="#section-index"
                  className="text-sm text-zinc-500 hover:text-white"
                >
                  ↑ Back to Section Index
                </a>
              </div>

              <div className="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
                <div>
                  <p className="text-sm text-teal-300/70">{section.label}</p>

                  <h3 className="mt-3 text-4xl font-bold">{section.title}</h3>

                  <p className="mt-5 leading-relaxed text-zinc-400">
                    {section.description}
                  </p>

                  <MediaRenderer
                    title={section.title}
                    youtube={getYoutubeUrl(section)}
                  />
                </div>

                <LoopPreview src={getSectionLoop(section)} title={section.title} />
              </div>

              <nav className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-800 pt-6">
                {previousSection ? (
                  <a
                    href={`#${previousSection.slug}`}
                    className="rounded-full border border-zinc-800 px-5 py-3 text-sm text-zinc-400 transition hover:border-zinc-500 hover:text-white"
                  >
                    ← Previous: {previousSection.title}
                  </a>
                ) : (
                  <span />
                )}

                {nextSection ? (
                  <a
                    href={`#${nextSection.slug}`}
                    className="rounded-full border border-zinc-800 px-5 py-3 text-sm text-zinc-400 transition hover:border-zinc-500 hover:text-white"
                  >
                    Next: {nextSection.title} →
                  </a>
                ) : (
                  <a
                    href="#section-index"
                    className="rounded-full border border-zinc-800 px-5 py-3 text-sm text-zinc-400 transition hover:border-zinc-500 hover:text-white"
                  >
                    ↑ Back to Section Index
                  </a>
                )}
              </nav>
            </article>
          );
        })}
      </section>

      {production.glb && (
        <section className="border-t border-zinc-900 px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-3xl border border-dashed border-zinc-800 p-8 text-sm text-zinc-600">
              GLB viewer placeholder ready: {production.glb}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
