import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Blog da Me Gusta com dicas de eventos, sobremesas e tendências para casamentos, aniversários e eventos corporativos em Campinas e região.",
};

export default function BlogIndexPage() {
  const posts = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="flex-1 bg-[radial-gradient(1200px_600px_at_15%_0%,var(--mg-cream),transparent_70%),radial-gradient(900px_420px_at_90%_15%,rgba(229,58,134,0.14),transparent_60%),linear-gradient(180deg,#fffaf0,#ffffff)]">
      <header className="mx-auto w-full max-w-6xl px-5 py-10">
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
          Conteúdo prático sobre sobremesas e eventos em Campinas e Região Metropolitana:
          planejamento, tendências e dicas para aumentar a experiência dos convidados.
        </p>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 pb-14">
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-[var(--mg-border)] bg-white p-6 shadow-[var(--mg-shadow)] transition-transform hover:translate-y-[-2px]"
            >
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
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

