/* Animation preset objects for GSAP */

export const fadeUp = {
  y: 40,
  opacity: 0,
  duration: 0.8,
  ease: 'power2.out',
};

export const fadeDown = {
  y: -20,
  opacity: 0,
  duration: 0.6,
  ease: 'power2.out',
};

export const fadeIn = {
  opacity: 0,
  duration: 0.8,
  ease: 'power2.out',
};

export const scaleIn = {
  scale: 0.92,
  opacity: 0,
  duration: 1,
  ease: 'power3.out',
};

export const slideRight = {
  x: 60,
  opacity: 0,
  duration: 0.8,
  ease: 'power2.out',
};

export const slideLeft = {
  x: -60,
  opacity: 0,
  duration: 0.8,
  ease: 'power2.out',
};

export const staggerConfig = {
  each: 0.1,
  from: 'start',
};

export const staggerCardsConfig = {
  each: 0.12,
  from: 'start',
};
