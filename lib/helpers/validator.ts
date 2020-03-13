import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export class ValidateHelper{

    public userValidationRules  () {  
        return [
            // username must be an email
            body('email').notEmpty().isEmail(),
            body('accountName').notEmpty(),
            // password must be at least 5 chars long
            body('password').notEmpty().isLength({ min: 5 }).withMessage('Password length should be more then 5.'),
          ]   
        
    }

    public valdation  (req: Request, res: Response, next: NextFunction) {  
        
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }
        const extractedErrors = []
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

        return res.status(422).json({
            errors: extractedErrors,
        })
    }
    
}