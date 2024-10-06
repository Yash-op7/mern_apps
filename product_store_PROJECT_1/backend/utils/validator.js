import Joi from "joi";

const productsSchema = Joi.object({
    name:Joi.string()
    .required()
    .pattern(/^[a-zA-Z]+$/)
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
    const {error} = productsSchema.validate(newProduct);
    console.log(`inside validation function with the body: ${JSON.stringify(newProduct)} & error: ${error}`)
    if(error) {
        console.log('input validation error', error)
        return res.status(400).json({message: error?.details[0].message })
    }
    next();
}

export {validateProduct};