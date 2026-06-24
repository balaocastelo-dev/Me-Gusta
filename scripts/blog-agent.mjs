import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const postsPath = path.join(rootDir, "src", "data", "blog-posts.generated.json");
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://me-gusta-seven.vercel.app").replace(
  /\/$/,
  ""
);
const dryRun = process.argv.includes("--dry-run");

const defaultFeeds = [
  "https://news.google.com/rss/search?q=gastronomia+Brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419",
  "https://news.google.com/rss/search?q=tendencias+gastronomia+restaurantes+Brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419",
  "https://news.google.com/rss/search?q=sobremesas+gastronomia+Brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419"
];

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function main() {
  const posts = await readJson(postsPath);
  const feedUrls = getFeedUrls();
  const newsItems = await collectNewsItems(feedUrls);
  const generated = createPostFromRss(newsItems, posts);

  const normalized = normalizeGeneratedPost(generated, posts);

  if (dryRun) {
    console.log(JSON.stringify(normalized, null, 2));
    return;
  }

  const nextPosts = [normalized, ...posts].slice(0, 60);
  await writeFile(postsPath, `${JSON.stringify(nextPosts, null, 2)}\n`, "utf8");

  console.log(
    `Novo post RSS salvo em ${postsPath}`
  );
}

function createPostFromRss(newsItems, existingPosts) {
  const existingSourceUrls = new Set(
    existingPosts.flatMap((post) => post.sources?.map((source) => source.url) ?? [])
  );
  const candidate = newsItems.find((item) => !existingSourceUrls.has(item.url));

  if (!candidate) {
    return createFallbackNewsPost();
  }

  const today = toDateOnly(candidate.pubDate) ?? new Date().toISOString().slice(0, 10);
  const cleanTitle = cleanupTitle(candidate.title) || "Notícia de gastronomia";
  const sourceName = detectSource(candidate) || "RSS de gastronomia";
  const excerpt = cleanupExcerpt(candidate.description || candidate.summary, sourceName);
  const intro = excerpt
    ? excerpt
    : "O blog da Me Gusta acompanha novidades do universo gastronômico para trazer ideias, tendências e referências atuais.";

  return {
    slug: slugify(cleanTitle),
    title: cleanTitle,
    description: truncate(
      excerpt ||
        `Confira uma novidade do mercado gastronômico publicada por ${sourceName} e veja como essa tendência pode inspirar experiências mais marcantes.`,
      180
    ),
    date: today,
    tags: extractTags(cleanTitle, excerpt),
    category: "news",
    isAutomated: true,
    isMeGustaFeature: false,
    featuredImage: pickFeaturedImage(cleanTitle),
    sources: [
      {
        title: sourceName,
        url: candidate.url,
      },
    ],
    content: [
      {
        type: "p",
        text: intro,
      },
      {
        type: "h2",
        text: "O que está acontecendo"
      },
      {
        type: "p",
        text: `A notícia publicada por ${sourceName} destaca o tema "${cleanTitle}".`,
      },
      {
        type: "h2",
        text: "Por que essa novidade chama atenção"
      },
      {
        type: "p",
        text: buildValueAngle(cleanTitle, excerpt),
      },
      {
        type: "h2",
        text: "Como essa tendência pode inspirar experiências mais especiais"
      },
      {
        type: "ul",
        items: [
          "Valorizar apresentação, sabor e impacto visual no momento da sobremesa.",
          "Criar experiências mais fotogênicas e memoráveis para os convidados.",
          "Acompanhar o mercado gastronômico para planejar eventos com repertório atual."
        ]
      }
    ],
  };
}

function createFallbackNewsPost() {
  const today = new Date().toISOString().slice(0, 10);

  return {
    slug: slugify(`noticias-de-gastronomia-${today}`),
    title: "Notícias e Tendências da Gastronomia em Destaque",
    description:
      "Atualização automática com notícias e tendências do universo gastronômico, reunindo temas que inspiram experiências mais marcantes.",
    date: today,
    tags: ["gastronomia", "tendências", "sobremesas", "mercado"],
    category: "news",
    isAutomated: true,
    isMeGustaFeature: false,
    featuredImage: "/media/maquina-sorvete-feira-evento-grande-campinas.webp",
    sources: [{ title: "RSS de gastronomia", url: siteUrl }],
    content: [
      {
        type: "p",
        text: "O blog da Me Gusta acompanha automaticamente fontes de notícias gastronômicas para destacar novidades que influenciam sabor, apresentação e experiência."
      },
      {
        type: "h2",
        text: "Acompanhamento contínuo do setor"
      },
      {
        type: "p",
        text: "Quando o feed não retorna uma notícia nova no momento da atualização, a página mantém um post informativo de apoio até a próxima captura automática."
      },
      {
        type: "h2",
        text: "Foco do conteúdo"
      },
      {
        type: "p",
        text: "As atualizações priorizam gastronomia, sobremesas, mercado food, tendências de consumo e referências que ajudam a compor eventos mais interessantes."
      },
      {
        type: "ul",
        items: [
          "Novidades do setor gastronômico.",
          "Tendências de sobremesas e consumo.",
          "Referências úteis para festas, casamentos e eventos."
        ]
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
    category: "news",
    isAutomated: true,
    isMeGustaFeature: false,
    featuredImage: sanitizeFeaturedImage(post.featuredImage),
    sources: Array.isArray(post.sources) && post.sources.length
      ? post.sources.map((source) => ({
          title: String(source.title || "Fonte"),
          url: String(source.url || siteUrl),
        }))
      : [{ title: "RSS de gastronomia", url: siteUrl }],
    content: Array.isArray(post.content) && post.content.length
      ? post.content.map(normalizeBlock).filter(Boolean)
      : [{ type: "p", text: "Atualização automática do blog indisponível no momento." }],
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
    description: stripHtml(decodeHtml(extractXmlValue(chunk, "description"))),
    summary: stripHtml(decodeHtml(extractXmlValue(chunk, "content:encoded"))),
    pubDate: decodeHtml(extractXmlValue(chunk, "pubDate")),
    source: decodeHtml(extractXmlValue(chunk, "source")) || extractChannelFromUrl(url),
  }));
}

function extractXmlValue(chunk, tag) {
  const match = chunk.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match?.[1]?.trim() ?? "";
}

function decodeHtml(value) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&nbsp;/g, " ")
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

function stripHtml(value) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeText(value) {
  return String(value ?? "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanupTitle(value) {
  return sanitizeText(String(value ?? "").replace(/\s*-\s*[^-]+$/, ""));
}

function cleanupExcerpt(value, sourceName) {
  const text = sanitizeText(value);
  if (!text) return "";
  return text
    .replace(new RegExp(`${escapeRegExp(sourceName)}$`), "")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(value, maxLength) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1).trim()}...`;
}

function extractTags(title, description) {
  const haystack = `${title} ${description ?? ""}`.toLowerCase();
  const tags = ["gastronomia"];

  if (haystack.includes("sobremesa") || haystack.includes("doce")) tags.push("sobremesas");
  if (haystack.includes("restaurante")) tags.push("restaurantes");
  if (haystack.includes("mercado")) tags.push("mercado");
  if (haystack.includes("tend")) tags.push("tendências");
  if (haystack.includes("consumo")) tags.push("consumo");

  return [...new Set(tags)].slice(0, 5);
}

function pickFeaturedImage(title) {
  const text = title.toLowerCase();

  if (text.includes("sobremesa") || text.includes("sorvete") || text.includes("doce")) {
    return "/media/sorvete-americano-pistache-evento-campinas.webp";
  }

  if (text.includes("feira") || text.includes("evento")) {
    return "/media/maquina-sorvete-feira-evento-grande-campinas.webp";
  }

  return "/media/maquina-sorvete-led-casamento-campinas.webp";
}

function buildValueAngle(title, excerpt) {
  if (excerpt) {
    return truncate(
      `${excerpt} Tendências como essa mostram como o mercado gastronômico segue valorizando experiência, apresentação e diferenciação.`,
      340
    );
  }

  return `O tema "${title}" reforça como o setor gastronômico está cada vez mais ligado à experiência, ao desejo e ao impacto visual.`;
}

function toDateOnly(value) {
  const parsed = value ? new Date(value) : null;
  if (!parsed || Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString().slice(0, 10);
}

function extractChannelFromUrl(url) {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    return hostname;
  } catch {
    return "RSS de gastronomia";
  }
}

function detectSource(item) {
  const explicit = sanitizeText(item.source);
  if (explicit && explicit !== "news.google.com") return explicit;

  const title = sanitizeText(item.title);
  const parts = title.split(" - ").map((part) => part.trim()).filter(Boolean);
  if (parts.length > 1) return parts.at(-1);

  return explicit || extractChannelFromUrl(item.url);
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
