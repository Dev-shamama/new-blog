import Joi from "joi";

export const ContactValidateSchema = Joi.object({
    name: Joi.string().trim(true).min(3).max(30).required(),
    email: Joi.string().trim(true).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    message: Joi.string().trim(true).min(20).max(150),
})

export const AddLanguageValidateSchema = Joi.object({
    language: Joi.string().lowercase().trim(true).required()
})

export const ListHeadingValidateSchema = Joi.object({
    heading: Joi.string().min(3).trim(true).required(),
    title: Joi.string().min(3).trim(true).required(),
    slug: Joi.string().lowercase().min(3).trim(true).required(),
})

export const ListHeadingChildrenValidateSchema = Joi.object({
    title: Joi.string().min(3).trim(true).required(),
    slug: Joi.string().lowercase().min(3).trim(true).required(),
})

export const BlogValidateSchema = Joi.object({
    title: Joi.string().min(3).trim(true).required(),
    description: Joi.string().min(10).trim(true).required(),
    author: Joi.string().required(),
    slug: Joi.string().lowercase().min(3).trim(true).required(),
    content: Joi.string().min(30).trim(true).required(),
    status: Joi.string().required(),
})


