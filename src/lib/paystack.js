// Loads Paystack Inline only when someone actually pays, instead of on every page load.
const SRC = 'https://js.paystack.co/v2/inline.js';
let loading;

const loadScript = () => {
  if (window.PaystackPop) return Promise.resolve(window.PaystackPop);
  if (!loading) {
    loading = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = SRC;
      s.async = true;
      s.onload = () => (window.PaystackPop ? resolve(window.PaystackPop) : reject(new Error('Paystack failed to load')));
      s.onerror = () => {
        loading = undefined;
        reject(new Error('Could not load the payment window. Check your connection or disable blockers and try again.'));
      };
      document.head.appendChild(s);
    });
  }
  return loading;
};

export const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '';

/**
 * Opens Paystack checkout. Resolves with { reference } on success, null if the user closes it.
 * The reference must then be sent to the API, which verifies it with Paystack server-side.
 */
export async function payWithPaystack({ email, amount, currency = 'NGN', metadata }) {
  if (!PAYSTACK_PUBLIC_KEY) throw new Error('Online payments are not configured yet. Please contact support.');
  if (!email) throw new Error('Your account has no email address.');
  const amountMinor = Math.round(Number(amount) * 100);
  if (!Number.isFinite(amountMinor) || amountMinor <= 0) throw new Error('This invoice has an invalid amount.');

  const PaystackPop = await loadScript();
  return new Promise((resolve, reject) => {
    try {
      new PaystackPop().newTransaction({
        key: PAYSTACK_PUBLIC_KEY,
        email,
        amount: amountMinor,
        currency,
        metadata,
        onSuccess: (tx) => resolve({ reference: tx.reference }),
        onCancel: () => resolve(null),
        onError: (err) => reject(new Error(err?.message || 'Payment could not be started')),
      });
    } catch (err) {
      reject(err);
    }
  });
}
