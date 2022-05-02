
import jwt from 'jsonwebtoken';

/**
 * This is a middleware in which token is checked in http authorization header, and it forbids unuthenticated requests
 * reference: https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export function authenticateTokenMiddleware(req, res, next) {
    console.log('authenticateTokenMiddleware')
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}