import Joi from 'joi'

const TEST_DATA = {
    "avatarName": "max",
    "childAge": 8,
    "skinColor": "#ffff00",
    "hairstyle": "bald",
    "headShape": "round",
    "upperClothing": "tshirt",
    "lowerClothing": "short"
}


export default Joi.object({
    "id": Joi.any(),
    "createdAt": Joi.any(),

    avatarName: Joi
        .string()
        .min(2)
        .max(20)
        .required(),

    childAge: Joi
        .number()
        .integer().min(0).max(100)
        .required(),

    skinColor: Joi.string()
        .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        .required(),

    hairstyle: Joi
        .string()
        .valid(
            'short',
            'bald',
            'short-curly',
            'short-straight',
            'medium-curly',
            'medium-straight',
            'long-curly',
            'long-straight',
            'dread-locks'
        )
        .default('medium-straight'),

    headShape: Joi
        .string()
        .valid(
            'oval',
            'round',
            'heart',
            'rectangular'
        )
        .default('oval'),

    upperClothing: Joi
        .string()
        .valid(
            'jacket',
            'shirt',
            'hoodie',
            'dress'
        )
        .default('shirt'),

    lowerClothing:
        Joi.alternatives()
            .conditional('upperClothing', {
                is: 'dress',
                then: Joi.forbidden(),
                otherwise: Joi
                    .string()
                    .valid('shorts', 'pants', 'skirt')
                    .default('pants')
            })
})

