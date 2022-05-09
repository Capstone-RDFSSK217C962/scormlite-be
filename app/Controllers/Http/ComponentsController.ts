import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Component from 'App/Models/Component'

import Module from 'App/Models/Module'
import CreateComponentValidator from 'App/Validators/CreateComponentValidator'

export default class ComponentsController {
  public async index({ response }: HttpContextContract) {
    const components = await Component.query().preload('modules')

    return response.ok({ message: 'success fetch components', data: components })
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(CreateComponentValidator)
      const newComponent = new Component()
      newComponent.type = data.type
      newComponent.moduleId = data.moduleId

      const module = await Module.findOrFail(newComponent.moduleId)
      await module?.related('components').save(newComponent)

      return response.created({ message: 'component is created' })
    } catch (error) {
      return response.unprocessableEntity({ message: error.messages })
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
