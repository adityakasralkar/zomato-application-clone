import JwtPassport from "passport-jwt";

import {UserModel} from "../database/allModels";

const JWTStrategy = JwtPassport.Strategy;

const ExtractJwt = JwtPassport.ExtractJwt;

// Head:{
//  Authorization: "Bearer(prefix) ncjkhdfhsfdzjnjsfkjdsjfcsdfcio -- RANDOM TOKEN"
//}
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    
    //ERROR OCCURS DURING ENV PROCESS -- CHECK LATER
    secretOrKey: "ZomatoApp" , 

};

export default (passport) => {
    passport.use(
        new JWTStrategy(options , async(jwt__payload , done) =>{
            try{
                const doesUserExist = await UserModel.findById(jwt__payload.user);
                
                if(!doesUserExist) return done(null,false);
                
                return done(null , doesUserExist);

            }catch(error){
                throw new Error(error);
            }
        })
    );
};