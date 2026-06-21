/** @type {import('pm2').StartOptions} */
module.exports = {
  apps: [
    {
      name: "art-nexus-next",
      cwd: "/root/back-nexus/Art-nexus-next",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: "3001",
        // Внутренний адрес API в Docker — без round-trip через публичный домен
        API_INTERNAL_URL: "http://127.0.0.1:3000",
      },
      max_memory_restart: "400M",
      exp_backoff_restart_delay: 100,
    },
  ],
};
