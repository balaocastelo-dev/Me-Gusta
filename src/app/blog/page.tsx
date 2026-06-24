import Link from "next/link";
import type { Metadata } from "next";
import { getSortedBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Blog da Me Gusta com notícias e tendências do universo gastronômico, sobremesas e referências para eventos em Campinas e região.",
};

export default function BlogIndexPage() {
  const posts = getSortedBlogPosts();

  return (
    <div className="flex-1 bg-[radial-gradient(1200px_600px_at_15%_0%,var(--mg-cream),transparent_70%),radial-gradient(900px_420px_at_90%_15%,rgba(229,58,134,0.14),transparent_60%),linear-gradient(180deg,#fffaf0,#ffffff)]">
      <header className="mx-auto w-full max-w-[1600px] px-5 py-12 2xl:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--mg-brown)] hover:underline"
        >
          Voltar para a página principal
        </Link>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--mg-brown)] md:text-4xl">
          Blog Me Gusta
        </h1>
        <p className="mt-3 max-w-2xl text-[color:rgba(31,20,15,0.78)]">
          Notícias, tendências e referências do universo gastronômico para quem quer
          descobrir novidades, inspirações e ideias para tornar o evento ainda mais especial.
        </p>
        <div className="mt-5 inline-flex rounded-full bg-[rgba(110,63,167,0.12)] px-4 py-2 text-xs font-extrabold text-[var(--mg-brown)]">
          Atualização automática por RSS gastronômico
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1600px] px-5 pb-16 2xl:px-10">
        <div className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-[28px] border border-[var(--mg-border)] bg-white p-6 shadow-[var(--mg-shadow)] transition-transform hover:translate-y-[-2px]"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[rgba(229,58,134,0.10)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--mg-brown)]">
                  {post.category === "me-gusta"
                    ? "Me Gusta"
                    : post.category === "guide"
                      ? "Guia"
                      : "Tendência"}
                </span>
                {post.isAutomated ? (
                  <span className="rounded-full bg-[rgba(78,197,106,0.16)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--mg-brown)]">
                    RSS
                  </span>
                ) : null}
              </div>
              <div className="text-xs font-semibold text-[color:rgba(31,20,15,0.7)]">
                {new Date(post.date).toLocaleDateString("pt-BR")}
              </div>
              <div className="mt-2 text-xl font-extrabold tracking-tight text-[var(--mg-brown)] group-hover:underline">
                {post.title}
              </div>
              <div className="mt-2 text-sm text-[color:rgba(31,20,15,0.78)]">
                {post.description}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-[rgba(229,58,134,0.10)] px-3 py-1 text-xs font-semibold text-[var(--mg-brown)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-5 text-xs font-semibold text-[color:rgba(31,20,15,0.62)]">
                {post.sources.length} fonte(s) relacionada(s)
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
