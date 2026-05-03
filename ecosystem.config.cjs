module.exports = {
  apps: [
    {
      name: "behind-the-wall",
      script: "server/index.js",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "256M",
      env: {
        NODE_ENV: "production",
        HOST: "127.0.0.1",
        PORT: 8787,
        BTW_DB_PATH: "/home/cloudpanel/var/lib/behind-the-wall/bookmarks.sqlite"
      }
    }
  ]
};
