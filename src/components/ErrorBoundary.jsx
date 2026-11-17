import { Component } from 'react';

/** Last-resort boundary so a render error shows a recovery screen instead of a blank page. */
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Unhandled UI error', error, info?.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    // A failed lazy chunk after a deploy is the most common cause: a reload fixes it.
    const chunkError = /dynamically imported module|Loading chunk|Importing a module script failed/i.test(
      String(this.state.error?.message)
    );
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-ink-50 px-6 text-center">
        <h1 className="text-2xl">{chunkError ? 'A new version is available' : 'Something went wrong'}</h1>
        <p className="max-w-md text-sm text-ink-600">
          {chunkError
            ? 'The site was updated while you had it open. Reload to get the latest version.'
            : 'An unexpected error occurred. Reloading the page usually fixes it.'}
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
        >
          Reload page
        </button>
      </div>
    );
  }
}
