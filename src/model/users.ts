import mongoose, { Schema } from "mongoose";


export enum TypeGender {
    male  = "male",
    female = "female" ,
    other = "other"
}


export interface Point {
    type: 'Point';
    coordinates: [number, number]; // lontude and latitude
}



export interface UserAttrs {

    first_name ?:string;
    last_name ?: string;
    phone_number ?:string;
    email ?: string ;
    date_of_birth ?: number;
    gender ?: TypeGender;
    photo_url ?: string;
    deleted ?:boolean;
    banned ?:boolean;
    under_review ?: boolean;
    onboarding_done ?: boolean ;
    full_name ?: string;
    searchTerm ?: string;
    app_version ?: string;
    device_info ?:string;
    lat_long ?: Point;
    address ?: string ;
    push_token ?: string ;
    deleted_at ?: Date;
    banned_at  ?:Date;
    deleted_reason ?: string ;
    banned_reason ?: string ;
    is_email_verified ?: boolean ;
    stream_token ?: string;
    promotion_notification ?: boolean ;
    booking_confirmation_sms_notification ?: boolean;
    booking_confirmation_email_notification ?: boolean ;
    otp_code ?: number ;
    otp_expired_at ?: number;
    deactivated ?: boolean;
    pass_key ?: string ;
    email_verification_encrypt ?: string;
    timeZone ?: string;
}



interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs : UserAttrs) :UserDoc ;
}

export interface UserDoc extends mongoose.Document, UserAttrs {

    first_name ?:string;
    last_name ?: string;
    phone_number ?:string;
    email ?: string ;
    date_of_birth ?: number;
    gender ?: TypeGender;
    photo_url ?: string;
    deleted ?:boolean;
    banned ?:boolean;
    under_review ?: boolean;
    onboarding_done ?: boolean ;
    full_name ?: string;
    searchTerm ?: string;
    app_version ?: string;
    device_info ?:string;
    lat_long ?: Point;
    address ?: string ;
    push_token ?: string ;
    deleted_at ?: Date;
    banned_at  ?:Date;
    deleted_reason ?: string ;
    banned_reason ?: string ;
    is_email_verified ?: boolean ;
    stream_token ?: string;
    promotion_notification ?: boolean ;
    booking_confirmation_sms_notification ?: boolean;
    booking_confirmation_email_notification ?: boolean ; 
    otp_code ?: number ;
    otp_expired_at ?: number;
    deactivated ?: boolean;
    pass_key ?: string ;
    email_verification_encrypt ?: string;
    timeZone ?: string;


    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserDoc>({
    first_name :{
        type : String,
    },
    last_name :{
        type : String,
    },
    email :{
        type : String,
    },
    date_of_birth :{
        type : Number,
    },
    phone_number :{
        type : String,
    },
    full_name :{
        type : String,
    },
    searchTerm :{
        type : String,
    },
    gender :{
        type :String,
        enum : TypeGender
    },
    photo_url :{
        type : String,
        default : "https://drivex-staging.s3.ap-southeast-2.amazonaws.com/profile/1716363025675.png"
    },
    under_review :{
        type : Boolean ,
        default : true
    },
    onboarding_done :{
        type :  Boolean ,
        default : false
     }, 
    deleted :{
        type : Boolean,
        default : false 
    },
    banned :{
        type : Boolean,
        default : false 
    },
    app_version :{
        type : String
    },
    device_info :{
        type  :String,
    },
    lat_long :{
        // type : Object
        type: {
            type: String,
            enum: ['Point'],
            
          },
          coordinates: {
            type: [Number],
            
          },
    },
    address :{
        type : String
    },
    push_token :{
        type : String,
    },
    deleted_at :{
        type :Date,
    },
    banned_at :{
        type : Date ,
    }, 
    deleted_reason :{
        type :String,
    },
    banned_reason :{
        type : String
    },
    is_email_verified:{
        type : Boolean,
        default : false
    },
    booking_confirmation_email_notification: {
        type : Boolean ,
        default : true
    },
    booking_confirmation_sms_notification: {
        type : Boolean,
        default  : true
    },
    promotion_notification: {
        type : Boolean,
        default :true
    },
    stream_token :{
        type : String
    },
    otp_code :{
        type : Number
    },
    otp_expired_at :{
        type : Number
    },
    deactivated :{
        type: Boolean ,
        default : false 
    },
    pass_key :{
        type : String,
        default : null
    },
    email_verification_encrypt :{
        type : String ,
        default : null
    },
    timeZone :{
        type : String
    }
       

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

userSchema.index({ "$**": "text"  , "lat_long": '2dsphere'});

userSchema.pre("save" , async function (done){
    if(this.first_name && this.last_name){
        this.full_name = this.first_name + ' ' + this.last_name 
        this.searchTerm = this.first_name+this.last_name
    }
    done()
})


userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};



const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };