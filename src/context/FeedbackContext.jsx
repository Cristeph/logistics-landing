import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

const FeedbackContext = createContext(null);

const ICONS = {
  success: <CheckCircle2 className="size-5 text-emerald-600" aria-hidden />,
  error: <XCircle className="size-5 text-brand-600" aria-hidden />,
  warning: <AlertTriangle className="size-5 text-amber-500" aria-hidden />,
  info: <Info className="size-5 text-ink-500" aria-hidden />,
};

/** Toasts + a promise-based confirm dialog, replacing sweetalert2 (~60 kB) with ~2 kB. */
export function FeedbackProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [dialog, setDialog] = useState(null);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const toast = useCallback(
    (message, { type = 'success', title, duration = 4500 } = {}) => {
      const id = ++idRef.current;
      setToasts((t) => [...t.slice(-3), { id, message, type, title }]);
      if (duration) setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss]
  );

  const confirm = useCallback(
    (opts) =>
      new Promise((resolve) => {
        setDialog({ confirmLabel: 'Confirm', cancelLabel: 'Cancel', tone: 'primary', ...opts, resolve });
      }),
    []
  );

  const closeDialog = (result) => {
    dialog?.resolve(result);
    setDialog(null);
  };

  const value = useMemo(
    () => ({
      toast,
      success: (m, o) => toast(m, { ...o, type: 'success' }),
      error: (m, o) => toast(m, { duration: 7000, ...o, type: 'error' }),
      info: (m, o) => toast(m, { ...o, type: 'info' }),
      confirm,
    }),
    [toast, confirm]
  );

  return (
    <FeedbackContext.Provider value={value}>
      {children}

      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex flex-col items-center gap-2 p-4 sm:top-4 sm:bottom-auto sm:items-end"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role={t.type === 'error' ? 'alert' : 'status'}
            className="pointer-events-auto flex w-full max-w-sm animate-pop items-start gap-3 rounded-xl border border-ink-100 bg-white p-4 shadow-lift"
          >
            {ICONS[t.type]}
            <div className="min-w-0 flex-1 text-sm">
              {t.title && <p className="font-semibold text-ink-900">{t.title}</p>}
              <p className="break-words text-ink-600">{t.message}</p>
            </div>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              className="-m-1 rounded-md p-1 text-ink-400 hover:bg-ink-50 hover:text-ink-700"
              aria-label="Dismiss notification"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
      </div>

      <Modal open={!!dialog} onClose={() => closeDialog(false)} title={dialog?.title} size="sm">
        {dialog?.message && <p className="text-sm text-ink-600">{dialog.message}</p>}
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={() => closeDialog(false)}>
            {dialog?.cancelLabel}
          </Button>
          <Button variant={dialog?.tone === 'danger' ? 'danger' : 'primary'} onClick={() => closeDialog(true)} autoFocus>
            {dialog?.confirmLabel}
          </Button>
        </div>
      </Modal>
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  const ctx = useContext(FeedbackContext);
  if (!ctx) throw new Error('useFeedback must be used inside <FeedbackProvider>');
  return ctx;
}
