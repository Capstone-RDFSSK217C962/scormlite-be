import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Course from 'App/Models/Course'
import Module from 'App/Models/Module'
import CreateModuleValidator from 'App/Validators/CreateModuleValidator'

export default class ModulesController {
  public async index({ response }: HttpContextContract) {
    const modules = await Module.query().preload('course')

    return response.ok({ message: 'success fetch modules', data: modules })
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    try {
      const module = await request.validate(CreateModuleValidator)
      const newModule = new Module()
      newModule.title = module.title
      newModule.courseId = module.courseId

      const course = await Course.findOrFail(newModule.courseId)

      await course?.related('modules').save(newModule)

      return response.created({ message: 'module is created' })
    } catch (error) {
      return response.unprocessableEntity({ message: error.message })
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
