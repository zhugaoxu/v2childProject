
module.exports = {
  outputDir: 'fenfen',
  productionSourceMap: false,
  devServer: {
    hot: false,
    disableHostCheck: true,
    port: 8080,
    open: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: ``,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      },
    },
  },
  lintOnSave: false,

}
