import { useEffect, useRef, useState } from 'react';

export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Cristeph Logistics` : 'Cristeph Logistics';
  }, [title]);
}

/** Adds .is-visible to [data-reveal] children as they scroll into view (one IntersectionObserver). */
export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || !('IntersectionObserver' in window)) return undefined;
    document.documentElement.classList.add('js-reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    root.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

/** Tracks whether the page has scrolled past a threshold (passive listener, rAF-throttled). */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > threshold));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, [threshold]);
  return scrolled;
}
