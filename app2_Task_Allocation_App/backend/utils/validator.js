import Joi from "joi";

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const validateCredentials = ( req, res, next ) => {
    const {error} = userSchema.validate(req.body);
    if(error) {
        return res.status(400).json({
            message: error?.details[0]?.message
        })
    }
    next();
}