import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Component from 'App/Models/Component'
import Quiz from 'App/Models/Quiz'
import CreateQuizValidator from 'App/Validators/CreateQuizValidator'

export default class QuizzesController {
  public async index({ response }: HttpContextContract) {
    const quizzes = await Quiz.query().preload('component')

    return response.ok({ message: 'success fetch quizzes', data: quizzes })
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(CreateQuizValidator)
      const newQuiz = new Quiz()
      newQuiz.title = data.title
      newQuiz.question = data.question
      newQuiz.options = data.options
      newQuiz.answer = data.answer
      newQuiz.message = data.message
      newQuiz.componentId = data.componentId

      const quiz = await Component.findOrFail(newQuiz.componentId)
      await quiz?.related('quizzes').save(newQuiz)

      return response.created({ message: 'quiz is created' })
    } catch (error) {
      return response.unprocessableEntity({ message: error.messages })
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
