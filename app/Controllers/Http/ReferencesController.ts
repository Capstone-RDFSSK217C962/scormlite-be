import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Component from 'App/Models/Component'
import Reference from 'App/Models/Reference'
import CreateReferenceValidator from 'App/Validators/CreateReferenceValidator'

export default class TextsController {
  public async index({ response }: HttpContextContract) {
    const references = await Reference.query().preload('component')

    return response.ok({ message: 'success fetch references', data: references })
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(CreateReferenceValidator)
      const newReference = new Reference()
      newReference.content = data.content
      newReference.componentId = data.componentId

      const reference = await Component.findOrFail(newReference.componentId)
      await reference?.related('references').save(newReference)

      return response.created({ message: 'reference is created' })
    } catch (error) {
      return response.unprocessableEntity({ message: error.messages })
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
