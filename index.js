const express = require('express');
const app = express();
const cors = require("cors")
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const saltRoute = 10;
const productData=require("./data");
const {conn, dbCreation} = require('./config/db');
const userCollection=dbCreation.collection("userData");
let data = []
app.use(cors({
    origin: "*"
}))
app.use(bodyParser.json())
app.post("/register", async(req, res) => {
    let jsonData = JSON.stringify(req.body);
    let convertedJson = JSON.parse(jsonData)
    const value = bcrypt.hashSync(convertedJson.password, saltRoute)
    convertedJson.password = value;
    let checkUser=await userCollection.findOne({"email":convertedJson.email})
    if(!checkUser){
        userCollection.insertOne(convertedJson);
        return res.status(200).send({ msg: "User Successfully registered" });
    }
    return res.status(403).send({err:"user exist"})
})
app.post("/login", async (req, res) => {
    let jsonData = JSON.stringify(req.body);
    let convertedJson = JSON.parse(jsonData)
    // const userData = data.find(item => item.email === convertedJson.email)
    let checkUser=await userCollection.findOne({"email":convertedJson.email})
    if (!checkUser) {
        return res.status(400).send({ err: "Invalid User" })
    }
    console.log(convertedJson)
    const validate = bcrypt.compareSync(convertedJson.password, checkUser.password);
    if (validate) {
        return res.send({ msg: "Login Success", username: checkUser.name });
    }
    else {
        console.log(data)
        return res.send({ err: "Invalid User" })
    }
})
app.get("/getData",(req,res)=>{
    res.send(productData)
})
app.listen(3000, async () => {
    try{
        await conn()
        console.log("server started on port 3000")
    }catch(e){
        console.log("err")
    }
})