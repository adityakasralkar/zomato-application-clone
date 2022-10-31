import express from 'express';
import dotenv from 'dotenv'; 
import passport from "passport";
import session from "express-session";


// Private Route Authorization config
import privateRouteConfig from "./config/route.config";




// Database Connection
import ConnectDB from './database/connection';

import Auth from "./api/auth";
import Food from "./api/food";
import Restaurant from "./api/restaurant";
import User from "./api/user";
import Menu from  "./api/menu";

dotenv.config();

// Adding Additional passport configuration
privateRouteConfig(passport);

const zomato = express();

zomato.use(express.json());
zomato.use(session({secret: process.env.JWTSECRET}));
zomato.use(passport.initialize());
zomato.use(passport.session());

zomato.get('/' , (req , res ) => {
    res.json({
        message: "Server is Running",
    });
});

// /auth/signup
zomato.use('/auth' , Auth);
zomato.use('/food', Food);
zomato.use('/restaurant', Restaurant);
zomato.use('/user', User);
zomato.use('/menu', Menu);

const PORT = 4000;

zomato.listen(PORT , () => {
    ConnectDB()
    .then(()=> {
        console.log("Server is Running..!!");
        console.log("Database Connection Successful...!!");
    })
    .catch((error) => {
        console.log("Server is Running  , But Database Connection Failed..");
        console.log(error);
    })

})