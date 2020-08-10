const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  appBuild: resolveApp('build'),
  appBuildLib: resolveApp('build/lib'),
  appLib: resolveApp('lib'),
  appIndex: resolveApp('src/index.ts'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
}
