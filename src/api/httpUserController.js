import express from 'express';
import {User} from '../dto/user.js'
import {saveUser,updateUser,deleteUser} from '../repository/dao.js';

export const router = express.Router();

router.post("/",async(req,res)=>{
    try{
        let userData = req.body;

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
        if (e instanceof Joi.ValidationError) {
            res.status(400).json(e.details);
        }
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
        if (e instanceof Joi.ValidationError) {
            res.status(400).json(e.details);
        }
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
