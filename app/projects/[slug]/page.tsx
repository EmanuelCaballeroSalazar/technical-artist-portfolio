import Link from "next/link";

import { LoopPreview } from "@/components/home/LoopPreview";
import { Navbar } from "@/components/navigation/Navbar";
import { MediaRenderer } from "@/components/projects/MediaRenderer";
import { productionProjects, projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

type CaseStudyVideo = {
  title: string;
  description: string;
  youtube?: string;
};

type CaseStudyWithVideos = {
  videos: CaseStudyVideo[];
};


export function generateStaticParams() {
  const slugs = new Set([
    ...productionProjects.map((production) => production.slug),
    ...projects.map((project) => project.slug),
  ]);

  return Array.from(slugs).map((slug) => ({ slug }));
}

export const dynamicParams = false;

function getProductionServiceHref(slug: string) {
  const characterRiggingProjects = new Set([
    "vorkarn-creature-rig",
    "nyan-heroes",
    "unga-land",
    "dungeon-of-undernest",
    "sarah-rig",
    "terror-impostor-rig",
    "berta-rig",
  ]);

  if (characterRiggingProjects.has(slug)) {
    return "/services/character-td-rigging";
  }

  return "/#services";
}

function getProductionNavigation(slug: string) {
  const currentIndex = productionProjects.findIndex((item) => item.slug === slug);
  const previousProject = currentIndex > 0 ? productionProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex >= 0 && currentIndex < productionProjects.length - 1
      ? productionProjects[currentIndex + 1]
      : null;

  return {
    previousHref: previousProject
      ? `/projects/${previousProject.slug}`
      : getProductionServiceHref(slug),
    previousLabel: previousProject ? previousProject.title : "Back to Service",
    nextHref: nextProject
      ? `/projects/${nextProject.slug}`
      : getProductionServiceHref(slug),
    nextLabel: nextProject ? nextProject.title : "Back to Service",
  };
}

function ProjectSideNavigation({
  previousHref,
  previousLabel,
  nextHref,
  nextLabel,
}: {
  previousHref: string;
  previousLabel: string;
  nextHref: string;
  nextLabel: string;
}) {
  return (
    <>
      <Link
        href={previousHref}
        aria-label={`Previous project: ${previousLabel}`}
        title={previousLabel}
        className="fixed left-4 top-1/2 z-40 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-2xl text-white backdrop-blur-xl transition hover:border-[#FF4D5A] hover:bg-[#FF4D5A] hover:text-black xl:flex"
      >
        ←
      </Link>

      <Link
        href={nextHref}
        aria-label={`Next project: ${nextLabel}`}
        title={nextLabel}
        className="fixed right-4 top-1/2 z-40 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-2xl text-white backdrop-blur-xl transition hover:border-[#FF4D5A] hover:bg-[#FF4D5A] hover:text-black xl:flex"
      >
        →
      </Link>

      <nav className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 gap-3 rounded-full border border-white/10 bg-black/70 px-3 py-2 backdrop-blur-xl xl:hidden">
        <Link
          href={previousHref}
          className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-300 transition hover:border-[#FF4D5A] hover:text-[#FF4D5A]"
        >
          Prev
        </Link>

        <Link
          href={nextHref}
          className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-300 transition hover:border-[#FF4D5A] hover:text-[#FF4D5A]"
        >
          Next
        </Link>
      </nav>
    </>
  );
}

export default async function ProjectPage(props: ProjectPageProps) {
  const params = await props.params;
  const production = productionProjects.find((item) => item.slug === params.slug);
  const project = projects.find((item) => item.slug === params.slug);

  if (production) {
    const projectNavigation = getProductionNavigation(production.slug);
    const visibleSections =
      production.slug === "vorkarn-creature-rig"
        ? production.sections.filter(
            (section) => section.slug !== "final-animation-rig",
          )
        : production.sections;
    const hasCharacters =
      "characters" in production && Boolean(production.characters?.length);

    if (hasCharacters && "characters" in production && production.characters) {
      return (
        <main className="min-h-screen bg-black text-white">
          <Navbar />

          <ProjectSideNavigation
            previousHref={projectNavigation.previousHref}
            previousLabel={projectNavigation.previousLabel}
            nextHref={projectNavigation.nextHref}
            nextLabel={projectNavigation.nextLabel}
          />

          <section className="relative min-h-screen overflow-hidden border-b border-zinc-900">
            <video
              className="absolute inset-0 h-full w-full object-cover opacity-55"
              src={production.heroVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70" />

            <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-end px-6 pb-20 pt-28">
              <div className="max-w-5xl">
                <Link href="/" className="text-sm text-zinc-500 hover:text-white">
                  ← Back to Home
                </Link>

                <p className="mt-16 text-sm uppercase tracking-[0.35em] text-[#FF4D5A]">
                  {production.category}
                </p>

                <h1 className="mt-5 max-w-5xl text-6xl font-black leading-none tracking-tight md:text-8xl">
                  {production.title}
                </h1>

                <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-300 md:text-xl">
                  {production.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {production.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs text-zinc-300 backdrop-blur"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href="#characters"
                    className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-105 hover:bg-zinc-200"
                  >
                    View Characters
                  </a>

                  <a
                    href="#production-context"
                    className="rounded-full border border-zinc-600 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
                  >
                    Production Context
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section
            id="production-context"
            className="border-b border-zinc-900 px-6 py-24"
          >
            <div className="mx-auto max-w-7xl">
              <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[#FF4D5A]/70">
                    Production Preview
                  </p>

                  <h2 className="mt-4 max-w-4xl text-4xl font-black leading-none tracking-tight md:text-6xl">
                    Gameplay context before the rig breakdowns.
                  </h2>
                </div>

                <p className="max-w-xl text-sm leading-relaxed text-zinc-500">
                  A short gameplay loop gives recruiters immediate production
                  context before they choose one of the selected character rig
                  case studies.
                </p>
              </div>

              <LoopPreview
                src={production.mediaLoop}
                title={`${production.title} Gameplay Preview`}
                className="rounded-[2rem]"
              />
            </div>
          </section>

          <section id="characters" className="px-6 py-24">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                    Character Breakdowns
                  </p>

                  <h2 className="mt-4 text-4xl font-bold md:text-6xl">
                    Choose a character
                  </h2>
                </div>

                <p className="max-w-xl text-sm leading-relaxed text-zinc-500">
                  Each selected character opens as its own page with rig
                  overview, guide, joints, controls, geometry, animation tests
                  and technical notes.
                </p>
              </div>

              <div className="mt-12 grid gap-6 lg:grid-cols-2">
                {production.characters.map((character, index) => (
                  <Link
                    key={character.slug}
                    href={`/projects/${production.slug}/${character.slug}`}
                    className="group grid overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 transition hover:-translate-y-1 hover:border-[#FF4D5A]/70 md:grid-cols-[0.9fr_1.1fr]"
                  >
                    <div className="p-6 md:p-8">
                      <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
                        Character {String(index + 1).padStart(2, "0")}
                      </p>

                      <h3 className="mt-4 text-3xl font-black group-hover:text-[#67D7D5]">
                        {character.title}
                      </h3>

                      <p className="mt-2 text-sm text-[#FF4D5A]/70">
                        {character.category}
                      </p>

                      <p className="mt-5 text-sm leading-relaxed text-zinc-400">
                        {character.description}
                      </p>

                      <p className="mt-8 text-sm font-semibold text-white">
                        Open Character Page →
                      </p>
                    </div>

                    <video
                      className="h-full min-h-64 w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                      src={character.previewVideo || character.mediaLoop}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>
      );
    }

    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <ProjectSideNavigation
          previousHref={projectNavigation.previousHref}
          previousLabel={projectNavigation.previousLabel}
          nextHref={projectNavigation.nextHref}
          nextLabel={projectNavigation.nextLabel}
        />

        <section className="relative overflow-hidden border-b border-zinc-900 px-6 py-24">
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-25"
            src={production.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/45" />

          <div className="relative z-10 mx-auto max-w-7xl">
            <Link href="/" className="text-sm text-zinc-500 hover:text-white">
              ← Back to Home
            </Link>

            <p className="mt-16 text-sm uppercase tracking-[0.3em] text-[#FF4D5A]/70">
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

        <section className="mx-auto max-w-7xl px-6 py-24">
          <LoopPreview
            src={production.mediaLoop}
            title={production.title}
            className="rounded-[2rem]"
          />

          <div className="mx-auto mt-16 max-w-5xl">
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
              Overview
            </p>

            <h2 className="mt-4 text-5xl font-black md:text-6xl">
              Technical Contribution
            </h2>

            <p className="mt-6 leading-relaxed text-zinc-400">
              {production.overview}
            </p>

            <section className="mt-8 rounded-2xl border border-zinc-800 bg-black/40 p-6">
              <h3 className="text-lg font-semibold">Responsibilities</h3>

              <ul className="mt-4 space-y-3 text-zinc-400">
                {production.responsibilities.map((responsibility) => (
                  <li key={responsibility}>✓ {responsibility}</li>
                ))}
              </ul>
            </section>

            <section className="mt-6 rounded-2xl border border-zinc-800 bg-black/40 p-6">
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
        </section>

        {visibleSections.length > 0 && (
          <section className="mx-auto max-w-7xl space-y-24 px-6 py-24">
            {visibleSections.map((section) => (
              <article
                id={section.slug}
                key={section.slug}
                className="scroll-mt-24 rounded-[2rem] border border-zinc-800 bg-zinc-950/80 p-6 md:p-8"
              >
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-[#FF4D5A]/70">
                    {section.label}
                  </p>

                  <h3 className="mt-4 text-5xl font-black tracking-[-0.04em] md:text-7xl">
                    {section.title}
                  </h3>

                  <p className="mb-10 mt-5 max-w-3xl leading-relaxed text-zinc-400">
                    {section.description}
                  </p>

                  <LoopPreview
                    src={section.mediaLoop}
                    title={section.title}
                    className="rounded-[2rem]"
                  />
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-black px-6 py-24 text-white">
        <h1 className="text-4xl font-bold">Project not found</h1>

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

      <section className="relative overflow-hidden border-b border-zinc-900 px-6 py-24">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          src={project.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/45" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <Link href="/" className="text-sm text-zinc-500 hover:text-white">
            ← Back to Home
          </Link>

          <p className="mt-16 text-sm uppercase tracking-[0.3em] text-[#FF4D5A]/70">
            {project.category}
          </p>

          <h1 className="mt-4 max-w-5xl text-5xl font-black md:text-8xl">
            {project.title}
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-300">
            {project.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
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

      <section id="case-index" className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
              Case Study Index
            </p>

            <h2 className="mt-4 text-4xl font-bold">Choose a project</h2>
          </div>

          {project.items.length > 0 && (
            <a
              href={`#${project.items[0].slug}`}
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-105 hover:bg-zinc-200"
            >
              Start Guided Review
            </a>
          )}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {project.items.map((caseStudy, index) => {
            const caseStudyHref =
              "target" in caseStudy ? caseStudy.target : `#${caseStudy.slug}`;
            const caseStudyCta =
              "target" in caseStudy ? "Open Project Page →" : "View Case Study →";

            if (caseStudyHref.startsWith("#")) {
              return (
                <a
                  key={caseStudy.slug}
                  href={caseStudyHref}
                  className="group rounded-3xl border border-zinc-800 bg-zinc-950 p-6 transition hover:-translate-y-1 hover:border-[#FF4D5A]/70"
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
                    Case Study {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="mt-4 text-xl font-bold group-hover:text-[#67D7D5]">
                    {caseStudy.title}
                  </h3>

                  <p className="mt-2 text-sm text-[#FF4D5A]/70">
                    {caseStudy.label}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                    {caseStudy.description}
                  </p>

                  <p className="mt-6 text-sm font-medium text-white">
                    {caseStudyCta}
                  </p>
                </a>
              );
            }

            return (
              <Link
                key={caseStudy.slug}
                href={caseStudyHref}
                className="group rounded-3xl border border-zinc-800 bg-zinc-950 p-6 transition hover:-translate-y-1 hover:border-[#FF4D5A]/70"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
                  Case Study {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-4 text-xl font-bold group-hover:text-[#67D7D5]">
                  {caseStudy.title}
                </h3>

                <p className="mt-2 text-sm text-[#FF4D5A]/70">
                  {caseStudy.label}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  {caseStudy.description}
                </p>

                <p className="mt-6 text-sm font-medium text-white">
                  {caseStudyCta}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-20 px-6 pb-24">
        {project.items.map((caseStudy) => {
          const videos = caseStudy.videos as CaseStudyWithVideos["videos"];

          return (
            <article
              id={caseStudy.slug}
              key={caseStudy.slug}
              className="scroll-mt-24 rounded-[2rem] border border-zinc-800 bg-zinc-950/80 p-6 md:p-8"
            >
              <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
                <div>
                  <p className="text-sm text-[#FF4D5A]/70">{caseStudy.label}</p>
                  <h3 className="mt-3 text-4xl font-bold">{caseStudy.title}</h3>
                  <p className="mt-5 leading-relaxed text-zinc-400">
                    {caseStudy.overview}
                  </p>

                  <section className="mt-8 rounded-2xl border border-zinc-800 bg-black/40 p-6">
                    <h4 className="text-lg font-semibold">Responsibilities</h4>

                    <ul className="mt-4 space-y-3 text-zinc-400">
                      {caseStudy.responsibilities.map((responsibility) => (
                        <li key={responsibility}>✓ {responsibility}</li>
                      ))}
                    </ul>
                  </section>
                </div>

                <LoopPreview src={caseStudy.mediaLoop} title={caseStudy.title} />
              </div>

              {videos.length > 0 && (
                <section className="mt-10">
                  <h4 className="text-xl font-semibold">Videos & Media</h4>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {videos.map((video) => (
                      <article
                        key={video.title}
                        className="rounded-2xl border border-zinc-800 bg-black/50 p-5"
                      >
                        <h5 className="text-lg font-semibold">{video.title}</h5>

                        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                          {video.description}
                        </p>

                        <MediaRenderer
                          title={video.title}
                          youtube={video.youtube}
                        />
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </article>
          );
        })}
      </section>
    </main>
  );
}
