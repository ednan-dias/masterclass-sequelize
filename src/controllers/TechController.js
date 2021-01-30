const Tech = require("../database/models/Tech")
const User = require("../database/models/User")


module.exports = {
    async index(req, res) {
        const { id } = req.params

        const user = await User.findByPk(id, {
            include: { association: 'techs', attributes: ['name'], through: { attributes: [] } }
        })

        return res.json(user.techs)

    },
    async create(req, res) {
        const { id } = req.params
        const { name } = req.body

        const user = await User.findByPk(id)

        if (user === null) {
            return res.status(400).json({ message: 'Usuário não encontrado!' })
        }

        const [tech] = await Tech.findOrCreate({
            where: { name }
        })

        await user.addTechs(tech)

        return res.json(tech)
    },

    async delete(req, res) {
        const { id } = req.params
        const { name } = req.body

        const user = await User.findByPk(id)

        if (user === null) {
            return res.status(400).json({ message: 'Usuário não encontrado!' })
        }

        const tech = await Tech.findOne({
            where: { name }
        })

        await user.removeTechs(tech)

        return res.json()
    }
}