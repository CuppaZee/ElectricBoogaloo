import sentryConf from "./sentry.config.json";

module.exports = {
  expo: {
    name: "CuppaZee",
    owner: "sohcah",
    slug: "PaperZee",
    privacy: "public",
    platforms: ["ios", "android", "web"],
    version: "2.1.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    githubUrl: "https://github.com/CuppaZee/CuppaZee",
    scheme: "cuppazee",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#00C35B",
    },
    hooks: {
      postPublish: [
        {
          file: "sentry-expo/upload-sourcemaps",
          config: sentryConf,
        },
      ],
    },
    updates: {
      fallbackToCacheTimeout: 30000,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      bundleIdentifier: "uk.cuppazee.paper",
      buildNumber: "2.0.0",
      icon: "./assets/images/icon.png",
      requireFullScreen: false,
      supportsTablet: true,
      infoPlist: {
        NSCameraUsageDescription: "CuppaZee uses the camera to scan Munzees.",
        NSLocationWhenInUseUsageDescription: "CuppaZee uses your location when in use for maps.",
        NSLocationAlwaysAndWhenInUseUsageDescription:
          "CuppaZee uses your location when in use for maps, and in the background for notifications.",
        NSLocationAlwaysUsageDescription:
          "CuppaZee uses your location when in use for maps, and in the background for notifications.",
        NSPhotoLibraryUsageDescription: "CuppaZee uses your photo library to save screenshots.",
      },
      config: {
        googleMapsApiKey: "AIzaSyAT1J1Z5S02Avk9p4IqUKPtEYOV7gI8-PA",
      },
      associatedDomains: ["applinks:cuppazee.app"],
    },
    android: {
      config: {
        googleMaps: {
          apiKey: "AIzaSyBDgPXi66fB9Yd4XyAhEnDaA0XrqdbvEDo",
        },
      },
      package: "uk.cuppazee.paper",
      versionCode: 9,
      icon: "./assets/images/icon.png",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#00C35B",
      },
      permissions: [
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION",
        "CAMERA",
        "VIBRATE",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
      ],
      intentFilters: [
        {
          action: "VIEW",
          data: {
            scheme: "https",
            host: "cuppazee.app",
          },
          category: ["BROWSABLE", "DEFAULT"],
        },
      ],
    },
    web: {
      favicon: "./assets/images/favicon.png",
      config: {
        firebase: {
          apiKey: "AIzaSyA6J5hg1-l3WmUIlIHG7MyRInCEOq8PILQ",
          authDomain: "cuppazee-app.firebaseapp.com",
          databaseURL: "https://cuppazee-app.firebaseio.com",
          projectId: "cuppazee-app",
          storageBucket: "cuppazee-app.appspot.com",
          messagingSenderId: "540446857818",
          appId: "1:540446857818:web:8c46372437e44153885663",
          measurementId: "G-N95SJ4K363",
        },
      },
    },
    notification: {
      icon: "./assets/images/notification.png",
      color: "#00C35B",
      iosDisplayInForeground: true,
      androidMode: "default",
      androidCollapsedTitle: "#{unread_notifications} Alerts",
    },
  },
};
