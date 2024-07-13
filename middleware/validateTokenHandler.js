//: validateTokenHandler.js is a middleware function that validates the token sent by the user. 
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => 
{
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;  
    if (authHeader && authHeader.startsWith("Bearer")) 
    {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => 
        {
            if (err) 
            {
                res.status(401);
                throw new Error("Not authorized, token failed");
            }
            console.log("decoded:", decoded);
            req.user = decoded.user; 
            next();
        }
        );
    } else {
        if (!token) {
            res.status(401);
            throw new Error("Not authorized, no token");
        }
    }
};

module.exports = { validateToken };
