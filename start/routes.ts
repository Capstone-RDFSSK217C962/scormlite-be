/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

// Route.get('/', async () => {
//   return { hello: 'world' }
// }).as('home')

// Route.get('/test/:b', async ({ params, request }: HttpContextContract) => {
//   let a: number = 12
//   console.log(request.completeUrl)
//   /** console.log(request.qs())*/
//   return { hello: a + parseInt(params.b) }
// }).as('aaa')

// Route.get('/users', 'UsersController.index').as('user.index')
// Route.post('/users', 'UsersController.store').as('user.store')
// Route.get('/users/:id', 'UsersController.show').as('user.show')
// Route.put('/users/:id', 'UsersController.update').as('user.update')
// Route.delete('/users/:id', 'UsersController.destroy').as('user.destroy')

Route.resource('users', 'UsersController').apiOnly()

Route.post('/register', 'AuthController.register').as('auth.register')

Route.post('/login', 'AuthController.login').as('auth.login')

// Route.resource('/courses', 'CoursesController').apiOnly().middleware('auth')

Route.post('/courses', 'CoursesController.store').as('auth.store').middleware(['auth', 'verify'])
// Route.post('/courses', 'CoursesController.store').as('auth.store').middleware({'*': 'auth'})

Route.get('/courses', 'CoursesController.index').as('auth.index').middleware('auth')

Route.get('/modules', 'ModulesController.index').as('module.index')
Route.post('/modules', 'ModulesController.store').as('module.store')

Route.get('/components', 'ComponentsController.index').as('component.index')
Route.post('/components', 'ComponentsController.store').as('component.store')

Route.post('/texts', 'TextsController.store').as('text.store')
Route.get('/texts', 'TextsController.index').as('text.index')

Route.post('/videos', 'VideosController.store').as('video.store')
Route.get('/videos', 'VideosController.index').as('video.index')

Route.post('/references', 'ReferencesController.store').as('reference.store')
Route.get('/references', 'ReferencesController.index').as('reference.index')

Route.post('/quizzes', 'QuizzesController.store').as('quiz.store')
Route.get('/quizzes', 'QuizzesController.index').as('quiz.index')

Route.post('/verify-otp', 'AuthController.otpConfirmation').as('auth.otpVerify')
