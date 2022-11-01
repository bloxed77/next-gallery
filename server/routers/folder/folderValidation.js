const Joi = require("joi");

exports.createFolderValidation = {
  body: Joi.object().required().keys({
    name: Joi.string().required(),
    group: Joi.string().required(),
  }),
};

exports.getOneFolderValidation = {
  params: Joi.object().required().keys({
    code: Joi.string().required(),
  }),
};

exports.updateOneFolderValidation = {
  params: Joi.object().required().keys({
    code: Joi.string().required(),
  }),
  body: Joi.object().required().keys({
    size: Joi.string(),
    name: Joi.string(),
    group: Joi.string(),
  }),
};

exports.deleteFolderValidation = {
  params: Joi.object().required().keys({
    code: Joi.string().required(),
  }),
};

exports.hideFolderValidation = {
  params: Joi.object().required().keys({
    code: Joi.string().required(),
  }),
};