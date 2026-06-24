type Props = {
  embedUrl: string;
  title: string;
};

export default function InstagramEmbed({ embedUrl, title }: Props) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[var(--mg-border)] bg-white shadow-[var(--mg-shadow)]">
      <div className="border-b border-[var(--mg-border)] px-5 py-4">
        <div className="text-sm font-extrabold text-[var(--mg-brown)]">{title}</div>
      </div>
      <div className="bg-[linear-gradient(180deg,#fffef8,#fff4cf)] p-3">
        <iframe
          src={embedUrl}
          title={title}
          className="min-h-[560px] w-full rounded-[20px] bg-white"
          loading="lazy"
          allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
      </div>
    </div>
  );
}
