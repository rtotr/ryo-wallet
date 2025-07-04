/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v1.quasar.dev/quasar-cli/quasar-conf-js

const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = function (/* ctx */) {
  return {
    // https://v1.quasar.dev/quasar-cli/supporting-ts
    supportTS: false,

    // https://v1.quasar.dev/quasar-cli/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v1.quasar.dev/quasar-cli/boot-files
    boot: ['i18n', 'vuelidate', 'gateway', 'timeago'],

    // https://v1.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: ['app.styl'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      'roboto-font',
      'material-icons', // optional, you are not bound to it
      // "ionicons-v4",
      // "6",
      // "fontawesome-v6"
    ],

    // Full list of options: https://v1.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      sourceMap: true,

      // https://v1.quasar.dev/quasar-cli/handling-webpack
      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpack (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: [ 'js', 'vue' ] }])
      },

      extendWebpack (cfg) {
        cfg.module.rules.push({
          test: /RyoCoreCpp\.js$/,
          loader: 'exports-loader',
        })
        cfg.module.rules.push({
          test: /RyoCoreCpp\.wasm$/,
          type: 'javascript/auto',
          loader: 'file-loader',
          options: {
            name: '[name]-[hash].[ext]',
          },
        })
        /*
                cfg.module.rules.push({
                    enforce: "pre",
                    test: /\.(js|vue)$/,
                    loader: "eslint-loader",
                    exclude: /(node_modules|quasar)/
                })
                */
      },
    },

    // Full list of options: https://v1.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      // https: true,
      // port: 8080,
      open: true, // opens browser window automatically
    },

    // https://v1.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      components: [
        'QLayout',
        'QHeader',
        'QFooter',
        // 'QDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QTooltip',
        'QField',
        'QInput',
        'QRadio',
        'QBtn',
        'QBtnToggle',
        'QIcon',
        'QTabs',
        'QTab',
        'QRouteTab',
        'QBtnDropdown',
        'QMenu',
        'QDialog',
        'QLayout',
        'QStep',
        'QStepper',
        'QStepperNavigation',
        'QSpinner',
        'QSlider',
        'QChip',
        'QList',
        // 'QListHeader',
        'QItem',
        // 'QItemMain',
        'QSeparator',
        // 'QItemSide',
        // 'QItemTile',
        'QSelect',
        'QToggle',
        'QPageSticky',
        'QExpansionItem',
        'QCheckbox',
        'QInnerLoading',
        'QInfiniteScroll',
        'QDate',
        'QMenu',
        'QTable',
        'QTh',
        'QTr',
        'QTd',
        // 'QTableColumns',
      ],
      directives: ['Ripple', 'ClosePopup'],
      // Quasar plugins
      plugins: ['Notify', 'Loading', 'LocalStorage', 'Dialog'],
      // iconSet: 'material-icons'
      // lang: 'de' // Quasar language
    },

    // animations: 'all', // --- includes all animations
    // https://v1.quasar.dev/options/animations
    animations: [],

    // https://v1.quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false
    },

    // https://v1.quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      // workboxPluginMode: "InjectManifest",
      // workboxOptions: {},
      manifest: {
        // name: "Quasar App",
        // short_name: "Quasar-PWA",
        // description: "Best PWA App in town!",
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },

    // Full list of options: https://v1.quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // id: "org.cordova.quasar.app"
    },

    // Full list of options: https://v1.quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://v1.quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'builder', // or "packager"

      // More info: https://v1.quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,

      extendWebpack (cfg) {
        cfg.module.rules.push({
          test: /RyoCoreCpp\.js$/,
          loader: 'exports-loader',
        })
        cfg.module.rules.push({
          test: /RyoCoreCpp\.wasm$/,
          type: 'javascript/auto',
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        })
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: "",
        // appCategoryType: "",
        // osxSign: "",
        // protocol: "myapp://path",

        // Window only
        // win32metadata: { ... }

        extraResource: ['bin'],
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'com.ryo-currency.wallet',
        productName: 'Ryo Wallet Atom',
        artifactName: 'ryo-wallet.${ext}',
        copyright: 'Copyright © 2025 Ryo Currency Project',

        // directories: {
        //     buildResources: "src-electron/build"
        // },

        linux: {
          target: ['AppImage'],
          icon: 'src-electron/icons/icon_512x512.png',
          artifactName: 'ryo-wallet-linux-x64.${ext}',
          category: 'Finance',
        },

        win: {
          target: ['zip'],
          artifactName: 'ryo-wallet-win-x64.${ext}',
          icon: 'src-electron/icons/icon.ico',
        },

        mac: {
          target: ['dmg'],
          icon: 'src-electron/icons/icon.icns',
          artifactName: 'ryo-wallet-mac-arm64.${ext}',
          category: 'public.app-category.finance',
        },

        dmg: {
          background: 'src-electron/build/ryo-dmg.tiff',
        },

        extraResources: ['bin'],
      },
    },
  }
};
