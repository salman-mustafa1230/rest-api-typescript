import * as mongoose from 'mongoose';
import User from '../models/userModel';
import { Request, Response, NextFunction } from 'express';
import  logger from './../../config/log';

export class UserController{

    public async addNewUser (req: Request, res: Response, next: NextFunction) {  
        try {
            let newUser = new User(req.body);
            const user = await newUser.save();   
                res.json(user); // we can add response handler helper as well
        
        } catch (err) {
            logger.debug(err);
            return next(err);
        }           
        
    }
    // get user by username and password
    public async getUserByUserNameAndPassword ( req: Request, res: Response, next: NextFunction ) {
        const { body } = req;
        try {
            const password = await User.encryptPassword(body.password); // encrypt password for query
            const user = await User.find({ 
                isDeleted: false,
                email: body.email,
                password: password
            });
            res.json(user);
        } catch (err) {
            logger.debug(err);
            return next(err);
        }  
    }
    // get user by Email address
    public async getUserByEmail ( req: Request, res: Response, next: NextFunction ) {
        const { body } = req;
        try {
            const user = await User.find({ 
                isDeleted: false,
                email: body.email // search with full email or you can search with regex
            });
            res.json(user);
        } catch (err) {
            logger.debug(err);
            return next(err);
        }  
    }
    // get all users
    public async getUsers (req: Request, res: Response, next: NextFunction) { 
        const { body } = req;
        const limit = body.limit || 10;
        var sortby = body.sortby ? body.sortby : {};
        var skip = limit && body.page ? (limit) * (body.page - 1) : 0;
        try {
            const user = await User.find({ isDeleted: false })
                .sort(sortby)
                .limit(limit)
                .skip(skip);
            res.json(user);
        } catch (err) {
            logger.debug(err);
            return next(err);
        }      
        
    }
    // get user by ID
    public async getUserWithID (req: Request, res: Response, next: NextFunction) {  
        try {
            const { userId } = req.params;         
            const user = await User.findById(userId);
            res.json(user);
        } catch (err) {
            logger.debug(err);
            return next(err);
        }
        
    }
    // update User
    public async update (req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;           
            const user = await User.findOneAndUpdate({ _id: userId }, req.body, { new: true });
            
            if ( user )
                return res.json(user);
            return next('No Record Found');
        } catch (err) {
            logger.debug(err);
            return next(err);
        }
        
    }

     // soft delete user
     public async softDelete (req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;           
            const user = await User.findOneAndUpdate({ _id: userId }, { isDeleted: true }, { new: true });
            res.json(user);
        } catch (err) {
            logger.debug(err);
            return next(err);
        }
        
    }
    // delete User By ID
    public async delete (req: Request, res: Response, next: NextFunction) { 
        try {
            const { userId } = req.params;          
            const user = await User.remove({ _id: userId });
            res.json({ message: 'Successfully disabled User!'});
        } catch (err) {
            logger.debug({err});
            return next(err);
        }
        
    }
    
}