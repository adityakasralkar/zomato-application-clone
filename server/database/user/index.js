import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
    {
        fullName: { type: String , required: true},
        email: { type: String , required: true},
        password: {type: String},
        address: [{detail: { type: String } , for: {type: String} }],
        phoneNumber: [{type: Number}],
    
},

{
    timestamps: true,
}

);


//Attachments
UserSchema.methods.generateJwtToken = function () {
    return jwt.sign({ user: this._id.toString()} , "ZomatoApp");
};

//Helper functions
UserSchema.statics.findByEmailAndPhone = async({email , phoneNumber}) => {
    const checkUserByEmail = await UserModel.findOne({email});
    const checkUserByPhone = await UserModel.findOne({phoneNumber});

    if(checkUserByEmail || checkUserByPhone){
        throw new Error("User Already Exists.....!");
    }

    return false;
 };

UserSchema.statics.findByEmailAndPassword = async({email , password}) => {
    const user = await UserModel.findOne({email});

    if(!user) throw new Error ("User Doesn't Exists.....!!!!");


    //Compare Password
    const doesPasswordMatch = await bcrypt.compare(password , user.password);

    if(!doesPasswordMatch) throw new Error ("Invalid Credentials..");

    return user;

};


UserSchema.pre('save' , function(next){
   const user = this;

   // Password Is Modified ...
    if (!user.isModified('password')) return next();

   //Generate Bcrypt Salt
   bcrypt.genSalt(8 , (error , salt) => {
    
    if(error) return next(error);

    //Hash the Password
    bcrypt.hash(user.password , salt , (error , hash) =>{
        if(error) return next(error);

        //Asigning Hashed Password
        user.password = hash;
        return next();
    });

   });
});


export const UserModel = mongoose.model("users" , UserSchema);