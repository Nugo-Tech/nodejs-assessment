import express from 'express';
import {User} from '../dto/user.js'
import {saveUser} from '../repository/dao.js';

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
    console.log("get method");
});

router.patch("/:id",async (req,res)=>{
    console.log("patch method")
});

router.delete("/:id",async (req,res)=>{
    console.log("delete method")
});
