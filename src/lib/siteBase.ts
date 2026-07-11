const GITHUB_PAGES_PREFIX = "/chip-power-site";

/** Base URL for static assets (always ends with `/`). */
export function getSiteBase(): string {
  const fromEnv = import.meta.env.BASE_URL ?? "/";
  if (fromEnv !== "/") {
    return fromEnv.endsWith("/") ? fromEnv : `${fromEnv}/`;
  }

  if (typeof window !== "undefined" && window.location.pathname.startsWith(GITHUB_PAGES_PREFIX)) {
    return `${GITHUB_PAGES_PREFIX}/`;
  }

  return "/";
}

/** TanStack Router basepath (no trailing slash), or undefined at site root. */
export function getRouterBasepath(): string | undefined {
  const base = getSiteBase();
  if (base === "/") return undefined;
  return base.replace(/\/$/, "");
}

/** Absolute site path for links (works on GitHub Pages and Cloudflare). */
export function sitePath(path: string): string {
  if (path.startsWith("#")) {
    return `${getSiteBase()}${path}`;
  }
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${getSiteBase()}${clean}`;
}
