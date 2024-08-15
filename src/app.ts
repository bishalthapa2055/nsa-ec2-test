import express from "express";
import { json } from "body-parser";
import cors from "cors";
import { NotFoundError } from "./common/errors/not-found-error";
import { errorHandler } from "./common/middlewares/error-handler";


const app = express();

app.use(cors())
app.set("trust proxy", true);
app.use(express.urlencoded({extended : false}))
app.use(json());

//routes mapping

app.all("/", (req , res) =>{
    res.status(200).json({status : true , message : "Server is Live"})
})

app.get("/checks",(req , res) =>{
    res.status(200).json({
        status : true ,
        data :{
            id : '1',
            name : process.env.MONGO_URI,
            address :"process address"
        }
    })
})
app.get("/apple",(req , res ) =>{
    res.status(200).json({
        message :"Apple is thers"
    })
})
app.get("/users" , (req , res) =>{
    const data = [
        {id : 1 , name : "Bishal" , address : "kathmandu"},
        {id : 1 , name : "Bishal" , address : "kathmandu"},
        {id : 1 , name : "Bishal" , address : "kathmandu"},
        {id : 1 , name : "Bishal" , address : "kathmandu"},
        {id : 1 , name : "Bishal" , address : "kathmandu"},
        {id : 1 , name : "Bishal" , address : "kathmandu"}
    ]
    res.status(200).json({
        status : true ,
        data :data
    })
})
app.all("*" ,(req , res) =>{
   throw new NotFoundError()
})

app.use(errorHandler);


export { app }