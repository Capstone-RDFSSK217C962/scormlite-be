import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Quizzes extends BaseSchema {
  protected tableName = 'quizzes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('question').notNullable()
      table.string('options').notNullable()
      table.string('answer').notNullable()
      table.string('message').notNullable()
      table.integer('component_id').unsigned().references('components.id').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
