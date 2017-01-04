import _ from 'lodash'
import chalk from 'chalk'
import readPkg from 'read-pkg'
import spawn from 'cross-spawn-promise'
import updateNotifier from 'update-notifier'
import yargs from 'yargs'

import pkg from '../package.json'

export default () => {
  updateNotifier({pkg}).notify()

  const parser = yargs
    .usage(`${chalk.bold('Usage:')} $0 <command>`)
    .help('h')
    .version()
    .alias('h', 'help')
    .recommendCommands()
  const opts = parser.argv

  if (opts.help) {
    return
  }

  return readPkg().then((pkg) => {
    if (!pkg.private) {
      throw new Error('`private` must be `true`')
    }
    if (!pkg.preferGlobal) {
      throw new Error('`preferGlobal` must be `true`')
    }

    const pkgs = _.map(pkg.dependencies, (v, k) => `${k}@${v}`)
    return spawn('npm', ['i', '-g', ...pkgs], {
      stdio: 'inherit',
    })
  })
}
