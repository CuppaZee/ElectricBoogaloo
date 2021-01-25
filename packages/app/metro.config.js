const path = require("path");
function getConfig(appDir, options = {}) {
  return {
    transformer: {
      assetPlugins: ["expo-asset/tools/hashAssetFiles"],
    },
    watchFolders: [path.resolve(appDir, "../../node_modules")],
  };
}

module.export = getConfig(__dirname);
