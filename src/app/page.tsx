import Image from "next/image";
import Link from "next/link";
import QuoteCalculator from "@/components/QuoteCalculator";
import { blogPosts } from "@/lib/blog";
import { buildWhatsappUrl, site } from "@/lib/site";

export default function Home() {
  return <HomePage />;
}

function HomePage() {
  const reels = [
    {
      url: "https://www.instagram.com/reel/DXAvm-VDdOG/",
      title: "Destaque: Me Gusta Sorvete Americano",
    },
    {
      url: "https://www.instagram.com/reel/DVEU4-pCdGE/",
      title: "Destaque: evento com sorvete americano",
    },
    {
      url: "https://www.instagram.com/reel/DTbuvJojUoh/",
      title: "Destaque: momentos do Instagram",
    },
  ];

  const featuredPosts = blogPosts.slice(0, 3);
  const whatsappDefault = buildWhatsappUrl(
    `Olá! Quero orçamento para aluguel da máquina de sorvete da ${site.name} para meu evento em Campinas/RMC.`
  );

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    url: siteUrlForSchema(),
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    areaServed: [
      { "@type": "City", name: "Campinas" },
      { "@type": "AdministrativeArea", name: "Região Metropolitana de Campinas" },
    ],
    sameAs: [site.instagramUrl, site.facebookUrl],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.googleRatingValue,
      reviewCount: site.googleReviewCount,
    },
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Aluguel de máquina de sorvete americano com operador",
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
      telephone: site.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.city,
        addressRegion: site.region,
        addressCountry: site.country,
      },
    },
    areaServed: "Campinas e Região Metropolitana de Campinas (RMC)",
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: "16.50",
      description:
        "Pacote base em Campinas: R$ 16,50 por pessoa (até 100 pessoas), sorvete à vontade por 4 horas. Valor mínimo do evento: R$ 1.650,00. Fora de Campinas: R$ 2,50 por km rodado + taxa fixa de R$ 200,00.",
      availability: "https://schema.org/InStock",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "O que está incluso no aluguel da máquina de sorvete?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "O serviço obrigatoriamente inclui a máquina de sorvete americano e um funcionário uniformizado para operar e atender durante o evento.",
        },
      },
      {
        "@type": "Question",
        name: "Qual é o preço para eventos em Campinas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Para eventos de até 100 pessoas, o pacote base sai por R$ 16,50 por pessoa, com sorvete à vontade por 4 horas. O valor mínimo do evento é R$ 1.650,00.",
        },
      },
      {
        "@type": "Question",
        name: "Como funciona o atendimento fora de Campinas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Fora de Campinas é cobrado deslocamento de R$ 2,50 por km rodado, além de uma taxa fixa de R$ 200,00.",
        },
      },
      {
        "@type": "Question",
        name: "Vocês atendem casamentos e eventos corporativos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sim. Atendemos casamentos, debutantes, festas, buffets, confraternizações, eventos corporativos, lançamentos e grandes eventos em Campinas e região.",
        },
      },
      {
        "@type": "Question",
        name: "Existe opção de sorvete alcoólico?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sim. Para festas adultas (como casamentos e corporativos), existe a opção exclusiva de sorvete alcoólico.",
        },
      },
    ],
  };

  return (
    <div className="flex-1 bg-[radial-gradient(1200px_600px_at_15%_0%,var(--mg-cream),transparent_70%),radial-gradient(900px_420px_at_90%_15%,rgba(229,58,134,0.16),transparent_60%),linear-gradient(180deg,#fffaf0,#ffffff)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="sticky top-0 z-40 border-b border-[var(--mg-border)] bg-[rgba(255,250,240,0.8)] backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--mg-brown)] text-white shadow-[0_10px_30px_rgba(91,58,44,0.25)]">
              <span className="text-sm font-extrabold">MG</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-extrabold text-[var(--mg-brown)]">
                Me Gusta
              </span>
              <span className="text-xs font-semibold text-[color:rgba(31,20,15,0.7)]">
                Sorvete Americano • Campinas
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 text-sm font-semibold text-[var(--mg-brown)] md:flex">
            <a href="#eventos" className="hover:underline">
              Eventos
            </a>
            <a href="#precos" className="hover:underline">
              Preços
            </a>
            <a href="#diferenciais" className="hover:underline">
              Diferenciais
            </a>
            <a href="#faq" className="hover:underline">
              FAQ
            </a>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={whatsappDefault}
              className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--mg-pink)] px-4 text-sm font-extrabold text-white shadow-[0_12px_30px_rgba(229,58,134,0.32)]"
            >
              Orçamento no WhatsApp
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto w-full max-w-6xl px-5 py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="flex flex-col gap-6">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[rgba(229,58,134,0.10)] px-4 py-2 text-xs font-extrabold text-[var(--mg-brown)]">
                Campinas e Região Metropolitana (RMC)
                <span aria-hidden="true">•</span>
                Máquina + operador uniformizado
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[var(--mg-brown)] md:text-5xl">
                Aluguel de máquina de sorvete americano para eventos em Campinas
              </h1>

              <p className="text-lg text-[color:rgba(31,20,15,0.78)]">
                Atração que vira momento do evento:{" "}
                <span className="font-bold">
                  sorvete à vontade por 4 horas
                </span>{" "}
                com atendimento profissional. O serviço inclui obrigatoriamente a{" "}
                <span className="font-bold">máquina</span> e{" "}
                <span className="font-bold">funcionário uniformizado</span>.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={whatsappDefault}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--mg-pink)] px-7 text-sm font-extrabold text-white shadow-[0_14px_40px_rgba(229,58,134,0.35)] transition-transform hover:translate-y-[-1px] focus:outline-none focus:ring-4 focus:ring-[color:rgba(229,58,134,0.25)]"
                >
                  Pedir orçamento agora
                </a>
                <a
                  href="#precos"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--mg-border)] bg-white px-7 text-sm font-bold text-[var(--mg-brown)]"
                >
                  Ver preços e regras
                </a>
              </div>

              <div className="grid gap-3 rounded-2xl border border-[var(--mg-border)] bg-white p-5 shadow-[var(--mg-shadow)] md:grid-cols-3">
                <div className="flex flex-col">
                  <div className="text-xs font-semibold text-[color:rgba(31,20,15,0.7)]">
                    Avaliação no Google
                  </div>
                  <div className="mt-1 text-lg font-extrabold text-[var(--mg-brown)]">
                    {site.googleRatingValue.toFixed(1)} / 5
                  </div>
                  <div className="text-xs text-[color:rgba(31,20,15,0.7)]">
                    {site.googleReviewCount} avaliações
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-xs font-semibold text-[color:rgba(31,20,15,0.7)]">
                    Destaque
                  </div>
                  <div className="mt-1 text-sm font-extrabold text-[var(--mg-brown)]">
                    Melhor Sorvete Americano do Brasil
                  </div>
                  <div className="text-xs text-[color:rgba(31,20,15,0.7)]">
                    Certificação e padrão de qualidade
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-xs font-semibold text-[color:rgba(31,20,15,0.7)]">
                    Autoridade
                  </div>
                  <div className="mt-1 text-sm font-extrabold text-[var(--mg-brown)]">
                    Artistas + participação no SBT
                  </div>
                  <div className="text-xs text-[color:rgba(31,20,15,0.7)]">
                    Prova social e experiência em eventos
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[36px] bg-[radial-gradient(600px_380px_at_30%_20%,rgba(110,63,167,0.20),transparent_65%),radial-gradient(600px_380px_at_70%_55%,rgba(51,184,176,0.20),transparent_65%)]" />
              <div className="overflow-hidden rounded-[32px] border border-[var(--mg-border)] bg-white shadow-[var(--mg-shadow)]">
                <Image
                  src="/media/maquina-sorvete-led-casamento-campinas.webp"
                  alt="Máquina de sorvete com iluminação em LED em evento"
                  width={573}
                  height={1024}
                  priority
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-[var(--mg-border)] bg-white p-4 shadow-[var(--mg-shadow)]">
                  <div className="text-sm font-extrabold text-[var(--mg-brown)]">
                    Máquina moderna + LED
                  </div>
                  <div className="mt-1 text-sm text-[color:rgba(31,20,15,0.78)]">
                    Mais visibilidade, sofisticação e fotos incríveis no evento.
                  </div>
                </div>
                <div className="rounded-2xl border border-[var(--mg-border)] bg-white p-4 shadow-[var(--mg-shadow)]">
                  <div className="text-sm font-extrabold text-[var(--mg-brown)]">
                    Opção de sorvete alcoólico
                  </div>
                  <div className="mt-1 text-sm text-[color:rgba(31,20,15,0.78)]">
                    Diferencial para casamentos e eventos corporativos.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="eventos" className="mx-auto w-full max-w-6xl px-5 pb-14">
          <div className="grid gap-8 md:grid-cols-2 md:items-end">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-[var(--mg-brown)]">
                Eventos atendidos em Campinas e região
              </h2>
              <p className="mt-3 text-[color:rgba(31,20,15,0.78)]">
                Do íntimo ao grande porte: atendimento ágil, padrão de qualidade e
                presença impecável.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--mg-border)] bg-white p-5 shadow-[var(--mg-shadow)]">
              <div className="text-sm font-extrabold text-[var(--mg-brown)]">
                Diferencial obrigatório
              </div>
              <div className="mt-2 text-sm text-[color:rgba(31,20,15,0.78)]">
                Aqui não é só a máquina: é{" "}
                <span className="font-bold">máquina + funcionário uniformizado</span>{" "}
                para garantir atendimento rápido e impecável.
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Festas e Aniversários",
                desc: "Infantil e adulto. Atração que agrada todas as idades.",
              },
              {
                title: "Casamentos e Debutantes",
                desc: "Visual sofisticado e experiência instagramável no evento.",
              },
              {
                title: "Buffets e Confraternizações",
                desc: "Serviço padronizado para eventos recorrentes e alto fluxo.",
              },
              {
                title: "Eventos Corporativos",
                desc: "Perfeito para lançamentos, ativações de marca e B2B.",
              },
              {
                title: "Feiras e Grandes Eventos",
                desc: "Operação rápida para grande circulação de público.",
              },
              {
                title: "Eventos Premium",
                desc: "Opção de sorvete alcoólico para festas adultas.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-[var(--mg-border)] bg-white p-6 shadow-[var(--mg-shadow)]"
              >
                <div className="text-lg font-extrabold text-[var(--mg-brown)]">
                  {c.title}
                </div>
                <div className="mt-2 text-sm text-[color:rgba(31,20,15,0.78)]">
                  {c.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-[var(--mg-border)] bg-white shadow-[var(--mg-shadow)]">
              <Image
                src="/media/sorvete-americano-festa-15-anos-campinas.webp"
                alt="Sorvete americano em festa de 15 anos"
                width={1024}
                height={682}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-[var(--mg-border)] bg-white shadow-[var(--mg-shadow)]">
              <Image
                src="/media/maquina-sorvete-feira-evento-grande-campinas.webp"
                alt="Máquina de sorvete em evento grande ao ar livre"
                width={765}
                height={1024}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section id="precos" className="mx-auto w-full max-w-6xl px-5 pb-14">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-[var(--mg-brown)]">
                Preços e regras (claros para qualificar o lead)
              </h2>
              <p className="mt-3 text-[color:rgba(31,20,15,0.78)]">
                Transparência total para você planejar com segurança.
              </p>

              <div className="mt-6 grid gap-4">
                <div className="rounded-2xl border border-[var(--mg-border)] bg-white p-5 shadow-[var(--mg-shadow)]">
                  <div className="text-sm font-extrabold text-[var(--mg-brown)]">
                    Pacote base (Campinas)
                  </div>
                  <div className="mt-2 text-sm text-[color:rgba(31,20,15,0.78)]">
                    Eventos de até <span className="font-bold">100 pessoas</span>:{" "}
                    <span className="font-bold">R$ 16,50 por pessoa</span> (sorvete à
                    vontade por <span className="font-bold">4 horas</span>).
                  </div>
                </div>

                <div className="rounded-2xl border border-[var(--mg-border)] bg-white p-5 shadow-[var(--mg-shadow)]">
                  <div className="text-sm font-extrabold text-[var(--mg-brown)]">
                    Valor mínimo do evento
                  </div>
                  <div className="mt-2 text-sm text-[color:rgba(31,20,15,0.78)]">
                    <span className="font-bold">R$ 1.650,00</span>.
                  </div>
                </div>

                <div className="rounded-2xl border border-[var(--mg-border)] bg-white p-5 shadow-[var(--mg-shadow)]">
                  <div className="text-sm font-extrabold text-[var(--mg-brown)]">
                    Fora de Campinas
                  </div>
                  <div className="mt-2 text-sm text-[color:rgba(31,20,15,0.78)]">
                    Deslocamento: <span className="font-bold">R$ 2,50</span> por KM
                    rodado + taxa fixa de <span className="font-bold">R$ 200,00</span>.
                  </div>
                </div>
              </div>
            </div>

            <QuoteCalculator defaultGuests={100} />
          </div>
        </section>

        <section
          id="diferenciais"
          className="mx-auto w-full max-w-6xl px-5 pb-14"
        >
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="overflow-hidden rounded-2xl border border-[var(--mg-border)] bg-white shadow-[var(--mg-shadow)]">
              <Image
                src="/media/maquina-sorvete-operador-uniformizado-campinas.webp"
                alt="Máquina de sorvete com operador uniformizado"
                width={573}
                height={1024}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-extrabold tracking-tight text-[var(--mg-brown)]">
                Diferenciais que aumentam a conversão (e a satisfação do evento)
              </h2>
              <div className="grid gap-4">
                {[
                  {
                    title: "Atendimento completo",
                    desc: "Máquina + funcionário uniformizado para manter padrão, higiene e agilidade.",
                  },
                  {
                    title: "Qualidade reconhecida",
                    desc: "Certificado como o Melhor Sorvete Americano do Brasil.",
                  },
                  {
                    title: "Visual premium e instagramável",
                    desc: "Máquina moderna com iluminação em LED para fotos e personalização.",
                  },
                  {
                    title: "Inovação para festas adultas",
                    desc: "Opção exclusiva de sorvete alcoólico (casamentos e corporativos).",
                  },
                  {
                    title: "Autoridade e prova social",
                    desc: "Atendemos artistas nacionais e participamos do SBT.",
                  },
                ].map((d) => (
                  <div
                    key={d.title}
                    className="rounded-2xl border border-[var(--mg-border)] bg-white p-5 shadow-[var(--mg-shadow)]"
                  >
                    <div className="text-base font-extrabold text-[var(--mg-brown)]">
                      {d.title}
                    </div>
                    <div className="mt-1 text-sm text-[color:rgba(31,20,15,0.78)]">
                      {d.desc}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={whatsappDefault}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--mg-pink)] px-7 text-sm font-extrabold text-white shadow-[0_14px_40px_rgba(229,58,134,0.35)]"
                >
                  Quero meu orçamento
                </a>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--mg-border)] bg-white px-7 text-sm font-bold text-[var(--mg-brown)]"
                >
                  Ver Instagram {site.instagramHandle}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 pb-14">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="rounded-2xl border border-[var(--mg-border)] bg-white p-6 shadow-[var(--mg-shadow)]">
              <h2 className="text-2xl font-extrabold tracking-tight text-[var(--mg-brown)]">
                Prova social (Google)
              </h2>
              <p className="mt-2 text-sm text-[color:rgba(31,20,15,0.78)]">
                Nota {site.googleRatingValue.toFixed(1)} com {site.googleReviewCount}{" "}
                avaliações. Atendimento impecável e sorvete que surpreende.
              </p>
              <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--mg-border)]">
                <Image
                  src="/media/avaliacoes-google-me-gusta-campinas.png"
                  alt="Avaliações do Google da Me Gusta em Campinas"
                  width={952}
                  height={1024}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--mg-border)] bg-white p-6 shadow-[var(--mg-shadow)]">
              <h2 className="text-2xl font-extrabold tracking-tight text-[var(--mg-brown)]">
                Destaques do Instagram (Barba Azul, Anão e muito mais)
              </h2>
              <p className="mt-2 text-sm text-[color:rgba(31,20,15,0.78)]">
                Conteúdo real de eventos e bastidores. Confira os destaques e envie a
                data do seu evento no WhatsApp para receber um orçamento rápido.
              </p>

              <div className="mt-4 grid gap-3">
                {reels.map((r) => (
                  <a
                    key={r.url}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--mg-border)] bg-[linear-gradient(135deg,var(--mg-cream-2),#ffffff)] px-4 py-3"
                  >
                    <span className="text-sm font-bold text-[var(--mg-brown)]">
                      {r.title}
                    </span>
                    <span className="text-xs font-semibold text-[color:rgba(31,20,15,0.7)]">
                      Ver
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-[var(--mg-border)] bg-white px-6 text-sm font-bold text-[var(--mg-brown)]"
                >
                  Abrir Instagram
                </a>
                <a
                  href={whatsappDefault}
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-[var(--mg-pink)] px-6 text-sm font-extrabold text-white"
                >
                  Orçamento agora
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto w-full max-w-6xl px-5 pb-14">
          <div className="rounded-2xl border border-[var(--mg-border)] bg-white p-6 shadow-[var(--mg-shadow)] md:p-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--mg-brown)]">
              Perguntas frequentes (FAQ)
            </h2>
            <p className="mt-3 max-w-3xl text-[color:rgba(31,20,15,0.78)]">
              Respostas diretas para Google e IAs (ChatGPT, Gemini e Claude) entenderem
              os preços, o que está incluso e como funciona o atendimento em Campinas e
              região.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                {
                  q: "O que está incluso no serviço?",
                  a: "Máquina de sorvete americano + funcionário uniformizado operando e atendendo durante o evento.",
                },
                {
                  q: "Qual o pacote base em Campinas?",
                  a: "R$ 16,50 por pessoa (até 100 pessoas), sorvete à vontade por 4 horas. Mínimo do evento: R$ 1.650,00.",
                },
                {
                  q: "Como funciona fora de Campinas?",
                  a: "Deslocamento de R$ 2,50 por km rodado + taxa fixa de R$ 200,00.",
                },
                {
                  q: "Quais eventos vocês atendem?",
                  a: "Festas, aniversários, casamentos, debutantes, buffets, confraternizações, corporativos, feiras e grandes eventos em Campinas e RMC.",
                },
                {
                  q: "A máquina tem diferencial visual?",
                  a: "Sim. Máquina moderna com iluminação em LED, ideal para um evento sofisticado e instagramável.",
                },
                {
                  q: "Existe opção para festas adultas?",
                  a: "Sim. Opção exclusiva de sorvete alcoólico para casamentos e eventos corporativos.",
                },
              ].map((item) => (
                <div
                  key={item.q}
                  className="rounded-2xl border border-[var(--mg-border)] bg-[linear-gradient(135deg,var(--mg-cream-2),#ffffff)] p-5"
                >
                  <div className="text-base font-extrabold text-[var(--mg-brown)]">
                    {item.q}
                  </div>
                  <div className="mt-2 text-sm text-[color:rgba(31,20,15,0.78)]">
                    {item.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 pb-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-[var(--mg-brown)]">
                Blog (tráfego orgânico + funil discreto)
              </h2>
              <p className="mt-3 text-[color:rgba(31,20,15,0.78)]">
                Conteúdo sobre sobremesas, receitas e tendências de eventos, com foco em
                Campinas e região.
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden rounded-full border border-[var(--mg-border)] bg-white px-6 py-3 text-sm font-bold text-[var(--mg-brown)] md:inline-flex"
            >
              Ver todos
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {featuredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-2xl border border-[var(--mg-border)] bg-white p-6 shadow-[var(--mg-shadow)] transition-transform hover:translate-y-[-2px]"
              >
                <div className="text-xs font-semibold text-[color:rgba(31,20,15,0.7)]">
                  {new Date(post.date).toLocaleDateString("pt-BR")}
                </div>
                <div className="mt-2 text-lg font-extrabold tracking-tight text-[var(--mg-brown)]">
                  {post.title}
                </div>
                <div className="mt-2 text-sm text-[color:rgba(31,20,15,0.78)]">
                  {post.description}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[var(--mg-border)] bg-white p-6 shadow-[var(--mg-shadow)] sm:flex-row">
            <div>
              <div className="text-lg font-extrabold text-[var(--mg-brown)]">
                Pronto para fechar a atração do seu evento?
              </div>
              <div className="mt-1 text-sm text-[color:rgba(31,20,15,0.78)]">
                Clique e fale direto no WhatsApp: {site.phone}.
              </div>
            </div>
            <a
              href={whatsappDefault}
              className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--mg-pink)] px-7 text-sm font-extrabold text-white"
            >
              Falar no WhatsApp
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--mg-border)] bg-[rgba(255,250,240,0.9)]">
        <div className="mx-auto w-full max-w-6xl px-5 py-10">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col gap-2">
              <div className="text-lg font-extrabold text-[var(--mg-brown)]">
                {site.name}
              </div>
              <div className="text-sm text-[color:rgba(31,20,15,0.78)]">
                Aluguel de máquina de sorvete americano com operador uniformizado.
              </div>
              <div className="text-sm font-semibold text-[var(--mg-brown)]">
                Campinas e RMC
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm font-extrabold text-[var(--mg-brown)]">
                Contato
              </div>
              <a
                href={whatsappDefault}
                className="text-sm font-semibold text-[var(--mg-brown)] hover:underline"
              >
                WhatsApp: {site.phone}
              </a>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[var(--mg-brown)] hover:underline"
              >
                Instagram: {site.instagramHandle}
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm font-extrabold text-[var(--mg-brown)]">
                Links rápidos
              </div>
              <a href="#precos" className="text-sm font-semibold text-[var(--mg-brown)] hover:underline">
                Preços
              </a>
              <a href="#faq" className="text-sm font-semibold text-[var(--mg-brown)] hover:underline">
                FAQ
              </a>
              <Link href="/blog" className="text-sm font-semibold text-[var(--mg-brown)] hover:underline">
                Blog
              </Link>
            </div>
          </div>

          <div className="mt-8 text-xs text-[color:rgba(31,20,15,0.65)]">
            © {new Date().getFullYear()} {site.name}. Atendimento em Campinas e Região
            Metropolitana.
          </div>
        </div>
      </footer>

      <a
        href={whatsappDefault}
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[var(--mg-green)] text-white shadow-[0_18px_55px_rgba(78,197,106,0.35)] transition-transform hover:translate-y-[-2px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="24"
          height="24"
          fill="currentColor"
        >
          <path d="M16.03 3C9.39 3 4 8.39 4 15.03c0 2.35.68 4.62 1.97 6.58L4 29l7.57-1.95A11.93 11.93 0 0 0 16.03 27C22.67 27 28 21.67 28 15.03 28 8.39 22.67 3 16.03 3Zm0 21.78c-1.94 0-3.84-.52-5.49-1.52l-.39-.23-4.49 1.16 1.2-4.37-.25-.41a9.79 9.79 0 0 1-1.55-5.38c0-5.45 4.43-9.88 9.89-9.88 5.45 0 9.88 4.43 9.88 9.88 0 5.46-4.43 9.89-9.88 9.89Zm5.64-7.39c-.31-.15-1.83-.9-2.12-1-.29-.11-.5-.15-.71.15-.21.31-.82 1-.99 1.21-.18.21-.36.23-.67.08-.31-.15-1.3-.48-2.48-1.53-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.13-.64.14-.14.31-.36.46-.54.15-.18.21-.31.31-.52.1-.21.05-.39-.03-.54-.08-.15-.71-1.71-.97-2.35-.26-.62-.52-.54-.71-.55l-.61-.01c-.21 0-.54.08-.82.39-.28.31-1.08 1.05-1.08 2.56 0 1.51 1.11 2.97 1.26 3.17.15.21 2.18 3.33 5.28 4.66.74.32 1.32.51 1.77.65.74.24 1.42.21 1.96.13.6-.09 1.83-.75 2.09-1.48.26-.72.26-1.34.18-1.48-.08-.13-.28-.21-.59-.36Z" />
        </svg>
      </a>
    </div>
  );
}

function siteUrlForSchema() {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (!url) return "http://localhost:3000";
  return url.endsWith("/") ? url.slice(0, -1) : url;
}
