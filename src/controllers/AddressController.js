const Address = require("../database/models/Address")
const User = require("../database/models/User")

module.exports = {
    async index(req, res) {
        const { id } = req.params

        const user = await User.findByPk(id, {
            include: { association: 'addresses' }
        })

        return res.json(user)
    },
    async create(req, res) {
        const { id } = req.params
        const { zipcode, street, number } = req.body

        await User.findByPk(id).then(user => {
            if (user === null) {
                return res.status(400).json({ message: 'Usuário não encontrado!' })
            }
        })

        await Address.create({
            zipcode,
            street,
            number,
            user_id: id
        }).then(address => {
            return res.status(201).json(address)
        }).catch(err => res.status(400).json(err))
    }
}