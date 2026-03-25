export const metadata = {
  title: "Videos — Pat White",
  description: "Screen recordings, build demos, and dev workflow walkthroughs.",
};

// Add your videos here. Each entry becomes a card on the page.
// For YouTube: use the embed URL format https://www.youtube.com/embed/VIDEO_ID
const videos: {
  title: string;
  description: string;
  embedUrl?: string;
  directUrl?: string;
  date: string;
  tags: string[];
}[] = [
  // Example (uncomment and fill in when you have your first video):
  // {
  //   title: "Building a RAG System in One Evening",
  //   description: "Screen recording of building a retrieval-augmented generation app from scratch with AI-assisted development.",
  //   embedUrl: "https://www.youtube.com/embed/xxxxx",
  //   date: "2026-04-01",
  //   tags: ["AI", "RAG", "Build Demo"],
  // },
];

export default function VideosPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Videos</h1>
      <p className="text-[var(--color-muted)] mb-12">
        Build demos, workflow recordings, and technical walkthroughs.
      </p>

      {videos.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-[var(--color-card-border)] rounded-xl">
          <p className="text-[var(--color-muted)] text-lg mb-2">
            Videos coming soon.
          </p>
          <p className="text-[var(--color-muted)] text-sm">
            Screen recordings and build demos on the way.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {videos.map((video, i) => (
            <div
              key={i}
              className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card)] overflow-hidden"
            >
              {video.embedUrl && (
                <div className="aspect-video">
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              )}
              <div className="p-5">
                <h2 className="font-semibold mb-1">{video.title}</h2>
                <p className="text-sm text-[var(--color-muted)] mb-3 leading-relaxed">
                  {video.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {video.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-full border border-[var(--color-card-border)] text-[var(--color-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-[var(--color-muted)]">
                    {video.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
