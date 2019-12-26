// vue.config.js file to be place in the root of your repository
// make sure you update `yourProjectName` with the name of your GitLab project

// module.exports = {
//   publicPath: process.env.NODE_ENV === 'production' ? '/couchdocs/' : '/'
// }

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\logo_nt.(png)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'files/[name].[ext]'
              }
            }
          ]
        }
      ]
    }
  }
}
