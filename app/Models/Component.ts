import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Text from 'App/Models/Text'
import Reference from 'App/Models/Reference'
import Video from 'App/Models/Video'
import Quiz from 'App/Models/Quiz'
import Module from './Module'

export default class Component extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: string

  @column()
  public moduleId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Module)
  public modules: BelongsTo<typeof Module>

  @hasMany(() => Text)
  public texts: HasMany<typeof Text>

  @hasMany(() => Reference)
  public references: HasMany<typeof Reference>

  @hasMany(() => Video)
  public videos: HasMany<typeof Video>

  @hasMany(() => Quiz)
  public quizzes: HasMany<typeof Quiz>
}
