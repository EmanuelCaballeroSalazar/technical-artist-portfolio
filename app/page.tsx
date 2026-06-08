import { Navbar } from "@/components/navigation/Navbar";
import { experience, services } from "@/data/projects";
import { socials } from "@/data/socials";

const heroVideo = "/videos/hero/portfolio-overview-loop.mp4";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section id="reel" className="px-4 pb-12 pt-24 md:px-8 md:pb-16 md:pt-32">
        <div className="mx-auto max-w-[118rem]">
          <div className="relative h-[52vh] overflow-hidden rounded-[1.5rem] bg-zinc-950 shadow-2xl shadow-black/50 sm:h-[62vh] md:min-h-[84vh] md:rounded-[2rem]">
            <video
              className="absolute inset-0 h-full w-full object-cover opacity-95"
              src={heroVideo}
              autoPlay
              muted
              loop
              playsInline
            />

            <div className="absolute inset-0 rounded-[2rem] ring-1 ring-white/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/24 via-transparent to-black/5" />
          </div>
        </div>
      </section>

      <section className="brand-hero-panel border-b border-zinc-900 px-5 pb-20 pt-6 md:px-6 md:pb-28 md:pt-8">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="brand-gradient-text brand-heading-glow text-[4.6rem] font-black uppercase leading-[0.8] tracking-[-0.09em] sm:text-[5.8rem] md:text-[10rem] lg:text-[13rem]">
            Emanuel
          </h1>

          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xl font-black uppercase tracking-[-0.04em] text-zinc-100 md:gap-x-12 md:text-4xl">
            <span>Character TD</span>
            <span className="brand-accent-text">Pipeline TD</span>
            <span>Technical Animator</span>
          </div>

          <p className="mx-auto mt-8 max-w-5xl text-xl font-medium leading-tight text-zinc-300 md:text-5xl">
            Production-ready <span className="brand-keyword">rigging</span>, <span className="brand-keyword">technical animation</span> and <span className="brand-keyword">pipeline development</span>
            for games, animation and real-time workflows.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5 text-sm font-bold text-zinc-500">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="uppercase tracking-[0.2em] transition hover:text-[#FF4D5A]"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="border-b border-zinc-900 px-5 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-[96rem]">
          <div className="text-center">
            <p className="brand-section-label text-sm font-bold">
              Choose a Discipline
            </p>

            <h2 className="brand-gradient-text brand-heading-glow mt-5 text-5xl font-black tracking-[-0.065em] md:text-9xl">
              Services
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-zinc-400">
              Go straight into the area you want to review. Each discipline opens
              as its own focused page with large videos, short descriptions and
              the most relevant projects.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-3 md:gap-7">
            {services.map((service, index) => (
              <a
                key={service.title}
                href={service.href}
                className="group relative min-h-[25rem] overflow-hidden rounded-[1.5rem] border border-zinc-800 bg-zinc-950 p-6 transition hover:-translate-y-1 hover:border-[#FF4D5A]/70 hover:shadow-2xl hover:shadow-[#FF4D5A]/10 md:min-h-[34rem] md:rounded-[2rem] md:p-8"
              >
                <video
                  className="absolute inset-0 h-full w-full object-cover opacity-24 transition duration-500 group-hover:scale-105 group-hover:opacity-42"
                  src={service.mediaLoop}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />

                <div className="relative z-10 flex h-full flex-col justify-end">
                  <p className="text-sm text-zinc-400">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="mt-4 whitespace-pre-line text-4xl font-black leading-none tracking-[-0.06em] md:text-5xl">
                    {service.title}
                  </h3>

                  <p className="mt-5 text-sm leading-relaxed text-zinc-300">
                    {service.description}
                  </p>

                  <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-[#FF6B76]">
                    Open Discipline →
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="border-b border-zinc-900 px-5 py-20 md:px-6 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="brand-section-label text-sm font-bold">
              Technical Art Solutions
            </p>

            <h2 className="brand-gradient-text brand-heading-glow mt-4 text-5xl font-black tracking-[-0.05em] md:text-7xl">
              What I Offer
            </h2>
          </div>

          <div className="space-y-7 text-lg leading-relaxed text-zinc-300">
            <p>
              I support teams with production-ready character rigs, technical
              animation workflows and pipeline tools designed to move assets
              faster through production.
            </p>

            <p>
              My work focuses on clean deformation, animator-friendly controls,
              validation systems, batch workflows and real-time technical
              solutions that connect art, animation and engineering.
            </p>

            <p>
              I can integrate into an existing production team as Character TD,
              Pipeline TD or Technical Animator, helping reduce manual work,
              improve consistency and deliver game-ready results with a clear
              technical structure.
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="brand-card-glow rounded-[1.5rem] border border-zinc-800 bg-zinc-950 p-5 transition hover:border-[#FF4D5A]/60">
                <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
                  01
                </p>
                <p className="mt-3 text-xl font-black text-white transition group-hover:text-[#FF9AA2]">
                  Pipeline Setup & Tooling
                </p>
              </div>

              <div className="brand-card-glow rounded-[1.5rem] border border-zinc-800 bg-zinc-950 p-5 transition hover:border-[#FF4D5A]/60">
                <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
                  02
                </p>
                <p className="mt-3 text-xl font-black text-white transition group-hover:text-[#FF9AA2]">
                  Character Rigging & Skinning
                </p>
              </div>

              <div className="brand-card-glow rounded-[1.5rem] border border-zinc-800 bg-zinc-950 p-5 transition hover:border-[#FF4D5A]/60">
                <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
                  03
                </p>
                <p className="mt-3 text-xl font-black text-white transition group-hover:text-[#FF9AA2]">
                  Technical Animation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="border-t border-zinc-900 px-5 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="brand-section-label text-sm font-bold">
            Experience
          </p>

          <h2 className="brand-gradient-text brand-heading-glow mt-4 text-5xl font-black tracking-[-0.05em] md:text-7xl">
            Production background
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {experience.map((job) => (
              <article
                key={`${job.studio}-${job.period}`}
                className="brand-card-glow rounded-3xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-[#FF4D5A]/50"
              >
                <p className="text-sm text-zinc-500">{job.period}</p>
                <h3 className="mt-3 text-2xl font-bold">{job.studio}</h3>
                <p className="mt-2 text-[#FF4D5A]">{job.role}</p>
                <p className="mt-4 leading-relaxed text-zinc-400">
                  {job.summary}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
