import jwt from "jsonwebtoken"

export const verifyToken= async (req,res,next)=>{
    const token=req.cookies.token

    if(!token){
        return res.status(401).json({message:"Access denied, UnAuthorized"})
    }

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        
        if(!decoded) return res.status(401).json({message:"Access denied, UnAuthorized"})

        req.userId=decoded.userId
        next()
    } catch (error) {
        console.error("Error verifying token",error)
        res.status(401).json({message:"Invalid token"})
    }
}