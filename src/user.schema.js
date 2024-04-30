import Joi from 'joi'

const Test_User = {
    "name": "alex",
    "userName": "alex@home.edu",
    "password": "1234"
}

export default Joi.object({
    name: Joi
        .string()
        .min(2)
        .max(20)
        .required(),

    userName: Joi
        .string()
        .email()
        .required(),

    password: Joi
        .string()
        .alphanum()
        .required()
})


