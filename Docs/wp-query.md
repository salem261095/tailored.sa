These instructions mandate an enterprise-grade approach, prioritizing zero-runtime overhead, strict component boundaries, and optimal Core Web Vitals.

I have installed GraphQL plugin into my WP site we will have 2 tpyes of query

1. Archive Query (Home Page & /blog)
Execute this query to return the collection array. It strictly requests the title, excerpt, date, and nested categories, preventing the over-fetching of the main content payload.

GraphQL
query GetArchivePosts($first: Int = 10) {
  posts(first: $first) {
    nodes {
      databaseId
      slug
      title
      excerpt
      date
      categories {
        nodes {
          name
          slug
        }
      }
    }
  }
}
2. Single Post Query (/blog/[slug])
Execute this query dynamically on your single post route. It passes the URL parameter (slug) as an argument to resolve the specific node, pulling the full content payload.

GraphQL
query GetSinglePost($slug: ID!) {
  post(id: $slug, idType: SLUG) {
    databaseId
    title
    content
    date
    categories {
      nodes {
        name
        slug
      }
    }
  }
}

### Next.js Fetch Implementation
Utilize the Next.js extended fetch API within your Server Components to execute these queries against your WPGraphQL endpoint.

async function fetchWP(query, variables = {}) {
  const res = await fetch(process.env.WP_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    next: { revalidate: 3600 }
  });

  const json = await res.json();
  return json.data;
}

### 1. Rendering and Routing Paradigm
* **Default to Server Components:** Strictly enforce the React Server Component (RSC) architecture. Every component must be assumed as server-rendered by default to minimize client-side JavaScript payloads.

* **Isolate Client Boundaries:** The `"use client"` directive must only be applied at the lowest possible leaf nodes in the component tree. Never wrap entire page layouts or parent containers in a client boundary. Only isolate components that explicitly require browser APIs, state, or event listeners (e.g., interactive forms, custom cursors).

* **Route Colocation:** Maintain strict structural organization within the App Router. Colocate page-specific utilities, types, and localized UI components directly within their respective route segments to prevent global directory bloat.

### 2. Data Fetching and State Management
* **Build-Time File Resolution:** All static JSON data (the 90% static content) must be read directly from the file system at build time within Server Components. Do not execute network requests for internal static files.
* **GraphQL Query Strictness:** When interfacing with the WPGraphQL endpoint, prohibit over-fetching. Developers must write explicit, narrowly scoped GraphQL queries tailored specifically to the data requirements of the individual component. 
* **Caching and ISR Governance:** Enforce the Next.js extended fetch cache policies. Use time-based Incremental Static Regeneration (ISR) for dynamic WordPress content to eliminate database bottlenecks. Mandate on-demand revalidation via webhooks for time-sensitive content updates to bypass arbitrary cache timers.
* **Eliminate Global State Bloat:** Prohibit the use of heavy client-side state managers (like Redux) for standard data flow. Rely on the server-side cache and pass data via props. Use React Context only for lightweight, global UI states (e.g., theme toggle, modal orchestration).

### 3. Performance and Asset Optimization
* **Strict Media Handling:** Mandate the use of the Next.js Image component for all raster graphics. Developers must configure exact `width` and `height` attributes, or utilize the `fill` property with relative parents, to mathematically eliminate Cumulative Layout Shift (CLS).
* **Remote Pattern Whitelisting:** Enforce a strict security perimeter for external media. All headless WordPress domains must be explicitly declared in the Next.js configuration's remote patterns to prevent malicious image source execution.
* **Font Subsetting:** Utilize `next/font` to host all typography locally. This prevents external network requests to Google Fonts, eliminates render-blocking resources, and forces zero layout shift during font loading.

### 4. SEO and Semantic Integrity
* **Dynamic Metadata Generation:** Require the Next.js Metadata API for all dynamic routes. Developers must programmatically extract SEO parameters from the GraphQL queries (titles, descriptions, Open Graph data) and inject them into the server-rendered `head`.
* **Structured Data Protocols:** Enforce the programmatic generation of Schema.org JSON-LD scripts within Server Components for all blog posts, services, and organizational entities to secure rich snippet eligibility.
* **Semantic HTML5 Architecture:** Reject nested `div` soup. Require strict adherence to semantic landmarks (`<main>`, `<article>`, `<section>`, `<aside>`) to ensure structural logic for web crawlers and accessibility technologies.

### 5. Type Safety and Error Handling
* **Rigid TypeScript Contracts:** Enforce strict typing across the entire codebase. Developers must generate TypeScript interfaces that exactly mirror the expected GraphQL response shapes and the static JSON schema. Prohibit the use of `any` or implicit type assertions.
* **Graceful Degradation:** Mandate the use of `error.tsx` and `not-found.tsx` boundaries within the App Router to catch server-side fetching failures and prevent full application crashes. Provide fallback UI components for unresolved dynamic routes.