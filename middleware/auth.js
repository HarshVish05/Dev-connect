import jwt from 'jsonwebtoken'


// middleware func - thats why next
export const authMiddleware = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token')

    // chcek if token exists
    if(!token){
        return res.status(401).json({ msg: "User not authorized"})
    }

    // verify the token 
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded.user
        next()
        
    } catch (error) {
        res.status(401).json({ msg: "Invalid token" })
    }
}