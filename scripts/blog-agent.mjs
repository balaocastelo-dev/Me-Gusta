import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const postsPath = path.join(rootDir, "src", "data", "blog-posts.generated.json");
const signalsPath = path.join(rootDir, "src", "data", "me-gusta-signals.json");
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://me-gusta-seven.vercel.app").replace(
  /\/$/,
  ""
);
const dryRun = process.argv.includes("--dry-run");

const defaultFeeds = [
  "https://news.google.com/rss/search?q=eventos+gastronomia+casamentos+buffet+Brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419",
  "https://news.google.com/rss/search?q=tend%C3%AAncias+de+eventos+Brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419",
  "https://news.google.com/rss/search?q=mercado+de+casamentos+Brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419"
];

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function main() {
  const [posts, signals] = await Promise.all([
    readJson(postsPath),
    readJson(signalsPath),
  ]);

  const recentPosts = posts.slice(0, 8);
  const postsSinceFeature = countPostsSinceLastFeature(posts);
  const shouldCreateMeGustaFeature = postsSinceFeature >= 5;
  const feedUrls = getFeedUrls();
  const newsItems = await collectNewsItems(feedUrls);

  const generated = await createPost({
    newsItems,
    recentPosts,
    signals,
    shouldCreateMeGustaFeature,
  });

  const normalized = normalizeGeneratedPost(generated, posts);

  if (dryRun) {
    console.log(JSON.stringify(normalized, null, 2));
    return;
  }

  const nextPosts = [normalized, ...posts].slice(0, 60);
  await writeFile(postsPath, `${JSON.stringify(nextPosts, null, 2)}\n`, "utf8");

  console.log(
    `Novo post ${normalized.isMeGustaFeature ? "Me Gusta" : "editorial"} salvo em ${postsPath}`
  );
}

async function createPost({ newsItems, recentPosts, signals, shouldCreateMeGustaFeature }) {
  const aiPost = await tryGenerateWithAi({
    newsItems,
    recentPosts,
    signals,
    shouldCreateMeGustaFeature,
  });

  if (aiPost) return aiPost;

  return shouldCreateMeGustaFeature
    ? createFallbackMeGustaPost(signals)
    : createFallbackNewsPost(newsItems);
}

async function tryGenerateWithAi(context) {
  const apiKey = process.env.BLOG_AGENT_API_KEY ?? process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const baseUrl = (process.env.BLOG_AGENT_BASE_URL ?? process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1").replace(
    /\/$/,
    ""
  );
  const model = process.env.BLOG_AGENT_MODEL ?? "gpt-4.1-mini";

  const prompt = buildPrompt(context);
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.8,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "Voce e um agente editorial para um blog de eventos e gastronomia. Retorne apenas JSON valido, em pt-BR, com foco em SEO, clareza e utilidade pratica.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Falha ao gerar conteudo com IA: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) return null;

  return JSON.parse(content);
}

function buildPrompt({ newsItems, recentPosts, signals, shouldCreateMeGustaFeature }) {
  const externalSignals = getExtraMeGustaNotes();
  const recentTitles = recentPosts.map((post) => `- ${post.title}`).join("\n");
  const newsSummary = newsItems
    .slice(0, 8)
    .map((item, index) => `${index + 1}. ${item.title} | ${item.url}`)
    .join("\n");
  const reviewSummary = (signals.googleReviews ?? [])
    .map((review) => `- ${review.author}: ${review.quote}`)
    .join("\n");
  const reelSummary = (signals.instagramReels ?? [])
    .map((reel) => `- ${reel.title}: ${reel.url}`)
    .join("\n");
  const noteSummary = [...(signals.meGustaReferenceNotes ?? []), ...externalSignals]
    .map((note) => `- ${note}`)
    .join("\n");

  return `Crie UM novo post para o blog da Me Gusta.

Objetivo:
- O blog alterna 5 publicacoes editoriais/informativas sobre eventos e gastronomia com 1 publicacao proprietaria da Me Gusta.
- Nesta execucao, o tipo obrigatorio e: ${shouldCreateMeGustaFeature ? "post proprietario da Me Gusta" : "post informativo/editorial"}.

Regras:
- Nao repita titulos recentes.
- Foco em SEO para Campinas, eventos, gastronomia, casamentos, festas, corporativo e feiras.
- Tom humano, comercial apenas quando fizer sentido.
- Entregue JSON com as chaves:
  slug, title, description, date, tags, category, isAutomated, isMeGustaFeature, featuredImage, sources, content
- "category" deve ser "news", "guide" ou "me-gusta"
- "content" deve ser array com blocos { type: "p" | "h2" | "ul", text?, items? }
- Minimo: 5 blocos.
- "sources" deve ter pelo menos 1 item com title e url.
- "featuredImage" deve ser um destes caminhos:
  /media/maquina-sorvete-led-casamento-campinas.webp
  /media/maquina-sorvete-operador-uniformizado-campinas.webp
  /media/sorvete-americano-pistache-evento-campinas.webp
  /media/sorvete-americano-festa-15-anos-campinas.webp
  /media/maquina-sorvete-feira-evento-grande-campinas.webp
- Use data de hoje: ${new Date().toISOString().slice(0, 10)}

Titulos recentes para evitar:
${recentTitles}

Noticias e sinais editoriais recentes:
${newsSummary || "- Sem noticias externas disponiveis"}

Referencias Me Gusta:
Google reviews:
${reviewSummary}

Instagram:
${reelSummary}

Notas e diferenciais:
${noteSummary}
`;
}

function createFallbackNewsPost(newsItems) {
  const [primary, secondary] = newsItems;
  const primaryTitle = primary?.title ?? "Tendencias de sobremesas e experiencias para eventos";
  const secondaryTitle = secondary?.title ?? "Mudancas no mercado de eventos e gastronomia";
  const today = new Date().toISOString().slice(0, 10);

  return {
    slug: slugify(`insights-de-eventos-e-gastronomia-${today}`),
    title: "O Que Esta em Alta em Eventos e Gastronomia Agora",
    description:
      "Um resumo pratico das novidades mais recentes do mercado de eventos, casamentos e gastronomia, com leitura util para quem produz em Campinas e regiao.",
    date: today,
    tags: ["eventos", "gastronomia", "tendencias", "Campinas"],
    category: "news",
    isAutomated: true,
    isMeGustaFeature: false,
    featuredImage: "/media/maquina-sorvete-feira-evento-grande-campinas.webp",
    sources: [
      ...(primary ? [{ title: primary.title, url: primary.url }] : []),
      ...(secondary ? [{ title: secondary.title, url: secondary.url }] : []),
    ],
    content: [
      {
        type: "p",
        text: "O mercado de eventos e gastronomia muda rapido, e acompanhar os sinais certos ajuda produtores, buffets e marcas a criarem experiencias mais fortes para o publico."
      },
      {
        type: "h2",
        text: "Sinal 1: experiencias visuais vendem mais"
      },
      {
        type: "p",
        text: `Entre os temas recentes, chama atencao o crescimento de formatos com forte impacto visual e compartilhamento social. Um dos destaques observados foi: ${primaryTitle}.`
      },
      {
        type: "h2",
        text: "Sinal 2: operacao simples ganha valor"
      },
      {
        type: "p",
        text: `Outro ponto recorrente e a busca por solucoes praticas, com atendimento rapido e menos gargalos na fila. Isso aparece tambem em: ${secondaryTitle}.`
      },
      {
        type: "h2",
        text: "Como aplicar em Campinas e regiao"
      },
      {
        type: "ul",
        items: [
          "Escolha atracoes que combinam experiencia, foto e fluxo rapido.",
          "Priorize servicos com equipe preparada e apresentacao impecavel.",
          "Adapte o menu ao perfil do publico e ao horario de consumo."
        ]
      }
    ]
  };
}

function createFallbackMeGustaPost(signals) {
  const today = new Date().toISOString().slice(0, 10);
  const review = signals.googleReviews?.[0];
  const reel = signals.instagramReels?.[0];

  return {
    slug: slugify(`me-gusta-em-foco-${today}`),
    title: "Por Que a Me Gusta Continua Sendo Assunto nos Eventos de Campinas",
    description:
      "A combinacao entre atendimento, visual da maquina, operador uniformizado e prova social faz da Me Gusta uma escolha forte para festas, casamentos e eventos corporativos.",
    date: today,
    tags: ["Me Gusta", "Campinas", "casamento", "evento corporativo"],
    category: "me-gusta",
    isAutomated: true,
    isMeGustaFeature: true,
    featuredImage: "/media/maquina-sorvete-led-casamento-campinas.webp",
    sources: [
      {
        title: reel?.title ?? "Instagram Me Gusta",
        url: reel?.url ?? "https://www.instagram.com/megustasorveteamericano/"
      },
      {
        title: "Google Business Me Gusta",
        url: "https://share.google/668woTCo8D3MrTbg3"
      }
    ],
    content: [
      {
        type: "p",
        text: "Em eventos, o que marca nao e apenas o sabor. E a experiencia completa. E por isso que a Me Gusta continua aparecendo como uma das atracoes mais lembradas em Campinas e regiao."
      },
      {
        type: "h2",
        text: "Atendimento que transmite confianca"
      },
      {
        type: "p",
        text: "O servico inclui obrigatoriamente a maquina e um funcionario uniformizado. Isso melhora o fluxo, preserva o padrao e passa mais seguranca para quem esta organizando."
      },
      {
        type: "h2",
        text: "Visual que vira conteudo"
      },
      {
        type: "p",
        text: "A maquina com LED cria um ponto instagramavel no evento e ajuda a transformar sobremesa em experiencia. Isso aparece com frequencia nos posts e reels da marca."
      },
      {
        type: "h2",
        text: "O que o publico comenta"
      },
      {
        type: "p",
        text: review
          ? `${review.author} resumiu bem a percepcao geral: "${review.quote}"`
          : "As avaliacoes publicas reforcam qualidade, atendimento e impacto visual no evento."
      }
    ]
  };
}

function normalizeGeneratedPost(post, existingPosts) {
  const slugBase = slugify(post.slug || post.title || `post-${Date.now()}`);
  const existingSlugs = new Set(existingPosts.map((item) => item.slug));
  let slug = slugBase;
  let suffix = 2;

  while (existingSlugs.has(slug)) {
    slug = `${slugBase}-${suffix}`;
    suffix += 1;
  }

  return {
    slug,
    title: post.title?.trim() || "Novo post Me Gusta",
    description: post.description?.trim() || "Conteudo automatizado do blog Me Gusta.",
    date: post.date || new Date().toISOString().slice(0, 10),
    tags: Array.isArray(post.tags) && post.tags.length ? post.tags.slice(0, 8) : ["eventos", "Campinas"],
    category: post.category === "me-gusta" ? "me-gusta" : post.category === "guide" ? "guide" : "news",
    isAutomated: true,
    isMeGustaFeature: Boolean(post.isMeGustaFeature || post.category === "me-gusta"),
    featuredImage: sanitizeFeaturedImage(post.featuredImage),
    sources: Array.isArray(post.sources) && post.sources.length
      ? post.sources.map((source) => ({
          title: String(source.title || "Fonte"),
          url: String(source.url || siteUrl),
        }))
      : [{ title: "Me Gusta", url: siteUrl }],
    content: Array.isArray(post.content) && post.content.length
      ? post.content.map(normalizeBlock).filter(Boolean)
      : [{ type: "p", text: "Conteudo automatizado indisponivel." }],
  };
}

function normalizeBlock(block) {
  if (!block || typeof block !== "object") return null;
  if (block.type === "ul") {
    return {
      type: "ul",
      items: Array.isArray(block.items) ? block.items.map(String) : [],
    };
  }
  if (block.type === "h2") {
    return { type: "h2", text: String(block.text || "") };
  }
  return { type: "p", text: String(block.text || "") };
}

function sanitizeFeaturedImage(image) {
  const allowed = new Set([
    "/media/maquina-sorvete-led-casamento-campinas.webp",
    "/media/maquina-sorvete-operador-uniformizado-campinas.webp",
    "/media/sorvete-americano-pistache-evento-campinas.webp",
    "/media/sorvete-americano-festa-15-anos-campinas.webp",
    "/media/maquina-sorvete-feira-evento-grande-campinas.webp",
  ]);

  return allowed.has(image)
    ? image
    : "/media/maquina-sorvete-led-casamento-campinas.webp";
}

function countPostsSinceLastFeature(posts) {
  let count = 0;
  for (const post of posts) {
    if (post.isMeGustaFeature) break;
    count += 1;
  }
  return count;
}

async function collectNewsItems(feedUrls) {
  const settled = await Promise.allSettled(feedUrls.map(fetchRssItems));
  const items = settled.flatMap((result) => (result.status === "fulfilled" ? result.value : []));
  const seen = new Set();

  return items.filter((item) => {
    const key = `${item.title}|${item.url}`;
    if (!item.title || !item.url || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function fetchRssItems(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "MeGustaBlogAgent/1.0",
      Accept: "application/rss+xml, application/xml, text/xml",
    },
  });

  if (!response.ok) {
    throw new Error(`RSS indisponivel: ${url} (${response.status})`);
  }

  const xml = await response.text();
  const chunks = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => match[1]);

  return chunks.slice(0, 6).map((chunk) => ({
    title: decodeHtml(extractXmlValue(chunk, "title")),
    url: decodeHtml(extractXmlValue(chunk, "link")),
  }));
}

function extractXmlValue(chunk, tag) {
  const match = chunk.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match?.[1]?.trim() ?? "";
}

function decodeHtml(value) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function getFeedUrls() {
  const custom = process.env.BLOG_AGENT_NEWS_FEEDS;
  if (!custom) return defaultFeeds;
  return custom
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getExtraMeGustaNotes() {
  return (process.env.ME_GUSTA_REFERENCE_NOTES ?? "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function slugify(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function readJson(filePath) {
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw);
}
