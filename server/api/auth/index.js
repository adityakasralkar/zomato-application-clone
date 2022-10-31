import express from "express";

import { UserModel } from "../../database/allModels";

const Router  = express.Router();

//SignUp Router
/*
 * Route    /signup
 * Des      Create new account 
 * Params   none
 * Access   Public
 * Method   POST
*/
Router.post('/signup' , async ( req , res) => {
    try{
        await UserModel.findByEmailAndPhone(req.body.credentials);

        const newUser =  await UserModel.create(req.body.credentials);

        const token = newUser.generateJwtToken();
        return res.status(200).json({token , status: "Success"});
    }catch(error){
        return res.status(500).json({error : error.message});
    }
});

//SignIn Router
/*
 * Route    /signin
 * Des      Login to existing account
 * Params   none
 * Access   Public
 * Method   POST
*/
Router.post('/signin' , async ( req , res) => {
    try{
        const user = await UserModel.findByEmailAndPassword(req.body.credentials);    
        const token = user.generateJwtToken();

        return res.status(200).json({ token , status: "Success"});
    }
    catch(error){
        return res.status(500).json({error : error.message});
    }
});

export default Router;
