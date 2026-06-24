import Image from "next/image";
import Link from "next/link";
import InstagramEmbed from "@/components/InstagramEmbed";
import QuoteCalculator from "@/components/QuoteCalculator";
import signals from "@/data/me-gusta-signals.json";
import { getLatestBlogPosts } from "@/lib/blog";
import { buildWhatsappUrl, site } from "@/lib/site";

const eventCards = [
  {
    title: "Festas e Aniversários",
    description:
      "Infantil ou adulto: uma atração gelada, elegante e fácil de amar por qualquer faixa etária.",
  },
  {
    title: "Casamentos e Debutantes",
    description:
      "Perfeito para criar aquele momento wow no salão com fotos lindas e fila fluindo.",
  },
  {
    title: "Buffets e Confraternizações",
    description:
      "Atendimento uniforme, apresentação premium e operação organizada durante todo o evento.",
  },
  {
    title: "Eventos Corporativos",
    description:
      "Ativações, lançamentos e experiências B2B com apelo visual e memorabilidade de marca.",
  },
  {
    title: "Feiras e Grandes Eventos",
    description:
      "Estrutura pensada para grande circulação, alto volume e impacto visual constante.",
  },
  {
    title: "Festas Adultas Premium",
    description:
      "Com opção de sorvete alcoólico para casamentos, confraternizações e eventos exclusivos.",
  },
];

const processSteps = [
  {
    title: "Você chama no WhatsApp",
    description:
      "Manda data, local, número de convidados e tipo de evento. O atendimento já sai direcionado.",
  },
  {
    title: "A Me Gusta monta a proposta",
    description:
      "Preço claro, logística objetiva e qualificação rápida para Campinas e toda a região.",
  },
  {
    title: "No dia, chega tudo pronto",
    description:
      "Máquina moderna, LED ligado, equipe uniformizada e ambiente com cara de atração premium.",
  },
  {
    title: "Seu evento ganha um momento memorável",
    description:
      "Os convidados filmam, postam, repetem e associam a experiência ao cuidado da sua produção.",
  },
];

const faqItems = [
  {
    q: "O que está incluso no serviço?",
    a: "Máquina de sorvete americano + funcionário uniformizado operando e atendendo durante o evento.",
  },
  {
    q: "Qual o pacote base em Campinas?",
    a: "R$ 16,50 por pessoa para eventos de até 100 pessoas, com sorvete à vontade por 4 horas. Mínimo de R$ 1.650,00.",
  },
  {
    q: "Como funciona fora de Campinas?",
    a: "Deslocamento de R$ 2,50 por km rodado + taxa fixa de R$ 200,00.",
  },
  {
    q: "Quais eventos vocês atendem?",
    a: "Casamentos, aniversários, buffets, corporativos, feiras, grandes eventos e confraternizações em Campinas e RMC.",
  },
  {
    q: "A máquina tem diferencial visual?",
    a: "Sim. A máquina moderna com LED reforça o visual sofisticado e instagramável do evento.",
  },
  {
    q: "Existe opção para festas adultas?",
    a: "Sim. Há opção exclusiva de sorvete alcoólico para casamentos, eventos adultos e corporativos.",
  },
];

export default function Home() {
  const featuredPosts = getLatestBlogPosts(4);
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
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="flex-1 overflow-x-hidden bg-[radial-gradient(1200px_600px_at_10%_0%,var(--mg-cream),transparent_70%),radial-gradient(1100px_560px_at_100%_12%,rgba(229,58,134,0.16),transparent_60%),linear-gradient(180deg,#fffaf0,#ffffff)]">
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

      <header className="sticky top-0 z-40 border-b border-[var(--mg-border)] bg-[rgba(255,250,240,0.82)] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[1720px] items-center justify-between gap-3 px-5 py-4 2xl:px-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--mg-brown)] text-white shadow-[0_12px_34px_rgba(91,58,44,0.25)]">
              <span className="text-sm font-extrabold">MG</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-extrabold text-[var(--mg-brown)]">
                Me Gusta
              </span>
              <span className="text-xs font-semibold text-[color:rgba(31,20,15,0.7)]">
                Sorvete Americano • Campinas e RMC
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-[var(--mg-brown)] lg:flex">
            <a href="#eventos" className="hover:underline">
              Eventos
            </a>
            <a href="#social" className="hover:underline">
              Redes sociais
            </a>
            <a href="#precos" className="hover:underline">
              Preços
            </a>
            <a href="#faq" className="hover:underline">
              FAQ
            </a>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
          </nav>

          <a
            href={whatsappDefault}
            className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--mg-pink)] px-4 text-sm font-extrabold text-white shadow-[0_12px_30px_rgba(229,58,134,0.32)]"
          >
            Orçamento no WhatsApp
          </a>
        </div>
      </header>

      <main>
        <section className="mx-auto w-full max-w-[1720px] px-5 py-10 md:py-14 2xl:px-10">
          <div className="grid gap-8 xl:grid-cols-12 xl:gap-10">
            <div className="flex flex-col gap-6 xl:col-span-5">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[rgba(229,58,134,0.10)] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--mg-brown)]">
                Campinas e Região Metropolitana
                <span aria-hidden="true">•</span>
                máquina + operador uniformizado
              </div>

              <div className="space-y-5">
                <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.02] tracking-tight text-[var(--mg-brown)] sm:text-5xl xl:text-6xl 2xl:text-7xl">
                  O sorvete que vira atração.
                  <span className="block text-[var(--mg-pink)]">
                    O atendimento que faz o evento parecer maior.
                  </span>
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-[color:rgba(31,20,15,0.78)] 2xl:text-xl">
                  A Me Gusta entrega uma experiência pronta para impressionar:
                  <span className="font-bold"> sorvete à vontade por 4 horas</span>,
                  máquina moderna com LED, atendimento impecável e presença visual que
                  rende fila boa, foto bonita e comentário positivo.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={whatsappDefault}
                  className="inline-flex h-14 items-center justify-center rounded-full bg-[var(--mg-pink)] px-8 text-sm font-extrabold text-white shadow-[0_16px_44px_rgba(229,58,134,0.35)] transition-transform hover:translate-y-[-1px]"
                >
                  Quero orçamento para meu evento
                </a>
                <a
                  href="#social"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-[var(--mg-border)] bg-white px-8 text-sm font-bold text-[var(--mg-brown)]"
                >
                  Ver fotos, reels e prova social
                </a>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <StatsCard
                  title="Google"
                  value={`${site.googleRatingValue.toFixed(1)} / 5`}
                  caption={`${site.googleReviewCount} avaliações`}
                />
                <StatsCard
                  title="Pacote base"
                  value="R$ 16,50"
                  caption="por pessoa em Campinas"
                />
                <StatsCard
                  title="Atendimento"
                  value="4 horas"
                  caption="com operador uniformizado"
                />
              </div>

              <div className="grid gap-4 rounded-[30px] border border-[var(--mg-border)] bg-white/90 p-6 shadow-[var(--mg-shadow)] md:grid-cols-2">
                <div>
                  <div className="text-sm font-extrabold text-[var(--mg-brown)]">
                    Por que tantos clientes escolhem a Me Gusta?
                  </div>
                  <div className="mt-2 text-sm leading-7 text-[color:rgba(31,20,15,0.78)]">
                    Porque entrega sabor, presença visual e atendimento organizado no
                    mesmo serviço, deixando o evento mais bonito e mais memorável.
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {signals.authorityHighlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="inline-flex rounded-full bg-[rgba(110,63,167,0.10)] px-3 py-2 text-xs font-bold text-[var(--mg-brown)]"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="xl:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-[1.2fr_0.8fr]">
                <div className="overflow-hidden rounded-[34px] border border-[var(--mg-border)] bg-white shadow-[var(--mg-shadow)]">
                  <Image
                    src="/media/maquina-sorvete-led-casamento-campinas.webp"
                    alt="Máquina de sorvete Me Gusta com LED em casamento"
                    width={573}
                    height={1024}
                    priority
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="grid gap-4">
                  <div className="overflow-hidden rounded-[30px] border border-[var(--mg-border)] bg-white shadow-[var(--mg-shadow)]">
                    <Image
                      src="/media/sorvete-americano-festa-15-anos-campinas.webp"
                      alt="Atendimento da Me Gusta em festa de 15 anos"
                      width={1024}
                      height={682}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-1">
                    <div className="rounded-[28px] border border-[var(--mg-border)] bg-[linear-gradient(135deg,var(--mg-cream-2),#ffffff)] p-5 shadow-[var(--mg-shadow)]">
                      <div className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--mg-pink)]">
                        Comentário real
                      </div>
                      <div className="mt-3 text-base font-bold leading-7 text-[var(--mg-brown)]">
                        {signals.googleReviews[0]?.quote}
                      </div>
                      <div className="mt-3 text-sm font-semibold text-[color:rgba(31,20,15,0.64)]">
                        {signals.googleReviews[0]?.author} •{" "}
                        {signals.googleReviews[0]?.relativeDate}
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-[28px] border border-[var(--mg-border)] bg-white shadow-[var(--mg-shadow)]">
                      <Image
                        src="/media/sorvete-americano-pistache-evento-campinas.webp"
                        alt="Sorvete americano servido ao ar livre em Campinas"
                        width={765}
                        height={1024}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-3">
                <FeaturePill title="LED e visual premium" />
                <FeaturePill title="Sorvete alcoólico para adultos" />
                <FeaturePill title="SBT, artistas e forte prova social" />
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--mg-border)] bg-[rgba(255,244,207,0.52)]">
          <div className="mx-auto grid w-full max-w-[1720px] gap-4 px-5 py-6 text-sm font-bold text-[var(--mg-brown)] md:grid-cols-4 2xl:px-10">
            <div>Atendimento em Campinas + RMC</div>
            <div>Máquina + funcionário uniformizado</div>
            <div>Sorvete à vontade por 4 horas</div>
            <div>Experiência fotogênica, elegante e de alta conversão</div>
          </div>
        </section>

        <section id="eventos" className="mx-auto w-full max-w-[1720px] px-5 py-16 2xl:px-10">
          <SectionHeading
            badge="Tipos de evento"
            title="Uma atração que encaixa em vários formatos sem parecer repetida"
            description="Em casamentos, aniversários, eventos corporativos, buffets e grandes produções, a Me Gusta combina apresentação elegante, atendimento rápido e um momento de sobremesa que chama atenção."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {eventCards.map((card) => (
              <div
                key={card.title}
                className="rounded-[28px] border border-[var(--mg-border)] bg-white p-6 shadow-[var(--mg-shadow)]"
              >
                <div className="text-lg font-extrabold text-[var(--mg-brown)]">
                  {card.title}
                </div>
                <div className="mt-2 text-sm leading-7 text-[color:rgba(31,20,15,0.78)]">
                  {card.description}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-12">
            <div className="overflow-hidden rounded-[32px] border border-[var(--mg-border)] bg-white shadow-[var(--mg-shadow)] xl:col-span-5">
              <Image
                src="/media/maquina-sorvete-operador-uniformizado-campinas.webp"
                alt="Máquina de sorvete com operador uniformizado em evento"
                width={573}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid gap-4 xl:col-span-7 xl:grid-cols-2">
              <div className="overflow-hidden rounded-[32px] border border-[var(--mg-border)] bg-white shadow-[var(--mg-shadow)]">
                <Image
                  src="/media/maquina-sorvete-feira-evento-grande-campinas.webp"
                  alt="Me Gusta em feira e grande evento"
                  width={765}
                  height={1024}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="rounded-[32px] border border-[var(--mg-border)] bg-[linear-gradient(135deg,#ffffff,var(--mg-cream-2))] p-7 shadow-[var(--mg-shadow)]">
                <div className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--mg-pink)]">
                  Como a experiência acontece
                </div>
                <div className="mt-4 grid gap-5">
                  {processSteps.map((step, index) => (
                    <div key={step.title} className="rounded-2xl bg-white/80 p-4">
                      <div className="text-sm font-extrabold text-[var(--mg-brown)]">
                        {index + 1}. {step.title}
                      </div>
                      <div className="mt-1 text-sm leading-7 text-[color:rgba(31,20,15,0.78)]">
                        {step.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="social" className="mx-auto w-full max-w-[1720px] px-5 pb-16 2xl:px-10">
          <SectionHeading
            badge="Feed, reels e autoridade"
            title="Conteúdo real de eventos, com fotos, vídeo e prova social"
            description="Veja fotos, vídeos e comentários reais de quem já contratou a Me Gusta para festas, casamentos, eventos corporativos e grandes celebrações."
          />

          <div className="mt-8 grid gap-5 xl:grid-cols-[0.95fr_2.05fr]">
            <div className="flex flex-col gap-5">
              <div className="rounded-[30px] border border-[var(--mg-border)] bg-white p-6 shadow-[var(--mg-shadow)]">
                <div className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--mg-pink)]">
                  Destaques das redes
                </div>
                <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[var(--mg-brown)]">
                  Eventos especiais, ativações e momentos que mostram a experiência Me Gusta ao vivo
                </h2>
                <p className="mt-3 text-sm leading-7 text-[color:rgba(31,20,15,0.78)]">
                  Aqui você encontra uma amostra real do que os convidados veem no dia do
                  evento: visual marcante, atendimento caprichado e um serviço que vira
                  assunto entre os presentes.
                </p>
                <div className="mt-5 grid gap-3">
                  {signals.instagramReels.map((reel) => (
                    <a
                      key={reel.url}
                      href={reel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-2xl bg-[linear-gradient(135deg,var(--mg-cream-2),#ffffff)] px-4 py-3"
                    >
                      <div className="text-sm font-extrabold text-[var(--mg-brown)]">
                        {reel.title}
                      </div>
                      <div className="mt-1 text-xs leading-6 text-[color:rgba(31,20,15,0.68)]">
                        {reel.summary}
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-[30px] border border-[var(--mg-border)] bg-white p-6 shadow-[var(--mg-shadow)]">
                <div className="text-sm font-extrabold text-[var(--mg-brown)]">
                  Quer ver a marca em ação no seu tipo de evento?
                </div>
                <p className="mt-2 text-sm leading-7 text-[color:rgba(31,20,15,0.78)]">
                  Chame no WhatsApp e peça referências mais próximas do seu perfil:
                  casamento, festa infantil, corporativo, buffet, feira ou ativação.
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={whatsappDefault}
                    className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--mg-pink)] px-6 text-sm font-extrabold text-white"
                  >
                    Falar com vendas
                  </a>
                  <a
                    href={site.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--mg-border)] bg-white px-6 text-sm font-bold text-[var(--mg-brown)]"
                  >
                    Abrir Instagram
                  </a>
                </div>
              </div>
            </div>

            <div className="grid gap-5 xl:grid-cols-3">
              {signals.instagramReels.map((reel) => (
                <InstagramEmbed
                  key={reel.url}
                  title={reel.title}
                  embedUrl={reel.embedUrl}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="precos" className="mx-auto w-full max-w-[1720px] px-5 pb-16 2xl:px-10">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr] xl:gap-8">
            <div className="rounded-[32px] border border-[var(--mg-border)] bg-white p-7 shadow-[var(--mg-shadow)]">
              <SectionHeading
                badge="Preços e regras"
                title="Valores claros para você planejar com segurança"
                description="Com regras transparentes e atendimento objetivo, fica mais fácil entender o investimento e pedir um orçamento alinhado ao seu evento."
              />

              <div className="mt-8 grid gap-4">
                <PriceCard
                  title="Pacote base em Campinas"
                  text="Para eventos de até 100 pessoas, o valor sai por R$ 16,50 por pessoa com sorvete à vontade por 4 horas."
                />
                <PriceCard
                  title="Valor mínimo do evento"
                  text="R$ 1.650,00."
                />
                <PriceCard
                  title="Atendimento fora de Campinas"
                  text="R$ 2,50 por km rodado + taxa fixa de R$ 200,00."
                />
                <PriceCard
                  title="O que está incluso"
                  text="Máquina moderna + funcionário uniformizado + operação organizada durante o evento."
                />
              </div>
            </div>

            <QuoteCalculator defaultGuests={100} />
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1720px] px-5 pb-16 2xl:px-10">
          <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[32px] border border-[var(--mg-border)] bg-white p-6 shadow-[var(--mg-shadow)] md:p-8">
              <SectionHeading
                badge="Google + comentários"
                title="Avaliações que reforçam confiança na escolha"
                description="Quem já contratou destaca sabor, atendimento e o impacto visual da máquina no evento. É o tipo de detalhe que ajuda na decisão."
              />

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {signals.googleReviews.map((review) => (
                  <div
                    key={`${review.author}-${review.relativeDate}`}
                    className="rounded-[24px] bg-[linear-gradient(135deg,var(--mg-cream-2),#ffffff)] p-5"
                  >
                    <div className="text-sm font-extrabold text-[var(--mg-brown)]">
                      {review.author}
                    </div>
                    <div className="mt-2 text-sm leading-7 text-[color:rgba(31,20,15,0.78)]">
                      {review.quote}
                    </div>
                    <div className="mt-3 text-xs font-semibold text-[color:rgba(31,20,15,0.6)]">
                      {review.relativeDate}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 overflow-hidden rounded-[28px] border border-[var(--mg-border)]">
                <Image
                  src="/media/avaliacoes-google-me-gusta-campinas.png"
                  alt="Avaliações do Google da Me Gusta em Campinas"
                  width={952}
                  height={1024}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>

            <div className="rounded-[32px] border border-[var(--mg-border)] bg-[linear-gradient(135deg,#ffffff,var(--mg-cream-2))] p-7 shadow-[var(--mg-shadow)]">
              <div className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--mg-pink)]">
                Diferenciais
              </div>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--mg-brown)]">
                Um serviço pensado para impressionar do começo ao fim
              </h2>
              <div className="mt-5 grid gap-4">
                {[
                  "Melhor Sorvete Americano do Brasil.",
                  "Máquina moderna com LED e forte impacto visual.",
                  "Opção exclusiva de sorvete alcoólico para festas adultas.",
                  "Atendimento a artistas nacionais e prova social pública.",
                  "Conteúdo real vindo de Google e Instagram reforçando confiança."
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[var(--mg-border)] bg-white/80 px-4 py-4 text-sm font-semibold text-[var(--mg-brown)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto w-full max-w-[1720px] px-5 pb-16 2xl:px-10">
          <div className="rounded-[32px] border border-[var(--mg-border)] bg-white p-6 shadow-[var(--mg-shadow)] md:p-10">
            <SectionHeading
              badge="Perguntas frequentes"
              title="Tire suas dúvidas antes de pedir o orçamento"
              description="Confira as respostas mais buscadas sobre atendimento, valores, deslocamento e diferenciais do serviço."
            />

            <div className="mt-8 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
              {faqItems.map((item) => (
                <div
                  key={item.q}
                  className="rounded-[26px] border border-[var(--mg-border)] bg-[linear-gradient(135deg,var(--mg-cream-2),#ffffff)] p-5"
                >
                  <div className="text-base font-extrabold text-[var(--mg-brown)]">
                    {item.q}
                  </div>
                  <div className="mt-2 text-sm leading-7 text-[color:rgba(31,20,15,0.78)]">
                    {item.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1720px] px-5 pb-16 2xl:px-10">
          <div className="rounded-[34px] border border-[var(--mg-border)] bg-[linear-gradient(135deg,#ffffff,var(--mg-cream-2))] p-6 shadow-[var(--mg-shadow)] md:p-8">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <div className="inline-flex rounded-full bg-[rgba(110,63,167,0.12)] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--mg-brown)]">
                  Blog de notícias gastronômicas
                </div>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--mg-brown)] md:text-4xl">
                  Tendências, novidades e referências do mundo da gastronomia
                </h2>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-[color:rgba(31,20,15,0.78)]">
                  O blog reúne notícias e atualizações do universo gastronômico para quem
                  gosta de acompanhar tendências, sobremesas, consumo e novidades que
                  inspiram experiências mais especiais.
                </p>
              </div>

              <Link
                href="/blog"
                className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--mg-border)] bg-white px-7 text-sm font-bold text-[var(--mg-brown)]"
              >
                Abrir blog completo
              </Link>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
              {featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="rounded-[26px] border border-[var(--mg-border)] bg-white p-5 shadow-[var(--mg-shadow)] transition-transform hover:translate-y-[-2px]"
                >
                  <div className="flex flex-wrap gap-2">
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
                  <div className="mt-3 text-xs font-semibold text-[color:rgba(31,20,15,0.62)]">
                    {new Date(post.date).toLocaleDateString("pt-BR")}
                  </div>
                  <div className="mt-2 text-lg font-extrabold tracking-tight text-[var(--mg-brown)]">
                    {post.title}
                  </div>
                  <div className="mt-2 text-sm leading-7 text-[color:rgba(31,20,15,0.78)]">
                    {post.description}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--mg-border)] bg-[rgba(255,250,240,0.9)]">
        <div className="mx-auto w-full max-w-[1720px] px-5 py-10 2xl:px-10">
          <div className="grid gap-8 md:grid-cols-3 xl:grid-cols-4">
            <div className="flex flex-col gap-2">
              <div className="text-lg font-extrabold text-[var(--mg-brown)]">
                {site.name}
              </div>
              <div className="text-sm leading-7 text-[color:rgba(31,20,15,0.78)]">
                Aluguel de máquina de sorvete americano com operador uniformizado,
                presença premium e foco total em eventos memoráveis.
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
                Navegação
              </div>
              <a href="#eventos" className="text-sm font-semibold text-[var(--mg-brown)] hover:underline">
                Eventos
              </a>
              <a href="#social" className="text-sm font-semibold text-[var(--mg-brown)] hover:underline">
                Redes sociais
              </a>
              <a href="#precos" className="text-sm font-semibold text-[var(--mg-brown)] hover:underline">
                Preços
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm font-extrabold text-[var(--mg-brown)]">
                SEO e Conteúdo
              </div>
              <a href="#faq" className="text-sm font-semibold text-[var(--mg-brown)] hover:underline">
                FAQ
              </a>
              <Link href="/blog" className="text-sm font-semibold text-[var(--mg-brown)] hover:underline">
                Blog automatizado
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

function SectionHeading({
  badge,
  title,
  description,
}: {
  badge: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <div className="inline-flex rounded-full bg-[rgba(229,58,134,0.10)] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--mg-brown)]">
        {badge}
      </div>
      <h2 className="mt-4 max-w-5xl text-3xl font-extrabold tracking-tight text-[var(--mg-brown)] md:text-4xl">
        {title}
      </h2>
      <p className="mt-3 max-w-5xl text-sm leading-7 text-[color:rgba(31,20,15,0.78)] md:text-base">
        {description}
      </p>
    </div>
  );
}

function StatsCard({
  title,
  value,
  caption,
}: {
  title: string;
  value: string;
  caption: string;
}) {
  return (
    <div className="rounded-[24px] border border-[var(--mg-border)] bg-white p-5 shadow-[var(--mg-shadow)]">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:rgba(31,20,15,0.62)]">
        {title}
      </div>
      <div className="mt-2 text-2xl font-extrabold tracking-tight text-[var(--mg-brown)]">
        {value}
      </div>
      <div className="mt-1 text-sm text-[color:rgba(31,20,15,0.68)]">{caption}</div>
    </div>
  );
}

function FeaturePill({ title }: { title: string }) {
  return (
    <div className="rounded-[24px] border border-[var(--mg-border)] bg-white px-5 py-4 text-sm font-bold text-[var(--mg-brown)] shadow-[var(--mg-shadow)]">
      {title}
    </div>
  );
}

function PriceCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[24px] border border-[var(--mg-border)] bg-[linear-gradient(135deg,#ffffff,var(--mg-cream-2))] p-5">
      <div className="text-sm font-extrabold text-[var(--mg-brown)]">{title}</div>
      <div className="mt-2 text-sm leading-7 text-[color:rgba(31,20,15,0.78)]">{text}</div>
    </div>
  );
}

function siteUrlForSchema() {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (!url) return "http://localhost:3000";
  return url.endsWith("/") ? url.slice(0, -1) : url;
}
