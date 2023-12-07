const {MongoClient} = require("mongodb");

const mongoUrl="mongodb+srv://aniketgholve02:test123@cluster0.0qheqyy.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(mongoUrl);
const dbName = "Ecommerce";

const conn= async()=>{
    try{
        await client.connect();
        const database = client.db(dbName);
    }catch(e){
        console.log(e)
    }
}
const dbCreation=client.db("Ecommerce")
module.exports={conn,dbCreation}