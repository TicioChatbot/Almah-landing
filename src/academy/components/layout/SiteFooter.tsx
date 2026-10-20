import Image from "@/components/ui/Image";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Section";
import { LEGAL_LINKS, SITE } from "@/config/site";

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.22 8.25h4.55V24H.22V8.25ZM8.34 8.25h4.36v2.15h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 6.99V24h-4.55v-7.87c0-1.88-.03-4.29-2.62-4.29-2.62 0-3.02 2.05-3.02 4.16V24H8.34V8.25Z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 5.68a4.16 4.16 0 1 0 0 8.32 4.16 4.16 0 0 0 0-8.32Zm0 6.86a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Zm5.3-7.02a.97.97 0 1 1-1.94 0 .97.97 0 0 1 1.94 0Z" />
    </svg>
  );
}

const SOCIAL = [
  { label: "LinkedIn", href: SITE.social.linkedin, Icon: LinkedInIcon },
  { label: "Instagram", href: SITE.social.instagram, Icon: InstagramIcon },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative bg-surface">
      {/* Línea superior con el degradado de marca */}
      <div aria-hidden="true" className="h-1 w-full bg-brand-gradient" />
      <Container className="py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-5">
            <Image
              src="/assets/brand/almah-logo-color.png"
              alt="Almah Academy"
              width={795}
              height={347}
              className="h-auto w-40"
            />
            <ul className="flex gap-5">
              {SOCIAL.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 font-display font-bold text-ink-soft transition-colors duration-(--duration-fast) hover:text-navy"
                  >
                    <Icon className="size-6 transition-transform duration-(--duration-base) ease-(--ease-out-quart) group-hover:-translate-y-0.5" />
                    <span className="link-underline">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="footer-legal" className="flex flex-col gap-3">
            <h2
              id="footer-legal"
              className="font-display text-xl font-bold text-ink-soft"
            >
              Legal
            </h2>
            <ul className="flex flex-col gap-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="link-underline text-ink-soft/80 transition-colors duration-(--duration-fast) hover:text-navy"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-10 border-t border-ink/10 pt-6 text-center text-sm text-ink-soft/70">
          {new Date().getFullYear()} © {SITE.name}. Todos los derechos
          reservados.
        </p>
      </Container>
    </footer>
  );
}
