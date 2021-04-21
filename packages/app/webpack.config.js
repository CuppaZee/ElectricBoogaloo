const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = async function (env, argv) {
  const isProd = env.mode === "production";
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ["@ui-kitten/components", "moti", "@motify"],
      },
      removeUnusedImportExports: isProd,
    },
    argv
  );
  // Customize the config before returning it.

    // if (env.mode === "production") {
    //   config.plugins.push(
    //     new BundleAnalyzerPlugin({
    //       path: "web-report",
    //     })
    //   );
    // }

  if (config["plugins"]) {
    config["plugins"].forEach(plugin => {
      // detect workbox plugin
      if (plugin["config"] && plugin["config"]["swDest"] === "service-worker.js") {
        // tell it never to cache index.html or service-worker.js
        plugin["config"]["exclude"].push(/index.html/);
        plugin["config"]["exclude"].push(/service-worker.js/);

        // (optional) tell it to start new service worker versions immediately, even if tabs
        // are still running the old one.
        plugin["config"]["skipWaiting"] = true;
      }
    });
  }

  for (const rule of config.module.rules) {
    if (
      rule.oneOf &&
      rule.oneOf.some(
        i =>
          i.include &&
          typeof i.include === "object" &&
          i.include.some &&
          i.include.some(b => b.includes("react-native-vector-icons"))
      )
    ) {
      const r = rule.oneOf.find(
        i =>
          i.include &&
          typeof i.include === "object" &&
          i.include.some &&
          i.include.some(b => b.includes("react-native-vector-icons"))
      );
      r.use[0].options.name = "./fonts/[name].[hash:8].[ext]";
    }
  }

  if (config.optimization && config.optimization.runtimeChunk) {
    config.optimization.runtimeChunk = {
      name: entrypoint => `runtime---${entrypoint.name}`,
    };
  }

  return config;
};
