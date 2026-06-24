import generatedPosts from "@/data/blog-posts.generated.json";

export type BlogContentBlock = {
  type: "p" | "h2" | "ul";
  text?: string;
  items?: string[];
};

export type BlogSource = {
  title: string;
  url: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: "news" | "guide" | "me-gusta";
  isAutomated: boolean;
  isMeGustaFeature: boolean;
  featuredImage: string;
  sources: BlogSource[];
  content: BlogContentBlock[];
};

export const blogPosts: BlogPost[] = generatedPosts as BlogPost[];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug) ?? null;
}

export function getSortedBlogPosts() {
  return blogPosts
    .map((post, index) => ({ post, index }))
    .sort((a, b) => {
      if (a.post.date === b.post.date) return a.index - b.index;
      return a.post.date < b.post.date ? 1 : -1;
    })
    .map(({ post }) => post);
}

export function getLatestBlogPosts(limit = 3) {
  return getSortedBlogPosts().slice(0, limit);
}
