import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Request,
    next: NextFunction): void {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error('JWT token is missing');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoted = verify(token, authConfig.jwt.secret);

        const { sub } = decoted as TokenPayload;

        request.user = {
            id: sub,
        };

        return next();
    } catch {
        throw new Error('Invalid JWT Token')
    }


}
