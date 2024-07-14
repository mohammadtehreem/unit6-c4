const jwt = require("jsonwebtoken");
require("dotenv").config()
const auth = (req, res, next) =>{
    const token = req.headers.authorization.split(" ")[1]
    // console.log(token);
    try{

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
            if(err || !decoded){
                res.send(401);
            }
            else{
                req.user = decoded;
                next()
            }
        })
    }
    catch(err){
        console.log(err);
        res.status(500)
    }
   
}
module.exports = auth;