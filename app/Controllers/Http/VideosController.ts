import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Component from 'App/Models/Component'
import Video from 'App/Models/Video'
import CreateVideoValidator from 'App/Validators/CreateVideoValidator'

export default class VideosController {
  public async index({ response }: HttpContextContract) {
    const videos = await Video.query().preload('component')

    return response.ok({ message: 'success fetch videos', data: videos })
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(CreateVideoValidator)
      const newVideo = new Video()
      newVideo.title = data.title
      newVideo.url = data.url
      newVideo.componentId = data.componentId

      const video = await Component.findOrFail(newVideo.componentId)
      await video?.related('videos').save(newVideo)

      return response.created({ message: 'video is created' })
    } catch (error) {
      return response.unprocessableEntity({ message: error.messages })
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
