import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Course from 'App/Models/Course'
import CreateCourseValidator from 'App/Validators/CreateCourseValidator'

export default class CoursesController {
  public async index({ response }: HttpContextContract) {
    const courses = await Course.query().preload('author')

    return response.ok({ message: 'success fetch courses', data: courses })
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const data = await request.validate(CreateCourseValidator)
      const newCourse = new Course()
      newCourse.title = data.title
      newCourse.description = data.description
      newCourse.duration = data.duration
      newCourse.code = data.code

      const authUser = auth.user
      await authUser?.related('courses').save(newCourse)
      return response.created({ message: 'course is created' })
    } catch (error) {
      return response.unprocessableEntity({ message: error.messages })
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
