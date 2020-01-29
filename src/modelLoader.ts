import 'reflect-metadata'
import { Sequelize } from 'sequelize-typescript'

const modelLoader = async (sequelize: Sequelize) => {
  const models = [__dirname + '/**/*.model.ts']
  await sequelize.addModels(models)
  await sequelize.sync({ alter: true })
}

export = modelLoader
