import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { blogPosts, getBlogPost } from "@/lib/blog";
import { buildWhatsappUrl, site } from "@/lib/site";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) return { title: "Post não encontrado" };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      images: [
        {
          url: post.featuredImage,
          width: 765,
          height: 1024,
          alt: post.title,
        },
      ],
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogPost(params.slug);
  if (!post) {
    return (
      <div className="flex-1 bg-[linear-gradient(180deg,#fffaf0,#ffffff)]">
        <div className="mx-auto w-full max-w-3xl px-5 py-14">
          <Link
            href="/blog"
            className="text-sm font-semibold text-[var(--mg-brown)] hover:underline"
          >
            Voltar para o blog
          </Link>
          <h1 className="mt-4 text-2xl font-extrabold text-[var(--mg-brown)]">
            Post não encontrado
          </h1>
        </div>
      </div>
    );
  }

  const ctaMessage = `Olá! Vi o post "${post.title}" no blog da ${site.name} e quero orçamento para meu evento em Campinas/RMC.`;

  return (
    <div className="flex-1 bg-[radial-gradient(900px_420px_at_15%_0%,var(--mg-cream),transparent_70%),linear-gradient(180deg,#fffaf0,#ffffff)]">
      <header className="mx-auto w-full max-w-5xl px-5 py-10 2xl:max-w-6xl">
        <Link
          href="/blog"
          className="text-sm font-semibold text-[var(--mg-brown)] hover:underline"
        >
          Voltar para o blog
        </Link>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-[rgba(229,58,134,0.10)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--mg-brown)]">
            {post.category === "me-gusta"
              ? "Me Gusta"
              : post.category === "guide"
                ? "Guia"
                : "Tendência"}
          </span>
          {post.isAutomated ? (
            <span className="rounded-full bg-[rgba(78,197,106,0.16)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--mg-brown)]">
              Atualizado por RSS
            </span>
          ) : null}
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--mg-brown)] md:text-4xl">
          {post.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-[color:rgba(31,20,15,0.72)]">
          <span>{new Date(post.date).toLocaleDateString("pt-BR")}</span>
          <span aria-hidden="true">•</span>
          <span>Campinas e Região</span>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-5xl gap-6 px-5 pb-14 lg:grid-cols-[minmax(0,1fr)_320px] 2xl:max-w-6xl">
        <article className="rounded-2xl border border-[var(--mg-border)] bg-white p-6 shadow-[var(--mg-shadow)] md:p-9">
          <div className="overflow-hidden rounded-[24px] border border-[var(--mg-border)]">
            <Image
              src={post.featuredImage}
              alt={post.title}
              width={1024}
              height={1024}
              className="h-auto w-full object-cover"
            />
          </div>

          <p className="mt-6 text-[color:rgba(31,20,15,0.78)]">{post.description}</p>

          <div className="mt-8 space-y-4">
            {post.content.map((block, idx) => {
              if (block.type === "h2") {
                return (
                  <h2
                    key={idx}
                    className="mt-8 text-xl font-extrabold tracking-tight text-[var(--mg-brown)]"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "ul") {
                return (
                  <ul key={idx} className="list-disc space-y-2 pl-5">
                    {(block.items ?? []).map((i) => (
                      <li key={i} className="text-[color:rgba(31,20,15,0.78)]">
                        {i}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="text-[color:rgba(31,20,15,0.78)]">
                  {block.text}
                </p>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl bg-[linear-gradient(135deg,var(--mg-cream-2),#ffffff)] p-5">
            <div className="text-base font-extrabold text-[var(--mg-brown)]">
              Quer transformar seu evento em experiência?
            </div>
            <div className="mt-2 text-sm text-[color:rgba(31,20,15,0.78)]">
              Aluguel de máquina de sorvete americano com operador uniformizado em Campinas
              e região. Sorvete à vontade por 4 horas.
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={buildWhatsappUrl(ctaMessage)}
                className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--mg-pink)] px-6 text-sm font-extrabold text-white shadow-[0_12px_30px_rgba(229,58,134,0.32)]"
              >
                Orçamento no WhatsApp
              </a>
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--mg-border)] bg-white px-6 text-sm font-bold text-[var(--mg-brown)]"
              >
                Ver a página principal
              </Link>
            </div>
          </div>
        </article>

        <aside className="flex h-fit flex-col gap-4">
          <div className="rounded-2xl border border-[var(--mg-border)] bg-white p-5 shadow-[var(--mg-shadow)]">
            <div className="text-sm font-extrabold text-[var(--mg-brown)]">Fontes</div>
            <div className="mt-4 flex flex-col gap-3">
              {post.sources.map((source) => (
                <a
                  key={`${source.title}-${source.url}`}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-[linear-gradient(135deg,var(--mg-cream-2),#ffffff)] px-4 py-3 text-sm font-semibold text-[var(--mg-brown)]"
                >
                  {source.title}
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--mg-border)] bg-white p-5 shadow-[var(--mg-shadow)]">
            <div className="text-sm font-extrabold text-[var(--mg-brown)]">
              Tags principais
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[rgba(110,63,167,0.10)] px-3 py-1 text-xs font-bold text-[var(--mg-brown)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
