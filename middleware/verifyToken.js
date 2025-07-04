const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {

    const token = req.headers.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: "Invalid token" })
        }

    } else {
        res.status(401).json({ message: "No token provied" })
    }
}


function verfiyAndAuthorize(req, res, next) {

    verifyToken(req, res, () => {
        if (req.user.id == req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({ message: "You are not allowd" })
        }
    })
};



function verfiyAdmin(req, res, next) {

    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({message: "Your are not allowd, only admin allowd"})
        }
    })
}



module.exports = {
    verfiyAndAuthorize,
    verfiyAdmin
}


