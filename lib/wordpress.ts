import { agencyInfoContent } from "@/lib/content";

type NextFetchConfig = {
  revalidate?: number | false;
  tags?: string[];
};

type GraphQLErrorItem = {
  message: string;
};

type GraphQLResponse<TData> = {
  data?: TData;
  errors?: GraphQLErrorItem[];
};

type WordPressCategoryNode = {
  name: string;
  slug: string;
};

type WordPressCategoriesConnection = {
  nodes: WordPressCategoryNode[];
};

type ArchivePostNode = {
  categories: WordPressCategoriesConnection;
  databaseId: number;
  date: string;
  excerpt: string;
  modified: string;
  slug: string;
  title: string;
};

type ArchivePostsQueryData = {
  posts: {
    nodes: ArchivePostNode[];
  };
};

type SinglePostNode = {
  categories: WordPressCategoriesConnection;
  content: string;
  databaseId: number;
  date: string;
  modified: string;
  slug: string;
  title: string;
};

type SinglePostQueryData = {
  post: SinglePostNode | null;
};

export type BlogCategory = {
  name: string;
  slug: string;
};

export type BlogPostPreview = {
  categories: BlogCategory[];
  date: string;
  databaseId: number;
  excerpt: string;
  modified: string;
  slug: string;
  title: string;
};

export type BlogPostDetail = {
  categories: BlogCategory[];
  content: string;
  date: string;
  databaseId: number;
  modified: string;
  slug: string;
  title: string;
};

const ARCHIVE_POSTS_QUERY = `
  query GetArchivePosts($first: Int = 10) {
    posts(first: $first) {
      nodes {
      databaseId
      slug
      title
      excerpt
      date
      modified
      categories {
        nodes {
          name
            slug
          }
        }
      }
    }
  }
`;

const SINGLE_POST_QUERY = `
  query GetSinglePost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      databaseId
      slug
      title
      content
      date
      modified
      categories {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

export async function fetchWordPressGraphQL<TData>(
  query: string,
  variables: Record<string, unknown> = {},
  nextConfig?: NextFetchConfig,
): Promise<TData> {
  const endpoint = process.env.WP_GRAPHQL_URL ?? agencyInfoContent.wpGraphqlUrl;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    ...(nextConfig ? { next: nextConfig } : {}),
  });

  if (!response.ok) {
    throw new Error(
      `WordPress GraphQL request failed with status ${response.status} ${response.statusText}`,
    );
  }

  let json: GraphQLResponse<TData>;

  try {
    json = (await response.json()) as GraphQLResponse<TData>;
  } catch {
    throw new Error("WordPress GraphQL response was not valid JSON.");
  }

  if (json.errors?.length) {
    throw new Error(
      `WordPress GraphQL error: ${json.errors.map((error) => error.message).join(" | ")}`,
    );
  }

  if (!json.data) {
    throw new Error("WordPress GraphQL response did not include a data payload.");
  }

  return json.data;
}

export async function getArchivePosts(
  first = 10,
  nextConfig: NextFetchConfig = { revalidate: 900 },
): Promise<BlogPostPreview[]> {
  const data = await fetchWordPressGraphQL<ArchivePostsQueryData>(
    ARCHIVE_POSTS_QUERY,
    { first },
    nextConfig,
  );

  return data.posts.nodes.map((post) => ({
    categories: post.categories.nodes.map(normalizeCategory),
    date: post.date,
    databaseId: post.databaseId,
    excerpt: toPlainText(post.excerpt),
    modified: post.modified,
    slug: post.slug,
    title: toPlainText(post.title),
  }));
}

export async function getSinglePost(
  slug: string,
  nextConfig: NextFetchConfig = { revalidate: 900 },
): Promise<BlogPostDetail | null> {
  const data = await fetchWordPressGraphQL<SinglePostQueryData>(
    SINGLE_POST_QUERY,
    { slug },
    nextConfig,
  );

  if (!data.post) {
    return null;
  }

  return {
    categories: data.post.categories.nodes.map(normalizeCategory),
    content: data.post.content,
    date: data.post.date,
    databaseId: data.post.databaseId,
    modified: data.post.modified,
    slug: data.post.slug,
    title: toPlainText(data.post.title),
  };
}

function normalizeCategory(category: WordPressCategoryNode): BlogCategory {
  return {
    name: toPlainText(category.name),
    slug: category.slug,
  };
}

function toPlainText(value: string) {
  return decodeHtmlEntities(
    value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(),
  );
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8230;/g, "...")
    .replace(/&#038;/g, "&")
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&rsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"');
}
