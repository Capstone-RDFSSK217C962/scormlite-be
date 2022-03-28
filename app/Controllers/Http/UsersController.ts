import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
// import Database from '@ioc:Adonis/Lucid/Database'

// models
import User from 'App/Models/User'
// import Users from 'Database/migrations/1645945184831_users'

export default class UsersController {
  public async index({ response, request }: HttpContextContract) {
    if (request.qs().name) {
      let name = request.qs().name

      // Query Builder
      // let usersFiltered = await Database.from('users')
      //   .select('id', 'phone', 'email', 'name')
      //   .where('name', name)

      // Model ORM
      let usersFiltered = await User.findBy('name', name)

      return response.status(200).json({ message: 'success get users', data: usersFiltered })
    }

    // Query Builder
    // let users = await Database.from('users').select('id', 'phone', 'email', 'name')

    // Model ORM
    let users = await User.all()

    response.status(200).json({ message: 'success get users', data: users })
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      await request.validate(CreateUserValidator)

      // Query Builder
      // console.log(request.all())
      // let newUserId = await Database.table('users')
      //   .returning('id')
      //   .insert({
      //     name: request.input('name'),
      //     email: request.input('email'),
      //     phone: request.input('phone'),
      //   })

      // Model ORM
      let newUser = new User()
      newUser.name = request.input('name')
      newUser.email = request.input('email')
      // newUser.phone = request.input('phone')

      await newUser.save()
      // console.log(newUser.$isPersisted)
      // console.log("id: ", newUser.id)

      response.created({ message: 'created', id: newUser.id })
    } catch (error) {
      response.badRequest({ errors: error.messages })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    // Query Builder

    // let user = await Database.from('users')
    //   .where('id', params.id)
    //   .select('id', 'phone', 'email', 'name')
    //   .firstOrFail()

    // Model ORM
    let user = await User.find(params.id)

    return response.ok({ message: 'success get user with id', data: user })
  }

  public async update({ request, response, params }: HttpContextContract) {
    let id = params.id

    // Query Builder
    // await Database.from('users')
    //   .where('id', id)
    //   .update({
    //     email: request.input('email'),
    //     name: request.input('name'),
    //     phone: request.input('phone'),
    //   })

    // Model ORM
    let user = await User.findOrFail(id)
    user.email = request.input('email')
    user.name = request.input('name')
    // user.phone = request.input('phone')
    user.save()

    return response.ok({ message: 'updated' })
  }

  public async destroy({ params, response }: HttpContextContract) {
    // Query Builder
    // await Database.from('users').where('id', params.id).delete()

    // Model ORM
    let user = await User.findOrFail(params.id)
    await user.delete()

    return response.ok({ message: 'deleted' })
  }
}
