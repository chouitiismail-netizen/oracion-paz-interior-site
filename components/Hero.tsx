import Link from 'next/link';
import Button from './ui/Button';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

export default function Hero({ title, subtitle, ctaText, ctaHref }: HeroProps) {
  return (
    <section className="py-12 md:py-16 text-center" aria-labelledby="hero-title">
      <div className="max-w-3xl mx-auto px-4">
        <h1 id="hero-title" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[var(--foreground)]">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-[var(--muted)] mb-8 leading-relaxed">
          {subtitle}
        </p>
        <Button href={ctaHref} variant="primary" size="lg">
          {ctaText}
        </Button>
      </div>
    </section>
  );
}
