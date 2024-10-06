import Joi from "joi";

const productsSchema = Joi.object({
    name:Joi.string()
    .required()
    .pattern(/[a-zA-Z]*/)
    .messages({
        "string.pattern.base": 'Name should only contain alphabets',
        "any.required":"Name is required."
    }),
    price: Joi.number().required().messages({
        "number.base":"Price can only be an integer or a float.",
        "number.required":"Price is reqd.",
    }),
    productImage: Joi.string().required().messages({
        "string.base":"enter a valid image path.",
        "string.required":"Path is reqd.",
    })
});

function validateProduct(req, res, next) {
    let newProduct = req.body;
    const {err} = productsSchema.validate(newProduct);
    if(err) {
        console.log('input validation err', err)
        return res.status(400).json({message: 'invalid product', details: err})
    }
    next();
}

export {validateProduct};