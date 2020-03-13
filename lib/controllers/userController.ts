import * as mongoose from 'mongoose';
import User from '../models/userModel';
import { Request, Response, NextFunction } from 'express';

export class UserController{

    public async addNewUser (req: Request, res: Response, next: NextFunction) {  
        try {
            let newUser = new User(req.body);
            const user = await newUser.save();   
                res.json(user); // we can add response handler helper as well
        
        } catch (err) {
            return next(err);
        }           
        
    }

    public async getUsers (req: Request, res: Response, next: NextFunction) {  
        try {
            const user = await User.find({});
            res.json(user);
        } catch (err) {
            return next(err);
        }      
        
    }

    public async getUserWithID (req: Request, res: Response, next: NextFunction) {  
        try {
            const { userId } = req.params;         
            const user = await User.findById(userId);
            res.json(user);
        } catch (err) {
            return next(err);
        }
        
    }

    public async update (req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;           
            const user = await User.findOneAndUpdate({ _id: userId }, req.body, { new: true });
            res.json(user);
        } catch (err) {
            return next(err);
        }
        
    }

    public async delete (req: Request, res: Response, next: NextFunction) { 
        try {
            const { userId } = req.params;          
            const user = await User.remove({ _id: userId });
            res.json({ message: 'Successfully deleted User!'});
        } catch (err) {
            return next(err);
        }
        
    }
    
}