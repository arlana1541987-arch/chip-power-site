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

  function onClickCapture(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    e.stopPropagation();
    window.location.assign(new URL(href, window.location.origin).href);
  }

  return (
    <a href={href} className={className} onClickCapture={onClickCapture}>
      {children}
    </a>
  );
}
