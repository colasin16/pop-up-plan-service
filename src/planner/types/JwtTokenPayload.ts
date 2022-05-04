export type JwtTokenPayload = {
    userId: string,
    iat?: number,
    exp?: number,
}