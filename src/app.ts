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
        {id : 2, name : "Bishal" , address : "kathmandu"},
        {id : 3 , name : "Bishal" , address : "kathmandu"},
        {id : 4 , name : "Bishal" , address : "kathmandu"},
        {id : 5 , name : "Bishal" , address : "kathmandu"},
        {id : 6 , name : "Bishal" , address : "kathmandu"},
        {id : 7 , name : "Bishal" , address : "kathmandu"},
        {id : 8 , name : "Bishal" , address : "kathmandu"},
        {id : 9 , name : "Bishal" , address : "kathmandu"},
        {id : 10 , name : "Bishal" , address : "kathmandu"},
        {id : 11 , name : "Bishal" , address : "kathmandu"},
        {id : 12, name : "Bishal" , address : "kathmandssu"},
        {id : 5 , name : "Bishal" , address : "kathmandu"},
        {id : 6 , name : "Bishal" , address : "kathmandu"},
        {id : 7 , name : "Bishal" , address : "kathmandu"},
        {id : 8 , name : "Bishal" , address : "kathmandu"},
        {id : 9 , name : "Bishal" , address : "kathmandu"},
        {id : 10 , name : "Bishal" , address : "kathmandu"},
        {id : 11 , name : "Bishal" , address : "kathmandu"},
        {id : 12, name : "Bishal" , address : "kathmandssu"}
    ]
    res.status(200).json({
        status : true ,
        data :data
    })
})

app.get("/data" ,(req , res ) =>{
    res.status(200).json({
        status : true , 
        data :{
            data : "Hello from data route",
            envData : process.env.MONGO_URI,
            message :"Data routes exists",
        }
    })
} )
app.all("*" ,(req , res) =>{
   throw new NotFoundError()
})

app.use(errorHandler);


export { app }
