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
        
        // get all User  data
        app.route('/user')
        .get(this.UserController.getUsers)        

        // save user data
        .post(this.ValidateHelper.userValidationRules(),
            this.ValidateHelper.valdation,
            this.UserController.addNewUser);

        // get user by username and password
        app.route('/user/single/manual')
        .post(this.UserController.getUserByUserNameAndPassword)
        // get user by email
        app.route('/user/search/byEmail')
            .post(this.UserController.getUserByEmail);
        // User detail
        app.route('/user/:id')
        // get specific User
        .get(this.UserController.getUserWithID)
        // update user by id
        .put(this.ValidateHelper.userValidationRules(),
            this.ValidateHelper.valdation,
            this.UserController.update)
        // delete user by id
        .delete(this.UserController.delete)

        // soft delete
        app.route('/user/delete/:id')
            .delete(this.UserController.softDelete);

    }
}