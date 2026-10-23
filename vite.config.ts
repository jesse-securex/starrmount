import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Dev only: prints messages sent by src/lib/log.ts in the terminal running `npm run dev`.
function terminalLog(): Plugin {
  return {
    name: 'terminal-log',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__log', (req, res) => {
        let body = '';
        req.on('data', (chunk: Buffer) => (body += chunk));
        req.on('end', () => {
          try {
            const { level, message, detail } = JSON.parse(body);
            const time = new Date().toLocaleTimeString('en-GB');
            const text = `${time} [enquiry] ${message}${detail === undefined ? '' : ' ' + JSON.stringify(detail)}`;
            if (level === 'error') server.config.logger.error(`\x1b[31m${text}\x1b[0m`);
            else server.config.logger.info(text);
          } catch {
            // ignore malformed log messages
          }
          res.statusCode = 204;
          res.end();
        });
      });
    },
  };
}

export default defineConfig({
  // Relative asset paths, so the built site works from any folder on the host, not just the domain root.
  base: './',
  plugins: [react(), terminalLog()],
});
