import Joi from "joi";

const commentSchema = Joi.object({
    postId: Joi.number().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    body: Joi.string().required()
})

export default commentSchema; 