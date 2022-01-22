module.exports = {
  apps: [
    {
      name: "Remark API",
      cwd: "./",
      script: "./apps/api/dist/main.js",
      exec_mode: "cluster",
      instances: "max",
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "Remark CDN",
      cwd: "./",
      script: "./apps/cdn/dist/main.js",
      exec_mode: "cluster",
      instances: "max",
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "Remark Web",
      cwd: "./apps/web/dist",
      script: "../../../node_modules/.bin/next start",
    },
  ],
};
