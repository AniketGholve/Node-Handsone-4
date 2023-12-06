const {MongoClient} = require("mongodb");

const mongoUrl="mongodb://127.0.0.1/27017";

const mongoServer=new MongoClient(mongoUrl)

const conn= async()=>{
    try{
        await mongoServer.connect();
    }catch(e){
        console.log(e)
    }
}
const dbCreation=mongoServer.db("Ecommerce")

module.exports={conn,dbCreation}