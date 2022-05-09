import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Component from './Component'

export default class Quiz extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public componentId: number

  @column()
  public title: string

  @column()
  public question: string

  @column()
  public options: string

  @column()
  public answer: string

  @column()
  public message: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Component)
  public component: BelongsTo<typeof Component>
}
