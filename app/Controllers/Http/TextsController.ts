import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Component from 'App/Models/Component'
import Text from 'App/Models/Text'
import CreateTextValidator from 'App/Validators/CreateTextValidator'

export default class TextsController {
  public async index({ response }: HttpContextContract) {
    const texts = await Text.query().preload('component')

    return response.ok({ message: 'success fetch texts', data: texts })
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(CreateTextValidator)
      const newText = new Text()
      newText.title = data.title
      newText.content = data.content
      newText.componentId = data.componentId

      const text = await Component.findOrFail(newText.componentId)
      await text?.related('texts').save(newText)

      return response.created({ message: 'text is created' })
    } catch (error) {
      return response.unprocessableEntity({ message: error.messages })
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
