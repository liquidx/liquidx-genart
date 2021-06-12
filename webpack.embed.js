const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const jsTargets = (piecesPath) => {
  return fs.readdirSync(piecesPath)
    .filter(v => { return v.endsWith('.js') })
    .map(v => v.replace('.js', ''))

}


const webpackConfig = (srcPath, templatePath, htmlOutputPath, pieceTemplatePath, piecesOutputDir) => {
  const chunkName = 'genart'

  const entry = {}
  entry[chunkName] = {
    import: [
      path.resolve(srcPath, `base.js`),
      path.resolve(srcPath, `genart.scss`),
    ],
  }

  const plugins = [
    new HtmlWebpackPlugin({
      filename: htmlOutputPath || 'index.html',
      template: templatePath || path.join(srcPath, 'index.hbs'),
      chunks: [chunkName]
    }),
  ]

  // Append each prototype.
  const piecesPath = path.join(__dirname, 'src', 'pieces')
  for (let target of jsTargets(piecesPath)) {
    entry[target] = path.resolve(srcPath, 'pieces', `${target}.js`)

    plugins.push(new HtmlWebpackPlugin({
      filename: path.join(piecesOutputDir, `${target}`, 'index.html'),
      template: pieceTemplatePath,
      templateParameters: {
        name: target
      },
      chunks: [target, chunkName]
    }))
  }

  return {
    entry,
    plugins
  }
}

module.exports = {
  webpackConfig
}