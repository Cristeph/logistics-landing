import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';

const SIZES = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };
const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/** Accessible modal: portal, Escape to close, focus trap, focus restore, background scroll lock. */
export function Modal({ open, onClose, title, description, size = 'md', children, footer }) {
  const panelRef = useRef(null);
  const titleId = useId();
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const panel = panelRef.current;
    const first = panel?.querySelector('[autofocus]') || panel?.querySelector(FOCUSABLE);
    (first || panel)?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCloseRef.current?.();
      } else if (e.key === 'Tab' && panel) {
        const items = [...panel.querySelectorAll(FOCUSABLE)];
        if (!items.length) return;
        const [a, z] = [items[0], items[items.length - 1]];
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault();
          z.focus();
        } else if (!e.shiftKey && document.activeElement === z) {
          e.preventDefault();
          a.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <div className="absolute inset-0 animate-fade-in bg-ink-950/50 backdrop-blur-[2px]" onClick={onClose} aria-hidden />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        className={cn(
          'relative flex max-h-[92dvh] w-full animate-pop flex-col overflow-hidden rounded-t-2xl bg-white shadow-lift outline-none sm:rounded-2xl',
          SIZES[size]
        )}
      >
        {(title || onClose) && (
          <div className="flex items-start justify-between gap-4 border-b border-ink-100 px-5 py-4 sm:px-6">
            <div className="min-w-0">
              {title && (
                <h2 id={titleId} className="font-sans text-lg font-semibold text-ink-900">
                  {title}
                </h2>
              )}
              {description && <p className="mt-0.5 text-sm text-ink-500">{description}</p>}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="-mr-2 rounded-lg p-2 text-ink-400 hover:bg-ink-50 hover:text-ink-700"
              aria-label="Close dialog"
            >
              <X className="size-5" />
            </button>
          </div>
        )}
        <div className="overflow-y-auto px-5 py-5 sm:px-6">{children}</div>
        {footer && <div className="flex flex-col-reverse gap-2 border-t border-ink-100 bg-ink-50/50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}
