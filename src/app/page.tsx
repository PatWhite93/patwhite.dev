import Link from "next/link";

const skills = [
  "React",
  "TypeScript",
  "Node.js",
  "C#",
  "AWS",
  "Terraform",
  "Docker",
  "LLM Orchestration",
  "AI Automation",
  "CI/CD",
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      {/* Hero */}
      <section className="mb-20">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">
          Hey, I&apos;m{" "}
          <span className="text-[var(--color-accent)]">Pat White</span>.
        </h1>
        <p className="text-xl text-[var(--color-muted)] max-w-2xl mb-4 leading-relaxed">
          Full-stack engineer who ships fast by working with AI, not against it.
          5 years building production web apps. Now focused on AI-augmented
          development workflows and building tools that multiply engineering
          output.
        </p>
        <p className="text-lg text-[var(--color-muted)] max-w-2xl leading-relaxed">
          I build things, break things, automate the boring parts, and
          occasionally write about it.
        </p>
        <div className="flex gap-4 mt-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent)] text-white rounded-lg font-medium text-sm hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            See my work
          </Link>
          <a
            href="https://www.linkedin.com/in/patwhite93/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--color-card-border)] rounded-lg font-medium text-sm hover:border-[var(--color-muted)] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/PatWhite93/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--color-card-border)] rounded-lg font-medium text-sm hover:border-[var(--color-muted)] transition-colors"
          >
            GitHub
          </a>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-20">
        <h2 className="text-sm font-medium uppercase tracking-widest text-[var(--color-muted)] mb-4">
          What I work with
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 text-sm rounded-full border border-[var(--color-card-border)] text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:border-[var(--color-accent)] transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* What I'm about */}
      <section className="mb-20">
        <h2 className="text-sm font-medium uppercase tracking-widest text-[var(--color-muted)] mb-6">
          What I do
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: "AI-Augmented Development",
              desc: "I use LLMs as thinking partners to ship production features in hours, not days. It's not about generating code \u2014 it's about asking the right questions faster.",
            },
            {
              title: "Full-Stack Engineering",
              desc: "React/TypeScript frontends, Node.js and C# backends, AWS infrastructure. I've built everything from enterprise platforms to real-time multiplayer games.",
            },
            {
              title: "Internal Tooling & Automation",
              desc: "I see repetitive processes as bugs. I build tools that automate workflows, clean up data at scale, and eliminate manual overhead.",
            },
            {
              title: "Infrastructure & DevOps",
              desc: "Terraform, CI/CD pipelines, Docker. I debug the issues nobody else catches and optimize the systems everyone else ignores.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card)]"
            >
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12 border-t border-[var(--color-card-border)]">
        <h2 className="text-2xl font-bold mb-3">
          Interested in working together?
        </h2>
        <p className="text-[var(--color-muted)] mb-6">
          I&apos;m exploring senior engineering and AI platform roles.
        </p>
        <a
          href="mailto:pmw1988@gmail.com"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white rounded-lg font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          Get in touch
        </a>
      </section>
    </div>
  );
}
