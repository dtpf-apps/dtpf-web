/** The label, heading and one-line intro that open a content section; the content after it sets its own top margin. */
export default function SectionHeader({
  label,
  heading,
  desc,
  headingId,
}: {
  label: string;
  heading: string;
  desc: string;
  /** For a section that names itself with `aria-labelledby`. */
  headingId?: string;
}) {
  return (
    <>
      <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[2px] text-accent">{label}</p>
      <h2 id={headingId} className="mb-2 font-heading text-[32px] font-bold tracking-tight">
        {heading}
      </h2>
      <p className="max-w-[520px] text-base text-text-secondary">{desc}</p>
    </>
  );
}
