export function Mark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Arch */}
      <path d="M8 72V34C8 19.6 18.7 8 32 8s24 11.6 24 26v38" />
      <path d="M8 72h48" />
      {/* Skyline */}
      <path d="M20 72V42l6-4v34" />
      <path d="M26 72V30l6-6v48" />
      <path d="M32 24l6 6v42" />
      <path d="M38 72V38l6 4v30" />
      <path d="M14 72V52l6 4" />
      <path d="M50 72V52l-6 4" />
      {/* Keyline */}
      <path d="M32 24V14" />
      <circle cx="32" cy="60" r="4" />
      <path d="M32 56v8M28 60h8" />
    </svg>
  );
}

export function Wordmark({
  size = "md",
  tagline = true,
}: {
  size?: "sm" | "md" | "lg";
  tagline?: boolean;
}) {
  const s = {
    sm: { name: "text-[1.05rem] tracking-[0.22em]", tag: "text-[0.52rem] tracking-[0.3em]" },
    md: { name: "text-[1.3rem] tracking-[0.24em]", tag: "text-[0.58rem] tracking-[0.34em]" },
    lg: { name: "text-[2rem] tracking-[0.26em]", tag: "text-[0.7rem] tracking-[0.38em]" },
  }[size];
  return (
    <div className="leading-none">
      <div className={`font-display font-medium uppercase text-ivory ${s.name}`}>
        Thomson <span className="text-accent">&amp;</span> Calabria
      </div>
      {tagline && (
        <div className={`mt-1.5 uppercase text-mist-2 ${s.tag}`}>
          International Realty <span className="text-accent/80">/</span> Consultancy
        </div>
      )}
    </div>
  );
}
