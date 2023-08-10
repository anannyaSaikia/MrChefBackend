const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        res.status(400).send({msg : "Please login first!"});
    }else{
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded){
            if(err){
                console.log(err);
                res.status(500).send({msg : "Please login again"})
            }else{
                req.user_id = decoded.user_id;
                next();
            }
        })
    }
}

module.exports = { authentication };