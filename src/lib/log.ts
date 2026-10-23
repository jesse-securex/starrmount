type Level = 'info' | 'error';

/**
 * Logs to the browser console and, while running `npm run dev`, to the terminal too
 * (via the `/__log` endpoint added in vite.config.ts).
 */
export function log(level: Level, message: string, detail?: unknown) {
  (level === 'error' ? console.error : console.info)(`[enquiry] ${message}`, detail ?? '');
  if (!import.meta.env.DEV) return;
  fetch('/__log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ level, message, detail: describe(detail) }),
  }).catch(() => {});
}

function describe(detail: unknown): unknown {
  if (detail instanceof Error) return { name: detail.name, message: detail.message };
  return detail;
}
