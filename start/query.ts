import emitter from '@adonisjs/core/services/emitter'
import chalk from 'chalk'

emitter.on('db:query', (query) => {
  //   console.log(query.sql)
  console.log(chalk.blue(`DB Query: ${query.sql} `))
})
