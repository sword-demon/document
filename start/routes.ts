/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => 'welcome')

// router.get('/category', async () => {})
// router.post('/category', async () => {})
// router.put('/category/{id}', async () => {})
// router.delete('/category/{id}', async () => {})

// 表示只有 api 路由
// 动态加载，按需加载
const CategoriesController = () => import('#controllers/categories_controller')
// store update destroy 需要验证登录状态
router
  .resource('category', CategoriesController)
  .apiOnly()
  .use(['store', 'update', 'destroy'], [middleware.auth(), middleware.admin()])

const AuthController = () => import('#controllers/auth_controller')

router
  .group(() => {
    router.post('login', [AuthController, 'login'])
    router.post('register', [AuthController, 'register'])
  })
  .prefix('/auth')

const ArticlesController = () => import('#controllers/articles_controller')
router
  .resource('article', ArticlesController)
  .apiOnly()
  .use(['store', 'update', 'destroy'], [middleware.admin()])
