import Link from "next/link";

import { LoopPreview } from "@/components/home/LoopPreview";
import { Navbar } from "@/components/navigation/Navbar";
import {
  FolderTreePreview,
  GlbViewerPlaceholder,
  PackageDescriptionPreview,
} from "@/components/pipeline";
import { servicePages, services } from "@/data/projects";
import { profile } from "@/data/profile";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

type ServiceSection = {
  title: string;
  label: string;
  description: string;
  mediaLoop: string;
  points?: string[];
};

function getServiceNavigation(slug: string) {
  const currentIndex = services.findIndex((item) => item.slug === slug);
  const previousService = currentIndex > 0 ? services[currentIndex - 1] : null;
  const nextService =
    currentIndex >= 0 && currentIndex < services.length - 1
      ? services[currentIndex + 1]
      : null;

  return {
    previousHref: previousService ? previousService.href : "/#services",
    previousLabel: previousService ? previousService.shortTitle : "Back to Services",
    nextHref: nextService ? nextService.href : "/#services",
    nextLabel: nextService ? nextService.shortTitle : "Back to Services",
  };
}

function ServiceSideNavigation({
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
        aria-label={`Previous service: ${previousLabel}`}
        title={previousLabel}
        className="fixed left-4 top-1/2 z-40 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-2xl text-white backdrop-blur-xl transition hover:border-[#45C7C5] hover:bg-[#45C7C5] hover:text-black xl:flex"
      >
        ←
      </Link>

      <Link
        href={nextHref}
        aria-label={`Next service: ${nextLabel}`}
        title={nextLabel}
        className="fixed right-4 top-1/2 z-40 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-2xl text-white backdrop-blur-xl transition hover:border-[#45C7C5] hover:bg-[#45C7C5] hover:text-black xl:flex"
      >
        →
      </Link>

      <nav className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 gap-3 rounded-full border border-white/10 bg-black/70 px-3 py-2 backdrop-blur-xl xl:hidden">
        <Link
          href={previousHref}
          title={previousLabel}
          className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-300 transition hover:border-[#45C7C5] hover:text-[#45C7C5]"
        >
          Prev
        </Link>

        <Link
          href={nextHref}
          title={nextLabel}
          className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-300 transition hover:border-[#45C7C5] hover:text-[#45C7C5]"
        >
          Next
        </Link>
      </nav>
    </>
  );
}

function ServiceContentSection({
  section,
  index,
}: {
  section: ServiceSection;
  index: number;
}) {
  const textFirst = index % 2 === 1;

  return (
    <article className="border-b border-zinc-900 px-6 py-24">
      <div
        className={`mx-auto grid max-w-[92rem] gap-10 lg:items-center ${
          textFirst
            ? "lg:grid-cols-[0.68fr_1.32fr]"
            : "lg:grid-cols-[1.32fr_0.68fr]"
        }`}
      >
        <div className={textFirst ? "lg:order-2" : ""}>
          <LoopPreview
            src={section.mediaLoop}
            title={section.title}
            className="rounded-[2rem] [&_video]:aspect-video [&_video]:object-cover"
          />
        </div>

        <div className={textFirst ? "lg:order-1" : ""}>
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#45C7C5]">
            {section.label}
          </p>

          <h2 className="mt-5 text-3xl font-black leading-none tracking-[-0.04em] md:text-5xl">
            {section.title}
          </h2>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
            {section.description}
          </p>

          {section.points && section.points.length > 0 && (
            <ul className="mt-7 space-y-3 text-sm text-zinc-300 md:text-base">
              {section.points.map((point) => (
                <li key={point} className="flex gap-3 leading-relaxed">
                  <span className="mt-1 text-[#45C7C5]">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}

function PipelineViewerBase() {
  return (
    <section className="border-b border-zinc-900 px-6 py-24">
      <div className="mx-auto max-w-[92rem]">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#45C7C5]">
            Pipeline Output
          </p>

          <h2 className="mt-5 text-5xl font-black leading-none tracking-[-0.06em] md:text-8xl">
            GLB Viewer
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-zinc-400">
            A compact pipeline presentation area prepared for dynamic folders,
            package description review and an interactive GLB asset viewer.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <FolderTreePreview />

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#45C7C5]">
              Dynamic Folders
            </p>

            <h3 className="mt-5 text-4xl font-black leading-none tracking-[-0.05em] md:text-6xl">
              Organized asset delivery
            </h3>

            <p className="mt-6 text-lg leading-relaxed text-zinc-400">
              Users can open the folder tree and understand how the asset
              package is organized: game-ready files, preview images and
              resource files prepared for production handoff.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#45C7C5]">
              Script Dynamic
            </p>

            <h3 className="mt-5 text-4xl font-black leading-none tracking-[-0.05em] md:text-6xl">
              Package Description
            </h3>

            <p className="mt-6 text-lg leading-relaxed text-zinc-400">
              This preview is prepared to show the package description data used
              by the pipeline to describe files, metadata, validation and
              delivery information.
            </p>
          </div>

          <PackageDescriptionPreview />
        </div>

        <div className="mt-16">
          <GlbViewerPlaceholder />
        </div>
      </div>
    </section>
  );
}

function ContactBlock() {
  return (
    <section id="contact" className="px-6 py-28 text-center">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#45C7C5]">
          Contact
        </p>

        <h2 className="mt-6 text-5xl font-black tracking-[-0.05em] md:text-7xl">
          Have a project in mind?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Open to Character TD, Pipeline TD, tools development and technical
          animation opportunities.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="mt-10 inline-block rounded-full bg-[#45C7C5] px-9 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:scale-105 hover:bg-white"
        >
          Contact Me
        </a>
      </div>
    </section>
  );
}

export default async function ServicePage(props: ServicePageProps) {
  const params = await props.params;
  const service = servicePages.find((item) => item.slug === params.slug);

  if (!service) {
    return (
      <main className="min-h-screen bg-black px-6 py-24 text-white">
        <h1 className="text-4xl font-bold">Service not found</h1>

        <Link
          href="/"
          className="mt-6 inline-block text-zinc-400 hover:text-white"
        >
          ← Back to Home
        </Link>
      </main>
    );
  }

  const navigation = getServiceNavigation(service.slug);
  const customSections =
    "customSections" in service && service.customSections
      ? service.customSections
      : [];

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <ServiceSideNavigation
        previousHref={navigation.previousHref}
        previousLabel={navigation.previousLabel}
        nextHref={navigation.nextHref}
        nextLabel={navigation.nextLabel}
      />

      <section className="px-4 pb-10 pt-32 md:px-8">
        <div className="mx-auto max-w-[118rem]">
          <div className="relative min-h-[76vh] overflow-hidden rounded-[2rem] bg-zinc-950 shadow-2xl shadow-black/50 md:min-h-[82vh]">
            <video
              className="absolute inset-0 h-full w-full object-cover opacity-95"
              src={service.heroVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />

            <div className="absolute inset-0 rounded-[2rem] ring-1 ring-white/10" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/75 to-transparent" />

            <div className="absolute bottom-8 left-8 z-10 md:bottom-12 md:left-12">
              <Link
                href="/#services"
                className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400 transition hover:text-white"
              >
                ← Back to Services
              </Link>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.45em] text-[#45C7C5]">
                {service.eyebrow}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-900 px-6 py-20 text-center">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#45C7C5]">
            Service Reel
          </p>

          <h1 className="mx-auto mt-5 max-w-5xl text-6xl font-black leading-none tracking-[-0.075em] md:text-8xl">
            {service.title}
          </h1>

          <p className="mx-auto mt-10 max-w-4xl text-lg leading-relaxed text-zinc-300 md:text-2xl">
            {service.description}
          </p>

          <div className="mx-auto mt-8 grid max-w-5xl gap-3 text-left sm:grid-cols-2">
            {service.pillars.map((pillar) => (
              <div
                key={pillar}
                className="rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4"
              >
                <p className="text-sm font-semibold leading-relaxed text-white">
                  ✓ {pillar}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {customSections.map((section, index) => (
        <ServiceContentSection
          key={section.title}
          section={section}
          index={index}
        />
      ))}

      {service.slug === "pipeline-tools" && <PipelineViewerBase />}

      <ContactBlock />
    </main>
  );
}
