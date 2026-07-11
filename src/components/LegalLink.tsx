import type { MouseEvent, ReactNode } from "react";
import { sitePath } from "@/lib/siteBase";

type LegalPath = "/oferta" | "/privacy";

type LegalLinkProps = {
  to: LegalPath;
  className?: string;
  children: ReactNode;
};

/** Full page navigation — bypasses TanStack Router client-side routing. */
export function LegalLink({ to, className, children }: LegalLinkProps) {
  const href = sitePath(to);

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    window.location.assign(href);
  }

  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
