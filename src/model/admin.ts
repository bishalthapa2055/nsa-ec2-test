import mongoose from "mongoose"
import { Password } from "../helpers/password";


export interface AdminAttrs {
    email : string ,
    password : string ,
    photo_url ?: string,

}

interface AdminModel  extends mongoose.Model<AdminDoc>{
    build(attrs : AdminAttrs) : AdminDoc  ;
}


export interface AdminDoc extends mongoose.Document , AdminAttrs {
    email : string ,
    password : string ,
    photo_url ?: string  ,
    
    createdAt: Date;
    updatedAt: Date;
}


const adminSchema = new mongoose.Schema<AdminDoc>({
    email :{
        type : String ,
        require : true
    },
    password : {
        type : String,
    },
    photo_url :{
        type : String,
        default : "https://drivex-staging.s3.ap-southeast-2.amazonaws.com/profile/1716363025675.png"
    },
},
{
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
    timestamps: true,
} 
)

adminSchema.pre("save"  , async function (done) {
  
    if (this.isModified("password")) {
        const hashed = await Password.toHash(this.get("password"));
        this.set("password", hashed);
      }
    done()
})


adminSchema.statics.build = (attrs : AdminAttrs) =>{
    return new Admin(attrs)
}


adminSchema.methods.correctPassword = async (
    storedPassword: string,
    suppliedPassword: string
  ) => {
    return await Password.compare(storedPassword, suppliedPassword);
};



const Admin = mongoose.model<AdminDoc , AdminModel > ("Admin" , adminSchema)

export {Admin}