import express from 'express';

//enable JWT from JSON web token
import jwt from 'jsonwebtoken';
import * as DBConfig from '../Config/db';

//convenience function to return the Display Name of User
export function UserDisplayName(req: express.Request): String
{
    if(req.user)
    {
        let user = req.user as UserDocument
        return user.DisplayName.toString();
    }
    return '';
}

//helper middleware function for guarding secure locations 
export function AuthGuard(req: express.Request, res: express.Response, next: express.NextFunction) : void
{
    if(!req.isAuthenticated())  
    {
        return res.redirect('/api/login');
    }
    next();  
}

export function GenerateToken(user: UserDocument): String 
{
    const payload = 
    {
        id: user.id,
        DisplayName: user.DisplayName,
        username: user.username,
        EmailAddress: user.EmailAddress
    }

    const jwtOptions =
    {
        expiresIn: 604800 // 1 week
    }

    return jwt.sign(payload, DBConfig.Secret, jwtOptions);
}