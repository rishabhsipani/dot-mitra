/* Section IDs and Navigation Config */

export const SECTIONS = {
  HERO: 'hero',
  PROBLEM: 'problem',
  SOLUTION: 'solution',
  ENTERPRISE: 'enterprise-features',
  DEPLOYMENT: 'deployment',
  DEPARTMENTS: 'departments',
  DEMO: 'demo',
  USE_CASES: 'use-cases',
  PRICING: 'pricing',
  ANALYTICS: 'analytics',
  FAQ: 'faq',
  FOOTER: 'footer',
};

export const NAV_LINKS = [
  { label: 'Features', href: `#${SECTIONS.SOLUTION}` },
  { label: 'Enterprise', href: `#${SECTIONS.ENTERPRISE}` },
  { label: 'Use Cases', href: `#${SECTIONS.USE_CASES}` },
  { label: 'Pricing', href: `#${SECTIONS.PRICING}` },
  { label: 'FAQ', href: `#${SECTIONS.FAQ}` },
];

export const FRAME_COUNT = 216;
export const FRAME_PATH =
  `${import.meta.env.BASE_URL}frames/ezgif-frame-`;
export const FRAME_EXTENSION = '.png';

export function getFrameSrc(index) {
  const num = String(index + 1).padStart(3, '0');
  return `${FRAME_PATH}${num}${FRAME_EXTENSION}`;
}
