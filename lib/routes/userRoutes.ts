import {Request, Response, NextFunction} from "express";
import { UserController } from "../controllers/userController";
import { ValidateHelper } from './../helpers/validator';
export class Routes { 
    
    public UserController: UserController = new UserController() 
    public ValidateHelper: ValidateHelper = new ValidateHelper();
    public routes(app): void {   
        
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
        
        // User 
        app.route('/user')
        .get(this.UserController.getUsers)        

        // POST endpoint
        .post(this.ValidateHelper.userValidationRules(),
            this.ValidateHelper.valdation,
            this.UserController.addNewUser);

        // User detail
        app.route('/user/:id')
        // get specific User
        .get(this.UserController.getUserWithID)
        .put(this.UserController.update)
        .delete(this.UserController.delete)

    }
}