const User = require("../database/models/User")

module.exports = {
    async index(req, res) {
        await User.findAll().then(users => res.status(200).json(users))
            .catch(err => res.status(400).json(err))
    },
    async create(req, res) {
        const { name, email } = req.body

        await User.create({
            name,
            email
        }).then(user => res.status(201).json(user))
            .catch(err => res.status(400).json(err))
    }
}