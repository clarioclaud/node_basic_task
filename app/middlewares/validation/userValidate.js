const { response } = require("express");

 //For Joi Validation
const options = {
    basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: true,
        stripUnknown: true
    },
    array: {
        abortEarly: false,
        convert: true,
        allowUnknown: true,
        stripUnknown: {
            objects: true
        }
    }
};

const validate = (schema) => {
    
    return (req,res,next) => {
        const {error, value} = schema.validate({...req.body, ...req.query, ...req.params, ...req.files}, options);
        
        const valid = error == null; 
        
        if (!valid) {
            
            return res.status(400).json({
                status: 400,
                message: error
            });
        
        }

        next();
    }
}

module.exports = {
    validate
};