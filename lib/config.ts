// Curated content configuration for homepage sections

export const START_HERE_SLUGS = [
  'oraciones-para-la-paz-interior',
  'oracion-para-la-paz-interior',
  'oracion-para-calmar-la-mente',
  'oracion-para-la-serenidad',
  'oracion-para-la-tranquilidad-interior',
  'oracion-para-encontrar-paz-interior',
];

export const FEATURED_SLUGS = [
  'oracion-para-el-silencio-interior',
  'oracion-para-descansar-el-alma',
  'oracion-para-soltar-pensamientos',
  'oracion-para-vivir-en-paz',
  'oracion-para-la-paz-del-corazon',
  'oracion-para-la-calma-interior',
];

// Primary prayer for main CTA
export const PRIMARY_PRAYER_SLUG = 'oraciones-para-la-paz-interior';

// Quick action categories with icons and slugs
export interface QuickAction {
  id: string;
  label: string;
  icon: 'anxiety' | 'gratitude' | 'protection' | 'family' | 'trust';
  slug: string;
}

export const QUICK_ACTIONS: QuickAction[] = [
  { id: 'calmar', label: 'Calmar', icon: 'trust', slug: 'oracion-para-calmar-la-mente' },
  { id: 'serenidad', label: 'Serenidad', icon: 'gratitude', slug: 'oracion-para-la-serenidad' },
  { id: 'silencio', label: 'Silencio', icon: 'protection', slug: 'oracion-para-el-silencio-interior' },
  { id: 'descanso', label: 'Descanso', icon: 'family', slug: 'oracion-para-descansar-el-alma' },
  { id: 'ansiedad', label: 'Ansiedad', icon: 'anxiety', slug: 'oracion-para-la-paz-en-la-ansiedad' },
];

// Daily verse for spiritual inspiration
export const DAILY_VERSES = [
  { text: 'La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da.', reference: 'Juan 14:27' },
  { text: 'Tú guardarás en completa paz a aquel cuyo pensamiento en ti persevera.', reference: 'Isaías 26:3' },
  { text: 'Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones.', reference: 'Filipenses 4:7' },
  { text: 'Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.', reference: 'Mateo 11:28' },
  { text: 'En quietud y en confianza será vuestra fortaleza.', reference: 'Isaías 30:15' },
];

export function getDailyVerse() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return DAILY_VERSES[dayOfYear % DAILY_VERSES.length];
}
