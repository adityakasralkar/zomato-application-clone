import express from 'express';
import dotenv from 'dotenv'; 

// Database Connection
import ConnectDB from './database/connection';



dotenv.config();

const zomato = express();

zomato.use(express.json());

zomato.get('/' , (req , res ) => {
    res.json({
        message: "Server is Running",
    });
});

const PORT = 4000;

zomato.listen(PORT , () => {
    ConnectDB()
    .then(()=> {
        console.log("Server is Running..!!");
    })
    .catch((error) => {
        console.log("Server is Running  , But Database Connection Failed..");
        console.log(error);
    })

})