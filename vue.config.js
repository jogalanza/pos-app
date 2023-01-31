const path  = require("path")

module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    },
    cordovaPath: 'src-cordova'
  },

  transpileDependencies: [
    'quasar'
  ],

  configureWebpack: {
    resolve: {
      extensions: ['*', '.mjs', '.js', '.json'],
        symlinks: false,
        alias: {
            vue: path.resolve(`./node_modules/vue`)
        }
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        }
      ]
    }
  },

  publicPath: ''
}
