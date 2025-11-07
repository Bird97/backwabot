module.exports = {
  apps: [
    {
      name: "PLB_BACKEND",
      script: "dist/main.js",
      node_args: "-r tsconfig-paths/register",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
