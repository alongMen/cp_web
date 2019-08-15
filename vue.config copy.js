
module.exports = {
  
  devServer: {
    disableHostCheck: true,
    port: 8080,
    proxy: {
      '/api': {
          target: 'http://192.168.124.8:3000',
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/api': ''
          }
      }
  }
  },
};