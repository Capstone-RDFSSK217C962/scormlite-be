import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.table('users', (table) => {
      table.renameColumn('name', 'username')
    })
  }

  public async down() {
    this.schema.table('users', (table) => {
      table.renameColumn('username', 'name')
    })
  }
}
