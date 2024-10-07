import jwt from "jsonwebtoken"
export const isAuthorized = (req, res, next) => {
    console.log(`Attempting to authorize the following request, ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`)
    /*
    1. check the cookie for existence of token
    2. check if token is valid
    */
    const token = req?.cookies['Authorization'];
    if(!token) {
        return res.status(401).json({
            message: '❌ User not logged in.'
        })
    }
    let signedObject;
    try {
        signedObject = jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
        return res.status(403).json({
            message: '❌ Invalid token, either expired or tampered with.'
        });
    }
    req.user = signedObject;
    next();
}