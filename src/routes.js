const { Router } = require('express')
const routes = Router()

const UserController = require('./controllers/UserController')
const AddressController = require('./controllers/AddressController')
const TechController = require('./controllers/TechController')
const ReportController = require('./controllers/ReportController')

routes.get('/users', UserController.index)
routes.post('/user', UserController.create)

routes.get('/user/:id/address', AddressController.index)
routes.post('/user/:id/address', AddressController.create)

routes.get('/user/:id/techs', TechController.index)
routes.post('/user/:id/techs', TechController.create)
routes.delete('/user/:id/techs', TechController.delete)

routes.get('/report', ReportController.show)

module.exports = routes