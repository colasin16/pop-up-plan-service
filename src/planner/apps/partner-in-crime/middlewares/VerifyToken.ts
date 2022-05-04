import jwt from 'jsonwebtoken';
import { JwtTokenPayload } from '../../../types/JwtTokenPayload';

/**
 * This is a middleware in which token is checked in http authorization header, 
 * and it forbids unuthenticated requests
 * reference: https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
 * @param req 
 * @param res 
 * @param next 
 * @returns
 */
export function authenticateTokenMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, payload: JwtTokenPayload) => {
        if (err) {
            console.error(err)
            return res.sendStatus(403)
        }

        // here we hold userId in `req` object, so in all the views we can find who sends the request.
        // TODO: add role later, maybe for some APIs we need to limit the access
        req.userId = payload.userId

        next()
    })
}