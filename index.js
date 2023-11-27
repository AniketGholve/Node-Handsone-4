const express = require('express');
const app = express();
const cors = require("cors")
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const saltRoute = 10;
let data = []
app.use(cors({
    origin: "*"
}))
app.use(bodyParser.json())
app.post("/register", (req, res) => {
    let jsonData = JSON.stringify(req.body);
    let convertedJson = JSON.parse(jsonData)
    const value = bcrypt.hashSync(convertedJson.password, saltRoute)
    convertedJson.password = value;
    data.push(convertedJson)
    console.log(data)
    res.send({ msg: "User Successfully registered" });
})
app.post("/login", (req, res) => {
    let jsonData = JSON.stringify(req.body);
    let convertedJson = JSON.parse(jsonData)
    const userData = data.find(item => item.email === convertedJson.email)
    if (!userData) {
        return res.send({ err: "Invalid User" })
    }
    console.log(convertedJson)
    const validate = bcrypt.compareSync(convertedJson.password, userData.password);
    if (validate) {
        return res.send({ msg: "Login Success" });
    }
    else {
        console.log(data)
        return res.send({ err: "Invalid User" })
    }
})
app.listen(3000, () => {
    console.log("server started on port 3000")
})