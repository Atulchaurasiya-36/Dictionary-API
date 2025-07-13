import Joi from "joi";

export const wordValidationSchema = Joi.object({
  word: Joi.string().trim().min(2).required().messages({
    "string.empty": "Word is required",
    "string.min": "Word must be at least 2 characters"
  }),

  meaning: Joi.string().trim().min(5).required().messages({
    "string.empty": "Meaning is required",
    "string.min": "Meaning must be at least 5 characters"
  }),

  realUsage: Joi.string().trim().min(5).required().messages({
    "string.empty": "Real usage is required",
    "string.min": "Usage must be at least 5 characters"
  }),

  synonyms: Joi.array().items(Joi.string().trim().min(1)).required().messages({
    "array.base": "Synonyms must be an array of strings",
    "array.includes": "Each synonym must be a valid string"
  }),

  antonyms: Joi.array().items(Joi.string().trim().min(1)).required().messages({
    "array.base": "Antonyms must be an array of strings",
    "array.includes": "Each antonym must be a valid string"
  })
});
