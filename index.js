const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
require("dotenv").config();

const { connection } = require("./config/db");
const { UserModel } = require("./models/User.model");
const { authentication } = require("./middlewares/authentication");
const { itemRouter } = require("./routes/itemroute");

const app = express();

app.use(express.json());

app.use(cors({
    origin : "*"
}))

//base route
app.get("/", (req, res) => {
    res.status(200).send({ msg: "Base Route" });
})

//signup
app.post("/signup", (req, res) => {
    const { name, phNumber, email, password } = req.body;
    bcrypt.hash(password, 3, async function (err, hash) {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: "Something went wrong, please try again" })
        } else {
            const new_user = new UserModel({
                name,
                phNumber,
                email,
                password: hash
            })
            try {
                await new_user.save();
                res.status(200).send({ msg: "Signup Successful" })
            } catch (err) {
                console.log(err);
                res.status(500).send({ msg: "Error while signing up, please try later" })
            }
        }
    })
})

//login
app.post("/login", async (req, res) => {
    const { phNumber, password } = req.body;
    let user = {};
    try {
        user = await UserModel.findOne({ phNumber: phNumber });
    } catch (err) {
        console.log(err);
        /* res.status(500).send({msg : "Error while logging in"}); */
    }
    if (!user) {
        res.status(400).send({ msg: "User Not Found. Please Signup!" });
    } else {
        const hashed_password = user.password;
        bcrypt.compare(password, hashed_password, function (err, result) {
            if(err){
                res.status(400).send({msg : "Wrong Credentials. Try again!"});
            }else{
                console.log(result);
                console.log(user);
                const token = jwt.sign({user_id : user._id}, process.env.SECRET_KEY);
                res.status(200).send({msg : "Login Successful", token : token});
            }
        })
    }
})

app.use("/items", authentication, itemRouter);

app.listen(8080, async () => {
    try {
        await connection;
        console.log("Connected to DB")
    } catch (err) {
        console.log(err);
        console.log("Error connecting to DB");
    }
    console.log("Listening on port 8080");
});