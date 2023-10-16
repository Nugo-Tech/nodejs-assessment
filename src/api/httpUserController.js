import express from 'express';
import {User} from '../dto/user.js'
import {saveUser,updateUser,deleteUser,readUser} from '../repository/dao.js';
import Joi from 'joi';

export const router = express.Router();

// Validation schema for user data
const userSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().min(3).pattern(new RegExp('^[A-Za-z ]+$')).required(),
    email: Joi.string().pattern(new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')).required(),
    address: Joi.string().min(3).pattern(new RegExp('^[A-Za-z0-9 ]+$')).required(),
    city: Joi.string().min(3).pattern(new RegExp('^[A-Za-z0-9 ]+$')).required(),
    country: Joi.string().min(3).pattern(new RegExp('^[A-Za-z0-9 ]+$')).required(),
});

router.post("/",async(req,res)=>{
    try{
        let userData = req.body;

        // Validate user data
        const { error } = userSchema.validate(userData);
        if (error) {
            res.status(400).json(error.details);
            return;
        }

        const user = new User(
            userData.id,
            userData.name,
            userData.email,
            userData.address,
            userData.city,
            userData.country
        );
        await saveUser(user);
        res.sendStatus(201);
    }catch (e){
        // if (e instanceof Joi.ValidationError) {
        //     res.status(400).json(e.details);
        // }
        res.status(404).send(e);
    }
});

router.get("/:id",async (req,res)=>{
    try{
        const user =await readUser(req.params.id);
        res.status(200).send(user);
    }catch (e){
        res.status(404).send(e);
    }
});

router.patch("/:id",async (req,res)=>{
    try{
        let userData = req.body;

        // Validate user data
        const { error } = userSchema.validate(userData);
        if (error) {
            res.status(400).json(error.details);
            return;
        }

        const user = new User(
            req.params.id,
            userData.name,
            userData.email,
            userData.address,
            userData.city,
            userData.country);
        await updateUser(user);
        res.sendStatus(201)
    }catch (e){
        // if (e instanceof Joi.ValidationError) {
        //     res.status(400).json(e.details);
        // }
        res.status(404).send(e);
    }
});

router.delete("/:id",async (req,res)=>{
    try{
        await deleteUser(req.params.id);
        res.sendStatus(200);
    }catch (e){
        res.status(404).send(e);
    }
});
