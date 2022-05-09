import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Course from './Course'
import Component from './Component'

export default class Module extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public courseId: number

  @column()
  public title: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Course)
  public course: BelongsTo<typeof Course>

  @hasMany(() => Component)
  public components: HasMany<typeof Component>
}
