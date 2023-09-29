import express from 'express';
import {User} from '../dto/user.js'
import {saveUser} from '../repository/dao.js';

export const router = express.Router();

router.post("/",async(req,res)=>{
    console.log("post method");
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
