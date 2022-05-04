import jwt from 'jsonwebtoken';
import { container } from 'tsyringe';
import { JwtTokenPayload } from '../../../types/JwtTokenPayload';
import { UserActor } from '../../../views/user-actor/UserActor';

export function authenticateTokenMiddleware(req, res, next) {

    const view = container.resolve(UserActor);

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET as string, async (err: any, payload: JwtTokenPayload) => {
        if (err) {
            console.error(err)
            return res.sendStatus(403)
        }

        // here we hold userId in `req` object, so in all the views we can find who sends the request.
        // TODO: add role later, maybe for some APIs we need to limit the access
        const user = await view.getUser(payload.userId);
        req.user = user

        if (!user) {
            return res.sendStatus(403);
        }

        next()
    })
}