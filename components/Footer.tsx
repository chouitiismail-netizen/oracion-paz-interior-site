import Link from 'next/link';
import Container from './ui/Container';
import { getLegalHrefMap } from '../lib/content';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const legalHrefs = getLegalHrefMap();

  return (
    <footer className="mt-16 py-12 bg-[var(--card)] border-t border-[var(--border)]">
      <Container>
        <div className="space-y-8">
          {/* Brand */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z"/>
              </svg>
              <h3 className="text-base font-semibold text-[var(--foreground)] font-[var(--font-serif)]">
                Oraciones para la paz interior
              </h3>
            </div>
            <p className="text-sm text-[var(--muted)] max-w-sm mx-auto">
              Calma tu mente y descansa el corazón en Dios
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Enlaces del pie de página" className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link href="/" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
              Inicio
            </Link>
            {legalHrefs.avisoLegalHref && (
              <>
                <span className="text-[var(--border)]" aria-hidden="true">•</span>
                <Link href={legalHrefs.avisoLegalHref} className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                  Aviso Legal
                </Link>
              </>
            )}
            {legalHrefs.privacidadHref && (
              <>
                <span className="text-[var(--border)]" aria-hidden="true">•</span>
                <Link href={legalHrefs.privacidadHref} className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                  Privacidad
                </Link>
              </>
            )}
            <span className="text-[var(--border)]" aria-hidden="true">•</span>
            <a
              href="https://www.jesuscontigo.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:text-[var(--accent-dark)] font-medium transition-colors"
              aria-label="Visitar Jesús Contigo (se abre en una nueva pestaña)"
            >
              Jesús Contigo →
            </a>
          </nav>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-xs text-[var(--muted)]">
              © {currentYear} Oraciones para la paz interior. Contenido original.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
