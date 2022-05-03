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
        }

        if (err) return res.sendStatus(403)

        req.userId = payload.userId

        next()
    })
}