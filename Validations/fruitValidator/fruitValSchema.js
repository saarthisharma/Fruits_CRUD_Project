const Joi = require("joi")

const fruitSchema = Joi.object({
    name : Joi.string().min(3).max(30).required(),
    country: Joi.string().min(3).max(10).required(),
    price: Joi.number().integer().required(),
    count: Joi.number().integer().required()
})
module.exports = {
    fruitSchema
}